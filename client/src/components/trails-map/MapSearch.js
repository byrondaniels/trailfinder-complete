import React, { useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MapRender from "./MapRender"
import ResultsOverview from "./ResultsOverview"
import ResultsList from "./ResultsList"
import FilterMenu from "./FilterMenu"
import { getHikingProjectTrails, getCurrentProfile } from "../../actions/profile"
import { initialFilterValues } from "./variables"


const MapSearch = ({ hikingProject, getHikingProjectTrails, isAuthenticated, userProfile, getCurrentProfile }) => {

    const [mapCoordonates, setMapCoordonates] = useState({
        latitude: 48,
        longitude: -119,
        displayCircle: false
    })

    const filterTrails = useCallback((trails, filterValues) => {
        return trails.filter(trail =>
            filterValues.some(f => f.checked &&
                (f.max >= trail.length) &&
                (trail.length > f.min)
            ))
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

    const [viewSavedTrails, setViewSavedTrails] = useState(false);
    const toggleSaved = async () => {
        if (!viewSavedTrails) await getCurrentProfile()
        await setViewSavedTrails(!viewSavedTrails)
    }

    const mapClicked = (e) => {
        setMapCoordonates({ latitude: e.latLng.lat(), longitude: e.latLng.lng(), displayCircle: true })
        getHikingProjectTrails(e.latLng.lat(), e.latLng.lng())
    }

    return (
        <div className="mapContainer2">
            {isAuthenticated &&<div className="mapBtn map2" onClick={toggleSaved} >Saved Trails</div>}
             <FilterMenu filterValues={filterValues} handleChangeCheckbox={handleChangeCheckbox} />
            <div className="resultsContainer">
                <MapRender
                    trails={filteredTrails}
                    mapClicked={mapClicked}
                    mapCoordonates={mapCoordonates}
                    viewSavedTrails={viewSavedTrails}
                    userProfile={userProfile}

                />
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
    isAuthenticated: state.auth.isAuthenticated,
    userProfile: state.profile.profile
});

export default connect(
    mapStateToProps,
    { getHikingProjectTrails, getCurrentProfile },
)(MapSearch);