import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

export default function Actions({ docId, totalLikes, likedPhoto, handleFocus, setShowModal }) {
    const { user: { uid: userId }} = useContext(UserContext);
    const { firebase, FieldValue } = useContext(FirebaseContext);

    const [toggleLiked, setToggleLiked] = useState(likedPhoto);
    const [likes, setLikes] = useState(totalLikes);

    const handleToggleLiked = async () => {
        setToggleLiked(!toggleLiked);

        await firebase  
            .firestore()
            .collection('photos')
            .doc(docId)
            .update({
                likes: toggleLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
            })

        setLikes(toggleLiked ? likes - 1 : likes + 1);
    }
    
    return (
        <>
            <div className='flex justify-between p-4'>
                <div className='flex'>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-7 h-7 mr-4 select-none cursor-pointer ${toggleLiked ? 'fill-red-primary text-red-primary' : 'text-black-light hover:text-gray-light'}`} 
                        fill="none" viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth="2"
                        onClick={handleToggleLiked}
                        onKeyDown={(event) => {
                            if(event.key === 'Enter') {
                                handleToggleLiked();
                            }
                        }}
                     >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-7 w-7 mr-4 hover:text-gray-light cursor-pointer select-none text-black-light" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth="2"
                        onClick={()=> setShowModal(true)}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="w-7 h-7 mr-4 text-black-light cursor-pointer select-none hover:text-gray-light" 
                        fill="none" 
                        viewBox="0 0 24 24"
                        stroke="currentColor" 
                        strokeWidth="2"
                        onClick={handleFocus}
                        onKeyDown={(event) => {
                            if(event.key === 'Enter') {
                                handleToggleLiked();
                            }
                        }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </div>
            </div>
            <div className='p-4 py-0'>
                {likes > 0 ? (
                    <p className='font-bold text-sm'>{likes}{likes === 1 ? ' like' : ' likes'}</p>                    
                ) : (
                    <p className='font-semibold text-sm'>Be the first <span className='font-bold cursor-pointer select-none hover:text-gray-light' onClick={handleToggleLiked}>to like</span></p>  
                )}
            </div>
        </>
    )
}


Actions.propTypes = {
    docId: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    likedPhoto: PropTypes.bool.isRequired,
    handleFocus: PropTypes.func.isRequired
  };