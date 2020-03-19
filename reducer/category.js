
const initialState = {}
export const types = {
    CATEGORY_ADD_ING:"CATEGORY_ADD_ING",
    CATEGORY_ADD_SUCCESS:"CATEGORY_ADD_SUCCESS",
    CATEGORY_ADD_FAIL:"CATEGORY_ADD_FAIL",
    CATEGORY_UPDATE_ING:"CATEGORY_UPDATE_ING",
    CATEGORY_UPDATE_SUCCESS:"CATEGORY_UPDATE_SUCCESS",
    CATEGORY_UPDATE_FAIL:"CATEGORY_UPDATE_FAIL",
    CATEGORY_DELETE_ING:"CATEGORY_DELETE_ING",
    CATEGORY_DELETE_SUCCESS:"CATEGORY_DELETE_SUCCESS",
    CATEGORY_DELETE_FAIL:"CATEGORY_DELETE_FAIL",
    CATEGORY_LOAD_ING:"CATEGORY_LOAD_ING",
    CATEGORY_LOAD_SUCCESS:"CATEGORY_LOAD_SUCCESS",
    CATEGORY_LOAD_FAIL:"CATEGORY_LOAD_FAIL"                     
}

export default function onAction( state = initialState, action ) {
    console.log("actionss",action)
    switch (action.type) {
        case types.CATEGORY_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.CATEGORY_LOAD_SUCCESS:
            return {
                ...state,
                categorys: action.sendData,
                isLoading: false
            }
        case types.CATEGORY_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        default: 
            return state;
    }
}