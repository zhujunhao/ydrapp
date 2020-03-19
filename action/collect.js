
// action types
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

export function loadQuestionCollect(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.COLLECT_QUESTION_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.COLLECT_QUESTION_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.COLLECT_QUESTION_LOAD_FAIL});
        }
    }
}

export function addQuestionCollect(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.COLLECT_QUESTION_ADD_ING});
                break;
            case "0000":
                dispatch({type: types.COLLECT_QUESTION_ADD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.COLLECT_QUESTION_ADD_FAIL});
        }
    }
}

export function delQuestionCollect(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.COLLECT_QUESTION_DEL_ING});
                break;
            case "0000":
                dispatch({type: types.COLLECT_QUESTION_DEL_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.COLLECT_QUESTION_DEL_FAIL});
        }
    }
}

export function loadCommunityCollect(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.COLLECT_COMMUNITY_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.COLLECT_COMMUNITY_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.COLLECT_COMMUNITY_LOAD_FAIL});
        }
    }
}

export function addCommunityCollect(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.COLLECT_COMMUNITY_ADD_ING});
                break;
            case "0000":
                dispatch({type: types.COLLECT_COMMUNITY_ADD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.COLLECT_COMMUNITY_ADD_FAIL});
        }
    }
}

export function delCommunityCollect(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.COLLECT_COMMUNITY_DEL_ING});
                break;
            case "0000":
                dispatch({type: types.COLLECT_COMMUNITY_DEL_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.COLLECT_COMMUNITY_DEL_FAIL});
        }
    }
}

export function loadCommodityCollect(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.COLLECT_COMMODITY_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.COLLECT_COMMODITY_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.COLLECT_COMMODITY_LOAD_FAIL});
        }
    }
}

export function addCommodityCollect(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.COLLECT_COMMODITY_ADD_ING});
                break;
            case "0000":
                dispatch({type: types.COLLECT_COMMODITY_ADD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.COLLECT_COMMODITY_ADD_FAIL});
        }
    }
}

export function delCommodityCollect(sendInfo) {
    console.log("sendInfo",JSON.stringify(sendInfo))
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.COLLECT_COMMODITY_DEL_ING});
                break;
            case "0000":
                dispatch({type: types.COLLECT_COMMODITY_DEL_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.COLLECT_COMMODITY_DEL_FAIL});
        }
    }
}