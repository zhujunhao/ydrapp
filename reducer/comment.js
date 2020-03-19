let initialState ={}
// action types
export const types = {
    CCOMMENT_ADD_ING:"CCOMMENT_ADD_ING",
    CCOMMENT_ADD_SUCCESS:"CCOMMENT_ADD_SUCCESS",
    CCOMMENT_ADD_FAIL:"CCOMMENT_ADD_FAIL",
    CCOMMENT_UPDATE_ING:"CCOMMENT_UPDATE_ING",
    CCOMMENT_UPDATE_SUCCESS:"CCOMMENT_UPDATE_SUCCESS",
    CCOMMENT_UPDATE_FAIL:"CCOMMENT_UPDATE_FAIL",
    CCOMMENT_DELETE_ING:"CCOMMENT_DELETE_ING",
    CCOMMENT_DELETE_SUCCESS:"CCOMMENT_DELETE_SUCCESS",
    CCOMMENT_DELETE_FAIL:"CCOMMENT_DELETE_FAIL",
    CCOMMENT_LOAD_ING:"CCOMMENT_LOAD_ING",
    CCOMMENT_LOAD_SUCCESS:"CCOMMENT_LOAD_SUCCESS",
    CCOMMENT_LOAD_FAIL:"CCOMMENT_LOAD_FAIL",
    
    QCOMMENT_ADD_ING:"QCOMMENT_ADD_ING",
    QCOMMENT_ADD_SUCCESS:"QCOMMENT_ADD_SUCCESS",
    QCOMMENT_ADD_FAIL:"QCOMMENT_ADD_FAIL",
    QCOMMENT_UPDATE_ING:"QCOMMENT_UPDATE_ING",
    QCOMMENT_UPDATE_SUCCESS:"QCOMMENT_UPDATE_SUCCESS",
    QCOMMENT_UPDATE_FAIL:"QCOMMENT_UPDATE_FAIL",
    QCOMMENT_DELETE_ING:"QCOMMENT_DELETE_ING",
    QCOMMENT_DELETE_SUCCESS:"QCOMMENT_DELETE_SUCCESS",
    QCOMMENT_DELETE_FAIL:"QCOMMENT_DELETE_FAIL",
    QCOMMENT_LOAD_ING:"QCOMMENT_LOAD_ING",
    QCOMMENT_LOAD_SUCCESS:"QCOMMENT_LOAD_SUCCESS",
    QCOMMENT_LOAD_FAIL:"QCOMMENT_LOAD_FAIL"                
}

export default function onAction( state = initialState, action ) {
    console.log("actionss",action)
    switch (action.type) {
        case types.CCOMMENT_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.CCOMMENT_LOAD_SUCCESS:
            return {
                ...state,
                communityComments: action.sendData,
                isLoading: false
            }
        case types.CCOMMENT_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.CCOMMENT_ADD_ING:
            return {
                ...state,
                addComments: action.sendData,
                isLoading: true
            }
        case types.CCOMMENT_ADD_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.CCOMMENT_ADD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.CCOMMENT_DELETE_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.CCOMMENT_DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.CCOMMENT_DELETE_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.QCOMMENT_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.QCOMMENT_LOAD_SUCCESS:
            return {
                ...state,
                questionComments: action.sendData,
                isLoading: false
            }
        case types.QCOMMENT_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.QCOMMENT_ADD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.QCOMMENT_ADD_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.QCOMMENT_ADD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.QCOMMENT_DELETE_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.QCOMMENT_DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.QCOMMENT_DELETE_FAIL:
            return {
                ...state,
                isLoading: false
            }
        default: 
            return state;
    }
}