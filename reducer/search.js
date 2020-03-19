const initialState = {
    showText: '搜索',
    showBottomButton: false,
}
export const types = {
    COMMODITY_SEARCH_ING:"COMMODITY_SEARCH_ING",
    COMMODITY_SEARCH_SUCCESS:"COMMODITY_SEARCH_SUCCESS",
    COMMODITY_SEARCH_FAIL:"COMMODITY_SEARCH_FAIL",    
    COMMODITY_SEARCH_INPUTKEY:"COMMODITY_SEARCH_INPUTKEY",  
    COMMUNITY_SEARCH_INPUTKEY:"COMMUNITY_SEARCH_INPUTKEY",
    COMMUNITY_SEARCH_ING:"COMMUNITY_SEARCH_ING",
    COMMUNITY_SEARCH_SUCCESS:"COMMUNITY_SEARCH_SUCCESS",
    COMMUNITY_SEARCH_FAIL:"COMMUNITY_SEARCH_FAIL",  

    QUESTION_SEARCH_ING:"QUESTION_SEARCH_ING",
    QUESTION_SEARCH_SUCCESS:"QUESTION_SEARCH_SUCCESS",
    QUESTION_SEARCH_FAIL:"QUESTION_SEARCH_FAIL",                
}

export default function onAction( state = initialState, action ) {
    switch (action.type) {
        case types.COMMODITY_SEARCH_INPUTKEY:
            return {
                ...state,
                inputKey: action.inputKey,
                isLoading: false,
                showText:'搜索'
            }
        case types.COMMUNITY_SEARCH_INPUTKEY:
            return {
                ...state,
                inputKey: action.inputKey,
                isLoading: false,
                showText:'搜索'
            }
        case types.COMMODITY_SEARCH_ING:
            return {
                ...state,
                isLoading: true,
                showText:'取消',
            }
        case types.COMMODITY_SEARCH_SUCCESS:
            return {
                ...state,
                searchcommoditys: action.sendData,
                inputKey: action.inputKey,
                isLoading: false,
                showText:'搜索'
            }
        case types.COMMODITY_SEARCH_FAIL:
            return {
                ...state,
                isLoading: false,
                showText:'搜索'
            }
        case types.COMMUNITY_SEARCH_ING:
            return {
                ...state,
                isLoading: true,
                showText:'取消'
            }
        case types.COMMUNITY_SEARCH_SUCCESS:
            return {
                ...state,
                searchcommunitys: action.sendData,
                inputKey: action.inputKey,
                isLoading: false,
                showText:'搜索'
            }
        case types.COMMUNITY_SEARCH_FAIL:
            return {
                ...state,
                isLoading: false,
                showText:'搜索'
            }
        case types.QUESTION_SEARCH_ING:
            return {
                ...state,
                isLoading: true,
                showText:'取消'
            }
        case types.QUESTION_SEARCH_SUCCESS:
            return {
                ...state,
                searchquestions: action.sendData,
                inputKey: action.inputKey,
                isLoading: false,
                showText: '搜索'
            }
        case types.QUESTION_SEARCH_FAIL:
            return {
                ...state,
                isLoading: false,
                showText: '搜索'
            }
        default: 
            return state;
    }
}