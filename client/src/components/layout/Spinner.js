import React from 'react';
import spinner from './circles.svg';

export default () => (
    <>
        <img
            className="spinner"
            src={spinner}
            alt='Loading...'
        />
    </>
);