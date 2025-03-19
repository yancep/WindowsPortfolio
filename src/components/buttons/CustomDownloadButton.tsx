/* eslint-disable no-unused-vars */
import { Button, Tooltip } from "@heroui/react";
import DownloadIcon from '../Icons/extra/DownloadIcon';
import { DocumentProps, pdf } from '@react-pdf/renderer';
import React from 'react';

interface CustomDownloadButtonProps {
  tooltip: string;
  pdfComponent: React.FC<DocumentProps>; // Ensure it'ProgramCertificationConfigView compatible with @react-pdf/renderer
  setPdfView: () => void;
  setDataForPDF: (data: Buffer) => void;
  disabled: boolean;
}

const CustomDownloadButton: React.FC<CustomDownloadButtonProps> = ({
  tooltip,
  pdfComponent: PdfComponent,
  setPdfView,
  setDataForPDF,
  disabled,
}) => {
  const generatePdf = async () => {
    try {
      const element = <PdfComponent />;
      const blob = await pdf(element).toBlob(); // Ensure we pass a ReactElement
      const buffer = await blob.arrayBuffer();
      setDataForPDF(Buffer.from(buffer));
      setPdfView();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Tooltip content={tooltip}>
      <Button
        size="sm"
        radius="full"
        isIconOnly
        startContent={<DownloadIcon />}
        disabled={disabled}
        onClick={generatePdf}
      />
    </Tooltip>
  );
};

export default CustomDownloadButton;
