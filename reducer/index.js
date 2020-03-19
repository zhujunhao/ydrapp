import { 
    combineReducers 
} from 'redux';
import search from './search';
import category from './category';
import theme from './theme';
import myinfo from './myinfo';
import community from './community';
import topic from './topic';
import commodity from './commodity';
import loginstate from './loginstate';
import partner from './partner';
import comment from './comment';
import favor from './favor';
import collect from './collect';
import follow from './follow';
import detail from './detail';

import {
    rootCom, 
    RootNavigator
} from '../src/navigators/AppNavigator';


//1.指定默认state
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom));

/**
 * 2.创建自己的 navigation reducer，
 */
const navReducer = (state = navState, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    // 如果`nextState`为null或未定义，只需返回原始`state`
    return nextState || state;
};

/**
 * 3.合并reducer
 */

const index = combineReducers({
    nav : navReducer,
    search : search,
    category : category,
    theme : theme,
    loginstate : loginstate,
    myinfo : myinfo,
    community: community,
    commodity: commodity,
    topic: topic,
    partner: partner,
    comment: comment,
    favor: favor,
    collect: collect,
    follow: follow,
    detail: detail
})
export default index;