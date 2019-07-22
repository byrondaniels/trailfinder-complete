import axios from 'axios'
import { setAlert } from './alert'
import { PROFILE_ERROR, GET_PROFILE, GET_PROFILES, UPDATE_PROFILE, ACCOUNT_DELETED, CLEAR_PROFILE, GET_REPOS, GET_RANDOM_IMAGES } from './types'


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

// Get random images from Unsplash

export const getRandomUnsplashImages = (subject) => async dispatch => {

    try {
        const res = await axios.get(`/api/profile/unsplash/${subject}`)
        console.log("Did we get the images?", res)
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

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config)

        dispatch({ type: GET_PROFILE, payload: res.data })

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

        // Redirecting in an action is different,
        // we must use history obj with push
        if (!edit) {
            history.push('/dashboard')
        }

    } catch (error) {

        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(item => { dispatch(setAlert(error.msg, 'danger')) })
        }

        dispatch({
            type: PROFILE_ERROR, payload: { msg: error.response.statusText, status: error.response.status }
        })
    }


}

// Add Experience

export const addExperience = (formData, history) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/experience', formData, config)

        dispatch({ type: UPDATE_PROFILE, payload: res.data })

        dispatch(setAlert('Experience Added', 'success'))

        // Redirecting in an action is different,
        // we must use history obj with push
        history.push('/dashboard')

    } catch (error) {

        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(item => { dispatch(setAlert(error.msg, 'danger')) })
        }

        dispatch({
            type: PROFILE_ERROR, payload: { msg: error.response.statusText, status: error.response.status }
        })
    }



}

// Add Education

export const addEducation = (formData, history) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/education', formData, config)

        dispatch({ type: UPDATE_PROFILE, payload: res.data })

        dispatch(setAlert('Education Added', 'success'))

        // Redirecting in an action is different,
        // we must use history obj with push
        history.push('/dashboard')

    } catch (error) {

        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(item => { dispatch(setAlert(error.msg, 'danger')) })
        }

        dispatch({
            type: PROFILE_ERROR, payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

export const deleteExperience = id => async dispatch => {

    try {
        const res = await axios.delete(`/api/profile/experience/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience REmoved', 'success'))

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const deleteEducation = id => async dispatch => {

    try {
        const res = await axios.delete(`/api/profile/education/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education REmoved', 'success'))

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
