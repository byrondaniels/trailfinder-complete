import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import logo from "../../img/mountain.png";
import ResultsCard from "./ResultsCard"
import { addAPIHike, deleteAPIHike } from '../../actions/profile'


const ResultsList = ({ trails, viewSavedTrails, togglePicture, userProfile, addAPIHike, deleteAPIHike, showPostForm }) => {

    const deleteTrail = (id) => { deleteAPIHike(id) }
    const saveTrail = (data) => { addAPIHike({ "hikeData": JSON.stringify(data) }) }
    const displaySavedTrails = viewSavedTrails && userProfile && userProfile.hikingprojecttrails2
    const displayList = trails.length > 0 || displaySavedTrails

    return (
        <div
            className="trail-list-flex"
            style={displayList ?
                { width: "600px", transistionDelay: "0s" } :
                { width: "0px", transistionDelay: "5s" }}
        >
            <div>
                {
                    displaySavedTrails &&
                    userProfile.hikingprojecttrails2.map((stringTrail, index) => {

                        const savedTrail = JSON.parse(stringTrail.hikeData);
                        return (
                            <ResultsCard
                                key={index}
                                image={savedTrail.imgSqSmall ? savedTrail.imgSqSmall : logo}
                                trailData={savedTrail}
                                isLoggedIn={userProfile}
                                deleteTrail={deleteTrail}
                                togglePicture={togglePicture}
                                alreadySaved={stringTrail._id}
                                showPostForm={showPostForm}
                            />)
                    })
                }
                {
                    trails.length > 0 && trails.map((trail, index) => {
                        return (
                            <ResultsCard
                                key={index}
                                image={trail.imgSqSmall ? trail.imgSqSmall : logo}
                                trailData={trail}
                                isLoggedIn={userProfile}
                                deleteTrail={deleteTrail}
                                togglePicture={togglePicture}
                                alreadySaved={userProfile && userProfile.hikingprojecttrails2 && userProfile.hikingprojecttrails2
                                    .map(item => (item.hikeData === JSON.stringify(trail)) ? item._id : 0)
                                    .filter(value => value !== 0)}
                                saveBtnPayload={trail}
                                saveTrailBtn={saveTrail}
                                showPostForm={showPostForm}
                            />)
                    })
                }
            </div>
        </div>
    )
};

ResultsList.propTypes = {
    trails: PropTypes.array.isRequired,
    viewSavedTrails: PropTypes.bool.isRequired,
    togglePicture: PropTypes.func.isRequired,
    userProfile: PropTypes.object,
    addAPIHike: PropTypes.func.isRequired,
    deleteAPIHike: PropTypes.func.isRequired
}

export default connect(null, { addAPIHike, deleteAPIHike })(ResultsList);