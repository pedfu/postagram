import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import FirebaseContext from '../../context/firebase';
import useUser from "../../hooks/use-user";
import { filteredSearch } from "../../services/firebase";
import DropdownMenu from "./dropdown";
import SearchDropdownMenu from "./search-dropdown";

export default function Header ({ setPostPopup , postPopup }) {
    const [ dropdown, setDropdown ] = useState(false);
    const [ searchDropdown, setSearchDropdown ] = useState(false);
    const [ profilePicture, setProfilePicture ] = useState(null);
    const [ users, setUsers ] = useState([]);
    const [ page, setPage ] = useState();
    const [ searchInput, setSearchInput ] = useState('');
    const { firebase } = useContext(FirebaseContext); 
    const { user } = useUser();
    const navigate = useNavigate();
    const dropdownRef = useRef();

    const handleProfilePicture = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2) {
                setProfilePicture(reader.result); 
                imageSrc = reader.result;
            }
        }
        reader.readAsDataURL(e.target.files[0]);
      }

    const handleSearchInput = async (e) => {
        setSearchInput(e.target.value);

        if(searchInput) {
            const userList = await filteredSearch(searchInput);
            if(userList) {
                setUsers(userList);
            }
        }
    }    

    useEffect(() => {
        setProfilePicture(user.imageSrc);
    }, [user, user.imageSrc])

    useEffect(() => {
        setPage(window.location.pathname);
        const closeDropdown = (e) => {
            if((e.path[0].nodeName === 'IMG')) {
                if(!(e.path[0].alt.includes('profile'))) {
                    setDropdown(false);
                }
            } else {
                setDropdown(false);
            }
            if((e.path[0].nodeName !== 'INPUT')) {
                setSearchDropdown(false);
            }
        }
        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown);
    }, [])

    return (
        <header className="h-16 bg-white border-b border-gray-primary mb-8">
            <div className="container mx-auto max-w-screen-lg h-full">
                <div className="flex justify-between h-full lg:mx-24 md:mx-10 sm:mx-8">
                    <div className="text-gray-700 text-center flex items-center  cursor-pointer">
                        <h1 className="flex justify-center">
                            <Link to={ROUTES.DASHBOARD} aria-label="Instagram Logo">
                                <img src="/images/logo (2).png" alt="Postagram" className="mt-2 w-28"/>
                            </Link>
                        </h1>
                    </div>
                    <div className="flex items-center">
                        <div className="bg-gray-primary rounded-lg flex items-center pl-4 py-3 h-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                            <div className="bg-gray-primary ml-2 w-56 relative">
                                <input 
                                    type='text'
                                    name='searchbar'
                                    placeholder="Search"
                                    className="bg-gray-primary font-thin focus:outline-none border-none w-full pr-2"
                                    value={searchInput}
                                    onChange={handleSearchInput}
                                    autoComplete='off'
                                    onClick={() => setSearchDropdown(true)}
                                />
                                <div className="absolute z-40 top-10 right-minus-35-px select-none bg-white transition-all rounded-lg drop-shadow-md">
                                        <SearchDropdownMenu dropdown={searchDropdown}
                                            users={users}
                                        />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-gray-700 text-center flex items-center  cursor-pointer">
                        { user ? (
                            <>
                                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">   
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-8 w-8 mr-6" 
                                        viewBox={`${page === '/' ? '0 0 20 20' : '0 0 24 24'}`}
                                        stroke={`${page === '/' ? 'none' : 'currentColor'}`}
                                        fill={`${page === '/' ? 'currentColor' : 'none'}`}
                                        strokeWidth="1.5"
                                    >
                                        {page !== '/' ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        ) : (
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                        )}                                       
                                    </svg>
                                </Link>

                                <button onClick={() => setPostPopup(!postPopup)}>
                                    <div className="border-2 rounded-lg mr-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    title="Sign Out"
                                    onClick={() => {
                                        firebase.auth().signOut();
                                        navigate(ROUTES.LOGIN);
                                    }}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            firebase.auth().signOut();
                                            navigate(ROUTES.LOGIN);
                                        }
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </button>
                                <div ref={dropdownRef} className="relative">
                                    <div className={`rounded-full p-0.5 ${dropdown ? 'border border-gray-light' : ''}`}>
                                        <img                                   
                                            className={`rounded-full h-6 w-6 flex object-cover`} 
                                            src={profilePicture} 
                                            alt={`${user.username} profile`} 
                                            onClick={() => setDropdown(!dropdown)}
                                        />      
                                    </div>
                                    <div className="absolute z-40 top-10 right-minus-35-px min-w-230-px select-none bg-white transition-all rounded-lg drop-shadow-md">
                                        <DropdownMenu dropdown={dropdown} displayName={user.username}/>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to={ROUTES.LOGIN}>
                                    <button type="button" className="bg-blue-medium rounded font-bold text-sm text-white w-20 h-8">
                                        Log In
                                    </button>                                    
                                </Link>
                                <Link to={ROUTES.SIGN_UP}>
                                    <button type="button" className="rounded font-bold text-sm text-blue-medium w-20 h-8">
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}