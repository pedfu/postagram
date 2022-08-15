import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import AddComment from './add-comment';

export default function Comments({ docId, comments: allComments, posted, commentInput, setShowModal, showAll, showInput }) {
    const [comments, setComments] = useState(allComments);

    useEffect(() => {
        setComments(allComments);
    }, [allComments])

    return (
        <>
            <div className='p-4 pt-1 pb-4 overflow-y-auto'>
                {!showAll && 
                    comments.length >= 3 && (
                        <p className='font-semibold text-sm text-gray-light mb-2 mt-1 cursor-pointer' onClick={()=>setShowModal(true)}>
                            View all {comments.length} comments
                        </p>
                    )
                }
                {!showAll && comments.length > 3 ? comments.slice(0,3).map(item => (
                    <p key={`${item.comment}-${item.displayName}`}
                        className="mb-0.5"
                    >
                        <Link to={`/p/${item.displayName}`}>
                            <span className='text-sm font-bold mr-1 hover:underline'>{item.displayName}</span>
                        </Link>
                        {item.comment.length > 120 ? (
                            <span className='text-sm' id={`id-${item.comment}-${item.displayName}`}>{item.comment.slice(0,120)}... <span className='text-gray-light cursor-pointer select-none' onClick={(e) => {
                                document.getElementById(`id-${item.comment}-${item.displayName}`).innerText = item.comment;
                                e.target.innerText = '';
                            }}>see more</span></span>                            
                        ) : (
                            <span className='text-sm'>{item.comment}</span>
                        )}
                    </p>
                )) : 
                comments.map(item => (
                    <p key={`${item.comment}-${item.displayName}`}
                        className="mb-0.5"
                    >
                        <Link to={`/p/${item.displayName}`}>
                            <span className='text-sm font-bold mr-1 hover:underline'>{item.displayName}</span>
                        </Link>
                        {item.comment.length > 120 ? (
                            <span className={`text-sm id-${item.comment}-${item.displayName}`}>{item.comment.slice(0,120)}... <span className='text-gray-light cursor-pointer select-none' onClick={(e) => {
                            const elements = document.getElementsByClassName(`id-${item.comment}-${item.displayName}`)
                            const elementsArray = [...elements]
                            elementsArray.map(el => {
                                if(el.nodeType == 1) {
                                    el.innerText = item.comment
                                }
                            })
                            e.target.innerText = '';
                        }}>see more</span></span>                            
                        ) : (
                            <span className='text-sm'>{item.comment}</span>
                        )}
                    </p>
                ))
                }
                <p className='text-gray-light uppercase text-xs mt-2'>
                    {formatDistance(posted, new Date())} ago
                </p>
            </div>
            {showInput ? 
                <AddComment 
                    docId={docId}
                    comments={comments}
                    setComments={setComments}
                    commentInput={commentInput}
                />
                : ''
            }
        </>
    )
}

Comments.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    posted: PropTypes.number.isRequired,
    commentInput: PropTypes.object.isRequired
  };