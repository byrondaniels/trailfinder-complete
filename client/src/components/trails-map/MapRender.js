import React from "react";
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
        containerElement: <div style={{ height: `80vh`, width: '70vw', margin: '0' }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <div className="">
        <GoogleMap onClick={(t) => props.mapClicked(t)}
            defaultZoom={6} defaultCenter={{
                lat: props.mapCoordonates.latitude,
                lng: props.mapCoordonates.longitude
            }}>

            {props.mapCoordonates.displayCircle && <Circle
                clickable
                onClick={(t) => props.mapClicked(t)}
                center={{
                    lat: props.mapCoordonates.latitude,
                    lng: props.mapCoordonates.longitude
                }}
                radius={100 * 3000}
                options={{
                    strokeColor: '#95a3b3',
                    fillOpacity: 0.2,
                    fillColor: '#7d4174'
                }}
            />}

            {props.trails &&
                props.trails.map((index, i) => {
                    return (
                        <Marker
                            key={i}
                            title={props.trails[i].name}
                            position={{
                                lat: props.trails[i].latitude,
                                lng: props.trails[i].longitude
                            }}
                            icon={setMapIconColor(props.trails[i].length)}
                            onClick={() => {
                                window.open(props.trails[i].url, '_blank')
                                // props.selectTrail(props.trails[i]);
                            }}
                        />
                    );
                })}
            <Marker position={{ lat: 51.044270, lng: -114.062019 }} />
        </GoogleMap>
    </div>
));

export default MapRender; 