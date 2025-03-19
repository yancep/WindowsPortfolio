//Forms
import { useFormik } from 'formik';
import * as Yup from 'yup'; //NextUI components
import {
  Button,
  Divider,
  Modal,
  ModalContent,
  useDisclosure,
} from "@heroui/react"; //UX
import CustomModalHeader from '@/src/components/modals/parts/CustomModalHeader';
import CustomModalBody from '@/src/components/modals/parts/CustomModalBody';
import CustomModalFooter from '@/src/components/modals/parts/CustomModalFooter';
import CustomTextInput from '@/src/components/inputs/basic/CustomTextInput';

import { useUsersStore } from '@/src/features/users/ui/store/useUsersStore';
import { emailValidation } from '@/src/core/common/validations/personValidations';
import { useState } from 'react';
import SearchOrRegisterPerson from '@/src/features/persons/ui/components/SearchOrRegisterPerson';
import { usernameValidation } from '@/src/core/common/validations/userValidations';
import { defaultValidation } from '@/src/core/common/validations/defaultValidations';

export default function AdminRegisterUserModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [personId, setPersonId] = useState<any>();

  const { createUser } = useUsersStore();

  const formik = useFormik({
    initialValues: {
      person: '',
      password: '',
      username: '',
      email: '',
      is_enabled: false,
    },
    validationSchema: Yup.object({
      person: defaultValidation,
      password: defaultValidation,
      username: usernameValidation(),
      email: emailValidation(personId),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => createUser(values),
  });

  return (
    <>
      <Button
        size="sm"
        onPress={onOpen}
        onClick={() => formik.resetForm}
        color="primary"
      >
        + Registrar usuario
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="xl"
        scrollBehavior="inside"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <CustomModalHeader>Registrar usuario</CustomModalHeader>
              <Divider />
              <form onSubmit={formik.handleSubmit}>
                <CustomModalBody>
                  <div>
                    <SearchOrRegisterPerson
                      form={formik}
                      availableRegistration={false}
                      isRequired={true}
                      formKey={'person'}
                      label={'Persona'}
                    />
                    {/* 
                    <span className="flex text-small text-foreground opacity-70">
                      Persona asociada
                      <div className="text-danger">*</div>
                    </span>
                    <Select
                      aria-label="Selecciona un responsable"
                      placeholder="Persona"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        formik.handleChange(e);
                        formik.setFieldValue('person', e.target.value);
                      }}
                      fullWidth
                      variant="bordered"
                      id="person"
                      name="person"
                      size="md"
                      startContent={<SearchIcon />}
                      color={formik.errors.person ? 'danger' : 'primary'}
                      onBlur={formik.handleBlur}
                      errorMessage={
                        formik.touched.person && formik.errors.person
                          ? formik.errors.person
                          : null
                      }
                    >
                      {(data &&
                        data.data.map((person: PersonModel) => {
                          const id = person.id || 'default'; // Proporciona un valor predeterminado en caso de que projectId sea undefined
                          return (
                            <SelectItem
                              key={id}
                              value={`${id}`}
                              textValue={`${person.fullName}`}
                            >
                              {person.fullName}
                            </SelectItem>
                          );
                        })) ||
                        []}
                    </Select>
                  </div>
                  <div> */}
                    <CustomTextInput
                      form={formik}
                      formKey="email"
                      isRequired={true}
                      label="Email"
                      placeholder="Email"
                      type="email"
                    />
                  </div>
                  <div>
                    <CustomTextInput
                      form={formik}
                      formKey="username"
                      isRequired={true}
                      label="Usuario"
                      placeholder="Usuario"
                      type="text"
                    />
                  </div>
                  <div>
                    <CustomTextInput
                      form={formik}
                      formKey="password"
                      isRequired={true}
                      label="Contraseña"
                      placeholder="Contraseña"
                      type="password"
                    />
                  </div>
                </CustomModalBody>
                <Divider />
                <CustomModalFooter>
                  <div className="flex flex-grow justify-end">
                    <Button
                      color="primary"
                      onPress={onClose}
                      type="submit"
                      disabled={!formik.isValid || !formik.touched}
                      isDisabled={!formik.isValid || !formik.touched}
                    >
                      Registrar
                    </Button>
                  </div>
                </CustomModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
