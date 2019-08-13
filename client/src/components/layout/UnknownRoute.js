import React from 'react';


const UnknownRoute = () => (
    <div className="res-width">
        <i className="fas fa-exclamation-triangle large text-primary"></i>

        <h1 className='large text-primary'>This page isn't available</h1>
        <p className='lead'>The link you followed may be broken, or the page may have been removed. </p>
        <a href='/dashboard' className='text-primary'>Go back to home</a>
    </div>
);

export default UnknownRoute;