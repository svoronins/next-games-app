type ModalType = "success" | "primary" | "danger";
const colorClasses: Record<ModalType, string> = {
  success: "bg-green-600 hover:bg-green-700",
  danger: "bg-red-600 hover:bg-red-700",
  primary: "bg-blue-600 hover:bg-blue-700",
};
export function Modal({
  isOpen,
  onClose,
  onConfirm,
  header,
  description,
  type = "primary",
  confirmButtonLabel = "Confirm",
}: {
  type?: ModalType;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  header?: string;
  description?: string;
  confirmButtonLabel?: string;
}) {
  return (
    isOpen && (
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 text-center sm:p-0 sm:mt-20">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    {header && (
                      <h3
                        className="text-base font-semibold text-gray-900"
                        id="modal-title"
                      >
                        {header}
                      </h3>
                    )}
                    {description && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto ${colorClasses[type]}`}
                  onClick={onConfirm}
                >
                  {confirmButtonLabel}
                </button>

                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
