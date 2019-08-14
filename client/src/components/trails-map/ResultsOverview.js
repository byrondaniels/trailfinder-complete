import React from 'react';
import PropTypes from 'prop-types'

import { calcAvgValues } from "../../utils/calcAvgValues"


const ResultsOverview = ({ filteredTrails, hikingProject }) => {

    const averageLength = calcAvgValues(hikingProject, "length")
    const averageLengthFiltered = calcAvgValues(filteredTrails, "length")
    const averageAscent = Math.round(calcAvgValues(hikingProject, "ascent") * 0.3)
    const averageAscentFiltered = Math.round(calcAvgValues(filteredTrails, "ascent") * 0.3)

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

