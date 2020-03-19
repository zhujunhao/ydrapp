// action types
export const types = {
    ANSWER_ADD_ING:"ANSWER_ADD_ING",
    ANSWER_ADD_SUCCESS:"ANSWER_ADD_SUCCESS",
    ANSWER_ADD_FAIL:"ANSWER_ADD_FAIL",
    ANSWER_UPDATE_ING:"ANSWER_UPDATE_ING",
    ANSWER_UPDATE_SUCCESS:"ANSWER_UPDATE_SUCCESS",
    ANSWER_UPDATE_FAIL:"ANSWER_UPDATE_FAIL",
    ANSWER_DELETE_ING:"ANSWER_DELETE_ING",
    ANSWER_DELETE_SUCCESS:"ANSWER_DELETE_SUCCESS",
    ANSWER_DELETE_FAIL:"ANSWER_DELETE_FAIL",
    ANSWER_LOAD_ING:"ANSWER_LOAD_ING",
    ANSWER_LOAD_SUCCESS:"ANSWER_LOAD_SUCCESS",
    ANSWER_LOAD_FAIL:"ANSWER_LOAD_FAIL"                   
}

export function addAnswer(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.ANSWER_ADD_ING});
                break;
            case "0000":
                dispatch({type: types.ANSWER_ADD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.ANSWER_ADD_FAIL});
        }
    }
}

export function updateAnswer(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.ANSWER_UPDATE_ING});
                break;
            case "0000":
                dispatch({type: types.ANSWER_UPDATE_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.ANSWER_UPDATE_FAIL});
        }
    }
}

export function loadAnswer(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.ANSWER_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.ANSWER_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.ANSWER_LOAD_FAIL});
        }
    }
}

export function delAnswer(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.ANSWER_DELETE_ING});
                break;
            case "0000":
                dispatch({type: types.ANSWER_DELETE_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.ANSWER_DELETE_FAIL});
        }
    }
}