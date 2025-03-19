export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/autenticar',
  REGISTER: '/registrar',
  RESET_PASSWORD: '/restablecer-contrasena',
  RESET_PASSWORD_CONFIRM: `/recuperar-contraseña/confirmar`,
  ADMIN: '/administracion',
  PROJECT_SHEET: '/ficha-de-proyecto',
  CLIENT: '/gestion',
};

export const APP_ADMIN_ROUTES = {
  DASHBOARD: '/administracion/tablero',
  PROGRAMS: '/administracion/programas',
  MANAGEMENT_ENTITIES: '/administracion/entidades-gestoras',
  USERS: '/administracion/usuarios',
  ENTITIES: '/administracion/entidades',
  INVITATIONS: '/administracion/invitaciones',
  TRACE: '/administracion/trazas',
  SECURITY: '/administracion/seguridad',
  CONFIG: '/administracion/invitaciones',
};

export const APP_CLIENT_ROUTES = {
  PROGRAM: `/gestion/programa`,
  PROJECT: `/gestion/proyecto`,
  MANAGEMENT_ENTITY: `/gestion/entidad`,
};

export const APP_CLIENT_PROGRAM_ROUTES = {
  ENTITIES: (id: string) => `${APP_CLIENT_ROUTES.PROGRAM}/${id}/entidades`,
  DUINE: (id: string) => `${APP_CLIENT_ROUTES.PROGRAM}/${id}/entidades-duine`,
  INFO: (id: string) =>
    `${APP_CLIENT_ROUTES.PROGRAM}/${id}/informacion-general`,
  EXPERTS: (id: string) => `${APP_CLIENT_ROUTES.PROGRAM}/${id}/expertos`,
  MANAGEMENT_MEMBERS: (id: string) =>
    `${APP_CLIENT_ROUTES.PROGRAM}/${id}/equipo-directivo`,
  PARTICIPANTS: (id: string) =>
    `${APP_CLIENT_ROUTES.PROGRAM}/${id}/participantes`,
  PROJECTS: (id: string) => `${APP_CLIENT_ROUTES.PROGRAM}/${id}/proyectos`,
  EVALUATIONS: (id: string) =>
    `${APP_CLIENT_ROUTES.PROGRAM}/${id}/evaluaciones`,
  EVALUATION_PERIOD: (id: string, certificationId: string) =>
    `${APP_CLIENT_ROUTES.PROGRAM}/${id}/evaluaciones/${certificationId}/evaluar-equipo`,
  PROJECT_CERTIFICATION: (id: string) =>
    `${APP_CLIENT_ROUTES.PROGRAM}/${id}/certificacion/configuracion-proyecto`,
  CONFIG: (id: string) => `${APP_CLIENT_ROUTES.PROGRAM}/${id}/configuracion`,
  CONVOCATIONS: (id: string) =>
    `${APP_CLIENT_ROUTES.PROGRAM}/${id}/convocatorias`,
  PROJECTS_WALLET: (id: string) =>
    `${APP_CLIENT_ROUTES.PROGRAM}/${id}/cartera-de-proyecto`,
  PDF_VIEWER: (id: string, documentId: string) =>
    `${APP_CLIENT_ROUTES.PROGRAM}/${id}/visualizar-documento/${documentId}`,
};

export const APP_CLIENT_PROJECT_ROUTES = {
  ENTITIES: (id: string) => `${APP_CLIENT_ROUTES.PROJECT}/${id}/entidades`,
  DUINE: (id: string) => `${APP_CLIENT_ROUTES.PROJECT}/${id}/entidades-duine`,
  PARTICIPANTS: (id: string) =>
    `${APP_CLIENT_ROUTES.PROJECT}/${id}/participantes`,
  PLANNING: (id: string) => `${APP_CLIENT_ROUTES.PROJECT}/${id}/planificacion`,
  ACTIVITIES: (id: string) =>
    `${APP_CLIENT_ROUTES.PROJECT}/${id}/planificacion/actividades`,
  OBJETIVES: (id: string) =>
    `${APP_CLIENT_ROUTES.PROJECT}/${id}/planificacion/objetivos`,
  RESULTS: (id: string) =>
    `${APP_CLIENT_ROUTES.PROJECT}/${id}/planificacion/resultados`,
  CERTIFICATIONS: (id: string) =>
    `${APP_CLIENT_ROUTES.PROJECT}/${id}/certificaciones`,
  CERTIFICATION_EVALUATION_MEMBERS: (id: string) =>
    `${APP_CLIENT_ROUTES.PROJECT}/${id}/certificaciones/evaluacion`,
  CERTIFICATION_PERIOD: (id: string, certifiactionId: string) =>
    `${APP_CLIENT_ROUTES.PROJECT}/${id}/certificaciones/${certifiactionId}/periodo-certificacion`,
  CONFIG: (id: string) => `${APP_CLIENT_ROUTES.PROJECT}/${id}/configuracion`,
  ECONOMY: (id: string) => `${APP_CLIENT_ROUTES.PROJECT}/${id}/economía`,
  INFO: (id: string) =>
    `${APP_CLIENT_ROUTES.PROJECT}/${id}/informacion-general`,
  KNOWLEDGE_CONTRIBUTIONS: (id: string) =>
    `${APP_CLIENT_ROUTES.PROJECT}/${id}/aportes-al-conocimiento`,
};

export const APP_CLIENT_MANAGEMENT_ENTITY_ROUTES = {
  INFO: (id: string) =>
    `${APP_CLIENT_ROUTES.MANAGEMENT_ENTITY}/${id}/informacion-general`,
  MANAGEMENT_MEMBERS: (id: string) =>
    `${APP_CLIENT_ROUTES.MANAGEMENT_ENTITY}/${id}/equipo-directivo`,
  PARTICIPANTS: (id: string) =>
    `${APP_CLIENT_ROUTES.MANAGEMENT_ENTITY}/${id}/personas`,
  PROJECTS: (id: string) =>
    `${APP_CLIENT_ROUTES.MANAGEMENT_ENTITY}/${id}/proyectos`,
  DEPENDENCIES: (id: string) =>
    `${APP_CLIENT_ROUTES.MANAGEMENT_ENTITY}/${id}/areas`,
  PROGRAMS: (id: string) =>
    `${APP_CLIENT_ROUTES.MANAGEMENT_ENTITY}/${id}/programas`,
  CONFIG: (id: string) =>
    `${APP_CLIENT_ROUTES.MANAGEMENT_ENTITY}/${id}/configuracion`,
};
