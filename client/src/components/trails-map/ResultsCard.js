import React, { useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import classNames from 'classnames'

const ResultsCard = ({
    data,
    trailBtn,
    trailDelete,
    embed,
    actionText,
    payload,
    alreadySaved,
    isAuthenticated,
    togglePicture
}) => {

    const { name, length, ascent, summary, imgMedium } = data
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
                    style={{ backgroundImage: `url(${embed})` }}
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
                    {isAuthenticated ? alreadySaved && !alreadySaved.length ?
                        <button id="saveBtn"
                            className="btn-dark btn"
                            onClick={(e) => { e.stopPropagation(); trailBtn(payload) }}>
                            {actionText}
                        </button> :
                        <button id="saveBtn"
                            className="btn-dark btn"
                            onClick={(e) => { e.stopPropagation(); trailDelete(alreadySaved) }}>
                            Delete
                 </button> : null}
                </div>
            </div>
            <div className="mas-10">Description: {summary} </div>
        </div>
    )
};
export default ResultsCard;