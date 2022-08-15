import { Link } from 'react-router-dom';

export default function SearchDropdownMenu({ dropdown, users }) {
    // the dif between outline and solid is fill/stroke='currentColor'

    return dropdown && (
        <div className="relative flex-col items-center justify-center w-362-px h-375-px">
            <ul className='flex-col relative z-40 bg-white rounded-md'>
                {users.length > 0 ? (
                    users.map(user => (
                        <li className='flex items-center px-4 py-2 cursor-pointer hover:bg-gray-modalbg'>
                            <div>
                                <img 
                                    src={`/images/avatars/${user.username}.jpg`} 
                                    alt={`${user.username} profile picture`} 
                                    className="rounded-full h-10 w-10 flex mr-3"
                                    onError={(e) => {e.target.src='/images/avatars/default.png';e.target.onerror='';}}
                                />
                            </div>
                            <div>
                                <p className='font-bold text-sm'>{user.username}</p>
                                <p className='font-thin'>{user.fullName}</p>
                            </div>
                        </li>
                    ))
                ) : <li className='p-4'>Loading...</li>}
            </ul>
            <div className="flex absolute bg-white drop-shadow-md z-0 w-4 h-4 top-minus-px left-1/4 rotate-45"></div>
        </div>
    )
    
}