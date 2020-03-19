import React, { Component } from 'react';
import { 
    createBottomTabNavigator,
    createAppContainer 
} from 'react-navigation';
import { 
    connect 
} from 'react-redux';
import { 
    BottomTabBar 
} from 'react-navigation-tabs';
import EventBus from 'react-native-event-bus';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Commodity from '../page/Commodity';
import Setting from '../page/Setting';
import SliderImg from '../common/SliderImg';
import Login from '../page/Login';
import My from '../page/My';
import Add from '../page/Add';
import Dynamic from '../page/Dynamic';
import Community from '../page/Community';
import EventTypes from '../../src/util/EventTypes';

const TABS = {//页面路由配置
    Commodity: {
        screen: Commodity,
        navigationOptions: {
            tabBarLabel: '推荐',
            tabBarIcon: ({tintColor, focused}) => (
                <AntDesign
                    name={'flag'}
                    size={22}
                    style={{color: tintColor}}
                />
            ),
        }
    },
    Community: {
        screen: Community,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({tintColor, focused}) => (
                <AntDesign
                    name={'home'}
                    size={22}
                    style={{color: tintColor}}
                />
            ),
        }         
    },
    Add: {
        screen: Add,
        navigationOptions: {
            tabBarLabel: '发布',
            tabBarIcon: ({tintColor, focused}) => (
                <AntDesign
                    name={'plus'}
                    size={22}
                    style={{color: tintColor}}
                />
            ),
        }         
    },
    Dynamic: {
        screen: Dynamic,
        navigationOptions: {
            tabBarLabel: '动态',
            tabBarIcon: ({tintColor, focused}) => (
                <AntDesign
                    name={'bells'}
                    size={22}
                    style={{color: tintColor}}
                />
            ),
        }         
    },
    My: {
        screen: My,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor, focused}) => (
                <AntDesign
                    name={'user'}
                    size={22}
                    style={{color: tintColor}}
                />
            ),
        }       
    },
    Login: {
        screen: Login,
        navigationOptions: {
            tabBarLabel: '登录',
            tabBarIcon: ({tintColor, focused}) => (
                <AntDesign
                    name={'user'}
                    size={22}
                    style={{color: tintColor}}
                />
            ),
        }       
    },
    SliderImg: {
        screen: SliderImg,
        navigationOptions: {
            tabBarLabel: '引导页',
            tabBarIcon: ({tintColor, focused}) => (
                <AntDesign
                    name={'user'}
                    size={22}
                    style={{color: tintColor}}
                />
            ),
        }         
    },
    Setting: {
        screen: Setting,
        navigationOptions: {
            tabBarLabel: '设置',
            tabBarIcon: ({tintColor, focused}) => (
                <AntDesign
                    name={'user'}
                    size={22}
                    style={{color: tintColor}}
                />
            ),
        }         
    }
}

class DynamicTabNavigator extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
    }

    _tabNavigator() {
        if (this.Tabs) {
            return this.Tabs;
        }
        const { Commodity, My, Dynamic, Community, Add } = TABS;
        const tabs = { Community, Commodity, Add, Dynamic, My };//根据需要定制
        Community.navigationOptions.tabBarLabel = '首页';//动态配置Tab属性
        return this.Tabs = createAppContainer(createBottomTabNavigator(tabs,{
                tabBarComponent: props => {
                    return <TabBarComponent theme={this.props.theme} {...props}/>
                }
            }
        ))
    }

    render() {
        const Tab = this._tabNavigator();
        return <Tab
            onNavigationStateChange={(prevState,newState,action)=>{
                EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select, {//发送底部tab切换的事件
                    from: prevState.index,
                    to: newState.index
                })
            }}
        />
    }
}

class TabBarComponent extends Component {
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime(),
        }
    }

    render() {
        return <BottomTabBar
            {...this.props}
            activeTintColor={this.props.theme.theme_code}
        />
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme
})

export default connect(mapStateToProps)(DynamicTabNavigator)
