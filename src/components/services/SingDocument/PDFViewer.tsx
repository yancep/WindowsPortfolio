'use client';

import React, { useEffect, useRef, useState } from 'react';
import { VscSaveAs } from 'react-icons/vsc';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';
import { PiSignature } from 'react-icons/pi';
import { TbSignatureOff } from 'react-icons/tb';
import { LuCheckCheck } from 'react-icons/lu';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Button, Input, Spacer, Tooltip } from "@heroui/react";
import * as pdfjs from 'pdfjs-dist';
import * as fabric from 'fabric';
import CustomSignatureModal from '@/src/components/services/SingDocument/CustomSignatureModal';
import { verifyPDFSignatures } from '@/src/core/services/documents/SignDocumentsService';
import { showToast } from '@/src/components/toast/Toast';
import DownloadIcon from '@/src/components/Icons/extra/DownloadIcon';
import SpecifyDocumentSignatureInViewer from './SpecifyDocumentSignatureInViewer';
import { AnnexeDocument } from '@/src/features/shared/files/domain/entities/AnnexeDocument';

/**
 * @descripcion: Componente para visualizar un pdf. Permite la firma digital, guardarlo o descargar el documento
 * @property {pdf} : Uint8Array del pdf a renderizar new Uint8Array(arrayBuffer)
 * @property {handleBack} : callback para volver atrás
 * @property {handleSaveDocument} : callback para guardar el documento
 * @property {selectedDocument} : documento seleccionado
 */

interface PdfViewerProps {
  pdf: Uint8Array;
  handleBack: () => void;
  handleSaveDocument: (file: any, signedBy: Array<string>) => Promise<boolean>;
  selectedDocument: AnnexeDocument;
}

