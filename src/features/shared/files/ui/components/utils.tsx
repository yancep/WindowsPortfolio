/* eslint-disable @next/next/no-img-element */

// Mapeo de tipos de archivo a rutas de íconos SVG

const fileIcons: Record<string, string> = {
  'application/pdf': '/svgs/files/pdf.svg',
  'image/jpeg': '/svgs/files/image.svg',
  'image/png': '/svgs/files/image.svg',
  'application/msword': '/svgs/files/word.svg',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    '/svgs/files/word.svg',
  'application/vnd.ms-excel': '/svgs/files/excel.svg',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    '/svgs/files/excel.svg',
  'audio/mpeg': '/svgs/files/audio.svg',
  'audio/wav': '/svgs/files/audio.svg',
  'video/mp4': '/svgs/files/video.svg',
  'video/x-msvideo': '/svgs/files/video.svg',
};

/**
 * @description Renderiza un icono según el tipo de archivo
 */
export const FileIconRenderer = ({
  ext,
  name,
}: {
  ext: string;
  name: string;
}) => {
  const getIconByFileType = (fileType: string) => {
    return fileIcons[fileType] || '/svgs/files/default.svg'; // Devuelve un ícono genérico si no se encuentra el tipo
  };
  const iconSrc = getIconByFileType(ext);

  return <img src={iconSrc} alt={name} className="h-14 w-14" />;
};
