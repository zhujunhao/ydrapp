

// action types
export const types = {
    CATEGORY_ADD_ING:"CATEGORY_ADD_ING",
    CATEGORY_ADD_SUCCESS:"CATEGORY_ADD_SUCCESS",
    CATEGORY_ADD_FAIL:"CATEGORY_ADD_FAIL",
    CATEGORY_UPDATE_ING:"CATEGORY_UPDATE_ING",
    CATEGORY_UPDATE_SUCCESS:"CATEGORY_UPDATE_SUCCESS",
    CATEGORY_UPDATE_FAIL:"CATEGORY_UPDATE_FAIL",
    CATEGORY_DELETE_ING:"CATEGORY_DELETE_ING",
    CATEGORY_DELETE_SUCCESS:"CATEGORY_DELETE_SUCCESS",
    CATEGORY_DELETE_FAIL:"CATEGORY_DELETE_FAIL",
    CATEGORY_LOAD_ING:"CATEGORY_LOAD_ING",
    CATEGORY_LOAD_SUCCESS:"CATEGORY_LOAD_SUCCESS",
    CATEGORY_LOAD_FAIL:"CATEGORY_LOAD_FAIL"                   
}

export function loadcategory(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.CATEGORY_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.CATEGORY_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.CATEGORY_LOAD_FAIL});
        }
    }
}

export function addcategory(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.CATEGORY_ADD_ING});
                break;
            case "0000":
                dispatch({type: types.CATEGORY_ADD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.CATEGORY_ADD_FAIL});
        }
    }
}

export function updatecategory(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.CATEGORY_UPDATE_ING});
                break;
            case "0000":
                dispatch({type: types.CATEGORY_UPDATE_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.CATEGORY_UPDATE_FAIL});
        }
    }
}

export function delcategory(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.CATEGORY_DELETE_ING});
                break;
            case "0000":
                dispatch({type: types.CATEGORY_DELETE_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.CATEGORY_DELETE_FAIL});
        }
    }
}