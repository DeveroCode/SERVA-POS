import type { ReactNode } from "react"

type LabelFormProps = {
    children: ReactNode;
    section: string
}

export default function LabelForm({children, section}: LabelFormProps) {
  return (
    <label htmlFor={section} className="font-semibold text-gray-700 text-sm capitalize">
      {children}
    </label>
  )
}
