import { Check } from 'lucide-react'

type EnableModalBTNProps = {
  onClick: () => void
}

export default function EnableModalBTN({ onClick: handleClick }: EnableModalBTNProps) {
  return (
    <button onClick={handleClick} type='button'>
      <Check size={20} className="text-gray-500 cursor-pointer" />
    </button>
  )
}
