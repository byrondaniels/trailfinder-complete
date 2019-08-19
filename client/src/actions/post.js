import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_POSTS, POST_ERROR,
    UPDATE_LIKES, DELETE_POST,
    ADD_POST, GET_POST,
    ADD_COMMENT, REMOVE_COMMENT,
    ADD_SHARED, GET_SHARED,
    GET_ONE_SHARED, DELETE_SHARED,
    UPDATE_SHARED_LIKES
} from './types';


// Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({ type: GET_POSTS, payload: res.data });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get shared posts
export const getShared = () => async dispatch => {
    try {
        const res = await axios.get('/api/shared');

        dispatch({ type: GET_SHARED, payload: res.data });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// Add like
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`);

        dispatch({ type: UPDATE_LIKES, payload: { id, likes: res.data } });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Remove like
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);

        dispatch({ type: UPDATE_LIKES, payload: { id, likes: res.data } });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add like
export const addShareLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/shared/like/${id}`);

        dispatch({ type: UPDATE_SHARED_LIKES, payload: { id, likes: res.data } });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Remove like
export const removeShareLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/shared/unlike/${id}`);

        dispatch({ type: UPDATE_SHARED_LIKES, payload: { id, likes: res.data } });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete post
export const deletePost = id => async dispatch => {
    try {
        await axios.delete(`/api/posts/${id}`);

        dispatch({ type: DELETE_POST, payload: id });
        dispatch(setAlert('Post Removed', 'success'));

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};



// Delete post
export const deleteShared = id => async dispatch => {
    try {
        await axios.delete(`/api/shared/${id}`);

        dispatch({ type: DELETE_SHARED, payload: id });
        dispatch(setAlert('Item Removed', 'success'));

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// Add post
export const addPost = formData => async dispatch => {

    const config = { headers: { 'Content-Type': 'application/json' } };

    try {
        const res = await axios.post('/api/posts', formData, config);

        dispatch({ type: ADD_POST, payload: res.data });
        dispatch(setAlert('Post Created', 'success'));

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add API Hike post
export const addSharedPost = formData => async dispatch => {

    const config = { headers: { 'Content-Type': 'application/json' } };

    try {
        const res = await axios.post('/api/shared', formData, config);

        dispatch({ type: ADD_SHARED, payload: res.data });
        dispatch(setAlert('Shared Post Created', 'success'));

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get post
export const getOneShared = id => async dispatch => {
    try {
        const res = await axios.get(`/api/shared/${id}`);

        dispatch({ type: GET_ONE_SHARED, payload: res.data });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get post
export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`);

        dispatch({ type: GET_POST, payload: res.data });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// Add comment
export const addComment = (postId, formData) => async dispatch => {

    const config = { headers: { 'Content-Type': 'application/json' } };

    try {
        const res = await axios.post(
            `/api/posts/comment/${postId}`,
            formData,
            config
        );

        dispatch({ type: ADD_COMMENT, payload: res.data });
        dispatch(setAlert('Comment Added', 'success'));

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

        dispatch({ type: REMOVE_COMMENT, payload: commentId });
        dispatch(setAlert('Comment Removed', 'success'));

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};