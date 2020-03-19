import React,{ Component } from 'react';
import { 
  createStackNavigator,
  createSwitchNavigator, 
  createAppContainer 
} from 'react-navigation';
import { 
  connect 
} from 'react-redux';
import {
  createReactNavigationReduxMiddleware, 
  reduxifyNavigator
} from 'react-navigation-redux-helpers';
import Welcome from '../page/Welcome';
import SliderImg from '../common/SliderImg';
import SearchByCommodity from '../page/SearchByCommodity';
import SearchByCommunity from '../page/SearchByCommunity'
import Home from '../page/Home';
import Forpwd from '../page/Forpwd';
import Login from '../page/Login';
import Register from '../page/Register';
import Setting from '../page/Setting';
import Changemob from '../page/Changemob';
import Myinfo from '../page/Myinfo';
import AboutYdr from '../page/AboutYdr';
import DetailByCommunity from '../page/DetailByCommunity';
import DetailByCommodity from '../page/DetailByCommodity';
import My from '../page/My';
import Selcategory from '../page/Selcategory';
import CodePush from '../page/CodePush';
import WebviewDeatil from '../page/WebviewDeatil';
import Contactus from '../page/Contactus';
import Sortcategory from '../page/Sortcategory';
import Partners from '../page/Partners';
import Dynamic from '../page/Dynamic';
import Community from '../page/Community';
import Add from '../page/Add';
import Follow from '../page/Follow';
import Collect from '../page/Collect';
import Comment from '../page/Comment';
import Favor from '../page/Favor';
import Assistant from '../page/Assistant';
import Messagepush from '../page/Messagepush';
import TopicList from '../page/TopicList';
import CommentText from '../page/CommentText';

export const rootCom = 'Init';//设置根路由

const InitNavigator = createStackNavigator({
  Welcome: {
      screen: Welcome,
      navigationOptions: {
          header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      }
  }
});

const MainNavigator = createStackNavigator({
    Home: { 
      screen: Home,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      } 
    },
    SliderImg: { 
      screen: SliderImg,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      } 
    },
    SearchByCommodity: {
      screen: SearchByCommodity,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      } 
    },
    SearchByCommunity: {
      screen: SearchByCommunity,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      } 
    },
    Dynamic: { 
      screen: Dynamic,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      }  
    },
    Add: { 
      screen: Add,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      }  
    },
    Community: { 
      screen: Community,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      }  
    },
    
    Forpwd: { 
      screen: Forpwd,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      }  
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      } 
    },
    Register: {
      screen: Register,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      } 
    },
    Changemob: {
      screen: Changemob,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      } 
    },
    Myinfo: {
      screen: Myinfo,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      } 
    },
    AboutYdr: {
      screen: AboutYdr,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      } 
    },
    Contactus: {
      screen: Contactus,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      } 
    },
    DetailByCommunity: {
      screen: DetailByCommunity,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      } 
    },
    DetailByCommodity: {
      screen: DetailByCommodity,
      navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      } 
    },
    My: {
      screen: My,
      navigationOptions: {
        header: null
      }
    },
    Setting: {
      screen: Setting,
      navigationOptions: {
        header: null
      }
    },
    Sortcategory: {
      screen:Sortcategory,
      navigationOptions: {
        header: null
      }      
    },
    Selcategory: {
      screen:Selcategory,
      navigationOptions: {
        header: null
      }      
    },
    CodePush: {
      screen:CodePush,
      navigationOptions: {
        header: null
      }      
    },
    Partners: {
      screen:Partners,
      navigationOptions: {
        header: null
      }      
    },
    WebviewDeatil: {
      screen:WebviewDeatil,
      navigationOptions: {
        header: null
      }     
    },
    Changemob: {
      screen:Changemob,
      navigationOptions: {
        header: null
      }     
    },
    Forpwd: {
      screen:Forpwd,
      navigationOptions: {
        header: null
      }     
    },
    Follow: {
      screen:Follow,
      navigationOptions: {
        header: null
      }     
    },
    Favor: {
      screen:Favor,
      navigationOptions: {
        header: null
      }     
    },
    Collect: {
      screen:Collect,
      navigationOptions: {
        header: null
      }     
    },
    Comment: {
      screen:Comment,
      navigationOptions: {
        header: null
      }     
    },
    Favor: {
      screen:Favor,
      navigationOptions: {
        header: null
      }     
    },
    Messagepush: {
      screen:Messagepush,
      navigationOptions: {
        header: null
      }     
    },
    Assistant: {
      screen:Assistant,
      navigationOptions: {
        header: null
      }     
    },
    TopicList: {
      screen:TopicList,
      navigationOptions: {
        header: null
      }     
    },
    CommentText: {
      screen:CommentText,
      navigationOptions: {
        header: null
      }     
    },
  }, {
    defaultNavigationOptions: {
      header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    }
})
  
export const RootNavigator = createAppContainer(createSwitchNavigator({
  Init: InitNavigator,
  Main: MainNavigator,
}, {
  navigationOptions: {
      header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
  }
}));

/**
 * 1.初始化react-navigation与redux的中间件，
 * 该方法的一个很大的作用就是为reduxifyNavigator的key设置actionSubscribers(行为订阅者)
 * 设置订阅者@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L29
 * 检测订阅者是否存在@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L97
 * @type {Middleware}
 */
export const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

/**
* 2.将根导航器组件传递给 reduxifyNavigator 函数,
* 并返回一个将navigation state 和 dispatch 函数作为 props的新组件；
* 注意：要在createReactNavigationReduxMiddleware之后执行
*/
const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

/**
* State到Props的映射关系
* @param state
*/
const mapStateToProps = state => ({
  state: state.nav,//v2
});
/**
* 3.连接 React 组件与 Redux store
*/
export default connect(mapStateToProps)(AppWithNavigationState);