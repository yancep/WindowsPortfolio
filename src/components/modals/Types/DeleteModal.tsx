import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { SecondaryButton } from '../../buttons/AppButtons/SecondaryButton';

export function DeleteModal({
  isOpenDelete,
  deleteFunction,
  onCloseDelete,
}: {
  isOpenDelete: boolean;
  onCloseDelete: () => void;
  deleteFunction: () => void;
}) {
  return (
    <Modal
      isOpen={isOpenDelete}
      onOpenChange={onCloseDelete}
      isDismissable={false}
      size={'xl'}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        <ModalHeader>Confirmar desvinculación</ModalHeader>
        <ModalBody>¿Está seguro de que desea continuar?</ModalBody>
        <ModalFooter className={'flex flex-row justify-between'}>
          <SecondaryButton onClick={onCloseDelete} title={'Cancelar'} />
          <Button
            color="danger"
            onPress={async () => {
              if (deleteFunction) {
                await deleteFunction();
              }
              onCloseDelete();
            }}
          >
            Sí, confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
