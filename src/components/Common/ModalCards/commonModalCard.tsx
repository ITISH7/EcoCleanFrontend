import { useState, useImperativeHandle, forwardRef } from 'react';
import tick from "@/assets/icons/tick.svg";
import dustbin from "@/assets/icons/delete.svg";

import { Button } from "@/components/ui/button";

export interface ModalRef {
    openModal: () => void;
    closeModal:() => void,
  }

type ModalProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  isDelete?:boolean;
};

const CommonModalCard = forwardRef<ModalRef, ModalProps>(
  ({ title, description, children, isDelete }, ref) => {
    const [modal, setModal] = useState(false);

    useImperativeHandle(ref, () => ({
      openModal: () => setModal(true),
      closeModal:() => setModal(false),
    }));

    const handleCancel = () => {
      setModal(false);
    };

    return (
      <div>
        {modal && (
          <div className="fixed inset-0 w-screen h-screen">
            <div
              onClick={handleCancel}
              className="fixed inset-0 bg-black opacity-60"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 max-w-[400px] min-w-[300px] grid gap-5 shadow-xl rounded-2xl p-10">
              <div>
                <img src={isDelete?dustbin:tick} alt="Right tick" />
              </div>
              <div>
                <h3 className="font-bold">{title}</h3>
                <p>{description}</p>
              </div>
              <div className="flex justify-around">
                <Button
                  className="bg-white text-black border-2 w-[45%] hover:bg-gray-100"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                {children}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default CommonModalCard;
