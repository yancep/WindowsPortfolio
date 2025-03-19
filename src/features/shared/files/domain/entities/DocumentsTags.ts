export interface DocumentsTags {
  entity?: string;
  project?: string;
  program?: string;
  date?: string;
  type?: DocumentType;
  num?: string;
  sub_type?: DocumentSubType;
}

type DocumentType = {
  ANEXO: 'Anexo';
  NJP: 'Nombramiento del jefe de Projecto';
  CYS: 'Contratos y Suplementos';
  CEP: 'Contratos a Entdades Participantes';
  CPE: 'Contratos a Participantes Externos';
  CDS: 'Certificos de salarios';
  RCEEP: 'Reportes Contables del Área Económica de la EEP';
  EDE: 'Evidencia de Ejecución';
};

type DocumentSubType = {
  T4: 'Tabla 4. Certificación para el pago de la Remuneración al Jefe de Proyecto';
  T8: 'Tabla 8. Certificación para el pago de la Remuneración a Participantes de Proyectos';
  T9: 'Tabla 9. Certificación para el pago de la Remuneración por Aporte al Conocimiento';
  AC: 'Aporte al Conocimiento';
};
