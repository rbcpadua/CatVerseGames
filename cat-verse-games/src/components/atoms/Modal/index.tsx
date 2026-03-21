import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  variant?: "info" | "warning" | "error";
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  variant = "info",
}: ModalProps) => {
  if (!isOpen) return null;

  const headerColors = {
    info: "text-info",
    warning: "text-warning",
    error: "text-error",
  };

  return (
    <div className="modal modal-open backdrop-blur-sm">
      <div className="modal-box bg-base-100 border border-base-300 shadow-2xl relative">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          <X size={20} />
        </button>

        <h3 className={`text-lg font-bold mb-4 ${headerColors[variant]}`}>
          {title}
        </h3>

        <div className="py-2 text-base-content">{children}</div>

        <div className="modal-action">
          <button className="btn btn-primary rounded-full" onClick={onClose}>
            Entendido
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};
