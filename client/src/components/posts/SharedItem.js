import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import { addShareLike, removeShareLike, deleteShared } from '../../actions/post';


const SharedItem = ({
    addShareLike,
    removeShareLike,
    deleteShared,
    auth,
    post: { _id, text, userName, hikeName, hikeUrl, avatar, user, likes, comments, date, },
    showActions
}) => (
        <div className='post bg-white p-1 my-1'>

            <div>
                <Link to={`/profile/${user}`}>
                    <div className='round-img post-img'
                        style={{
                            backgroundImage: `url(${avatar && avatar})`
                        }} />
                    <h4>{userName}</h4>
                </Link>
            </div>

            <div>
                <a
                    href={hikeUrl}
                    target="_blank"
                    rel='noopener noreferrer'
                ><h4>{hikeName}</h4></a>
                <p className='my-1'>{text}</p>
                <p className='post-date'>
                    Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                </p>

                {showActions &&
                    <>
                        <button
                            onClick={() => addShareLike(_id)}
                            type='button'
                            className='btn btn-light'
                        >
                            <i className='fas fa-thumbs-up' />{' '}
                            {likes.length > 0 && <span>{likes.length}</span>}
                        </button>

                        <button
                            onClick={() => removeShareLike(_id)}
                            type='button'
                            className='btn btn-light'
                        >
                            <i className='fas fa-thumbs-down' />
                        </button>

                        <Link to={`/one-shared/${_id}`} className='btn btn-primary'>
                            Discussion{' '}
                            {comments.length > 0 &&
                                <span className='comment-count'>{comments.length}</span>}
                        </Link>

                        {!auth.loading && user === auth.user._id &&
                            <button
                                onClick={() => deleteShared(_id)}
                                type='button'
                                className='btn btn-danger'
                            >
                                <i className='fas fa-times' />
                            </button>
                        }
                    </>
                }
            </div>
        </div>
    );

SharedItem.defaultProps = { showActions: true };

SharedItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addShareLike: PropTypes.func.isRequired,
    removeShareLike: PropTypes.func.isRequired,
    deleteShared: PropTypes.func.isRequired,
    showActions: PropTypes.bool
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { addShareLike, removeShareLike, deleteShared })(SharedItem);