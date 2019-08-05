import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MapRender from "./MapRender"
import ResultsOverview from "./ResultsOverview"
import ResultsList from "./ResultsList"
import FilterMenu from "./FilterMenu"
import { getHikingProjectTrails } from "../../actions/profile"
import { initialFilterValues } from "./variables"


const MapSearch = ({ hikingProject, getHikingProjectTrails, isAuthenticated }) => {

    const [mapCoordonates, setMapCoordonates] = useState({
        latitude: 48,
        longitude: -119,
        displayCircle: false
    })

    const filterTrails = useCallback((trails, filterValues) => {
        return trails.filter(trail =>
            (filterValues[0].checked && (filterValues[0].max >= trail.length) && (trail.length > filterValues[0].min))
            || (filterValues[1].checked && (filterValues[1].max >= trail.length) && (trail.length > filterValues[1].min))
            || (filterValues[2].checked && (filterValues[2].max >= trail.length) && (trail.length > filterValues[2].min))
            || (filterValues[3].checked && (filterValues[3].max >= trail.length) && (trail.length > filterValues[3].min)))
    }, [])

    const [filterValues, setFilter] = useState(initialFilterValues);
    const filteredTrails = useMemo(() => (filterTrails(hikingProject, filterValues)), [hikingProject, filterValues, filterTrails])

    const handleChangeCheckbox = id => {
        setFilter(
            filterValues.map(item => {
                if (item.id === id) { return { ...item, checked: !item.checked }; }
                else { return item; }
            })
        );
    };

    const mapClicked = (e) => {
        setMapCoordonates({ latitude: e.latLng.lat(), longitude: e.latLng.lng(), displayCircle: true })
        getHikingProjectTrails(e.latLng.lat(), e.latLng.lng())
    }

    return (
        <div>
            <div className="resultsContainer">
                <FilterMenu filterValues={filterValues} handleChangeCheckbox={handleChangeCheckbox} />
                <MapRender trails={filteredTrails} mapClicked={mapClicked} mapCoordonates={mapCoordonates} />
                <ResultsList trails={filteredTrails} isAuthenticated={isAuthenticated} />
            </div>
            <ResultsOverview filteredTrails={filteredTrails} hikingProject={hikingProject} />
        </div>
    )
};


MapSearch.propTypes = {
    hikingProject: PropTypes.array.isRequired,
    getHikingProjectTrails: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    hikingProject: state.profile.hikingProject,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { getHikingProjectTrails },
)(MapSearch);