export const types = {
    COMMODITY_DETAIL_LOAD_ING: "COMMODITY_DETAIL_LOAD_ING",
    COMMODITY_DETAIL_LOAD_SUCCESS: "COMMODITY_DETAIL_LOAD_SUCCESS",
    COMMODITY_DETAIL_LOAD_FAIL: "COMMODITY_DETAIL_LOAD_FAIL",
    QUESTION_DETAIL_LOAD_ING: "QUESTION_DETAIL_LOAD_ING",
    QUESTION_DETAIL_LOAD_SUCCESS: "QUESTION_DETAIL_LOAD_SUCCESS",
    QUESTION_DETAIL_LOAD_FAIL: "QUESTION_DETAIL_LOAD_FAIL",
    ANSWER_DETAIL_LOAD_ING: "ANSWER_DETAIL_LOAD_ING",
    ANSWER_DETAIL_LOAD_SUCCESS: "ANSWER_DETAIL_LOAD_SUCCESS",
    ANSWER_DETAIL_LOAD_FAIL: "ANSWER_DETAIL_LOAD_FAIL",
    COMMUNITY_DETAIL_LOAD_ING: "COMMUNITY_DETAIL_LOAD_ING",
    COMMUNITY_DETAIL_LOAD_SUCCESS: "COMMUNITY_DETAIL_LOAD_SUCCESS",
    COMMUNITY_DETAIL_LOAD_FAIL: "COMMUNITY_DETAIL_LOAD_FAIL"
}


export function loadCommunityDetail(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.COMMUNITY_DETAIL_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.COMMUNITY_DETAIL_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.COMMUNITY_DETAIL_LOAD_FAIL});
        }
    }
}

export function loadCommodityDetail(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.COMMODITY_DETAIL_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.COMMODITY_DETAIL_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.COMMODITY_DETAIL_LOAD_FAIL});
        }
    }
}

export function loadQuestionDetail(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.QUESTION_DETAIL_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.QUESTION_DETAIL_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.QUESTION_DETAIL_LOAD_FAIL});
        }
    }
}

export function loadAnswerDetail(sendInfo) {
    console.log("sendInfo",sendInfo)
    return dispatch => {
        switch (sendInfo.retCode) {
            case "0002":
                dispatch({type: types.ANSWER_DETAIL_LOAD_ING});
                break;
            case "0000":
                dispatch({type: types.ANSWER_DETAIL_LOAD_SUCCESS,sendData:sendInfo.data});
                break;
            default:
                dispatch({type: types.ANSWER_DETAIL_LOAD_FAIL});
        }
    }
}