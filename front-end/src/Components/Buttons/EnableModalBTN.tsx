import { Check } from 'lucide-react'
import { useState } from 'react'

export default function EnableModalBTN() {
    const [isEnable, setIsEnable] = useState(false)

    const handleClick = () => {
        setIsEnable(!isEnable)
    }
  return (
    <button onClick={handleClick} type='button'>
      <Check size={20} className="text-gray-500 cursor-pointer" />
    </button>
  )
}
