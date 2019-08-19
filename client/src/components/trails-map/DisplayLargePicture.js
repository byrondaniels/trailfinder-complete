import React from 'react';
import PropTypes from 'prop-types'


const DisplayLargePicture = ({ url, hidePicture }) => (
    <>
        <div onClick={hidePicture} className="large-picture-container enlarge-sm red">

            <div className="large-picture res-post post-sm"
                style={{ backgroundImage: `url(${url})` }}>
            </div>


        </div>
        <div className="large-picture-container bg-fade enlarge-sm" />
    </>
);

DisplayLargePicture.propTypes = {
    url: PropTypes.string.isRequired,
    hidePicture: PropTypes.func.isRequired,
}

export default DisplayLargePicture;