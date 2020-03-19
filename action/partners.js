// action types
export const types = {
    PARTNERS_LOAD_ING:"PARTNERS_LOAD_ING",
    PARTNERS_LOAD_SUCCESS:"PARTNERS_LOAD_SUCCESS",
    PARTNERS_LOAD_FAIL:"PARTNERS_LOAD_FAIL"                   
}

export function loadPartners(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.PARTNERS_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.PARTNERS_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.PARTNERS_LOAD_FAIL});
        }
    }
}