import { SendIcon } from 'lucide-react'

export const SendMessageTab = () => {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        name="message"
        className="bg-neutral-600 text-white pl-2 placeholder:text-gray-400 border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="flex items-center justify-center">
        <SendIcon />
      </button>
    </div>
  )
}
