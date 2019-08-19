import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';
import SharedItem from './SharedItem';
import { getShared } from '../../actions/post';


const Shared = ({ getShared, post: { shared, loading } }) => {

    useEffect(() => { getShared() }, [getShared])

    return loading ? <Spinner /> :

        (<div className="res-width">
            <div className='text-primary post-head'>
                <h1 className='large'>Shared Trails</h1>
                <Link to='/posts' className='btn btn-sml'>Posts</Link>
            </div>
            <p className='lead'><i className='fas fa-user' />
                Check out the trails other users are talking about
            </p>

            <div className='posts'>
                {shared.length > 0 ?

                    shared.map((share, index) => (
                        <SharedItem key={index} post={share} />
                    ))
                    :
                    <div className='text-dark'>No trails have been shared so far..</div>
                }
            </div>

        </div>)
};

Shared.propTypes = {
    getShared: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ post: state.post });

export default connect(mapStateToProps, { getShared })(Shared);