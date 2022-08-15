import { Link } from 'react-router-dom';

export default function DropdownMenu({ dropdown, displayName }) {
    // the dif between outline and solid is fill/stroke='currentColor'

    return dropdown && (
        <div className="relative drop-shadow-md">
            <ul className=' absolute w-full z-40 bg-white rounded-md'>
                <li className="cursor-pointer flex row flex-nowrap items-center justify-start hover:bg-gray-primary rounded-t-md px-3 py-1">
                    <Link to={`/p/${displayName}`} className="flex items-center p-1 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 border rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className='ml-2'>Profile</p>                        
                    </Link>
                </li>
                <li className="cursor-pointer flex row flex-nowrap items-center justify-start hover:bg-gray-primary px-3 py-1">
                    <Link to="/settings" className="flex items-center p-1 pl-0.5 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className='ml-2'>Settings</p>   
                    </Link>                
                </li>
                <li className="cursor-pointer flex row flex-nowrap items-center justify-start border-t border-gray-footer hover:bg-gray-primary rounded-b-md px-3 py-1">
                    <Link to="/" className="flex items-center p-1 w-full">  
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <p className='ml-2'>Sign out</p> 
                    </Link>                     
                </li>
            </ul>
            <div className="absolute drop-shadow-md bg-white z-10 right-7 top-minus-px w-4 h-4 rotate-45"></div>
        </div>
    )
    
}