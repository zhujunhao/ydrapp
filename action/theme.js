// action types
export const types = {
    THEME_LOAD_ING: "THEME_LOAD_ING",
    THEME_LOAD_SUCCESS: "THEME_LOAD_SUCCESS",
    THEME_LOAD_FAIL: "THEME_LOAD_FAIL",
    THEME_CHANGE_ING: "THEME_CHANGE_ING",
    THEME_CHANGE_SUCCESS: "THEME_CHANGE_SUCCESS",
    THEME_CHANGE_FAIL: "THEME_CHANGE_FAIL",
    SHOW_THEME_VIEW: "SHOW_THEME_VIEW",  
    THEME_MY_LOAD_ING: "THEME_MY_LOAD_ING",
    THEME_MY_LOAD_SUCCESS: "THEME_MY_LOAD_SUCCESS",
    THEME_MY_LOAD_FAIL: "THEME_MY_LOAD_FAIL",     
    THEME_MY_ADD_ING: "THEME_MY_ADD_ING",
    THEME_MY_ADD_SUCCESS: "THEME_MY_ADD_SUCCESS",
    THEME_MY_ADD_FAIL: "THEME_MY_ADD_FAIL", 
    THEME_MY_UPDATE_ING: "THEME_MY_UPDATE_ING",
    THEME_MY_UPDATE_SUCCESS: "THEME_MY_UPDATE_SUCCESS",
    THEME_MY_UPDATE_FAIL: "THEME_MY_UPDATE_FAIL",      
}

export function loadmytheme(sendInfo) {
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.THEME_MY_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.THEME_MY_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.THEME_MY_LOAD_FAIL});
        }
    }
}

export function addmytheme(sendInfo) {
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.THEME_MY_ADD_ING});
                break;
            case "0000":
                dispatch({type: types.THEME_MY_ADD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.THEME_MY_ADD_FAIL});
        }
    }
}

export function updatemytheme(sendInfo) {
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.THEME_MY_UPDATE_ING});
                break;
            case "0000":
                dispatch({type: types.THEME_MY_UPDATE_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.THEME_MY_UPDATE_FAIL});
        }
    }
}

/**
 * 主题变更
 */
export function onThemeChange(sendInfo) {
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.THEME_CHANGE_ING});
                break;
            case "0000":
                dispatch({type: types.THEME_CHANGE_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.THEME_CHANGE_FAIL});
        }
    }
}

/**
 * 初始化主题
 */
export function onThemeInit(sendInfo) {
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.THEME_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.THEME_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.THEME_LOAD_FAIL});
        }
    }
}

/**
 * 显示自定义主题浮层
 */
export function onShowCustomThemeView(show) {
    return {type: types.SHOW_THEME_VIEW,customThemeViewVisible: show};
}