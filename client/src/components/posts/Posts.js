import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';


const Posts = ({ getPosts, post: { posts, loading } }) => {

    useEffect(() => { getPosts() }, [getPosts])

    return loading ? <Spinner /> :

        (<div className="res-width">
            <div className='text-primary post-head'>
                <h1 className='large'>Posts</h1>
                <Link to='/shared' className='btn btn-sml'>Shared Trails</Link>
            </div>
            <p className='lead'><i className='fas fa-user' />
                Welcome to the TrailFinder community
            </p>

            <PostForm />

            <div className='posts'>
                {posts.map((post, index) => (
                    <PostItem key={index} post={post} />
                ))}
            </div>

        </div>)
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ post: state.post });

export default connect(mapStateToProps, { getPosts })(Posts);