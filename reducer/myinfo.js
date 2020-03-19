const initialState = {}
export const types = {
    MYINFO_LOAD_SUCCESS:"MYINFO_LOAD_SUCCESS",                    //我的信息加载成功
    MYINFO_LOAD_ING:"MYINFO_LOAD_ING",                            //我的信息加载
    MYINFO_LOAD_FAIL:"MYINFO_LOAD_FAIL",                          //我的信息加载失败
    MYINFO_UPDATE_SUCCESS:"MYINFO_UPDATE_SUCCESS",                //我的信息更新成功
    MYINFO_UPDATE_FAIL:"MYINFO_UPDATE_FAIL",                      //我的信息更新失败
    MYINFO_UPDATE_ING:"MYINFO_UPDATE_ING",                        //我的信息更新
    MYINFO_EDIT_ING:"MYINFO_EDIT_ING"
}

export default function onAction( state = initialState, action ) {
    console.log("actionwww",action)
    switch (action.type) {
        case types.MYINFO_LOAD_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.MYINFO_LOAD_SUCCESS:
            return {
                ...state,
                myinfo: action.sendData,
                isLoading: false
            }
        case types.MYINFO_LOAD_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.MYINFO_UPDATE_ING:
            return {
                ...state,
                isLoading: true
            }
        case types.MYINFO_UPDATE_SUCCESS:
            return {
                ...state,
                myinfo: action.sendData,
                isLoading: false
            }
        case types.MYINFO_UPDATE_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case types.MYINFO_EDIT_ING:
            return {
                ...state,
                myinfo: action.sendData,
            }
        default: 
            return state;
    }
}