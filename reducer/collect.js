
const initialState = {}
export const types = {
    COLLECT_QUESTION_LOAD_SUCCESS:"COLLECT_QUESTION_LOAD_SUCCESS",                    
    COLLECT_QUESTION_LOAD_ING:"COLLECT_QUESTION_LOAD_ING",                            
    COLLECT_QUESTION_LOAD_FAIL:"COLLECT_QUESTION_LOAD_FAIL",                          
    COLLECT_QUESTION_ADD_SUCCESS:"COLLECT_QUESTION_ADD_SUCCESS",      
    COLLECT_QUESTION_ADD_FAIL:"COLLECT_QUESTION_ADD_FAIL",            
    COLLECT_QUESTION_ADD_ING:"COLLECT_QUESTION_ADD_ING",       
    COLLECT_QUESTION_DEL_SUCCESS:"COLLECT_QUESTION_DEL_SUCCESS",      
    COLLECT_QUESTION_DEL_FAIL:"COLLECT_QUESTION_DEL_FAIL",            
    COLLECT_QUESTION_DEL_ING:"COLLECT_QUESTION_DEL_ING",         

    COLLECT_COMMODITY_LOAD_SUCCESS:"COLLECT_COMMODITY_LOAD_SUCCESS",                    
    COLLECT_COMMODITY_LOAD_ING:"COLLECT_COMMODITY_LOAD_ING",                            
    COLLECT_COMMODITY_LOAD_FAIL:"COLLECT_COMMODITY_LOAD_FAIL",                          
    COLLECT_COMMODITY_ADD_SUCCESS:"COLLECT_COMMODITY_ADD_SUCCESS",      
    COLLECT_COMMODITY_ADD_FAIL:"COLLECT_COMMODITY_ADD_FAIL",            
    COLLECT_COMMODITY_ADD_ING:"COLLECT_COMMODITY_ADD_ING",       
    COLLECT_COMMODITY_DEL_SUCCESS:"COLLECT_COMMODITY_DEL_SUCCESS",      
    COLLECT_COMMODITY_DEL_FAIL:"COLLECT_COMMODITY_DEL_FAIL",            
    COLLECT_COMMODITY_DEL_ING:"COLLECT_COMMODITY_DEL_ING",    

    COLLECT_COMMUNITY_LOAD_SUCCESS:"COLLECT_COMMUNITY_LOAD_SUCCESS",                    
    COLLECT_COMMUNITY_LOAD_ING:"COLLECT_COMMUNITY_LOAD_ING",                            
    COLLECT_COMMUNITY_LOAD_FAIL:"COLLECT_COMMUNITY_LOAD_FAIL",                          
    COLLECT_COMMUNITY_ADD_SUCCESS:"COLLECT_COMMUNITY_ADD_SUCCESS",      
    COLLECT_COMMUNITY_ADD_FAIL:"COLLECT_COMMUNITY_ADD_FAIL",            
    COLLECT_COMMUNITY_ADD_ING:"COLLECT_COMMUNITY_ADD_ING",       
    COLLECT_COMMUNITY_DEL_SUCCESS:"COLLECT_COMMUNITY_DEL_SUCCESS",      
    COLLECT_COMMUNITY_DEL_FAIL:"COLLECT_COMMUNITY_DEL_FAIL",            
    COLLECT_COMMUNITY_DEL_ING:"COLLECT_COMMUNITY_DEL_ING",                       
}

export default function onAction( state = initialState, action ) {
    console.log("actionss",action)
    switch (action.type) {
        case types.COLLECT_QUESTION_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.COLLECT_QUESTION_LOAD_SUCCESS:
            return {
                ...state,
                questionCollects: action.sendData,
                isLoading: false
            }
        case types.COLLECT_QUESTION_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.COLLECT_QUESTION_ADD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.COLLECT_QUESTION_ADD_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.COLLECT_QUESTION_ADD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.COLLECT_QUESTION_DEL_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.COLLECT_QUESTION_DEL_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.COLLECT_QUESTION_DEL_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.COLLECT_COMMODITY_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.COLLECT_COMMODITY_LOAD_SUCCESS:
            return {
                ...state,
                commodityCollects: action.sendData,
                isLoading: false
            }
        case types.COLLECT_COMMODITY_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.COLLECT_COMMODITY_ADD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.COLLECT_COMMODITY_ADD_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.COLLECT_COMMODITY_ADD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.COLLECT_COMMODITY_DEL_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.COLLECT_COMMODITY_DEL_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.COLLECT_COMMODITY_DEL_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.COLLECT_COMMUNITY_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.COLLECT_COMMUNITY_LOAD_SUCCESS:
            return {
                ...state,
                communityCollects: action.sendData,
                isLoading: false
            }
        case types.COLLECT_COMMODITY_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.COLLECT_COMMUNITY_ADD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.COLLECT_COMMUNITY_ADD_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.COLLECT_COMMODITY_ADD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.COLLECT_COMMUNITY_DEL_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.COLLECT_COMMUNITY_DEL_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.COLLECT_COMMODITY_DEL_FAIL:
            return {
                ...state,
                isLoading: false
            }
        default: 
            return state;
    }
}