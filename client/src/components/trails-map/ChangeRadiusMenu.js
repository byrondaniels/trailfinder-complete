import React from 'react';
import PropTypes from 'prop-types'
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

//////////////////////////////////////
// THIS FUNCTION IS TO BE COMPLETED //
//////////////////////////////////////

const ChangeRadiusMenu = ({ radius, changeRadius }) => {

    return (
        <div className="dropdown" >
            <div className="mapBtn map3" >Radius</div>
            <div className="dropdown-content drop2">
                <span>{radius} km </span>
                <Slider
                    min={10}
                    step={10}
                    max={160}
                    value={radius}
                    onChange={changeRadius}
                    orientation={"vertical"}
                    tooltip={false}
                />
            </div>
        </div>
    )
};
ChangeRadiusMenu.propTypes = {
    radius: PropTypes.number.isRequired,
    changeRadius: PropTypes.func.isRequired
}
export default ChangeRadiusMenu;