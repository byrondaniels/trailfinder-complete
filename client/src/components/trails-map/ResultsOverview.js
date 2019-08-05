import React from 'react';
import PropTypes from 'prop-types'

const averageValues = (array, parameter) => {
    const totalLength = array.reduce((a, b) => { return a + b[parameter]; }, 0);
    return Math.round(totalLength / array.length)
}


const ResultsOverview = ({ filteredTrails, hikingProject }) => {

    const averageLength = averageValues(hikingProject, "length")
    const averageLengthFiltered = averageValues(filteredTrails, "length")
    const averageAscent = Math.round(averageValues(hikingProject, "ascent") * 0.3)
    const averageAscentFiltered = Math.round(averageValues(filteredTrails, "ascent") * 0.3)

    return (
        <div className="resultsOverview">
            <div>
                <span>Number of trails shown: {filteredTrails.length}</span>
                <span>Number of trails found: {hikingProject.length}</span>
            </div>
            <div>
                <span>Average length of trail: {filteredTrails.length && averageLengthFiltered} km</span>
                <span>Average length of trail: {hikingProject.length && averageLength} km</span>
            </div>
            <div>
                <span>Average elevation gain: {filteredTrails.length && averageAscentFiltered} m</span>
                <span>Average elevation gain: {hikingProject.length && averageAscent} m</span>
            </div>
        </div>
    )
};

ResultsOverview.propTypes = {
    filteredTrails: PropTypes.array.isRequired,
    hikingProject: PropTypes.array.isRequired
}

export default ResultsOverview;