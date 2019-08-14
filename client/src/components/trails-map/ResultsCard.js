import React, { useState } from "react";
import PropTypes from 'prop-types'
import LinesEllipsis from "react-lines-ellipsis";
import classNames from 'classnames'


const ResultsCard = ({
    image,
    trailData,
    isLoggedIn,
    deleteTrail,
    togglePicture,
    alreadySaved,
    saveBtnPayload,
    saveTrailBtn,
}) => {

    const { name, length, ascent, summary, imgMedium } = trailData
    const lengthKM = Math.round(length * 1.6)
    const ascentM = Math.round(ascent * 1.6)
    const [heightToggle, setheightToggle] = useState(false);
    const onCardClick = () => { setheightToggle(!heightToggle) }

    return (
        <div
            onClick={onCardClick}
            className={
                classNames({
                    'hike-card': true,
                    'h-146': !heightToggle,
                    'h-300': heightToggle,
                    'bg-white': alreadySaved && !alreadySaved.length,
                    'bg-grey': alreadySaved && alreadySaved.length,
                })}
        >
            <div>

                <div
                    className="hike-image"
                    style={{ backgroundImage: `url(${image})` }}
                    onClick={(e) => { e.stopPropagation(); togglePicture(imgMedium) }}>
                    <div className="fa fa-search hover-image" />
                </div>

                <div className="hike-content">

                    <LinesEllipsis
                        text={name}
                        maxLine="2"
                        ellipsis="..."
                        trimRight
                        basedOn="letters"
                    />

                    <span>Length: {lengthKM} km</span>
                    <span>Ascent: {ascentM} m</span>

                    {isLoggedIn ? alreadySaved && !alreadySaved.length ?
                        <button id="saveBtn"
                            className="btn-dark btn"
                            onClick={(e) => { e.stopPropagation(); saveTrailBtn(saveBtnPayload) }}>
                            Save
                        </button> :

                        <button id="saveBtn"
                            className="btn-dark btn"
                            onClick={(e) => { e.stopPropagation(); deleteTrail(alreadySaved) }}>
                            Delete
                        </button> : null}

                </div>
            </div>
            <div className="mas-10">Description: {summary} </div>
        </div>
    )
};

ResultsCard.propTypes = {
    image: PropTypes.string.isRequired,
    trailData: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.object,
    deleteTrail: PropTypes.func.isRequired,
    togglePicture: PropTypes.func.isRequired,
    alreadySaved: PropTypes.string.isRequired,
    saveBtnPayload: PropTypes.object,
    saveTrailBtn: PropTypes.func
}

export default ResultsCard;