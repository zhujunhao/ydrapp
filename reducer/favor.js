
const initialState = {}
export const types = {
    FAVOR_QUESTION_LOAD_SUCCESS:"FAVOR_QUESTION_LOAD_SUCCESS",                    
    FAVOR_QUESTION_LOAD_ING:"FAVOR_QUESTION_LOAD_ING",                            
    FAVOR_QUESTION_LOAD_FAIL:"FAVOR_QUESTION_LOAD_FAIL",                          
    FAVOR_QUESTION_ADD_SUCCESS:"FAVOR_QUESTION_ADD_SUCCESS",      
    FAVOR_QUESTION_ADD_FAIL:"FAVOR_QUESTION_ADD_FAIL",            
    FAVOR_QUESTION_ADD_ING:"FAVOR_QUESTION_ADD_ING",       
    FAVOR_QUESTION_DEL_SUCCESS:"FAVOR_QUESTION_DEL_SUCCESS",      
    FAVOR_QUESTION_DEL_FAIL:"FAVOR_QUESTION_DEL_FAIL",            
    FAVOR_QUESTION_DEL_ING:"FAVOR_QUESTION_DEL_ING",    
    
    FAVOR_COMMUNITY_LOAD_SUCCESS:"FAVOR_COMMUNITY_LOAD_SUCCESS",                    
    FAVOR_COMMUNITY_LOAD_ING:"FAVOR_COMMUNITY_LOAD_ING",                            
    FAVOR_COMMUNITY_LOAD_FAIL:"FAVOR_COMMUNITY_LOAD_FAIL",                          
    FAVOR_COMMUNITY_ADD_SUCCESS:"FAVOR_COMMUNITY_ADD_SUCCESS",      
    FAVOR_COMMUNITY_ADD_FAIL:"FAVOR_COMMUNITY_ADD_FAIL",            
    FAVOR_COMMUNITY_ADD_ING:"FAVOR_COMMUNITY_ADD_ING",       
    FAVOR_COMMUNITY_DEL_SUCCESS:"FAVOR_COMMUNITY_DEL_SUCCESS",      
    FAVOR_COMMUNITY_DEL_FAIL:"FAVOR_COMMUNITY_DEL_FAIL",            
    FAVOR_COMMUNITY_DEL_ING:"FAVOR_COMMUNITY_DEL_ING",  

    FAVOR_COMMODITY_LOAD_SUCCESS:"FAVOR_COMMODITY_LOAD_SUCCESS",                    
    FAVOR_COMMODITY_LOAD_ING:"FAVOR_COMMODITY_LOAD_ING",                            
    FAVOR_COMMODITY_LOAD_FAIL:"FAVOR_COMMODITY_LOAD_FAIL",                          
    FAVOR_COMMODITY_ADD_SUCCESS:"FAVOR_COMMODITY_ADD_SUCCESS",      
    FAVOR_COMMODITY_ADD_FAIL:"FAVOR_COMMODITY_ADD_FAIL",            
    FAVOR_COMMODITY_ADD_ING:"FAVOR_COMMODITY_ADD_ING",       
    FAVOR_COMMODITY_DEL_SUCCESS:"FAVOR_COMMODITY_DEL_SUCCESS",      
    FAVOR_COMMODITY_DEL_FAIL:"FAVOR_COMMODITY_DEL_FAIL",            
    FAVOR_COMMODITY_DEL_ING:"FAVOR_COMMODITY_DEL_ING",  

    FAVOR_COMMENT_LOAD_SUCCESS:"FAVOR_COMMENT_LOAD_SUCCESS",                    
    FAVOR_COMMENT_LOAD_ING:"FAVOR_COMMENT_LOAD_ING",                            
    FAVOR_COMMENT_LOAD_FAIL:"FAVOR_COMMENT_LOAD_FAIL",                          
    FAVOR_COMMENT_ADD_SUCCESS:"FAVOR_COMMENT_ADD_SUCCESS",      
    FAVOR_COMMENT_ADD_FAIL:"FAVOR_COMMENT_ADD_FAIL",            
    FAVOR_COMMENT_ADD_ING:"FAVOR_COMMENT_ADD_ING",       
    FAVOR_COMMENT_DEL_SUCCESS:"FAVOR_COMMENT_DEL_SUCCESS",      
    FAVOR_COMMENT_DEL_FAIL:"FAVOR_COMMENT_DEL_FAIL",            
    FAVOR_COMMENT_DEL_ING:"FAVOR_COMMENT_DEL_ING",  

    FAVOR_ANSWER_LOAD_SUCCESS:"FAVOR_ANSWER_LOAD_SUCCESS",                    
    FAVOR_ANSWER_LOAD_ING:"FAVOR_ANSWER_LOAD_ING",                            
    FAVOR_ANSWER_LOAD_FAIL:"FAVOR_ANSWER_LOAD_FAIL",                          
    FAVOR_ANSWER_ADD_SUCCESS:"FAVOR_ANSWER_ADD_SUCCESS",      
    FAVOR_ANSWER_ADD_FAIL:"FAVOR_ANSWER_ADD_FAIL",            
    FAVOR_ANSWER_ADD_ING:"FAVOR_ANSWER_ADD_ING",       
    FAVOR_ANSWER_DEL_SUCCESS:"FAVOR_ANSWER_DEL_SUCCESS",      
    FAVOR_ANSWER_DEL_FAIL:"FAVOR_ANSWER_DEL_FAIL",            
    FAVOR_ANSWER_DEL_ING:"FAVOR_ANSWER_DEL_ING",                             
}

