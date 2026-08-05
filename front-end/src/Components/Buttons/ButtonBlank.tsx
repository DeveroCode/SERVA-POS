type ButtonBlankProps = {
    type: "submit" | "reset" | "button"
    text: string;
    className?: string
}
export default function ButtonBlank({type, text, className}: ButtonBlankProps) {
  return (
    <button className={`py-2 px-4 ${className} rounded-xl font-semibold shadow text-md cursor-pointer`} type={type}>
      {text}
    </button>
  )
}
