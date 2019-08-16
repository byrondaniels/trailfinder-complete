import {
    GET_PROFILE, GET_PROFILES,
    GET_RANDOM_IMAGES, PROFILE_ERROR, CLEAR_PROFILE,
    UPDATE_PROFILE, GET_HIKING_PROJECT_TRAILS
} from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    images: [],
    hikingProject: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false
            }
        case GET_HIKING_PROJECT_TRAILS:
            return {
                ...state,
                hikingProject: payload,
                loading: false
            }
        case GET_RANDOM_IMAGES:
            return {
                ...state,
                images: payload,
                loading: false
            }
        default:
            return state;
    }
}