import type React from "react";

export default function ErrorAlert({children}: React.PropsWithChildren) {
  return (
    <p className='text-sm capitalize mt-2 text-orange-600'>{children}</p>
  )
}
