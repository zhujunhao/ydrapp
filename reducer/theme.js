
import ThemeFactory from "../src/util/ThemeUtil"
const initialState = {
    theme: ThemeFactory.createTheme("#e3007b"),
    onShowCustomThemeView: false
}
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

export default function onAction( state = initialState, action ) {
    console.log("themeaction", action)
    switch (action.type) {
        case types.THEME_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.THEME_LOAD_SUCCESS:
            return {
                ...state,
                themeArr: action.sendData,
                isLoading: false
            }
        case types.THEME_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.THEME_CHANGE_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.THEME_CHANGE_SUCCESS:
            return {
                ...state,
                theme: ThemeFactory.createTheme(action.sendData.theme_code),
                isLoading: false
            }
        case types.THEME_CHANGE_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.SHOW_THEME_VIEW:
            return {
                ...state,
                customThemeViewVisible: action.customThemeViewVisible,
            }
        case types.THEME_MY_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.THEME_MY_LOAD_SUCCESS:
            return {
                ...state,
                theme: ThemeFactory.createTheme(action.sendData.theme_code),
                isLoading: false
            }
        case types.THEME_MY_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.THEME_MY_ADD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.THEME_MY_ADD_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.THEME_MY_ADD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.THEME_MY_UPDATE_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.THEME_MY_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.THEME_MY_UPDATE_FAIL:
            return {
                ...state,
                isLoading: false
            }
        default: 
            return state;
    }
}