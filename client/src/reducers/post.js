import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    UPDATE_SHARED_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    ADD_SHARED,
    GET_SHARED,
    GET_ONE_SHARED,
    DELETE_SHARED
} from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    shared: [],
    oneShared: null,
    loading: true,
    error: {}
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            };
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            };
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            };
        case GET_ONE_SHARED:
            return {
                ...state,
                oneShared: payload,
                loading: false
            };
        case GET_SHARED:
            return {
                ...state,
                shared: payload,
                loading: false
            };
        case ADD_SHARED:
            return {
                ...state,
                shared: [payload, ...state.shared],
                loading: false
            };
        case DELETE_SHARED:
            return {
                ...state,
                shared: state.shared.filter(share => share._id !== payload),
                loading: false
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            };
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post =>
                    post._id === payload.id ? { ...post, likes: payload.likes } : post
                ),
                loading: false
            };
        case UPDATE_SHARED_LIKES:
            return {
                ...state,
                shared: state.shared.map(post =>
                    post._id === payload.id ? { ...post, likes: payload.likes } : post
                ),
                loading: false
            };
        case ADD_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: payload },
                loading: false
            };
        case REMOVE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(
                        comment => comment._id !== payload
                    )
                },
                loading: false
            };
        default:
            return state;
    }
}