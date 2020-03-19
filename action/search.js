// action types
export const types = {
    COMMODITY_SEARCH_ING:"COMMODITY_SEARCH_ING",
    COMMODITY_SEARCH_SUCCESS:"COMMODITY_SEARCH_SUCCESS",
    COMMODITY_SEARCH_FAIL:"COMMODITY_SEARCH_FAIL",  
    COMMODITY_SEARCH_INPUTKEY:"COMMODITY_SEARCH_INPUTKEY",    
    
    COMMUNITY_SEARCH_ING:"COMMUNITY_SEARCH_ING",
    COMMUNITY_SEARCH_SUCCESS:"COMMUNITY_SEARCH_SUCCESS",
    COMMUNITY_SEARCH_FAIL:"COMMUNITY_SEARCH_FAIL", 
    COMMUNITY_SEARCH_INPUTKEY:"COMMUNITY_SEARCH_INPUTKEY",

    QUESTION_SEARCH_ING:"QUESTION_SEARCH_ING",
    QUESTION_SEARCH_SUCCESS:"QUESTION_SEARCH_SUCCESS",
    QUESTION_SEARCH_FAIL:"QUESTION_SEARCH_FAIL",  
}


export function searchCommoditys(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0003":
                dispatch({type: types.COMMODITY_SEARCH_INPUTKEY, inputKey: sendInfo.inputKey});
                break;
            case "0002":
                dispatch({type: types.COMMODITY_SEARCH_ING});
                break;
            case "0000":
                dispatch({type: types.COMMODITY_SEARCH_SUCCESS, sendData:sendInfo.data, inputKey: sendInfo.inputKey});
                break;
            default:
                dispatch({type: types.COMMODITY_SEARCH_FAIL});
        }
    }
}

export function searchCommunitys(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0003":
                dispatch({type: types.COMMUNITY_SEARCH_INPUTKEY, inputKey: sendInfo.inputKey});
                break;
            case "0002":
                dispatch({type: types.COMMUNITY_SEARCH_ING});
                break;
            case "0000":
                dispatch({type: types.COMMUNITY_SEARCH_SUCCESS, sendData:sendInfo.data, inputKey: sendInfo.inputKey});
                break;
            default:
                dispatch({type: types.COMMUNITY_SEARCH_FAIL});
        }
    }
}

export function searchQuestions(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.QUESTION_SEARCH_ING});
                break;
            case "0000":
                dispatch({type: types.QUESTION_SEARCH_SUCCESS, sendData:sendInfo.data, inputKey: sendInfo.inputKey});
                break;
            default:
                dispatch({type: types.QUESTION_SEARCH_FAIL});
        }
    }
}