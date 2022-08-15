import PropTypes from 'prop-types';

export default function Image({src, caption, contain=false}) {
    return (
        <img src={src} alt={caption} className={`max-h-full mx-auto ${contain ? 'object-contain' : ''}`}/>
    )
}

Image.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string
}