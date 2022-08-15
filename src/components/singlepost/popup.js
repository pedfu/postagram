import { useEffect, useRef, useState } from "react";
import Actions from "../post/actions";
import AddComment from "../post/add-comment";
import Comments from "../post/comments";
import Footer from "../post/footer";
import Header from "../post/header";
import Image from "../post/image";

export default function Popup({ post, setShowModal }) {
    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();
    const [postComments, setPostComments] = useState(post.comments);

    const handleClick = (e) => {
        e.stopPropagation()
        setShowModal(true);
    }

    const addComment = (comments) => {
        setPostComments(comments)
    }

    useEffect(() => {
    }, [postComments])

    return (
  
        <div className="fixed inset-0 z-40 rounded-md bg-gray-modalbg" onClick={() => setShowModal(false)}>
            <div className="flex flex-col z-50 sm:flex-row h-screen justify-center items-center mx-24">
                <div className="flex flex-col sm:flex-row sm:justify-center bg-white rounded-lg 2xl:h-880-px xl:h-740-px lg:h-520-px md:h-450-px sm:h-560-px popup" onClick={handleClick}>
                    <div className="block sm:hidden h-62-px">   
                        <Header username={post.username} />
                    </div>
                    <div className=" flex w-335-px sm:w-1/2 md:w-3/5 rounded-l-lg sm:h-full max-h-full bg-black-black">
                        <Image src={post.imageSrc} caption={post.caption} contain={true}/>
                    </div>
                    <div className="flex-col items-stretch justify-between w-335-px sm:w-1/2 md:w-2/5 h-full min-h-full">
                        <div className="hidden sm:block h-62-px">
                            <Header username={post.username} />
                        </div>
                        <div className="overflow-y-auto hidden sm:block h-1/6 md:h-3/6 2xl:h-75% xl:h-70% lg:h-60%
                        sm:h-60% scrollbar-hide">
                            <Footer 
                                username={post.username}
                                caption={post.caption}
                            />
                            <Comments 
                                docId={post.docId}
                                comments={postComments}
                                posted={post.dateCreated}
                                commentInput={commentInput}
                                showAll={true}
                            />
                        </div>
                        <div>
                            <Actions 
                                docId={post.docId}
                                totalLikes={post.likes.length}
                                likedPhoto={post.userLikedPhoto}
                                handleFocus={handleFocus}
                            />
                            <AddComment 
                                docId={post.docId}
                                comments={postComments}
                                commentInput={commentInput}
                                setComments={addComment}
                                showInput={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
} 