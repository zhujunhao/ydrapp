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

export function loadCommentByCommunity(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.CCOMMENT_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.CCOMMENT_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.CCOMMENT_LOAD_FAIL});
        }
    }
}

export function addCommentByCommunity(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.CCOMMENT_ADD_ING,sendData:sendInfo.data});
                break;
            case "0000":
                dispatch({type: types.CCOMMENT_ADD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.CCOMMENT_ADD_FAIL});
        }
    }
}

export function updateCommentByCommunity(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.CCOMMENT_UPDATE_ING});
                break;
            case "0000":
                dispatch({type: types.CCOMMENT_UPDATE_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.CCOMMENT_UPDATE_FAIL});
        }
    }
}

export function delCommentByCommunity(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.CCOMMENT_DEL_ING});
                break;
            case "0000":
                dispatch({type: types.CCOMMENT_DEL_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.CCOMMENT_DEL_FAIL});
        }
    }
}

export function loadCommentByQuestion(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.QCOMMENT_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.QCOMMENT_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.QCOMMENT_LOAD_FAIL});
        }
    }
}

export function addCommentByQuestion(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.QCOMMENT_ADD_ING});
                break;
            case "0000":
                dispatch({type: types.QCOMMENT_ADD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.QCOMMENT_ADD_FAIL});
        }
    }
}

export function updateCommentByQuestion(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.QCOMMENT_UPDATE_ING});
                break;
            case "0000":
                dispatch({type: types.QCOMMENT_UPDATE_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.QCOMMENT_UPDATE_FAIL});
        }
    }
}

export function delCommentByQuestion(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.QCOMMENT_DEL_ING});
                break;
            case "0000":
                dispatch({type: types.QCOMMENT_DEL_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.QCOMMENT_DEL_FAIL});
        }
    }
}