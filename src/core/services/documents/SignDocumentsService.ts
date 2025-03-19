import {
  AddFieldParameters,
  PdfSigner,
  SignatureParameters,
  SignerSettings,
  SignFieldParameters,
} from 'sign-pdf-lib';

import { PDFDocument as PDFLoader } from 'pdf-lib';

import * as pkijs from 'pkijs';
import * as forge from 'node-forge';
import utf8 from 'utf8';

const trustedCertificates: pkijs.Certificate[] = [];

declare const isRef: any;

declare const PDFDocument: any;

//const caCertificates : forge.pki.Certificate[] = []

export interface SignData {
  pageNumber: number;
  jpgImage?: Buffer;
  p12Certificate: ArrayBuffer;
  certificatePassword: string;
  pdf: Buffer;
  rectInfo: Array<number>;
  nameSign: string;
  signParams?: SignatureParameters;
  text?: any;
}

export async function signDocument(data: SignData) {
  try {
    const credentials = validateCertificateAndGetPrivateKey(
      data.p12Certificate,
      data.certificatePassword,
    );

    const settings: SignerSettings = {
      signatureLength: 8000,
      rangePlaceHolder: 9999989,

      signatureComputer: {
        certificate: forge.pki.certificateToPem(credentials.certificate),
        password: data.certificatePassword,
        key: credentials.key,
      },
    };
    const pdfSigner = new PdfSigner(settings);

    const fieldParameters: AddFieldParameters = {
      pageNumber: data.pageNumber,
      rectangle: {
        left: data.rectInfo[0],
        top: data.rectInfo[1],
        right: data.rectInfo[2],
        bottom: data.rectInfo[3],
      },
      name: data.nameSign,
    };
    data.pdf = await pdfSigner.addFieldAsync(data.pdf, fieldParameters);

    const info: SignFieldParameters = {
      fieldName: data.nameSign,
      visual: {
        ...(data.jpgImage && { background: data.jpgImage }),
      },
    };

    if (data.signParams) info.signature = data.signParams;

    return {
      signedPdf: await pdfSigner.signFieldAsync(data.pdf, info),
    };
  } catch (error) {
    console.error('Error: ', error);
    return { error };
  }
}

export async function checkPdfSignatures(pdfBuffer: ArrayBuffer) {
  try {
    const pdfDoc = await PDFLoader.load(pdfBuffer);
    const form = pdfDoc.getForm();
    const signatureFields = form
      .getFields()
      .filter((field: any) => field.constructor.name === 'PDFSignature');
    const hasSignatures = signatureFields.length > 0;

    return {
      hasSignature: true,
      signatureCount: signatureFields.length,
      message: hasSignatures
        ? `El PDF tiene ${signatureFields.length} firma(s) digital(es).`
        : 'El PDF no tiene firmas digitales.',
      error: false,
    };
  } catch (error) {
    console.error('Error al verificar firmas en el PDF:', error);
    return {
      hasSignatures: false,
      signatureCount: 0,
      message: 'Error al verificar el PDF.',
      error: true,
    };
  }
}

