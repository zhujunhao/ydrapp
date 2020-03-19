import React,{ Component } from 'react';
import { 
    connect 
} from 'react-redux';
import { 
    ScrollView, 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import NavigatorUtil from '../navigators/NavigatorUtil';
import NavigatorBar from '../common/NavigationBar';
import { 
    MORE_MENU 
} from '../common/MORE_MENU';
import CustomTheme from './CustomTheme';
import GlobalStyles from '../ask/styles/GlobalStyles';
import BackPressComponent from '../common/BackPressComponent';
import ViewUtil from '../util/ViewUtil';
import actions from "../../action";
import url from '../util/url'; 
import { 
    get 
} from '../util/request';

class Setting extends Component {
  constructor(props){
      super(props);
      this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
  }

  LoginOutDel = () => {
    let loginOutObj = {
        'mobileNumber': '',
        'uniqueToken': '',
    }
    const { islogout } = this.props;
    islogout({
        retCode: "0000",
        data: loginOutObj
    })
    AsyncStorage.removeItem('loginStatus');
    NavigatorUtil.resetToHomePage({
        navigation: this.props.navigation
    })
  }

  onClick = (menu)=> {
      switch(menu) {
            case MORE_MENU.MyInfo:
                RouteName = 'Myinfo';
                break;
            case MORE_MENU.Myfavorite:
                RouteName = 'My';
                break;
            case MORE_MENU.ChangeMobile:
                RouteName = 'Changemob';
                break;
            case MORE_MENU.ChangePwd:
                RouteName = 'Forpwd';
                break;
            case MORE_MENU.AboutUs:
                RouteName = 'AboutYdr';
                break;
            case MORE_MENU.ClearInfo:
                RouteName = 'AboutYdr';
                break;
            case MORE_MENU.LoginOut:
                RouteName = 'Login';
                break;
            case MORE_MENU.Sortcategory:
                RouteName = 'Sortcategory';
                break;
            case MORE_MENU.Selcategory:
                RouteName = 'Selcategory';
                break;
            case MORE_MENU.CodePush:
                RouteName = 'CodePush';
                break;
            case MORE_MENU.Contactus:
                RouteName = 'Contactus';
                break;
      }
      if (RouteName) {
        NavigatorUtil.goPage(this.props,RouteName)
      }
  }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    ThemeBtn = async() => {
        const { onShowCustomThemeView, onThemeInit } = this.props;
        onThemeInit({
            retCode: "0002",
            data: {}
        })
        let result = await get(url.getThemeList())
        if (result.status == 200 && result.data) {
            let reultdata = result.data.data;
            onThemeInit({
                retCode: "0000",
                data: reultdata
            })
            onShowCustomThemeView(true);
            this.renderCustomThemeView()
        } else {

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

    onBackPress() {
        this.onBack();
        return true;
    }

    onBack() {
        NavigatorUtil.goBack(this.props.navigation)
    }

    getItem = (menu) => {
        const { theme } = this.props;
        return ViewUtil.getMenuItem(()=>this.onClick(menu),menu,theme.theme_code )
    }

  render() {
    const { theme, loginstate } = this.props;
    let navigatorBar = <NavigatorBar
                            leftButton = {ViewUtil.getLeftBackButton( () => NavigatorUtil.goBack(this.props.navigation) )}
                            title = {'设置'}
                            rightButton = { ViewUtil.getThemeButton( () => this.ThemeBtn() ) }
                            style={theme.styles.navBar}
                        />
    return (
        <View style={GlobalStyles.root_container}>
            {navigatorBar}
            <ScrollView>
                <View style={GlobalStyles.line}/>
                {/* 判断是否为登录 */}
                {loginstate && loginstate.mobileNumber?this.getItem(MORE_MENU.MyInfo):<View></View>}
                {loginstate && loginstate.mobileNumber?<View style={GlobalStyles.line}/>:<View></View>}
                {this.getItem(MORE_MENU.Selcategory)}
                <View style={{flex:1,height:16,backgroundColor:'#eee',opacity:0.5}}></View>
                {loginstate && loginstate.mobileNumber?this.getItem(MORE_MENU.ChangePwd):<View></View>}
                <View style={GlobalStyles.line}/>
                {/* {this.getItem(MORE_MENU.Sortcategory)}
                <View style={{flex:1,height:16,backgroundColor:'#eee',opacity:0.5}}></View> */}
                {this.getItem(MORE_MENU.AboutUs)}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Contactus)}
                <View style={GlobalStyles.line}/>
                {loginstate && loginstate.mobileNumber?<TouchableOpacity style={styles.out}
                    onPress={() => this.LoginOutDel()}
                    activeOpacity={1}
                >
                    <Text style={styles.outText}>退出登录</Text>
                </TouchableOpacity> : <View></View>}
            </ScrollView>
        </View>
    );
  }
}


const mapStateToProps = state => ({
    theme: state.theme.theme,
    customThemeViewVisible: state.theme.customThemeViewVisible,
    loginstate: state.loginstate.loginstate
})

const mapDispatchToProps = dispatch => ({
    onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show)),
    onThemeInit: (sendInfo) => dispatch(actions.onThemeInit(sendInfo)),
    islogout: (sendInfo) => dispatch(actions.islogout(sendInfo))
})

export default connect(mapStateToProps,mapDispatchToProps)(Setting)

const styles = StyleSheet.create({
    about_left: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    item: {
        backgroundColor: '#fff',
        padding: 10,
        height: 160,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    grounpTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'
    },
    out: {
        flex: 1,
        height: 50,
        marginTop: 20,
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center'
    },
    outText: {
        fontSize: 16
    }
})

