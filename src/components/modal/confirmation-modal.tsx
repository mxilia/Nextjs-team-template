interface ConfirmationModalProps {
  onCancel: () => void
  onConfirm: () => void
  title: string
  description?: string
}

export const ConfirmationModal = ({
  onCancel,
  onConfirm,
  title,
  description,
}: ConfirmationModalProps) => {
  return (
    <div className="w-70 h-fit rounded-xl flex flex-col justify-between items-center gap-2 bg-neutral-900 p-3">
      <div>
        <div className="text-lg text-white mt-2 w-full text-center font-semibold mb-2">{title}</div>
        <div className="text-sm text-neutral-200 text-center">{description}</div>
      </div>
      <div className="flex w-full justify-center gap-2 mt-6">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 w-full text-center justify-center rounded-xl text-neutral-100 border border-neutral-100 bg-none duration-200 hover:bg-red-800/30 hover:text-red-100 hover:border-red-400 p-1.5 px-2.5"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex items-center gap-2 w-full justify-center rounded-xl text-neutral-900 bg-blue-400 duration-200 hover:bg-blue-800/30 hover:text-blue-100 hover:border-blue-400 border p-1.5 px-2.5"
        >
          Confirm
        </button>
      </div>
    </div>
  )
}
