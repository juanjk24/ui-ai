import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-1 min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="mt-4 text-2xl">Página no encontrada</h2>
      <p className="mt-2 text-muted-foreground">
        Lo sentimos, la página que buscas no existe.
      </p>
      <Link 
        href="/"
        className="mt-6 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
      >
        Volver al inicio
      </Link>
    </div>
  )
}