export async function verifyPDFSignatures(view: Uint8Array) {
  try {
    const pdf = new PDFDocument(null, view, null);
    pdf.parseStartXRef();
    pdf.parse();

    const acroForm = pdf.xref.root.get('AcroForm');
    if (typeof acroForm === 'undefined')
      return { success: false, message: 'El documento no contiene firmas' };

    const fields = acroForm.get('Fields');
    if (!isRef(fields[0]))
      return { success: false, message: 'Estructura incorrecta del documento' };

    let allSignaturesValid = true;

    for (const fieldRef of fields) {
      const sigField = pdf.xref.fetch(fieldRef);
      const sigFieldType = sigField.get('FT');

      if (sigFieldType && sigFieldType.name === 'Sig') {
        const v = sigField.get('V');
        const byteRange = v.get('ByteRange');
        const contents = v.get('Contents');

        const contentLength = contents.length;
        const contentBuffer = new ArrayBuffer(contentLength);
        const contentView = new Uint8Array(contentBuffer);

        for (let i = 0; i < contentLength; i++)
          contentView[i] = contents.charCodeAt(i);

        const cmsContentSimp = pkijs.ContentInfo.fromBER(contentBuffer);
        const cmsSignedSimp = new pkijs.SignedData({
          schema: cmsContentSimp.content,
        });

        const signedDataBuffer = new ArrayBuffer(byteRange[1] + byteRange[3]);
        const signedDataView = new Uint8Array(signedDataBuffer);

        let count = 0;
        for (
          let i = byteRange[0];
          i < byteRange[0] + byteRange[1];
          i++, count++
        )
          signedDataView[count] = view[i];

        for (
          let j = byteRange[2];
          j < byteRange[2] + byteRange[3];
          j++, count++
        )
          signedDataView[count] = view[j];

        const verifyResult = await cmsSignedSimp.verify({
          signer: 0,
          data: signedDataBuffer,
          trustedCerts: trustedCertificates,
        });

        if ('signedAttrs' in cmsSignedSimp.signerInfos[0]) {
          const crypto = pkijs.getCrypto(true);
          let shaAlgorithm = '';

          switch (cmsSignedSimp.signerInfos[0].digestAlgorithm.algorithmId) {
            case '1.3.14.3.2.26':
              shaAlgorithm = 'sha-1';
              break;
            case '2.16.840.1.101.3.4.2.1':
              shaAlgorithm = 'sha-256';
              break;
            case '2.16.840.1.101.3.4.2.2':
              shaAlgorithm = 'sha-384';
              break;
            case '2.16.840.1.101.3.4.2.3':
              shaAlgorithm = 'sha-512';
              break;
            default:
              return {
                success: false,
                message: 'Algunas firmas no pasaron la verificación',
              };
          }

          if (!verifyResult) {
            allSignaturesValid = false;
            break;
          }

          const digest = await crypto.digest(
            { name: shaAlgorithm },
            new Uint8Array(signedDataBuffer),
          );

          let messageDigest = new ArrayBuffer(0);
          const signedAttrs = cmsSignedSimp.signerInfos[0].signedAttrs;

          for (
            let j = 0;
            signedAttrs && j < signedAttrs.attributes.length;
            j++
          ) {
            if (signedAttrs.attributes[j].type === '1.2.840.113549.1.9.4') {
              messageDigest =
                signedAttrs.attributes[j].values[0].valueBlock.valueHex;
              break;
            }
          }

          if (messageDigest.byteLength === 0) {
            allSignaturesValid = false;
            break;
          }

          const view1 = new Uint8Array(messageDigest);
          const view2 = new Uint8Array(digest);

          if (
            view1.length !== view2.length ||
            !view1.every((byte, idx) => byte === view2[idx])
          ) {
            allSignaturesValid = false;
            break;
          }
        }
      }
    }

    return allSignaturesValid
      ? { success: true, message: 'Todas las firmas verificadas con éxito' }
      : {
          success: false,
          message: 'Algunas firmas no pasaron la verificación',
        };
  } catch (e) {
    console.error(e);
    return { success: false, message: `Error en la verificación del PDF` };
  }
}

export function validateCertificateAndGetPrivateKey(
  buffer: ArrayBuffer,
  password: string,
): any | null {
  try {
    const p12Der = forge.util.createBuffer(new Uint8Array(buffer));
    const p12Asn1 = forge.asn1.fromDer(p12Der);

    let p12;
    try {
      p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, password);
    } catch (passwordError) {
      console.error('Error: Contraseña inválida para el certificado.');
      return null;
    }

    const certBags = p12.getBags({ bagType: forge.pki.oids.certBag });
    const certBag = certBags[forge.pki.oids.certBag];

    if (!certBag || certBag.length === 0) {
      console.error('Error: No se encontraron certificados en el archivo.');
      return null;
    }

    const cert = certBag[0].cert;

    if (!cert) {
      console.error('Error: Certificado no encontrado.');
      return null;
    }

    if (!cert.publicKey) {
      console.error('Error: Certificado no contiene una clave pública.');
      return null;
    }

    const now = new Date();
    if (!cert.validity.notBefore || !cert.validity.notAfter) {
      console.error(
        'Error: El certificado tiene fechas de validez mal formateadas.',
      );
      return null;
    }

    if (cert.validity.notBefore > now) {
      console.error(
        `Error: El certificado no es válido todavía. Validez futura desde: ${cert.validity.notBefore}`,
      );
      return null;
    }

    if (cert.validity.notAfter < now) {
      console.error(
        `Error: El certificado ha expirado. Expiró el: ${cert.validity.notAfter}`,
      );
      return null;
    }

    /*
    const caStore = forge.pki.createCaStore(caCertificates);
    try {
      forge.pki.verifyCertificateChain(caStore, [cert]);
    } catch (verifyError) {
      console.error('Error: La cadena de confianza no es válida.', verifyError);
      return null;
    }
*/

    const keyBags = p12.getBags({ bagType: forge.pki.oids.keyBag });
    if (keyBags[forge.pki.oids.keyBag]!.length > 0) {
      const key = keyBags[forge.pki.oids.keyBag]![0]!.key;
      if (key) {
        const name = utf8.decode(cert.subject.getField('CN').value);
        return {
          key: forge.pki.privateKeyToPem(key),
          certificate: cert,
          name: name,
        };
      }
    }

    const shroudedKeyBags = p12.getBags({
      bagType: forge.pki.oids.pkcs8ShroudedKeyBag,
    });
    if (shroudedKeyBags[forge.pki.oids.pkcs8ShroudedKeyBag]!.length > 0) {
      const key = shroudedKeyBags[forge.pki.oids.pkcs8ShroudedKeyBag]![0]!.key;
      if (key) {
        const name = utf8.decode(cert.subject.getField('CN').value);
        return {
          key: forge.pki.privateKeyToPem(key),
          certificate: cert,
          name: name,
        };
      }
    }

    console.error('Error: No se encontró una clave privada en el certificado.');
    return null;
  } catch (error) {
    console.error('Error al validar el certificado:', error);
    return null;
  }
}
