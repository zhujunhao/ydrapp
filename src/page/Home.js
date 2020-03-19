import React, { Component } from 'react';
import { 
    NavigationActions 
} from 'react-navigation';
import { 
    connect 
} from 'react-redux';
import NavigationUtil from '../navigators/NavigatorUtil';
import DynamicTabNavigator from '../navigators/DynamicTabNavigator';
import BackPressComponent from '../common/BackPressComponent';
import actions from "../../action";
import CustomTheme from "./CustomTheme";
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import url from "../util/url";
import {
    get
} from "../util/request";

class Home extends Component {
    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({backPress: this.onBackPress})
        this.getmytheme()
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.routes[1].index === 0) {//如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    getmytheme = async () => {
        const { loadmytheme } = this.props;
        loadmytheme({
            retCode: "0002",
            data: {}
        })
        let result = await get(url.getMyTheme())
        console.log("themeresult",result)
        if (result.status == 200 && result.data) {
            loadmytheme({
                retCode: "0000",
                data: result.data.data
            })
        } else {
            loadmytheme({
                retCode: "0001",
                data: {}
            })
        }
    }

    renderCustomThemeView() {
        const { customThemeViewVisible, onShowCustomThemeView } = this.props;
        return (<CustomTheme
            visible={customThemeViewVisible}
            {...this.props}
            onClose={()=>onShowCustomThemeView(false)}
        />)
    }

    render() {
        const { theme } = this.props;
        NavigationUtil.navigation = this.props.navigation;
        return <SafeAreaViewPlus
            topColor={theme.theme_code}
        >
            <DynamicTabNavigator/>
            {this.renderCustomThemeView()}
        </SafeAreaViewPlus>;
    }

}

const mapStateToProps = state => ({
    nav: state.nav,
    customThemeViewVisible: state.theme.customThemeViewVisible,
    theme: state.theme.theme
})

const mapDispatchToProps = dispatch => ({
    loadmytheme: (sendInfo) => dispatch(actions.loadmytheme(sendInfo)),
    onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show))
})

export default connect(mapStateToProps,mapDispatchToProps) (Home);





