

// action types
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

export function loadtopics(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.TOPIC_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.TOPIC_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.TOPIC_LOAD_FAIL});
        }
    }
}

export function addtopics(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.TOPIC_ADD_ING});
                break;
            case "0000":
                dispatch({type: types.TOPIC_ADD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.TOPIC_ADD_FAIL});
        }
    }
}

export function deltopics(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.TOPIC_DELETE_ING});
                break;
            case "0000":
                dispatch({type: types.TOPIC_DELETE_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.TOPIC_DELETE_FAIL});
        }
    }
}

export function updatetopics(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.TOPIC_UPDATE_ING});
                break;
            case "0000":
                dispatch({type: types.TOPIC_UPDATE_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.TOPIC_UPDATE_FAIL});
        }
    }
}

