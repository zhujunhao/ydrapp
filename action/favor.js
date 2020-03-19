
// action types
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

export function loadQuestionFavor(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.FAVOR_QUESTION_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.FAVOR_QUESTION_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.FAVOR_QUESTION_LOAD_FAIL});
        }
    }
}

export function addQuestionFavor(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.FAVOR_QUESTION_ADD_ING});
                break;
            case "0000":
                dispatch({type: types.FAVOR_QUESTION_ADD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.FAVOR_QUESTION_ADD_FAIL});
        }
    }
}

export function delQuestionFavor(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.FAVOR_QUESTION_DEL_ING});
                break;
            case "0000":
                dispatch({type: types.FAVOR_QUESTION_DEL_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.FAVOR_QUESTION_DEL_FAIL});
        }
    }
}

export function loadCommunityFavor(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.FAVOR_COMMUNITY_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.FAVOR_COMMUNITY_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.FAVOR_COMMUNITY_LOAD_FAIL});
        }
    }
}

export function addCommunityFavor(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.FAVOR_COMMUNITY_ADD_ING});
                break;
            case "0000":
                dispatch({type: types.FAVOR_COMMUNITY_ADD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.FAVOR_COMMUNITY_ADD_FAIL});
        }
    }
}

export function delCommunityFavor(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.FAVOR_COMMUNITY_DEL_ING});
                break;
            case "0000":
                dispatch({type: types.FAVOR_COMMUNITY_DEL_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.FAVOR_COMMUNITY_DEL_FAIL});
        }
    }
}


export function loadCommodityFavor(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.FAVOR_COMMODITY_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.FAVOR_COMMODITY_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.FAVOR_COMMODITY_LOAD_FAIL});
        }
    }
}

export function addCommodityFavor(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.FAVOR_COMMODITY_ADD_ING});
                break;
            case "0000":
                dispatch({type: types.FAVOR_COMMODITY_ADD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.FAVOR_COMMONITY_ADD_FAIL});
        }
    }
}

export function delCommodityFavor(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.FAVOR_COMMODITY_DEL_ING});
                break;
            case "0000":
                dispatch({type: types.FAVOR_COMMODITY_DEL_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.FAVOR_COMMODITY_DEL_FAIL});
        }
    }
}

export function loadCommentFavor(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.FAVOR_COMMENT_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.FAVOR_COMMENT_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.FAVOR_COMMENT_LOAD_FAIL});
        }
    }
}

export function addCommentFavor(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.FAVOR_COMMENT_ADD_ING});
                break;
            case "0000":
                dispatch({type: types.FAVOR_COMMENT_ADD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.FAVOR_COMMENT_ADD_FAIL});
        }
    }
}

export function delCommentFavor(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.FAVOR_COMMENT_DEL_ING});
                break;
            case "0000":
                dispatch({type: types.FAVOR_COMMENT_DEL_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.FAVOR_COMMENT_DEL_FAIL});
        }
    }
}

export function loadAnswerFavor(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.FAVOR_ANSWER_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.FAVOR_ANSWER_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.FAVOR_ANSWER_LOAD_FAIL});
        }
    }
}

export function addAnswerFavor(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.FAVOR_ANSWER_ADD_ING});
                break;
            case "0000":
                dispatch({type: types.FAVOR_ANSWER_ADD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.FAVOR_ANSWER_ADD_FAIL});
        }
    }
}

export function delAnswerFavor(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.FAVOR_ANSWER_DEL_ING});
                break;
            case "0000":
                dispatch({type: types.FAVOR_ANSWER_DEL_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.FAVOR_ANSWER_DEL_FAIL});
        }
    }
}