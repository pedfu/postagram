import { useEffect, useRef, useState } from "react";
import { firebase } from '../../lib/firebase';
import PropTypes from 'prop-types';

export default function PostPopup({ user, setPostPopup }) {
    const [post, setPost] = useState({
        imageSrc: null,
        caption: '',     
        comments: [],
        likes: [],
        dateCreated: null,
        userId: user.userId,
        photoId: null,
    });

    const addPostToFirebase = async () => {
        // loading

        const newPost = await firebase
            .firestore()
            .collection('photos')
            .add(post)

        await firebase
            .firestore()
            .collection('photos')
            .doc(newPost.id)
            .update({
                photoId: newPost.id,
                dateCreated: new Date().getTime()
            })

        // stop loading

        setPostPopup(false);
        setPost({
            imageSrc: null,
            caption: '',     
            comments: [],
            likes: [],
            dateCreated: null,
            userId: user.userId,
            photoId: null,
        })
    }

    const handleClick = (e) => {
        e.stopPropagation();
    }
    const handleImageSubmit = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2) {
                setPost({...post, imageSrc: reader.result, userId: user.userId});
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
  
        <div className="fixed inset-0 z-40 rounded-md bg-gray-modalbg" onClick={() => setPostPopup(false)}>
            <div className="flex flex-col z-50 h-screen justify-center items-center mx-24">
                <div className="relative flex flex-col justify-center items-center bg-white rounded-lg h-520-px lg:w-700-px sm:w-450-px sm:h-718-px" onClick={handleClick}>
                    <h4 className="absolute top-2 pb-2 border-b w-full text-center border-gray-primary font-semibold">Create new post</h4>
                    {(post.imageSrc !== null && post.caption !== '') && (
                        <button className="text-blue-medium text-sm font-semibold absolute top-2.5 right-3" onClick={addPostToFirebase}>Share</button>
                    )}
                    {post.imageSrc === null && (
                        <>
                        <div className="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 -rotate-12 absolute left-minus-35-px top-0 z-20" fill="white" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 rotate-12 bottom-0 right-minus-35-px z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="font-thin text-2xl">Drag photos and videos here</p>
                        <form className="flex items-center justify-center mt-4" onSubmit={handleSubmit}>
                            <label className="px-3 py-1 rounded-md bg-blue-medium text-white text-sm font-semibold">
                                Select from computer
                                <input type='file' accept='image/*,video/*' className="hidden" onChange={handleImageSubmit} />
                            </label>
                        </form>
                        </>
                    )}
                    {post.imageSrc !== null && (
                        <div className="flex h-full w-full mt-10 items-center">
                            <div className="flex items-center h-718 w-60%">
                                <img className="object-cover" src={post.imageSrc} alt={post.caption}/>
                            </div>
                            <div className="w-2/5 h-full border border-gray-primary">
                                <div className="flex items-center p-3">
                                    <img className="w-32-px h-32-px rounded-full" src={`/images/avatars/${user.username}.jpg`} onError={(e) => {e.target.src='/images/avatars/default.png';e.target.onerror='';}} alt={`${user.username} profile picture`}/>
                                    <p className="ml-2 font-bold">{user.username}</p>
                                </div>
                                <textarea placeholder="Write a caption..." className=" px-3 w-full focus:outline-none border-b border-gray-primary" maxLength={2200} rows={10} value={post.caption} onChange={(e) => setPost({...post, caption: e.target.value})}/>
                                <p className="text-center text-sm text-gray-primary">More configuration - Future updates*</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
} 

PostPopup.propType = {
    user: PropTypes.object.isRequired
}