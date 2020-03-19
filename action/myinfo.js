// action types
export const types = {
    MYINFO_LOAD_SUCCESS:"MYINFO_LOAD_SUCCESS",                    //我的信息加载成功
    MYINFO_LOAD_ING:"MYINFO_LOAD_ING",                            //我的信息加载
    MYINFO_LOAD_FAIL:"MYINFO_LOAD_FAIL",                          //我的信息加载失败
    MYINFO_UPDATE_SUCCESS:"MYINFO_UPDATE_SUCCESS",                //我的信息更新成功
    MYINFO_UPDATE_FAIL:"MYINFO_UPDATE_FAIL",                      //我的信息更新失败
    MYINFO_UPDATE_ING:"MYINFO_UPDATE_ING",                        //我的信息更新
    MYINFO_EDIT_ING:"MYINFO_EDIT_ING"
}

export function onLoadMyInfo(sendInfo) {
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0003":
                dispatch({type: types.MYINFO_EDIT_ING,sendData:sendInfo.data});
                break;
            case "0002":
                dispatch({type: types.MYINFO_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.MYINFO_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.MYINFO_LOAD_FAIL});
        }
    }
}

export function updateMyInfo(sendInfo) {
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.MYINFO_UPDATE_ING});
                break;
            case "0000":
                dispatch({type: types.MYINFO_UPDATE_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.MYINFO_UPDATE_FAIL});
        }
    }
}