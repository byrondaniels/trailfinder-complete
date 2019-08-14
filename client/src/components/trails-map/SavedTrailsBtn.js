import React from 'react';
import PropTypes from 'prop-types'


const SavedTrailsBtn = ({ viewSavedTrails, toggleSaved }) => (
  <div
    style={viewSavedTrails ? { borderColor: "black" } : { borderColor: "white" }}
    className="mapBtn map2"
    onClick={toggleSaved}
  >
    Saved Trails
  </div>
);

SavedTrailsBtn.propTypes = {
  viewSavedTrails: PropTypes.bool.isRequired,
  toggleSaved: PropTypes.func.isRequired
}

export default SavedTrailsBtn;