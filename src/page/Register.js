import React,{ Component } from 'react';
import { 
    StyleSheet,
    ScrollView, 
    Text, 
    View,
    TouchableOpacity, 
    TextInput,
    AsyncStorage 
} from 'react-native';
import BackPressComponent from "../common/BackPressComponent";
import NavigatorUtil from '../navigators/NavigatorUtil';
import NavigatorBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import AntDesign from 'react-native-vector-icons/AntDesign';
import actions from "../../action";
import { 
    connect 
} from 'react-redux';
import { 
    Dimensions 
} from "react-native";
import Toast from 'react-native-easy-toast';
import url from '../util/url'; 
import { 
    post 
} from '../util/request';

var WINDOW = Dimensions.get("window");
var height = WINDOW.height;

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uesrName: '',
            mobileNumber: '',
            passwordText: '',
            passWord: '',
            invitationCode: '',
            verifyCode: '',
            pwdShow: true
        }
        this.backPress = new BackPressComponent({backPress: ()=> this.onBackPress()});
    }

    onBackPress() {
        NavigatorUtil.goBack(this.props.navigation);
        return true;
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmout() {
        this.backPress.componentWillUnmout();
    }

    clickPage(pageName) {
        if (pageName == "back") {
            NavigatorUtil.goBack(this.props.navigation);
        }
    }

    // 发送验证码
    sendSms = async() => {
        const { sendCode, sendStatus } = this.props;
        let nowtime = sendStatus.timeStr;
        if (this.state.mobileNumber == "") {
            this.refs.toast.show('请输入正确的手机号码');
            return
        }
        sendCode({
            retCode: "0002",
            data: {
                "smscode": "1",
                "timeStr": "60"
            }
        })
        //清除定时器
        clearInterval(this.timer)
        //倒计时
        this.timer= setInterval(()=>{

            if (nowtime > 0) {
                nowtime-- ;
                sendCode({
                    retCode: "0002",
                    data: {
                        "smscode": "1",
                        "timeStr": nowtime
                    }
                })
            } else {
                sendCode({
                    retCode: "0000",
                    data: {
                        "smscode": "0",
                        "timeStr": "60"
                    }
                })
                clearInterval(this.timer)
            }
        },1000)

        let data = new FormData();
        data.append("mobileNumber", this.state.mobileNumber);
        let result = await post(url.sendCodeURL() ,data)
        if (result && result.data && result.data.msg == 'ok') {
            return "0000"
        }
    }

    // 立即注册
    registerPart = async() => {
        const { register } = this.props;
        if ( !this.state.mobileNumber ) {
            return
        }

        if ( !this.state.verifyCode ) {
            return
        }
        if ( !this.state.passWord)  {
            return
        }
        register({
            retCode: "0002",
            data: {}
        })
        let data = new FormData();
        data.append("mobileNumber", this.state.mobileNumber);
        data.append("verifyCode", this.state.verifyCode);
        data.append("passWord", this.state.passWord);
        data.append("invitationCode", this.state.invitationCode);
        let result = await post(url.submitRegister() ,data)
        console.log("regidter",result)
        if (result.status == 200 && result.data) {
            let loginstate = {
                'uniqueToken': result.data.token,
                'mobileNumber': this.state.mobileNumber,
                'invitationCode': result.data.invitationCode,
            }
            
            register({
                retCode: "0000",
                data: loginstate
            })
            //保存登录信息到本地
            AsyncStorage.setItem('loginStatus',JSON.stringify(loginstate))
            NavigatorUtil.resetToHomePage({
                navigation: this.props.navigation
            })
        } else {
            register({
                retCode: "0001",
                data: {}
            })
            this.refs.toast.show('注册失败');
        }
    }

    render() {
        const { theme, sendStatus } = this.props;
        let navigatorBar = <NavigatorBar
                                leftButton = {ViewUtil.getLeftBackButton( () => NavigatorUtil.goBack(this.props.navigation) )}
                                title = {'新用户注册'}
                                style={theme.styles.navBar}
                            />
        let regPart = <View style={{flexDirection:'column',alignItems:'center'}}>
            <View style={{flexDirection:'row',height:59}}>
                <AntDesign
                    name={'mobile1'}
                    size={20}
                    style={{color:'#666',marginRight: 6,marginTop: 20}}
                />
                <TextInput
                    style={{width:189,fontSize:14,height:59,color: '#999'}}
                    underlineColorAndroid='transparent'
                    placeholderTextColor='#999'
                    maxLength={11}
                    onChangeText={(mobileNumber) => this.setState({mobileNumber})}
                    value={this.state.mobileNumber}
                    keyboardType='numeric'
                    placeholder='请输入手机号'
                />
                <View style={{width:100,height:59,justifyContent:'center'}}></View>
            </View>

            <View style={{backgroundColor:'#eee',height:1,width:320}}></View>

            <View style={{flexDirection:'row',height:59,alignItems:'center'}}>
                <AntDesign
                    name={'hourglass'}
                    size={20}
                    style={{color:'#666',marginRight: 6}}
                />
                <TextInput
                    style={{width:189,fontSize:14,height:59,color: '#999'}}
                    underlineColorAndroid='transparent'
                    placeholderTextColor='#999'
                    maxLength={6}
                    onChangeText={(verifyCode) => this.setState({verifyCode})}
                    value={this.state.verifyCode}
                    keyboardType='numeric'
                    placeholder='请输入验证码'
                />
                <View style={{width:1,height:20,marginLeft:10,marginRight:10,backgroundColor:'#dcdcdc'}}></View>
                {sendStatus && sendStatus.smscode == 1 ? <View style={{width:80,height:46,justifyContent:'center'}}>
                                                            <Text style={{color:'#999',fontSize:13,textAlign:'center'}}>{`剩余${sendStatus && sendStatus.timeStr}秒`}</Text>
                                                        </View> : <TouchableOpacity onPress={() => this.sendSms() }>
                                                                <View style={{width:80,height:46,justifyContent:'center'}}>
                                                                    <Text style={{color:'#999',fontSize:13,textAlign:'center'}}>获取验证码</Text>
                                                                </View>
                                                        </TouchableOpacity>}
            </View>
            <View style={{backgroundColor:'#eee',height:1,width:320}}></View>
            {/* 密码 */}
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:59}}>
                <AntDesign
                    name={'lock'}
                    size={20}
                    style={{color:'#666',marginRight: 6}}
                />
                <TextInput
                    style={{width:189,fontSize:14,height:59}}
                    underlineColorAndroid='transparent'
                    placeholderTextColor='#999'
                    onChangeText={(passWord) => this.setState({passWord})}
                    value={this.state.passWord}
                    secureTextEntry={true}
                    placeholder='请输入登录密码'
                />
                <View style={{width:100,height:46,justifyContent:'center'}}></View>
            </View> 
            <View style={{backgroundColor:'#eee',height:1,width:320}}></View>
            {/* 邀请人号码 */}
            <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',height:59}}>
                    <AntDesign
                        name={'barcode'}
                        size={20}
                        style={{color:'#666',marginRight: 6,marginTop: 20}}
                    />
                    <TextInput
                        style={{width:189,fontSize:14,height:59,color: '#999'}}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#999'
                        onChangeText={(invitationCode) => this.setState({invitationCode})}
                        value={this.state.invitationCode}
                        placeholder='请输入邀请码'
                    />
                    <View style={{width:100,height:59,justifyContent:'center'}}></View>
                </View>
                <View style={{backgroundColor:'#eee',height:1,width:320}}></View>
            </View>
            {/* 立即注册 */}
            <TouchableOpacity onPress={() => this.registerPart() }>
                <View style={{width:320,height:46,borderRadius:25,backgroundColor:theme.theme_code,marginTop:30,justifyContent:'center',opacity:0.8}}>
                    <Text style={{lineHeight:40,color:'#fff',fontSize:15,textAlign:'center'}}>立即注册</Text>
                </View>
            </TouchableOpacity>
        </View>

        
        return(
            <View style={{flex:1}}>
                {navigatorBar}
                <ScrollView style={{ flex: 1}}
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{height:100,justifyContent:'center',marginTop:20}}>
                        <Text style={{textAlign:"center",color:'#333',fontSize:20,fontWeight:'bold'}}>欢迎来到悦达人</Text>
                    </View>
                    {regPart}
                </ScrollView>
                
                <Toast ref={'toast'}
                    position={'center'}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    sendStatus: state.loginstate.sendStatus,
})

const mapDispatchToProps = dispatch => ({
    register: (sendData) => dispatch(actions.register(sendData)),
    sendCode: (sendData) => dispatch(actions.sendCode(sendData))
})

export default connect(mapStateToProps,mapDispatchToProps)(Register)


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    typeNames: {
        fontSize:13,
        width:100,
        color:'#333'
    },
    inputVal: {
        fontSize:13,
        backgroundColor:'#fff'
    },
    imgbg: {
        flex:1,
        height: height - 50
    }
});