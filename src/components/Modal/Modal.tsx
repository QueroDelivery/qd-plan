import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { TfiClose } from 'react-icons/tfi';
import { Button } from 'src/components/ui/button';

type ModalProps = {
  title: string;
  onClose: () => void;
  isOpen: boolean;
  body: React.ReactNode;
  onSubmit: () => void;
  actionLabel: string;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  disabled?: boolean;
};

const Modal = ({
  title,
  onClose,
  isOpen,
  body,
  onSubmit,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
  disabled,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  const handleClose = () => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleSubmit = () => {
    if (disabled) {
      return;
    }

    onSubmit();
  };

  const handleSecondaryAction = () => {
    if (!secondaryAction || disabled) return;

    setShowModal(false);
    setTimeout(() => {
      secondaryAction();
    }, 200);
  };

  useEffect(() => {
    isOpen
      ? document.body.classList.add('overflow-y-hidden')
      : document.body.classList.remove('overflow-y-hidden');
    setShowModal(isOpen);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 bg-neutral-800/70 overflox-x-hidden overflow-y-auto z-[99] flex items-center justify-center">
      <div className="relative w-full md:w-5/6 xl:w-3/5 mt-20 xl:my-6 mx-auto h-5/6">
        <div
          className={`translate duration-200 h-full ${
            showModal ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex flex-col bg-white overflow-hidden rounded-3xl h-full pb-5">
            {/* HEADER */}
            <div className="flex p-5 border-b">
              <p className="text-purple-500 font-bold text-lg">{title}</p>
              <button
                onClick={handleClose}
                className="absolute top-3 right-4 hover:bg-purple-500 hover:bg-opacity-30 rounded-full w-12 h-12 flex justify-center items-center transition-all"
              >
                <TfiClose size={22} />
              </button>
            </div>
            {/* BODY */}
            <div className="overflow-x-hidden overflow-y-auto">
              <div className="p-5 flex flex-col gap-3">
                {body}
                <div className="flex flex-row gap-4 justify-end">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      disabled={disabled}
                      onClick={handleSecondaryAction}
                      variant="outline"
                      size="lg"
                      className="rounded-full border-purple-500 text-purple-500 hover:text-white w-[200px] hover:bg-red-500 hover:border-red-500"
                    >
                      {secondaryActionLabel}
                    </Button>
                  )}
                  <Button
                    disabled={disabled}
                    onClick={handleSubmit}
                    className="bg-purple-500 hover:bg-purple-600 rounded-full w-[200px]"
                    size="lg"
                  >
                    {actionLabel}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('root') as Element
  );
};

export { Modal };