export default function onAction( state = initialState, action ) {
    console.log("actionss",action)
    switch (action.type) {
        case types.FAVOR_QUESTION_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.FAVOR_QUESTION_LOAD_SUCCESS:
            return {
                ...state,
                questionFavors: action.sendData,
                isLoading: false
            }
        case types.FAVOR_QUESTION_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_QUESTION_ADD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.FAVOR_QUESTION_ADD_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_QUESTION_ADD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_QUESTION_DEL_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.FAVOR_QUESTION_DEL_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_QUESTION_DEL_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_COMMUNITY_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.FAVOR_COMMUNITY_LOAD_SUCCESS:
            return {
                ...state,
                communityFavors: action.sendData,
                isLoading: false
            }
        case types.FAVOR_COMMUNITY_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_COMMUNITY_ADD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.FAVOR_COMMUNITY_ADD_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_COMMUNITY_ADD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_COMMUNITY_DEL_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.FAVOR_COMMUNITY_DEL_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_COMMUNITY_DEL_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_COMMENT_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.FAVOR_COMMENT_LOAD_SUCCESS:
            return {
                ...state,
                commentFavors: action.sendData,
                isLoading: false
            }
        case types.FAVOR_COMMENT_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_COMMENT_ADD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.FAVOR_COMMENT_ADD_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_COMMENT_ADD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_COMMENT_DEL_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.FAVOR_COMMENT_DEL_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_COMMENT_DEL_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_ANSWER_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.FAVOR_ANSWER_LOAD_SUCCESS:
            return {
                ...state,
                answerFavors: action.sendData,
                isLoading: false
            }
        case types.FAVOR_ANSWER_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_ANSWER_ADD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.FAVOR_ANSWER_ADD_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_ANSWER_ADD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_ANSWER_DEL_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.FAVOR_ANSWER_DEL_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_ANSWER_DEL_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_COMMODITY_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.FAVOR_COMMODITY_LOAD_SUCCESS:
            return {
                ...state,
                commodityFavors: action.sendData,
                isLoading: false
            }
        case types.FAVOR_COMMODITY_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_COMMODITY_ADD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.FAVOR_COMMODITY_ADD_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_COMMODITY_ADD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_COMMODITY_DEL_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.FAVOR_COMMODITY_DEL_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case types.FAVOR_COMMODITY_DEL_FAIL:
            return {
                ...state,
                isLoading: false
            }
        default: 
            return state;
    }
}