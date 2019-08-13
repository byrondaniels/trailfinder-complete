import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import logo from "../../img/mountain.png";
import ResultsCard from "./ResultsCard"
import { connect } from 'react-redux'
import { addAPIHike, deleteAPIHike } from '../../actions/profile'

const ResultsList = ({ trails, addAPIHike, deleteAPIHike, viewSavedTrails, userProfile, togglePicture }) => {

    const deleteTrail = (data) => { deleteAPIHike(data) }
    const saveTrail = (data) => { addAPIHike({ "hikeData": JSON.stringify(data) }) }
    const displayList = trails.length > 0 || (viewSavedTrails && userProfile && userProfile.hikingprojecttrails2)
    return (
        <Fragment>
            <div className="trail-list-flex" style={displayList ? { width: "500px", transistionDelay: "0s" } : { width: "0px", transistionDelay: "5s" }}>
                <div>
                    {
                        viewSavedTrails && userProfile && userProfile.hikingprojecttrails2 && (
                            userProfile.hikingprojecttrails2.map((stringTrail, i) => {

                                const savedTrail = JSON.parse(stringTrail.hikeData);

                                return <ResultsCard
                                    key={i}
                                    title={savedTrail.name}
                                    length={savedTrail.length}
                                    ascent={savedTrail.ascent}
                                    embed={savedTrail.imgSqSmall ? savedTrail.imgSqSmall : logo}
                                    data={savedTrail}
                                    payload={stringTrail._id}
                                    isAuthenticated={userProfile}
                                    trailDelete={deleteTrail}
                                    actionText={"Delete"}
                                    alreadySaved={stringTrail._id}
                                    togglePicture={togglePicture}
                                />

                            }))
                    }
                    {trails.length > 0 && (
                        trails.map((trail, i) => {

                            return (<ResultsCard
                                key={i}
                                title={trail.name}
                                length={trail.length}
                                ascent={trail.ascent}
                                embed={trail.imgSqSmall ? trail.imgSqSmall : logo}
                                data={trail}
                                payload={trail}
                                isAuthenticated={userProfile}
                                trailBtn={saveTrail}
                                trailDelete={deleteTrail}
                                actionText={"Save"}
                                togglePicture={togglePicture}
                                alreadySaved={userProfile && userProfile.hikingprojecttrails2 && userProfile.hikingprojecttrails2
                                    .map(item => (item.hikeData === JSON.stringify(trail)) ? item._id : 0)
                                    .filter(value => value !== 0)}
                            />)
                        })
                    )}
                </div>
            </div>
        </Fragment>
    )
};
ResultsList.propTypes = {
    trails: PropTypes.array.isRequired,
}
export default connect(null,
    { addAPIHike, deleteAPIHike })(ResultsList);