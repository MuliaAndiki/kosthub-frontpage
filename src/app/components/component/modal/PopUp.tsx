import { popUP } from "../../type/components";

const PopUp: React.FC<popUP> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[rgba(67,67,67,0.5)] z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-md shadow-md w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default PopUp;
