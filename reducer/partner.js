const initialState = {}
export const types = {
    PARTNERS_LOAD_ING:"PARTNERS_LOAD_ING",
    PARTNERS_LOAD_SUCCESS:"PARTNERS_LOAD_SUCCESS",
    PARTNERS_LOAD_FAIL:"PARTNERS_LOAD_FAIL"                   
}

export default function onAction( state = initialState, action ) {
    switch (action.type) {
        case types.PARTNERS_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.PARTNERS_LOAD_SUCCESS:
            return {
                ...state,
                partners: action.sendData,
                isLoading: false
            }
        case types.PARTNERS_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        default: 
            return state;
    }
}