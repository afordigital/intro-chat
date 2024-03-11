import * as RadixModal from "@radix-ui/react-dialog";
import { useState } from "react";

const Modal = ({
  isOpen,
  onClose,
  children,
  overlay = (
    <RadixModal.Overlay className="h-full w-full top-0 left-0 fixed bg-gray-700 opacity-50" />
  ),
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  overlay?: React.ReactNode;
}) => (
  <RadixModal.Root open={isOpen}>
    <RadixModal.Portal>
      {overlay}
      <div className="fixed w-full h-full top-0 left-0 grid place-items-center">
        <RadixModal.Content
          className="absolute z-10 p-4 min-w-20 min-h-20 bg-white"
          onInteractOutside={onClose}
        >
          {children}
        </RadixModal.Content>
      </div>
    </RadixModal.Portal>
  </RadixModal.Root>
);
const ModalClose = () => null;
const ModalHeader = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
const ModalContent = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
const ModalFooter = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

// namespaced components
const RootModal = Object.assign(Modal, {
  Close: ModalClose,
  Header: ModalHeader,
  Content: ModalContent,
  Footer: ModalFooter,
});

export { RootModal as Modal };
