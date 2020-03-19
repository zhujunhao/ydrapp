
// action types
export const types = {
    FOLLOW_LOAD_SUCCESS:"FOLLOW_LOAD_SUCCESS",                    
    FOLLOW_LOAD_ING:"FOLLOW_LOAD_ING",                            
    FOLLOW_LOAD_FAIL:"FOLLOW_LOAD_FAIL",   
    FOLLOW_LOAD_OTHER_SUCCESS:"FOLLOW_LOAD_OTHER_SUCCESS",                    
    FOLLOW_LOAD_OTHER_ING:"FOLLOW_LOAD_OTHER_ING",                            
    FOLLOW_LOAD_OTHER_FAIL:"FOLLOW_LOAD_OTHER_FAIL",                         
    FOLLOW_ADD_SUCCESS:"FOLLOW_ADD_SUCCESS",      
    FOLLOW_ADD_FAIL:"FOLLOW_ADD_FAIL",            
    FOLLOW_ADD_ING:"FOLLOW_ADD_ING",       
    FOLLOW_DEL_SUCCESS:"FOLLOW_DEL_SUCCESS",      
    FOLLOW_DEL_FAIL:"FOLLOW_DEL_FAIL",            
    FOLLOW_DEL_ING:"FOLLOW_DEL_ING",         
}

export function loadFollow(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.FOLLOW_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.FOLLOW_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.FOLLOW_LOAD_FAIL});
        }
    }
}

export function loadOtherFollow(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.FOLLOW_LOAD_OTHER_ING});
                break;
            case "0000":
                dispatch({type: types.FOLLOW_LOAD_OTHER_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.FOLLOW_LOAD_OTHER_FAIL});
        }
    }
}

export function addFollow(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.FOLLOW_ADD_ING});
                break;
            case "0000":
                dispatch({type: types.FOLLOW_ADD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.FOLLOW_ADD_FAIL});
        }
    }
}

export function delFollow(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.FOLLOW_DEL_ING});
                break;
            case "0000":
                dispatch({type: types.FOLLOW_DEL_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.FOLLOW_DEL_FAIL});
        }
    }
}