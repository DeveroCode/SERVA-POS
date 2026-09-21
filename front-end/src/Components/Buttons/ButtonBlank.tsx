type ButtonBlankProps = {
    type: "submit" | "reset" | "button"
    text: string;
    className?: string
    onClick?: () => void
    disabled?: boolean
}
export default function ButtonBlank({type, text, className, onClick, disabled}: ButtonBlankProps) {
  return (
    <button disabled={disabled} onClick={onClick} className={`py-2 px-4 ${className} rounded-xl font-semibold shadow text-md cursor-pointer`} type={type}>
      {text}
    </button>
  )
}
