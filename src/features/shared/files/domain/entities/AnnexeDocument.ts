export interface AnnexeDocument {
  url : string,
  document : string,
  documentShortTitle : string,
  documentTitle : string
  file? : string,
  meta : AnnexeDocumentMeta
}


export interface AnnexeDocumentMeta {
  actions : Array<AnnexeDocumentAction>,
  canBeUpdated : boolean,
  completelySigned : boolean,
  fileName? : string,
  generable : boolean,
  isOutdated : boolean,
  signatures : Array<SignatureParameters>,
  updatedBy : string
}

export interface AnnexeDocumentAction {
  action : DOCUMENT_ACTION
  ref : string
}

export interface SignatureParameters {
  person? : string;
  user? : string;
  signerName? : string;
  signerPosition : string;
  action : SIGNATURE_ACTION;
  signed : boolean;
  signedBy? : string,
}

type SIGNATURE_ACTION = 'certifies' | 'approves';
type DOCUMENT_ACTION = 'generate'

