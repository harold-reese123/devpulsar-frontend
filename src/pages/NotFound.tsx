import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">404</h1>
      <p className="mt-2 text-gray-600">Page not found.</p>
      <Link to="/" className="mt-4 inline-block text-stellar underline">
        Back to Dashboard
      </Link>
    </div>
  )
}

export default NotFound
