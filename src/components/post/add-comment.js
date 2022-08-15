import EmojiPicker from 'emoji-picker-react';
import PropTypes from 'prop-types';
import { createRef, useContext, useEffect, useState } from 'react';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
// import Picker from 'emoji-picker-react';

export default function AddComment({ docId, comments, setComments, commentInput }) {
    const [comment, setComment] = useState('');
    const [showEmojis, setShowEmojis] = useState(false);
    const { firebase, FieldValue } = useContext(FirebaseContext);
    const { user: { displayName }} = useContext(UserContext);

    const handleSubmitComment = (event) => {
        event.preventDefault();

        setComments([{displayName, comment}, ...comments]);
        setComment('');
        
        firebase
            .firestore()
            .collection('photos')
            .doc(docId)
            .update({
                comments: FieldValue.arrayUnion({displayName, comment}),
            }) 
    }

    const handleShowEmojis = () => {
        setShowEmojis(!showEmojis);
    }

    const onEmojiClick = (event, { emoji }) => {
        setComment(prevComment => prevComment + emoji);
    }

    return (
        <div className='border-t border-gray-primary'>
            <form
                className='flex justify-between pr-5 pl-4 items-center'
                method='POST'
                onSubmit={(event) => comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()}
            >
                <div  className='relative cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} onClick={handleShowEmojis}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className='absolute top-minus-350-px'>
                        {showEmojis && 
                            <EmojiPicker pickerStyle={{width: '350px'}} onEmojiClick={onEmojiClick} />
                        }
                    </div>
                </div>
                <textarea 
                    onFocus={() => setShowEmojis(false)}
                    aria-label='Add a comment'
                    autoComplete='off'
                    className='text-sm text-gray-base w-full mr-3 pt-4 h-12 px-4 resize-none'
                    name='add-comment'
                    placeholder='Add a comment...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    ref={commentInput}
                />
                <button
                    className={`text-sm font-bold text-blue-medium ${!comment && 'opaticy-25'}`}
                    type='button'
                    disabled={comment.length < 1}
                    onClick={handleSubmitComment}
                >
                Post
                </button>
            </form>
        </div>
    );
}

AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    commentInput: PropTypes.object
}