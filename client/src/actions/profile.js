import axios from 'axios'
import { setAlert } from './alert'
import {
    PROFILE_ERROR, GET_PROFILE, GET_PROFILES,
    UPDATE_PROFILE, ACCOUNT_DELETED, CLEAR_PROFILE,
    GET_REPOS, GET_RANDOM_IMAGES, GET_HIKING_PROJECT_TRAILS
} from './types'
import { hikingProjectKey } from "../config"


// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')
        dispatch({ type: GET_PROFILE, payload: res.data })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR, payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
// Get all profiles

export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get('/api/profile')
        dispatch({ type: GET_PROFILES, payload: res.data })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR, payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
// Get profile by id

export const getProfileById = (userId) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`)
        dispatch({ type: GET_PROFILE, payload: res.data })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR, payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
// Get github repos

export const getGithubRepos = (username) => async dispatch => {

    try {
        const res = await axios.get(`/api/profile/github/${username}`)
        dispatch({ type: GET_REPOS, payload: res.data })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR, payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
// Get hiking trails from hiking project

export const getHikingProjectTrails = (lat, long, distance = 200) => async dispatch => {
    try {
        const link = `https://www.hikingproject.com/data/get-trails?maxResults=200&lat=${lat}&lon=${long}&maxDistance=${distance}&key=${hikingProjectKey}`
        const res = await fetch(link).then(response => response.json())
        dispatch({ type: GET_HIKING_PROJECT_TRAILS, payload: res.trails })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR, payload: { msg: "External Server Error", status: 500 }
        })
    }
}
// Get random images from Unsplash

export const getRandomUnsplashImages = (subject) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/unsplash/${subject}`)
        dispatch({ type: GET_RANDOM_IMAGES, payload: res.data })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR, payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
//  Create or update a profile

export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const res = await axios.post('/api/profile', formData, config)
        dispatch({ type: GET_PROFILE, payload: res.data })
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))
        if (!edit) { history.push('/dashboard') }
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) { errors.forEach(error => { dispatch(setAlert(error.msg, 'danger')) }) }
        dispatch({
            type: PROFILE_ERROR, payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
// Add Hike

export const addHike = (formData, history) => async dispatch => {
    try {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const res = await axios.put('/api/profile/hikes', formData, config)
        dispatch({ type: UPDATE_PROFILE, payload: res.data })
        dispatch(setAlert('Hike Added', 'success'))
        history.push('/dashboard')
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) { errors.forEach(error => { dispatch(setAlert(error.msg, 'danger')) }) }
        dispatch({
            type: PROFILE_ERROR, payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Add Hike from API data

export const addAPIHike = (hikeData) => async dispatch => {
    try {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const res = await axios.put('/api/profile/APIhikes', hikeData, config)
        dispatch({ type: UPDATE_PROFILE, payload: res.data })
        dispatch(setAlert('API Hike Added', 'success'))
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) { errors.forEach(error => { dispatch(setAlert(error.msg, 'danger')) }) }
        dispatch({
            type: PROFILE_ERROR, payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

// Add Courses

export const addCourse = (formData, history) => async dispatch => {
    try {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const res = await axios.put('/api/profile/courses', formData, config)
        dispatch({ type: UPDATE_PROFILE, payload: res.data })
        dispatch(setAlert('New Course Added', 'success'))
        history.push('/dashboard')
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) { errors.forEach(error => { dispatch(setAlert(error.msg, 'danger')) }) }
        dispatch({
            type: PROFILE_ERROR, payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
// Delete Hikes

export const deleteHike = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/APIhikes/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Hike Removed', 'success'))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Delete Hikes

export const deleteAPIHike = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/hikes/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Hike Removed', 'success'))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}



export const deleteCourse = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/courses/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Course Removed', 'success'))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


export const deleteAccount = id => async dispatch => {
    if (window.confirm('Are you sure? This can not be undone ')) {
        try {
            await axios.delete(`/api/profile`)
            dispatch({ type: CLEAR_PROFILE })
            dispatch({ type: ACCOUNT_DELETED })
            dispatch(setAlert('Your account has been permanently deleted'))
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}
