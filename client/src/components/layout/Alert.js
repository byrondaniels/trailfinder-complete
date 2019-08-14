import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 &&

    alerts.map((alert, index) => (

        <div key={index}
            className={`alert alert-${alert.alertType}`}>
            {alert.msg}
        </div>
    ))

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({ alerts: state.alert })

export default connect(mapStateToProps, null)(Alert);