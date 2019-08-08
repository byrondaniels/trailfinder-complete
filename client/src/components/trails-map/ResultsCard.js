import React, { useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";

const TrailCard = ({
    data,
    trailSaveBtn,
    embed,
    // trailSelect,
    alreadySaved,
    isAuthenticated
}) => {
    const { name, length, ascent, summary } = data
    const lengthKM = Math.round(length * 1.6)
    const ascentM = Math.round(ascent * 1.6)
    const [heightToggle, setheightToggle] = useState(false);
    const onCardClick = () => { setheightToggle(!heightToggle) }
    return (
        <div className="hike-card" onClick={onCardClick} style={(!heightToggle) ? { height: "146px" } : { height: "300px" }}>
            <div>
                <div
                    className="hike-image"
                    style={{ backgroundImage: `url(${embed})` }}
                />
                <div className="hike-content">
                    <LinesEllipsis
                        text={name}
                        maxLine="2"
                        ellipsis="..."
                        trimRight
                        basedOn="letters"
                        id = "ellop"
                    />
                    <span>Length: {lengthKM} km</span>
                    <span>Ascent: {ascentM} m</span>
                    {isAuthenticated && 
                    <button id="saveBtn" 
                    className="btn-dark btn" 
                    onClick={(e) =>{e.stopPropagation(); trailSaveBtn(data)}}>
                    {"Save"}
                    </button>}
                </div>
            </div>
            <div>Description: {summary} </div>

        </div>
    )
};
export default TrailCard;