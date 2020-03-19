
const initialState = {}
export const types = {
    TOPIC_ADD_ING:"TOPIC_ADD_ING",
    TOPIC_ADD_SUCCESS:"TOPIC_ADD_SUCCESS",
    TOPIC_ADD_FAIL:"TOPIC_ADD_FAIL",
    TOPIC_UPDATE_ING:"TOPIC_UPDATE_ING",
    TOPIC_UPDATE_SUCCESS:"TOPIC_UPDATE_SUCCESS",
    TOPIC_UPDATE_FAIL:"TOPIC_UPDATE_FAIL",
    TOPIC_DELETE_ING:"TOPIC_DELETE_ING",
    TOPIC_DELETE_SUCCESS:"TOPIC_DELETE_SUCCESS",
    TOPIC_DELETE_FAIL:"TOPIC_DELETE_FAIL",
    TOPIC_LOAD_ING:"TOPIC_LOAD_ING",
    TOPIC_LOAD_SUCCESS:"TOPIC_LOAD_SUCCESS",
    TOPIC_LOAD_FAIL:"TOPIC_LOAD_FAIL"                   
}

export default function onAction( state = initialState, action ) {
    console.log("actionss",action)
    switch (action.type) {
        case types.TOPIC_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.TOPIC_LOAD_SUCCESS:
            return {
                ...state,
                topics: action.sendData,
                isLoading: false
            }
        case types.TOPIC_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        default: 
            return state;
    }
}