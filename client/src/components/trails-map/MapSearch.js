import React, { useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import MapRender from "./MapRender"
import ResultsOverview from "./ResultsOverview"
import ResultsList from "./ResultsList"
import FilterMenu from "./FilterMenu"
import ChangeRadiusMenu from './ChangeRadiusMenu';
import SavedTrailsBtn from "./SavedTrailsBtn"
import DisplayLargePicture from "./DisplayLargePicture"
import MapPostForm from "./MapPostForm"
import { getHikingProjectTrails, getCurrentProfile } from "../../actions/profile"
import { initialFilterValues } from "./variables"


const MapSearch = ({ hikingProject, getHikingProjectTrails, isAuthenticated, userProfile, getCurrentProfile }) => {

    useEffect(() => { if (isAuthenticated) getCurrentProfile() }, [getCurrentProfile, isAuthenticated]);

    const [filterValues, setFilter] = useState(initialFilterValues);
    const [viewSavedTrails, setViewSavedTrails] = useState(false);
    const [viewPicture, setViewPicture] = useState(false);
    const [radius, setRadius] = useState(50);
    const [mapCoordonates, setMapCoordonates] = useState({
        latitude: 48,
        longitude: -119,
        // Map circle will only be shown if the user has already selected some trails
        displayCircle: hikingProject.length ? true : false
    })

    const filterTrails = useCallback((trails, filterValues) => {
        return trails.filter(trail =>
            filterValues.some(
                f => f.checked && (f.max >= trail.length) && (trail.length > f.min)
            ))
    }, [])

    const filteredTrails = useMemo(() =>
        filterTrails(hikingProject, filterValues), [hikingProject, filterValues, filterTrails])

    const handleChangeCheckbox = id => {
        setFilter(
            filterValues.map(item => {
                if (item.id === id) return { ...item, checked: !item.checked }
                else { return item; }
            })
        );
    };

    const toggleSaved = async () => {
        // Only update/fetch the users profile if toggling trails on, not off
        if (!viewSavedTrails) await getCurrentProfile()
        await setViewSavedTrails(!viewSavedTrails)
    }

    const togglePicture = (pictureUrl) => { setViewPicture(pictureUrl) }

    const changeRadius = (newRadius) => {
        setRadius(newRadius)
        if (mapCoordonates.displayCircle) {
            getHikingProjectTrails(mapCoordonates.latitude, mapCoordonates.longitude, newRadius)
        }
    }

    const mapClicked = (e) => {
        setMapCoordonates({ latitude: e.latLng.lat(), longitude: e.latLng.lng(), displayCircle: true })
        getHikingProjectTrails(e.latLng.lat(), e.latLng.lng(), radius)
    }
    const [displayPostForm, setPostForm] = useState("");
    const showPostForm = (postData) => { setPostForm(postData) }
    const hidePostForm = () => { setPostForm("") }

    return (
        <div className="mapContainer2">
            {/* // Buttons for interacting with google map */}
            {isAuthenticated &&
                <SavedTrailsBtn viewSavedTrails={viewSavedTrails} toggleSaved={toggleSaved} />}

            <FilterMenu filterValues={filterValues} handleChangeCheckbox={handleChangeCheckbox} />
            <ChangeRadiusMenu changeRadius={changeRadius} radius={radius} />

            {viewPicture &&
                <DisplayLargePicture url={viewPicture} togglePicture={togglePicture} />}

            {displayPostForm &&
                <MapPostForm displayPostForm={displayPostForm} hidePostForm={hidePostForm} />}

            <div className="resultsContainer">
                <MapRender
                    trails={filteredTrails}
                    mapClicked={mapClicked}
                    mapCoordonates={mapCoordonates}
                    viewSavedTrails={viewSavedTrails}
                    userProfile={userProfile}
                    radius={radius}
                />
                <ResultsList
                    trails={filteredTrails}
                    viewSavedTrails={viewSavedTrails}
                    togglePicture={togglePicture}
                    userProfile={userProfile}
                    showPostForm={showPostForm}
                />
            </div>

            <ResultsOverview filteredTrails={filteredTrails} hikingProject={hikingProject} />

        </div>
    )
};

MapSearch.propTypes = {
    hikingProject: PropTypes.array.isRequired,
    getHikingProjectTrails: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    userProfile: PropTypes.object,
    getCurrentProfile: PropTypes.func.isRequired
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