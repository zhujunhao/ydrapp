const initialState = {}
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

export default function onAction( state = initialState, action ) {
    switch (action.type) {
        case types.COMMODITY_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.COMMODITY_LOAD_SUCCESS:
            return {
                ...state,
                commoditys: action.sendData,
                isLoading: false
            }
        case types.COMMODITY_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        default: 
            return state;
    }
}