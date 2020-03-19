// action types
export const types = {
    COMMODITY_ADD_ING:"COMMODITY_ADD_ING",
    COMMODITY_ADD_SUCCESS:"COMMODITY_ADD_SUCCESS",
    COMMODITY_ADD_FAIL:"COMMODITY_ADD_FAIL",
    COMMODITY_UPDATE_ING:"COMMODITY_UPDATE_ING",
    COMMODITY_UPDATE_SUCCESS:"COMMODITY_UPDATE_SUCCESS",
    COMMODITY_UPDATE_FAIL:"COMMODITY_UPDATE_FAIL",
    COMMODITY_DELETE_ING:"COMMODITY_DELETE_ING",
    COMMODITY_DELETE_SUCCESS:"COMMODITY_DELETE_SUCCESS",
    COMMODITY_DELETE_FAIL:"COMMODITY_DELETE_FAIL",
    COMMODITY_LOAD_ING:"COMMODITY_LOAD_ING",
    COMMODITY_LOAD_SUCCESS:"COMMODITY_LOAD_SUCCESS",
    COMMODITY_LOAD_FAIL:"COMMODITY_LOAD_FAIL"                   
}

export function loadCommoditys(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.COMMODITY_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.COMMODITY_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.COMMODITY_LOAD_FAIL});
        }
    }
}