// action types
export const types = {
    LOGIN_IN_SUCCESS:"LOGIN_IN_SUCCESS",                     
    LOGIN_IN_ING:"LOGIN_IN_ING",                                      
    LOGIN_IN_FAIL:"LOGIN_IN_FAIL",                            
    LOGIN_OUT_ING:"LOGIN_OUT_ING",
    LOGIN_OUT_SUCCESS:"LOGIN_OUT_SUCCESS",
    LOGIN_OUT_FAIL:"LOGIN_OUT_FAIL",
    CHANGE_PW_ING:"CHANGE_PW_ING",
    CHANGE_PW_SUCCESS:"CHANGE_PW_SUCCESS",
    CHANGE_PW_FAIL:"CHANGE_PW_FAIL",
    REGISTER_SUCCESS:"REGISTER_SUCCESS",                   
    REGISTER_ING:"REGISTER_ING",                          
    REGISTER_FAIL:"REGISTER_FAIL",     
    SEND_CODE_ING: "SEND_CODE_ING",
    SEND_CODE_SUCCESS: "SEND_CODE_SUCCESS",
    SEND_CODE_FAIL: "SEND_CODE_FAIL"                
}

export function islogin(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.LOGIN_IN_ING});
                break;
            case "0000":
                dispatch({type: types.LOGIN_IN_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.LOGIN_IN_FAIL});
        }
    }
}

export function islogout(sendInfo) {
    console.log("sendInfo1",JSON.stringify(sendInfo.retCode))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.LOGIN_OUT_ING});
                break;
            case "0000":
                dispatch({type: types.LOGIN_OUT_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.LOGIN_OUT_FAIL});
        }
    }
}

export function sendCode(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.SEND_CODE_ING,sendData:sendInfo.data});
                break;
            case "0000":
                dispatch({type: types.SEND_CODE_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.SEND_CODE_FAIL,sendData:sendInfo.data});
        }
    }
}

export function changepw(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.CHANGE_PW_ING});
                break;
            case "0000":
                dispatch({type: types.CHANGE_PW_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.CHANGE_PW_FAIL});
        }
    }
}

export function register(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.REGISTER_ING});
                break;
            case "0000":
                dispatch({type: types.REGISTER_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.REGISTER_FAIL});
        }
    }
}