import React from 'react';
import spinner from './circles.svg';

export default () => (
    <>
        <img
            src={spinner}
            style={{ width: '200px', margin: 'auto', display: 'block' }}
            alt='Loading...'
        />
    </>
);