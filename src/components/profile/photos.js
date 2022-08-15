import PropTypes from 'prop-types';
import { useState } from 'react';
import Popup from '../singlepost/popup';

export default function Photos({ photos }) {
    const [showModal, setShowModal] = useState(false);
    const [post, setPost] = useState({});

    const handleShowModal = (photo) => {
        setPost(photo);
        setShowModal(true);
    }

    return (
        <div className='h-16 border-t border-gray-primary mt-12 pt-4 ml-9 mr-9'>
            <div className='grid grid-cols-3 gap-8 mt-6 mb-12 pb-9 '>
                {!photos ? (
                    <div>Sekeleton</div>
                ) : photos.length > 0 ? (
                    photos.map(photo => (
                        <div key={photo.docId} className="relative group cursor-pointer max-h-293-px max-w-293-px" onClick={() => handleShowModal(photo)}>
                            <img className='object-cover h-full w-full' src={photo.imageSrc} alt={photo.caption}/>

                            <div className='absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden'>
                                <p className='flex items-center text-white font-bold'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                    {photo.likes.length}
                                </p>
                                <p className='flex items-center text-white font-bold'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                    </svg>
                                    {photo.comments.length}
                                </p>
                            </div>
                        </div>
                    ))
                ) : null}
            </div>
            {
                showModal && <Popup post={post} setShowModal={setShowModal}/>
            }
            {!photos || (photos.length === 0 && 
                <div className='w-full flex flex-col items-center justify-center'>
                    <p className='rounded-full border-2 p-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </p>
                    <p className='text-3xl font-thin mt-6'>No Posts Yet</p>
                </div>
            )}
        </div>
    )
}

Photos.propTypes = {
    photos: PropTypes.array.isRequired
}