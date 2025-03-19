/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import {
  Checkbox,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
} from "@heroui/react";
import { SecondaryButton } from '@/src/components/buttons/AppButtons/SecondaryButton';
import { CustomAsyncButton } from '@/src/components/buttons/CustomAsyncButton';
import { useState } from 'react';
import { AnnexeDocument } from '@/src/features/shared/files/domain/entities/AnnexeDocument';
import CustomDropzone from '@/src/features/shared/files/ui/components/CustomDropzone';

export default function SpecifyDocumentSignature({
  handleSave,
  document,
  file,
  onClose,
  isOpen,
}: {
  isOpen: boolean;
  onClose: () => void;
  file?: File;
  document: AnnexeDocument;
  handleSave: (file: any, signedBy: Array<string>) => Promise<boolean>;
}) {
  const [selectedMembers, setSelectedMembers] = useState<Array<string>>(
    document.meta.signatures
      .filter((member) => member.signed)
      .map((member) => member.signerPosition!),
  );

  const [selectedAll, setSelectedAll] = useState(
    document.meta.signatures.every((member) => member.signed),
  );

  const [files, setFiles] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const toggleSelectAll = () => {
    if (selectedAll) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(
        document.meta.signatures.map((member) => member.signerPosition!),
      );
    }
    setSelectedAll(!selectedAll);
  };

  const toggleSelectMember = (signerPosition: string) => {
    if (selectedMembers.includes(signerPosition)) {
      setSelectedMembers((prev) =>
        prev.filter((position) => position !== signerPosition),
      );
    } else {
      setSelectedMembers((prev) => [...prev, signerPosition]);
    }
  };

  const upload = async () => {
    let response;
    setLoading(true);

    if (file) {
      response = await handleSave(file, selectedMembers);
    }
    if (files) {
      response = await handleSave(files[0], selectedMembers);
    }

    setLoading(false);

    if (response) {
      closeModal();
    }
  };

  function closeModal() {
    setFiles(undefined);
    setSelectedAll(false);
    setSelectedMembers([]);
    onClose();
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        isDismissable={false}
        size={'lg'}
      >
        <ModalContent>
          <ModalHeader className="pr-10">
            <span className="text-sm">{document.documentTitle}</span>
          </ModalHeader>
          <Divider />
          <ModalBody>
            <CustomDropzone handleSaveFiles={setFiles} multiple={false} />
            <div className="flex w-full flex-col">
              <div className="flex flex-row justify-between px-2">
                <span className="font-semibold">Firmado por:</span>
                <div className="flex flex-row items-center">
                  <span>Todos:</span>
                  <Spacer />
                  <Checkbox
                    isSelected={selectedAll}
                    onChange={toggleSelectAll}
                  />
                </div>
              </div>
              {document.meta.signatures.map((signer, index) => (
                <div className="flex flex-col p-2" key={index}>
                  <div className="flex flex-row justify-between pb-2">
                    <div className="flex flex-col">
                      <span className="text-md">{signer.signerName}</span>
                      <span className="text-sm">{signer.signerPosition}</span>
                    </div>
                    <Checkbox
                      isSelected={selectedMembers.includes(
                        signer.signerPosition!,
                      )}
                      onChange={() =>
                        toggleSelectMember(signer.signerPosition!)
                      }
                    />
                  </div>
                  {index !== document.meta.signatures.length - 1 && <Divider />}
                </div>
              ))}
            </div>
          </ModalBody>
          <Divider />
          <ModalFooter className="flex flex-row justify-between">
            <SecondaryButton onClick={closeModal} title={'Cancelar'} />
            <CustomAsyncButton
              isLoading={loading}
              isDisabled={!files}
              onClick={upload}
              title={'Guardar'}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