const PdfViewer: React.FC<PdfViewerProps> = ({
  pdf,
  handleBack,
  selectedDocument,
  handleSaveDocument,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageInputValue, setPageInputValue] = useState(currentPage.toString());
  const [pageCount, setPageCount] = useState<number>(0);

  const [pdfBuffer, setPdfBuffer] = useState<Buffer>(Buffer.from(pdf));
  const [pdfDoc, setPdfDoc] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [pdfUint8Array, setPdfFile] = useState<Uint8Array | null>(pdf);

  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [rectInfo, setRectInfo] = useState<[number, number, number, number]>([
    0, 0, 0, 0,
  ]);
  const renderTaskRef = useRef<pdfjs.RenderTask | null>(null);

  const [isRegionSelectEnabled, setIsRegionSelectEnabled] =
    useState<boolean>(false);

  const [ready, setReady] = useState<boolean>(false);

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';
  }, []);

  async function renderPage() {
    try {
      const canvas = fabricCanvasRef.current;
      if (pdfDoc && canvas) {
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
          renderTaskRef.current = null;
        }

        canvas.clear();

        const page: pdfjs.PDFPageProxy = await pdfDoc.getPage(currentPage);
        const viewport = page.getViewport({ scale: 1 });

        canvas.setDimensions({
          width: viewport.width,
          height: viewport.height,
        });

        const pdfContainer = document.querySelector(
          '.pdf-container',
        ) as HTMLElement;
        if (pdfContainer) {
          pdfContainer.style.width = `${viewport.width}px`;
          pdfContainer.style.height = `${viewport.height}px`;
        }

        const canvasElement = canvas.getElement();
        const canvasContext = canvasElement.getContext(
          '2d',
        ) as CanvasRenderingContext2D;

        renderTaskRef.current = page.render({
          canvasContext: canvasContext,
          viewport: viewport,
        });

        await renderTaskRef.current.promise;
        const dataURL = canvas.toDataURL();

        fabric.FabricImage.fromURL(dataURL, {}, (img: fabric.FabricImage) => {
          canvas.backgroundImage = img;
          canvas.renderAll();
        });

        if (!ready) setReady(true);
      }
    } catch (error) {
      //console.error(error);
    }
  }

  useEffect(() => {
    renderPage();
    setPageInputValue(currentPage.toString());
  }, [currentPage, pdfDoc]);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const fileCopy = pdf.slice(0);
        setPdfFile(new Uint8Array(fileCopy));
        const file: pdfjs.PDFDocumentProxy = await pdfjs.getDocument({
          data: fileCopy,
        }).promise;
        setPageCount(file.numPages);
        setPdfDoc(file);

        if (!fabricCanvasRef.current) {
          const canvas = new fabric.Canvas('pdfCanvas', {
            width: 800,
            height: 800,
          });
          fabricCanvasRef.current = canvas;
        } else {
          fabricCanvasRef.current.clear();
        }

        setReady(true);
      } catch (error) {
        console.error(error);
      }
    };

    loadPdf();

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (canvas && isRegionSelectEnabled) {
      canvas.on('mouse:down', handleMouseDown);
    }
    return () => {
      if (canvas) {
        canvas.off('mouse:down', handleMouseDown);
      }
    };
  }, [isRegionSelectEnabled]);

  function handleMouseDown(e: fabric.TPointerEventInfo) {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const startPoint = canvas.getViewportPoint(e.e);
      const handleMouseUp = (event: fabric.TPointerEventInfo) => {
        const endPoint = canvas.getViewportPoint(event.e);
        const regionWidth = Math.abs(endPoint.x - startPoint.x);
        const regionHeight = Math.abs(endPoint.y - startPoint.y);
        const left = Math.min(startPoint.x, endPoint.x);
        const top = Math.min(startPoint.y, endPoint.y);
        canvas.off('mouse:up', handleMouseUp);
        setRectInfo([left, top, left + regionWidth, top + regionHeight]);
        setIsOpenModal(true);
      };
      canvas.on('mouse:up', handleMouseUp);
    }
  }

  const onChangePage = async (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (
      direction === 'next' &&
      pdfDoc &&
      currentPage < pdfDoc.numPages
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPageInputValue(value);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newPage = parseInt(pageInputValue, 10);
      if (!isNaN(newPage) && newPage >= 1 && newPage <= pageCount) {
        setCurrentPage(newPage);
      } else {
        setCurrentPage(1);
      }
      setIsFocused(false);
    }
  };

  const handleSignDocument = async (data: any) => {
    setPdfFile(data);
    try {
      const pdf: pdfjs.PDFDocumentProxy = await pdfjs.getDocument({
        data: new Uint8Array(data),
      }).promise;
      setPdfBuffer(Buffer.from(data));
      setPdfDoc(pdf);
      setCurrentPage(currentPage);
    } catch (error) {
      console.error(error);
    }
  };

  const downloadPDF = () => {
    if (pdfUint8Array) {
      const file = new File(
        [pdfUint8Array],
        `${selectedDocument.meta.fileName}`,
        {
          type: 'application/pdf',
        },
      );
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const SaveButton: React.FC = () => (
    <PDFButton
      icon={<VscSaveAs height={20} width={20} />}
      onClick={() => setIsOpen(true)}
      info={'Guardar'}
    />
  );

  const VerifySignButton: React.FC = () => (
    <PDFButton
      icon={<LuCheckCheck height={20} width={20} />}
      onClick={async () => {
        if (pdfUint8Array) {
          try {
            const result = await verifyPDFSignatures(pdfUint8Array);
            const type = result.success ? 'success' : 'error';
            showToast(result.message, type);
          } catch (error: any) {
            showToast(error.message || 'Error desconocido', 'error');
          }
        }
      }}
      info={'Comprobar firmas'}
    />
  );

  const DirectionalButtons: React.FC = () => (
    <div className={'flex w-full flex-row'}>
      <PDFButton
        icon={<MdOutlineNavigateBefore height={20} width={20} />}
        onClick={() => onChangePage('prev')}
        info={'Anterior'}
        isDisabled={currentPage === 1}
      />
      <Spacer />
      <Input
        className={
          'w-[2.2cm] border-gray-300 hover:border-gray-300 focus:border-gray-300 focus:outline-none focus:ring-0'
        }
        id="pageInput"
        size="sm"
        radius="full"
        type="text"
        endContent={<span className="text-sm">/{pageCount}</span>}
        value={isFocused ? pageInputValue : currentPage.toString()}
        onClick={() => setIsFocused(true)}
        autoFocus={isFocused}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onBlur={() => {
          const newPage = parseInt(pageInputValue, 10);
          if (!isNaN(newPage) && newPage >= 1 && newPage <= pageCount) {
            setCurrentPage(newPage);
          }
          setIsFocused(false);
        }}
      />

      <Spacer />
      <PDFButton
        icon={<MdOutlineNavigateNext height={20} width={20} />}
        onClick={() => onChangePage('next')}
        info={'Siguiente'}
        isDisabled={pdfDoc ? currentPage === pdfDoc.numPages : true}
      />
    </div>
  );

  return (
    <div
      className="flex flex-col items-center overflow-y-auto p-4"
      style={{ display: pdfDoc ? 'flex' : 'none' }}
    >
      <div className={'flex w-full flex-row justify-between'}>
        <div>
          <PDFButton
            icon={<FaArrowLeftLong />}
            onClick={handleBack}
            info={'Ir atrás'}
          />
        </div>
        <div className={'flex flex-row gap-2'}>
          <DirectionalButtons />
          {/*<SaveButton />*/}
          <PDFButton
            icon={<DownloadIcon />}
            onClick={downloadPDF}
            info={'Descargar'}
          />
          {/*<VerifySignButton />*/}
          {/*<PDFButton*/}
          {/*  icon={*/}
          {/*    isRegionSelectEnabled ? (*/}
          {/*      <PiSignature height={20} width={20} />*/}
          {/*    ) : (*/}
          {/*      <TbSignatureOff height={20} width={20} />*/}
          {/*    )*/}
          {/*  }*/}
          {/*  onClick={() => setIsRegionSelectEnabled(!isRegionSelectEnabled)}*/}
          {/*  info={*/}
          {/*    !isRegionSelectEnabled*/}
          {/*      ? 'Activar firma digital'*/}
          {/*      : 'Desactivar firma digital'*/}
          {/*  }*/}
          {/*/>*/}
        </div>
        <div></div>
      </div>
      <section
        className="main-section"
        style={{ display: ready ? 'flex' : 'none' }}
      >
        <div className="pdf-container">
          <canvas id="pdfCanvas"></canvas>
        </div>
      </section>
      {pdfUint8Array && (
        <SpecifyDocumentSignatureInViewer
          isOpen={isOpen}
          handleClose={() => setIsOpen(false)}
          document={selectedDocument}
          handleSave={async (signedBy) => {
            return handleSaveDocument(
              new File([pdfUint8Array!], `${selectedDocument.meta.fileName}`, {
                type: 'application/pdf',
              }),
              signedBy,
            );
          }}
        />
      )}
      {pdfUint8Array && (
        <CustomSignatureModal
          handleSignDocument={async (data: any) => {
            await handleSignDocument(data);
            setIsRegionSelectEnabled(false);
          }}
          onCloseModal={() => {
            setIsOpenModal(false);
            setIsRegionSelectEnabled(false);
          }}
          isOpenModal={isOpenModal}
          rectInfo={rectInfo}
          pdf={pdfBuffer}
          page={currentPage}
        />
      )}
    </div>
  );
};

export default PdfViewer;

interface PDFButtonProps {
  info: string;
  onClick: () => void;
  icon: React.ReactNode;
  isDisabled?: boolean;
}

export const PDFButton: React.FC<PDFButtonProps> = ({
  info,
  onClick,
  icon,
  isDisabled = false,
}) => {
  return (
    <Tooltip content={info}>
      <Button
        isDisabled={isDisabled}
        size="sm"
        isIconOnly
        startContent={icon}
        onClick={onClick}
        radius="full"
      />
    </Tooltip>
  );
};
