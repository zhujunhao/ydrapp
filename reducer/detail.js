
const initialState = {}
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

export default function onAction( state = initialState, action ) {
    console.log("actionss",action)
    switch (action.type) {
        case types.COMMODITY_DETAIL_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.COMMODITY_DETAIL_LOAD_SUCCESS:
            return {
                ...state,
                commodityDetail: action.sendData,
                isLoading: false
            }
        case types.COMMODITY_DETAIL_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.QUESTION_DETAIL_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.QUESTION_DETAIL_LOAD_SUCCESS:
            return {
                ...state,
                questionDetail: action.sendData,
                isLoading: false
            }
        case types.QUESTION_DETAIL_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.ANSWER_DETAIL_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.ANSWER_DETAIL_LOAD_SUCCESS:
            return {
                ...state,
                answerDetail: action.sendData,
                isLoading: false
            }
        case types.ANSWER_DETAIL_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.COMMUNITY_DETAIL_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.COMMUNITY_DETAIL_LOAD_SUCCESS:
            return {
                ...state,
                communityDetail: action.sendData,
                isLoading: false
            }
        case types.COMMUNITY_DETAIL_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        default: 
            return state;
    }
}