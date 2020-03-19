const initialState = {}
export const types = {
    COMMUNITY_ADD_ING:"COMMUNITY_ADD_ING",
    COMMUNITY_ADD_SUCCESS:"COMMUNITY_ADD_SUCCESS",
    COMMUNITY_ADD_FAIL:"COMMUNITY_ADD_FAIL",
    COMMUNITY_UPDATE_ING:"COMMUNITY_UPDATE_ING",
    COMMUNITY_UPDATE_SUCCESS:"COMMUNITY_UPDATE_SUCCESS",
    COMMUNITY_UPDATE_FAIL:"COMMUNITY_UPDATE_FAIL",
    COMMUNITY_DELETE_ING:"COMMUNITY_DELETE_ING",
    COMMUNITY_DELETE_SUCCESS:"COMMUNITY_DELETE_SUCCESS",
    COMMUNITY_DELETE_FAIL:"COMMUNITY_DELETE_FAIL",
    COMMUNITY_LOAD_ING:"COMMUNITY_LOAD_ING",
    COMMUNITY_LOAD_SUCCESS:"COMMUNITY_LOAD_SUCCESS",
    COMMUNITY_LOAD_FAIL:"COMMUNITY_LOAD_FAIL",
    
    QUESTION_ADD_ING:"QUESTION_ADD_ING",
    QUESTION_ADD_SUCCESS:"QUESTION_ADD_SUCCESS",
    QUESTION_ADD_FAIL:"QUESTION_ADD_FAIL",
    QUESTION_UPDATE_ING:"QUESTION_UPDATE_ING",
    QUESTION_UPDATE_SUCCESS:"QUESTION_UPDATE_SUCCESS",
    QUESTION_UPDATE_FAIL:"QUESTION_UPDATE_FAIL",
    QUESTION_DELETE_ING:"QUESTION_DELETE_ING",
    QUESTION_DELETE_SUCCESS:"QUESTION_DELETE_SUCCESS",
    QUESTION_DELETE_FAIL:"QUESTION_DELETE_FAIL",
    QUESTION_LOAD_ING:"QUESTION_LOAD_ING",
    QUESTION_LOAD_SUCCESS:"QUESTION_LOAD_SUCCESS",
    QUESTION_LOAD_FAIL:"QUESTION_LOAD_FAIL",
    INFO_EDIT_ING:"INFO_EDIT_ING"             
}

export default function onAction( state = initialState, action ) {
    switch (action.type) {
        case types.COMMUNITY_ADD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.COMMUNITY_ADD_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.COMMUNITY_ADD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.COMMUNITY_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.COMMUNITY_LOAD_SUCCESS:
            return {
                ...state,
                communitys: action.sendData,
                isLoading: false
            }
        case types.COMMUNITY_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.COMMUNITY_UPDATE_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.COMMUNITY_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.COMMUNITY_UPDATE_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.COMMUNITY_DELETE_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.COMMUNITY_DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.COMMUNITY_DELETE_FAIL:
            return {
                ...state,
                isLoading: false
            }
        
        case types.QUESTION_ADD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.QUESTION_ADD_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.QUESTION_ADD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.QUESTION_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.QUESTION_LOAD_SUCCESS:
            return {
                ...state,
                questions: action.sendData,
                isLoading: false
            }
        case types.QUESTION_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.QUESTION_UPDATE_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.QUESTION_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.QUESTION_UPDATE_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.QUESTION_DELETE_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.QUESTION_DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.QUESTION_DELETE_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.INFO_EDIT_ING:
            return {
                ...state,
                editInfos: action.sendData,
            }
        default: 
            return state;
    }
}