import { Shield } from 'lucide-react'

export default function CChangePassword() {
  return (
    <div className="card-profile">
      <section className="flex items-center gap-2">
        <Shield size={24} className="text-orange-600" />
        <span className="title-card-profile">
         ajustes de seguridad
        </span>
      </section>

      <div className='py-10 border-b border-gray-200'>
        <span className="span-card-profile">cambiar contraseña</span>
        <p className="p-card-profile">**********</p>
        <p className="p-card-profile">última actualización hace 3 meses</p>
      </div>

      <button className='text-orange-600 font-bold capitalize py-4 cursor-pointer'>
        cambiar contraseña {">"}
      </button>
    </div>
  )
}
