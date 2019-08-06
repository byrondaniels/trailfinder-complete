import React, { useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";

const TrailCard = ({
    data,
    trailItemClick,
    embed,
    actionText,
    // trailSelect,
    alreadySaved,
    isAuthenticated
}) => {
    const { name, length, ascent, summary } = data
    const lengthKM = Math.round(length * 1.6)
    const ascentM = Math.round(ascent * 1.6)
    const [heightToggle, setheightToggle] = useState(false);
    const onCardClick = () => {
        setheightToggle(!heightToggle)
        console.log("card click", heightToggle, data)
    }
    return (
        <div className="hike-card" onClick={onCardClick} style={(!heightToggle) ? { height: "146px" } : { height: "300px" }}>
            <div>
                <div
                    className="hike-image"
                    style={{ backgroundImage: `url(${embed})` }}
                // onClick={() => trailSelect(data)}
                />
                <div className="hike-content">
                    <LinesEllipsis
                        text={name}
                        maxLine="3"
                        ellipsis="..."
                        trimRight
                        basedOn="letters"
                    />
                    <span>Length: {lengthKM} km</span>
                    <span>Ascent: {ascentM} m</span>
                    {isAuthenticated && <button className="btn-dark btn" onClick={() => trailItemClick(data)}>
                        {"Save"}
                    </button>}
                </div>
            </div>
            <div>Description: {summary} </div>

        </div>
    )
};
export default TrailCard;