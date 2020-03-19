// action types
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

export function loadCommunitys(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.COMMUNITY_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.COMMUNITY_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.COMMUNITY_LOAD_FAIL});
        }
    }
}

export function addCommunitys(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.COMMUNITY_ADD_ING});
                break;
            case "0000":
                dispatch({type: types.COMMUNITY_ADD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.COMMUNITY_ADD_FAIL});
        }
    }
}

export function updateCommunitys(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.COMMUNITY_UPDATE_ING});
                break;
            case "0000":
                dispatch({type: types.COMMUNITY_UPDATE_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.COMMUNITY_UPDATE_FAIL});
        }
    }
}

export function delCommunitys(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.COMMUNITY_DELETE_ING});
                break;
            case "0000":
                dispatch({type: types.COMMUNITY_DELETE_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.COMMUNITY_DELETE_FAIL});
        }
    }
}

export function loadQuestions(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.QUESTION_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.QUESTION_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.QUESTION_LOAD_FAIL});
        }
    }
}

export function addQuestions(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.QUESTION_ADD_ING});
                break;
            case "0000":
                dispatch({type: types.QUESTION_ADD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.QUESTION_ADD_FAIL});
        }
    }
}

export function updateQuestions(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.QUESTION_UPDATE_ING});
                break;
            case "0000":
                dispatch({type: types.QUESTION_UPDATE_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.QUESTION_UPDATE_FAIL});
        }
    }
}

export function delQuestions(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.QUESTION_DELETE_ING});
                break;
            case "0000":
                dispatch({type: types.QUESTION_DELETE_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.QUESTION_DELETE_FAIL});
        }
    }
}

export function editInfo(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.INFO_EDIT_ING,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.QUESTION_DELETE_FAIL});
        }
    }
}

