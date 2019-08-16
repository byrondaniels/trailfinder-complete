import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps";

import { setMapIconColor } from "../../utils/setMapIconColor";
import { googleMapKey } from "../../config"


const MapRender = compose(
    withProps({
        googleMapURL:
            `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ width: '100%', margin: '0' }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
)(props => {

    const {
        mapClicked,
        trails,
        viewSavedTrails,
        mapCoordonates: { latitude, longitude, displayCircle },
        userProfile,
        radius
    } = props

    return (
        <GoogleMap
            onClick={(t) => mapClicked(t)}
            defaultZoom={6}
            defaultCenter={{ lat: latitude, lng: longitude }}
        >
            {/* The below is for rendering the big grey circle on map */}
            {displayCircle &&
                <Circle
                    clickable
                    onClick={(e) => props.mapClicked(e)}
                    center={{
                        lat: latitude,
                        lng: longitude
                    }}
                    radius={2000 * radius}
                    options={{
                        strokeColor: '#95a3b3',
                        fillOpacity: 0.1,
                        fillColor: '#7d4174'
                    }}
                />}

            {/* The below is for mapping out trails found from API 
                (sourced from coordonates from map click) ... onto the map */}
            {trails &&
                trails.map((trail, i) => {
                    return (
                        <Marker
                            key={i}
                            title={trail.name}
                            position={{
                                lat: trail.latitude,
                                lng: trail.longitude
                            }}
                            // Below is a function to set map icon color based on trail length
                            icon={setMapIconColor(trail.length)}
                            onClick={() => { window.open(trail.url, '_blank') }}
                        />
                    );
                })}

            {/* The below is for mapping out trails previously saved by user to the database
                 ... onto the map.
                 These will only be shown if toggle button has been clicked and they exist */}
            {
                viewSavedTrails &&
                userProfile &&
                userProfile.hikingprojecttrails2 &&
                userProfile.hikingprojecttrails2.map((stringTrail, i) => {
                    // Trail data has been saved to db as a string so we need to convert it
                    const trail = JSON.parse(stringTrail.hikeData);
                    return (
                        <Marker
                            key={i + 100}
                            title={trail.name}
                            position={{
                                lat: trail.latitude,
                                lng: trail.longitude
                            }}
                            onClick={() => { window.open(trail.url, '_blank') }}
                        />
                    );
                })}
        </GoogleMap>
    )
});

export default MapRender; 