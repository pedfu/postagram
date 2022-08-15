import { useEffect } from "react";
import * as ROUTES from '../constants/routes';
import { Link } from 'react-router-dom';

export default function NotFound() {
    useEffect(() => {
        document.title = 'Page not found • Postagram'
    }, [])

  return (
    <div className="bg-gray-background">
        <div className="mx-auto max-w-screen-lg p-10">
            <h3 className="text-center font-semibold text-2xl font-apple">Sorry, this page isn't available.</h3>
            <p className="text-center font-apple mt-10">The link you followed may be broken, or the page may have been removed.{` `}
                <Link to={ROUTES.DASHBOARD} className='text-blue-medium'>Go back to Postagram.</Link>
            </p>
        </div>
    </div>
  )
}