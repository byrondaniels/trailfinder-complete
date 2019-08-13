import React from 'react';
import PropTypes from 'prop-types'

const DisplayLargePicture = ({ url, togglePicture }) => (
    <div className="large-picture-container">

        <div className="large-picture"
            style={{ backgroundImage: `url(${url})` }}>
            <div onClick={() => togglePicture(null)} className="exit-btn">X</div>
        </div>
    </div>
);
DisplayLargePicture.propTypes = {
    url: PropTypes.string.isRequired,
    togglePicture: PropTypes.func.isRequired,
}
export default DisplayLargePicture;