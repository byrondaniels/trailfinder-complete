import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import SharedItem from '../posts/SharedItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getOneShared } from '../../actions/post';

const OneShared = ({ getOneShared, post: { oneShared, loading }, match }) => {

    useEffect(() => { getOneShared(match.params.id); }, [getOneShared, match.params.id]);

    return loading || oneShared === null ? <Spinner /> :
        <>
            <Link to='/shared' className='btn'> Back To Shared Trails </Link>
            <SharedItem post={oneShared} showActions={false} />
            <CommentForm postId={oneShared._id} />

            <div className='comments'>
                {oneShared.comments.map((comment, index) => (
                    <CommentItem key={index} comment={comment} postId={oneShared._id} />
                ))}
            </div>
        </>
};

OneShared.propTypes = {
    getOneShared: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ post: state.post });

export default connect(mapStateToProps, { getOneShared })(OneShared);