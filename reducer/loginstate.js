
const initialState = {}
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

export default function onAction( state = initialState, action ) {
    console.log("actionwww",action)
    switch (action.type) {
        case types.LOGIN_IN_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.LOGIN_IN_SUCCESS:
            return {
                ...state,
                loginstate: action.sendData,
                isLoading: false
            }
        case types.LOGIN_IN_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.LOGIN_OUT_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.LOGIN_OUT_SUCCESS:
            return {
                ...state,
                loginstate: action.sendData,
                isLoading: false
            }
        case types.LOGIN_OUT_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.CHANGE_PW_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.CHANGE_PW_SUCCESS:
            return {
                ...state,
                loginstate: action.sendData,
                isLoading: false
            }
        case types.CHANGE_PW_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.REGISTER_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                loginstate: action.sendData,
                isLoading: false
            }
        case types.REGISTER_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.SEND_CODE_ING:
            return {
                ...state,
                sendStatus: action.sendData,
                isLoading: true
            }
        case types.SEND_CODE_SUCCESS:
            return {
                ...state,
                sendStatus: action.sendData,
                isLoading: false
            }
        case types.SEND_CODE_FAIL:
            return {
                ...state,
                sendStatus: action.sendData,
                isLoading: false
            }
        default: 
            return state;
    }
}