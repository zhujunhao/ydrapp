
const initialState = {}
export const types = {
    FOLLOW_LOAD_SUCCESS:"FOLLOW_LOAD_SUCCESS",                    
    FOLLOW_LOAD_ING:"FOLLOW_LOAD_ING",                            
    FOLLOW_LOAD_FAIL:"FOLLOW_LOAD_FAIL",   
    FOLLOW_LOAD_OTHER_SUCCESS:"FOLLOW_LOAD_OTHER_SUCCESS",                    
    FOLLOW_LOAD_OTHER_ING:"FOLLOW_LOAD_OTHER_ING",                            
    FOLLOW_LOAD_OTHER_FAIL:"FOLLOW_LOAD_OTHER_FAIL",                         
    FOLLOW_ADD_SUCCESS:"FOLLOW_ADD_SUCCESS",      
    FOLLOW_ADD_FAIL:"FOLLOW_ADD_FAIL",            
    FOLLOW_ADD_ING:"FOLLOW_ADD_ING",       
    FOLLOW_DEL_SUCCESS:"FOLLOW_DEL_SUCCESS",      
    FOLLOW_DEL_FAIL:"FOLLOW_DEL_FAIL",            
    FOLLOW_DEL_ING:"FOLLOW_DEL_ING",                             
}

export default function onAction( state = initialState, action ) {
    console.log("actionss",action)
    switch (action.type) {
        case types.FOLLOW_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.FOLLOW_LOAD_SUCCESS:
            return {
                ...state,
                follows: action.sendData,
                isLoading: false
            }
        case types.FOLLOW_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.FOLLOW_LOAD_OTHER_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.FOLLOW_LOAD_OTHER_SUCCESS:
            return {
                ...state,
                otherfollows: action.sendData,
                isLoading: false
            }
        case types.FOLLOW_LOAD_OTHER_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.FOLLOW_ADD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.FOLLOW_ADD_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.FOLLOW_ADD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.FOLLOW_DEL_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.FOLLOW_DEL_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.FOLLOW_DEL_FAIL:
            return {
                ...state,
                isLoading: false
            }
        default: 
            return state;
    }
}