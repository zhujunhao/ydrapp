import axios from "axios";
import qs from "qs";
import { 
    AsyncStorage 
} from 'react-native';
import { 
    Base64 
} from "js-base64";
import NavigatorUtil from '../navigators/NavigatorUtil';

import config from "../ask/config";

// 中间件
axios.interceptors.request.use(config => {
    return this._encode(config);
})

let code = "0"

// 身份令牌传递
_encode = async (config)=> {
    console.log("config2",config)
    // 不是登录接口才使用
    if (config.url.indexOf("/v0/token") == "-1" && config.url.indexOf("/v0/user/sendCode") == "-1" && config.url.indexOf("/v0/user/register") == "-1") {
        let token = "";
        let result = await AsyncStorage.getItem('loginStatus')
        let resultObj = JSON.parse(result);
        console.log("ooooo",resultObj)
        // 第一次用主令牌
        if (resultObj.uniqueToken && code != "1") {
            token = resultObj.uniqueToken;
        // 第二次用刷新令牌
        } else if (code == "1") {
            console.log("opopopopopopcode",code)
            token = resultObj.refreshToken
        }
        const base64 = Base64.encode(token + ':')
        console.log("config",config)
        console.log("base64",base64)
        config.headers.common['Authorization'] = 'Basic ' + base64;
    }

    // if (config.method == 'post') {
    //     console.log("post",config)
    //     config.headers['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8';
    // }
    // if (config.method == 'patch') {
    //     console.log("patch",config)
    //     config.headers['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8';
    //     config.data = qs.stringify(config.data)
    // }
    
    console.log("config1",config)
    return config;
}

const get = async ( url ) => {
    let result;
    try {
        result = await axios.get(`${config.baseUrl}${url}`)
    } catch (error) {
        console.log("geterror",error.message)
        console.log("code123",code)
        // 第一次403就替换刷新令牌
        if (error.message.indexOf('403')>-1 && code == "0") {
            console.log("iiiiiiiiiii")
            code = "1"
            result = await axios.get(`${config.baseUrl}${url}`)
        // 第二次403就需要重新登录
        } else if (error.message.indexOf('403')>-1 && code == "1") {
            console.log("需要重新登录了")
            NavigatorUtil.goPage({},'Login')
        } else if (error.message.indexOf('uniqueToken')>-1) {
            console.log("需要重新登录了")
            NavigatorUtil.goPage({},'Login')
        } 
    }
    console.log("get",result)
    return result;
}

const post = async ( tartUrl, data ) => {
    let url = `${config.baseUrl}${tartUrl}`;
    let result = await axios({
        method: 'POST',
        data: data,
        url,
    })
    return result;
}

const patch = async (tartUrl, data ) => {
    let url = `${config.baseUrl}${tartUrl}`
    return await axios({
                    method: 'PATCH',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    data: qs.stringify(data),
                    url,
                })
}

const del = async (tartUrl, data ) => {
    let url = `${config.baseUrl}${tartUrl}`
    return await axios({
                    method: 'delete',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    data: qs.stringify(data),
                    url,
                })
}

export { 
    get, 
    post,
    patch,
    del
}