import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Actions from './actions';
import Comments from './comments';
import Footer from './footer';
import Header from './header';
import Image from './image';
import Popup from '../singlepost/popup';

export default function Post({ post, setScrollBlocked }) {
    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();
    //talvez tirar
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if(showModal) {
            setScrollBlocked(true);
            document.body.style.overflow = 'hidden';
        } else {
            setScrollBlocked(false);            
            document.body.style.overflow = 'auto';
        }
    }, [showModal])

    return (
        <div className={`rounded-lg col-span-4 border bg-white border-gray-primary mb-3 w-470-px sm:w-470-px h-full ${showModal ? 'overflow-hidden' : ''}`}>
            <Header username={post.username} />
            <Image src={post.imageSrc} caption={post.caption}/>
            <Actions 
                docId={post.docId}
                totalLikes={post.likes.length}
                likedPhoto={post.userLikedPhoto}
                handleFocus={handleFocus}
                setShowModal={setShowModal}
            />
            <Footer 
                username={post.username}
                caption={post.caption}
            />
            <Comments 
                docId={post.docId}
                comments={post.comments}
                posted={post.dateCreated}
                commentInput={commentInput}
                setShowModal={setShowModal}
                showAll={false}
                showInput={true}
            />
            {showModal && 
                <Popup post={post} setShowModal={setShowModal}/>
            }
            
        </div>
    )
}

Post.propTypes = {
    post: PropTypes.shape({
      username: PropTypes.string.isRequired,
      imageSrc: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
      docId: PropTypes.string.isRequired,
      userLikedPhoto: PropTypes.bool.isRequired,
      likes: PropTypes.array.isRequired,
      comments: PropTypes.array.isRequired,
      dateCreated: PropTypes.number.isRequired
    })
  };
