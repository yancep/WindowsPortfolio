/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
} from '@heroui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToast } from '@/src/components/toast/Toast';
import CustomTextInput from '@/src/components/inputs/basic/CustomTextInput';
import CustomToggle from '@/src/components/inputs/basic/CustomToggle';
import {
  createImageWithText,
  createTextImage,
} from '@/src/components/services/SingDocument/createImagen';
import {v4 as uuidv4} from 'uuid';
import {
  SignData as SignDataModel,
  signDocument,
  validateCertificateAndGetPrivateKey,
} from '@/src/core/services/documents/SignDocumentsService';
import { RiArrowLeftRightLine } from 'react-icons/ri';
import { PDFButton } from '@/src/components/services/SingDocument/PDFViewer';

interface CustomSignatureModalProps {
  isOpenModal: boolean;
  onCloseModal: () => void;
  handleSignDocument: (data: Buffer) => void;
  rectInfo: number[];
  pdf: Buffer;
  page: number;
}

interface FormValues {
  p12File: ArrayBuffer | null;
  signature_img: Buffer | null;
  password: string;
  rectInfo: number[];
  pdf: Buffer;
  imageSignature: boolean;
  textSignature: boolean;
  reason: string;
  location: string;
  name: string;
  nameVisual: string;
  surnameVisual: string;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const CustomSignatureModal: React.FC<CustomSignatureModalProps> = ({
  isOpenModal,
  onCloseModal,
  handleSignDocument,
  rectInfo,
  pdf,
  page,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [reverseImage, setReverseImage] = useState(false);
  const [isCertValid, setIsCertValid] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues: {
      p12File: null,
      signature_img: null,
      password: '',
      rectInfo: rectInfo,
      pdf: pdf,
      imageSignature: false,
      textSignature: false,
      reason: '',
      location: '',
      name: '',
      nameVisual: '',
      surnameVisual: '',
    },
    validationSchema: Yup.object().shape({
      p12File: Yup.mixed().required('El certificado digital es obligatorio'),
      password: Yup.string().required('La contraseña es obligatoria'),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitting(true);

      if (values.imageSignature && !values.signature_img) {
        showToast('Adjunte una imagen', 'error');
        setSubmitting(false);
        return;
      }

      if (values.p12File) {
        const data: SignDataModel = {
          pageNumber: page,
          p12Certificate: values.p12File,
          certificatePassword: values.password,
          pdf: pdf,
          rectInfo: values.rectInfo,
          nameSign: `Signature${uuidv4()}`,
        };

        const date = new Date();
        const lines = [
          'Digitally',
          'signed by',
          values.name,
          `Date: ${date.toLocaleDateString('es-CU')}`,
          `${date.toLocaleTimeString('es-CU')}`,
        ];

        const bigname = [values.nameVisual, values.surnameVisual];

        if (
          values.textSignature &&
          values.imageSignature &&
          values.signature_img
        ) {
          data.jpgImage = await createImageWithText(
            values.signature_img,
            lines,
            reverseImage,
          );
        } else if (values.imageSignature && values.signature_img) {
          data.jpgImage = values.signature_img;
        } else if (values.textSignature) {
          data.jpgImage = await createTextImage(lines, bigname, reverseImage);
        }

        data.signParams = {
          ...(values.reason && { reason: values.reason }),
          ...(values.location && { location: values.location }),
          date: new Date(),
        };

        const response = await signDocument(data);

        if (response.signedPdf) {
          handleSignDocument(response.signedPdf);
          resetModalStates();
          resetForm();
          showToast('El documento ha sido firmado con éxito', 'success');
        } else {
          showToast('Error al firmar el documento', 'error');
        }
      }
      setSubmitting(false);
    },
  });

  const updatePreview = useCallback(async () => {
    const date = new Date();
    const lines = [
      'Digitally',
      'signed by',
      formik.values.name,
      `Date: ${date.toLocaleDateString('es-CU')}`,
      `${date.toLocaleTimeString('es-CU')}`,
    ];
    const bigname = [formik.values.nameVisual, formik.values.surnameVisual];

    let previewImage = null;

    if (
      formik.values.textSignature &&
      formik.values.imageSignature &&
      formik.values.signature_img
    ) {
      const combinedImage = await createImageWithText(
        formik.values.signature_img,
        lines,
        reverseImage,
      );
      previewImage = `data:image/png;base64,${combinedImage.toString('base64')}`;
    } else if (formik.values.imageSignature && formik.values.signature_img) {
      previewImage = URL.createObjectURL(
        new Blob([formik.values.signature_img], { type: 'image/png' }),
      );
    } else if (formik.values.textSignature) {
      const textImage = await createTextImage(lines, bigname, reverseImage);
      previewImage = `data:image/png;base64,${textImage.toString('base64')}`;
    }

    setPreviewImage(previewImage);
  }, [
    formik.values.imageSignature,
    formik.values.textSignature,
    formik.values.signature_img,
    formik.values.nameVisual,
    formik.values.surnameVisual,
    reverseImage,
  ]);

  useEffect(() => {
    if (!isCollapsed) {
      updatePreview();
    }
  }, [updatePreview, isCollapsed]);

  const handleChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      const file = e.currentTarget.files[0];
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      if (file.type === 'application/x-pkcs12') {
        formik.setFieldValue('p12File', buffer);
      } else {
        formik.setFieldValue('signature_img', buffer);
      }
    }
  };

  const resetModalStates = () => {
    setIsCertValid(false);
    setIsCollapsed(true);
    setPreviewImage(null);
    formik.resetForm();
    onCloseModal();
  };

  return (
    <Modal
      isOpen={isOpenModal}
      scrollBehavior="normal"
      size="2xl"
      onClose={resetModalStates}
      isDismissable={false}
    >
      <ModalContent>
        {() => (
          <form onSubmit={formik.handleSubmit}>
            <ModalHeader>
              {isCollapsed ? (
                <h1>Configurar firma</h1>
              ) : (
                <h1>Editar apariencia de la firma</h1>
              )}
            </ModalHeader>

            <ModalBody>
              {!isCollapsed && (
                <>
                  {/* Sección de Previsualización */}
                  <div
                    className="preview-section"
                    style={{
                      position: 'relative',
                      display: 'flex',
                      justifyContent: previewImage ? 'center' : 'flex-start',
                      alignItems: 'center',
                      backgroundColor: previewImage ? 'transparent' : '#f0f0f0',
                      width: '100%',
                      height: '200px',
                      borderRadius: '10px',
                    }}
                  >
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Previsualización de la firma"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          borderRadius: '10px',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '10px',
                        }}
                      ></div>
                    )}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                      }}
                    >
                      <PDFButton
                        icon={<RiArrowLeftRightLine height={20} width={20} />}
                        onClick={() => {
                          setReverseImage(!reverseImage);
                        }}
                        info={'Invertir'}
                        isDisabled={false}
                      />
                    </div>
                  </div>

                  {/* Opciones de Firma */}
                  <div className="sign-container">
                    <div className="section1">
                      <CustomToggle
                        formKey="imageSignature"
                        form={formik}
                        isRequired={false}
                        label="Firma con imagen"
                        key={'imageSignature'}
                        onChange={(checked: boolean) => {
                          formik.setFieldValue('imageSignature', checked);
                        }}
                        checked={formik.values.imageSignature}
                      />
                      <Spacer y={2} />
                      <div className=" flex-1 flex-col  ">
                        <div className="flex flex-row items-center text-small text-foreground opacity-70">
                          <span>Certificado</span>
                          <span className="text-danger">*</span>
                        </div>
                        <div
                          onClick={() =>
                            document.getElementById('image-upload')?.click()
                          }
                          className="h-[40px] w-full cursor-pointer rounded-lg border-2 border-default px-2 py-1.5"
                        >
                          <p className="text-sm text-gray-600">
                            Selecciona la imagen
                          </p>
                          <VisuallyHiddenInput
                            id="image-upload"
                            type="file"
                            accept=".jpg, .png, .jpeg"
                            onChange={handleChangeInput}
                            multiple={false}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="section2 flex-1">
                      <CustomToggle
                        formKey="textSignature"
                        form={formik}
                        isRequired={false}
                        label="Firma con texto"
                        key={'textSignature'}
                        onChange={(checked: boolean) => {
                          formik.setFieldValue('textSignature', checked);
                        }}
                        checked={formik.values.textSignature}
                      />
                      <Spacer y={2} />
                      <div className="flex flex-row">
                        <CustomTextInput
                          form={formik}
                          formKey={'nameVisual'}
                          label={'Nombre'}
                          placeholder={'Nombre'}
                          isRequired={false}
                          isDisable={!formik.values.textSignature}
                        />
                        <Spacer />
                        <CustomTextInput
                          form={formik}
                          formKey={'surnameVisual'}
                          label={'Apellido'}
                          placeholder={'Apellido'}
                          isRequired={false}
                          isDisable={!formik.values.textSignature}
                        />
                      </div>
                    </div>
                  </div>

                  <Divider />

                  <div className="section3 flex flex-row">
                    <CustomTextInput
                      form={formik}
                      formKey={'reason'}
                      label={'Razón'}
                      placeholder={'Opcional'}
                      isRequired={false}
                    />
                    <CustomTextInput
                      form={formik}
                      formKey={'location'}
                      label={'Ubicación'}
                      placeholder={'Opcional'}
                      isRequired={false}
                    />
                  </div>
                </>
              )}

              {/* Sección de Certificado y Contraseña */}
              {isCollapsed && (
                <div className="flex flex-row gap-2">
                  <div className=" flex-1 flex-col  ">
                    <div className="flex flex-row items-center text-small text-foreground opacity-70">
                      <span>Certificado</span>
                      <span className="text-danger">*</span>
                    </div>
                    <div
                      onClick={() =>
                        document.getElementById('file-upload')?.click()
                      }
                      className="h-[40px] w-full cursor-pointer rounded-lg border-2 border-default px-2 py-1.5"
                    >
                      {formik.values.p12File ? (
                        <p className="text-sm text-gray-600">
                          Certificado obtenido
                        </p>
                      ) : (
                        <p className="text-sm text-gray-600">
                          Selecciona su certificado
                        </p>
                      )}
                      <VisuallyHiddenInput
                        id="file-upload"
                        type="file"
                        accept="application/x-pkcs12"
                        onChange={handleChangeInput}
                        multiple={false}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <CustomTextInput
                      form={formik}
                      formKey={'password'}
                      label={'Contraseña'}
                      type="password"
                      placeholder={'****************'}
                      isRequired={true}
                    />
                  </div>
                </div>
              )}
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={() => setIsCollapsed(!isCollapsed)}
                disabled={!isCertValid}
                style={{
                  opacity: !isCertValid ? 0.5 : 1,
                  cursor: !isCertValid ? 'not-allowed' : 'pointer',
                }}
              >
                {isCollapsed ? 'Mostrar más' : 'Mostrar menos'}
              </Button>

              {isCertValid ? (
                <Button
                  isLoading={formik.isSubmitting}
                  variant="solid"
                  color="primary"
                  disabled={!formik.isValid}
                  onClick={formik.submitForm}
                  type={'button'}
                >
                  Firmar
                </Button>
              ) : (
                <Button
                  isLoading={formik.isSubmitting}
                  variant="solid"
                  color="primary"
                  onClick={() => {
                    if (formik.values.p12File) {
                      const cert = validateCertificateAndGetPrivateKey(
                        formik.values.p12File,
                        formik.values.password,
                      );
                      if (cert) {
                        showToast('Certificado válido', 'success');
                        setIsCertValid(true);
                        formik.setFieldValue('name', cert.name);
                      } else {
                        showToast('Error al validar el certificado', 'error');
                      }
                    }
                  }}
                  type={'button'}
                >
                  Validar
                </Button>
              )}
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CustomSignatureModal;
