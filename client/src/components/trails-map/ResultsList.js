import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import logo from "../../img/mountain.png";
import ResultsCard from "./ResultsCard"
import { connect } from 'react-redux'
import { addAPIHike, deleteAPIHike } from '../../actions/profile'

const ResultsList = ({ trails, isAuthenticated, addAPIHike, deleteAPIHike, viewSavedTrails, userProfile }) => {

    const deleteTrail = (data) => { deleteAPIHike(data) }
    const saveTrail = (data) => { addAPIHike({"hikeData": JSON.stringify(data)} ) }
    const displayList = trails.length > 0 ||(viewSavedTrails &&userProfile.hikingprojecttrails2)
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
                                embed={savedTrail.imgMedium ? savedTrail.imgMedium : logo}
                                data={savedTrail}
                                payload={stringTrail._id}
                                isAuthenticated={userProfile}
                                trailBtn={deleteTrail}
                                actionText={"Delete"}
                                alreadySaved={false}
                            />
                            
                        }))
                    }
                    {trails.length > 0 && (
                        trails.map((trail, i) => {
                               
                            return( <ResultsCard
                                    key={i}
                                    title={trail.name}
                                    length={trail.length}
                                    ascent={trail.ascent}
                                    embed={trail.imgMedium ? trail.imgMedium : logo}
                                    data={trail}
                                    payload={trail}
                                    isAuthenticated={userProfile}
                                    trailBtn={saveTrail}
                                    actionText={"Save"}
                                    alreadySaved={userProfile && userProfile.hikingprojecttrails2 && userProfile.hikingprojecttrails2.filter(item => { 
                                        return item.hikeData === JSON.stringify(trail) })}
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