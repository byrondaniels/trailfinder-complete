import React, { Fragment } from "react";
import { compose, withProps } from "recompose";
import { setMapIconColor } from "../../utils/setMapIconColor";
import { googleMapKey } from "../../config"

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Circle
} from "react-google-maps";


const MapRender = compose(
    withProps({
        googleMapURL:
            `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&v=3.38&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ width: '100%', margin: '0' }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
)(props => {

    const { mapClicked, trails, viewSavedTrails, mapCoordonates: { latitude, longitude, displayCircle }, userProfile } = props

    return (
        <Fragment>
            <GoogleMap onClick={(t) => mapClicked(t)}
                defaultZoom={6} defaultCenter={{
                    lat: latitude,
                    lng: longitude
                }}>

                {displayCircle && <Circle
                    clickable
                    onClick={(t) => props.mapClicked(t)}
                    center={{
                        lat: latitude,
                        lng: longitude
                    }}
                    radius={100 * 3000}
                    options={{
                        strokeColor: '#95a3b3',
                        fillOpacity: 0.1,
                        fillColor: '#7d4174'
                    }}
                />}

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
                                icon={setMapIconColor(trail.length)}
                                onClick={() => {
                                    window.open(trail.url, '_blank')
                                    // props.selectTrail(trail);
                                }}
                            />
                        );
                    })}
                {viewSavedTrails && userProfile &&userProfile.hikingprojecttrails2 &&
                    userProfile.hikingprojecttrails2.map((stringTrail, i) => {
                        const trail = JSON.parse(stringTrail.hikeData);
                        return (
                            <Marker
                                key={i}
                                title={trail.name}
                                position={{
                                    lat: trail.latitude,
                                    lng: trail.longitude
                                }}
                                onClick={() => {
                                    window.open(trail.url, '_blank')
                                    // props.selectTrail(trail);
                                }}
                            />
                        );
                    })}
            </GoogleMap>
        </Fragment>
    )
});

export default MapRender; 