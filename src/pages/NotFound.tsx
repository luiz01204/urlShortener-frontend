import { Link } from "react-router-dom"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-lg text-gray-300 mb-6">
          Oops! Essa URL expirou ou não existe mais.
        </p>

        <Link
          to="/"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all text-white font-medium py-2 px-4 rounded-lg text-center justify-center mx-auto"
        >
          <Home size={18} />
          Voltar para Home
        </Link>
      </div>
    </div>
  )
}
