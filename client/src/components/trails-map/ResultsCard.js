import React from "react";
import LinesEllipsis from "react-lines-ellipsis";

const TrailCard = ({
    title,
    embed,
    data,
    length,
    ascent,
    trailItemClick,
    actionText,
    // trailSelect,
    alreadySaved,
    isAuthenticated
}) => {
    const lengthKM = Math.round(length * 1.6)
    const ascentM = Math.round(ascent * 1.6)
    return (
        <div className="hike-card">
            <div
                className="hike-image"
                style={{ backgroundImage: `url(${embed})` }}
            // onClick={() => trailSelect(data)}
            />
            <div className="hike-content">
                <h5>
                    <LinesEllipsis
                        text={title}
                        maxLine="3"
                        ellipsis="..."
                        trimRight
                        basedOn="letters"
                    />
                </h5>
                <span>Length: {lengthKM} km</span>
                <span>Ascent: {ascentM} m</span>
                {isAuthenticated && <button className="btn-dark btn" onClick={() => trailItemClick(data)}>
                    {"Save"}
                </button>}
            </div>

        </div>
    )
};
export default TrailCard;