import React,{ Component } from 'react';
import { 
    connect 
} from 'react-redux';
import { 
    StyleSheet,
    ScrollView, 
    Text, 
    View,
    TouchableOpacity, 
    TextInput, 
    AsyncStorage, 
    Image 
} from 'react-native';
import BackPressComponent from "../common/BackPressComponent";
import NavigatorUtil from '../navigators/NavigatorUtil';
import NavigatorBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import AntDesign from 'react-native-vector-icons/AntDesign';
import actions from "../../action";
import Toast from 'react-native-easy-toast';
import url from '../util/url'; 
import { 
    post 
} from '../util/request';

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            mobileNumber: '',
            passWordtext: '',
            verifyCode: '',
            pwdShow: true,
            time : 60,
            loginstate : 'mobile'
        }
        this.backPress = new BackPressComponent({backPress: ()=> this.onBackPress()});
    }

    onBackPress() {
        NavigatorUtil.goBack(this.props.navigation);
        return true;
    }

    componentDidMount() {
        const { sendCode } = this.props;
        this.backPress.componentDidMount();
        sendCode({
            retCode: "0000",
            data: {
                "smscode": "0",
                "timeStr": "60"
            }
        })
    }

    componentWillUnmout() {
        this.timer&&clearInterval(this.timer);//同时为真的才执行卸载
        this.backPress.componentWillUnmout();
    }

    clickPage = (pageName) => {
        if (pageName == "忘记密码") {
            NavigatorUtil.goPage(this.props,'Forpwd')
        } else if (pageName == "新用户注册") {
            NavigatorUtil.goPage(this.props,'Register')
        } else if (pageName == "back") {
            NavigatorUtil.goBack(this.props.navigation);
        }
    }

    logintype = () => {
        if (this.state.loginstate == 'pwd') {
            this.setState ({
                loginstate : 'mobile'
            })
        } else {
            this.setState ({
                loginstate : 'pwd'
            })
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
        console.log("ioiouiiuii", this.state.mobileNumber)
        let result = await post(url.sendCodeURL() ,data)
        if (result && result.data && result.data.msg == 'ok') {
            return "0000"
        }
    }

    // 校验验证码登录
    checkVerify = async() => {
        if (!this.state.mobileNumber) {
            return '0001'
        }

        if (!this.state.verifyCode) {
            return '0002'
        }
        const { islogin } = this.props;
        let data = new FormData();
        data.append("logintype", "100");
        data.append("mobileNumber", this.state.mobileNumber);
        data.append("passWord", "");
        data.append("verifyCode", this.state.verifyCode);
        islogin({
            retCode: "0002",
            data: {}
        })
        let result = await post(url.submitLogin(), data)
        if (result.status == 200 && result.data) {
            let loginstate = {
                'uniqueToken': result.data.token,
                "refreshToken": result.data.refreshtoken,
                "avatar": result.data.avatar,
                'mobileNumber': this.state.mobileNumber,
                'invitationCode': result.data.invitationCode,
            }
            this.refs.toast.show('登录成功');
            islogin({
                retCode: "0000",
                data: loginstate
            })
            //保存登录信息到本地
            AsyncStorage.setItem('loginStatus',JSON.stringify(loginstate))
            NavigatorUtil.resetToHomePage({
                navigation: this.props.navigation
            })
        } else {
            islogin({
                retCode: "0001",
                data: {}
            })
            this.refs.toast.show('登录失败');
        }
    }

    // 校验密码登录
    checkPwd = async() => {
        if (!this.state.mobileNumber) {
            return '0001'
        }

        if (!this.state.passWordtext) {
            return '0003'
        }
        const { islogin } = this.props;
        let data = new FormData();
        data.append('logintype', "101")
        data.append('mobileNumber', this.state.mobileNumber)
        data.append('passWord', this.state.passWordtext)
        data.append('verifyCode', "")

        islogin({
            retCode: "0002",
            data: {}
        })
        let result = await post(url.submitLogin(), data)
        if (result.status == 200 && result.data) {
            let loginstate = {
                'uniqueToken': result.data.token,
                "refreshToken": result.data.refreshtoken,
                "avatar": result.data.avatar,
                'invitationCode': result.data.invitationCode,
                'mobileNumber': this.state.mobileNumber,
            }
            this.refs.toast.show('登录成功');
            islogin({
                retCode: "0000",
                data: loginstate
            })
            //保存登录信息到本地
            AsyncStorage.setItem('loginStatus',JSON.stringify(loginstate))
            NavigatorUtil.resetToHomePage({
                navigation: this.props.navigation
            })
        } else {
            islogin({
                retCode: "0001",
                data: {}
            })
            this.refs.toast.show('登录失败');
        }
    }

    render(){
        const { theme, sendStatus } = this.props;
        let navigatorBar = <NavigatorBar
                                leftButton = {ViewUtil.getLeftBackButton( () => NavigatorUtil.goBack(this.props.navigation) )}
                                title = {'登录'}
                                style={theme.styles.navBar}
                            />

        let msgPart =  <View style={{flexDirection:'column',alignItems:'center'}}>
            {/* 手机号码 */}
            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <View style={{width:320,height:46,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                    <AntDesign
                        name={'mobile1'}
                        size={20}
                        style={{color:'#666', marginLeft: 16,marginRight: 6}}
                    />
                    <TextInput
                        style={{width:170,fontSize:14,height:59,color: '#999'}}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#999'
                        maxLength={11}
                        onChangeText={(mobileNumber) => this.setState({mobileNumber})}
                        value={this.state.mobileNumber}
                        keyboardType='numeric'
                        placeholder='请输入手机号'
                    />
                    <View style={{width:100,height:46,justifyContent:'center'}}></View>
                </View>
            </View>
            <View style={{backgroundColor:'#eee',height:1,width:320}}></View>
            <View style={{height:16}}></View>
            {this.state.loginstate != 'pwd' ? <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <View style={{width:320,height:46,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                    <AntDesign
                        name={'hourglass'}
                        size={20}
                        style={{color:'#666', marginLeft: 16,marginRight: 6}}
                    />
                    <TextInput
                        style={{width:170,fontSize:14,height:59,color: '#999'}}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#999'
                        onChangeText={(verifyCode) => this.setState({verifyCode})}
                        value={this.state.verifyCode}
                        maxLength={6}
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
            </View> : <View style={{width:320,flexDirection:'row',justifyContent:'center',alignItems:'center',height:46}}>
                <AntDesign
                    name={'lock'}
                    size={20}
                    style={{color:'#666',marginLeft: 16,marginRight: 6}}
                />
                <TextInput
                    style={{width:170,fontSize:14,height:46}}
                    underlineColorAndroid='transparent'
                    placeholderTextColor='#999'
                    onChangeText={(passWordtext) => this.setState({passWordtext})}
                    value={this.state.passWordtext}
                    secureTextEntry={true}
                    placeholder='请输入登录密码'
                />
                <View style={{width:100,height:46,justifyContent:'center'}}></View>
            </View> }

            <View style={{backgroundColor:'#eee',height:1,width:320}}></View>
            {/* 密码登录和立即注册 */}
            <View style={{flexDirection:'row',width:300,height:30,marginTop:20}}>
                <TouchableOpacity onPress={() => this.logintype() }>
                    <Text style={{lineHeight:30,color:'#333',fontSize:13,textAlign:'left',marginLeft:10}}>{this.state.loginstate == 'pwd' ? "使用验证码登录" : "使用密码登录" }</Text>
                </TouchableOpacity>
                <View style={{flex:1}}></View>
                <TouchableOpacity onPress={() => this.clickPage('新用户注册') }>
                    <View style={{width:100,height:30,justifyContent:'center'}}>
                        <Text style={{lineHeight:30,color:theme.theme_code,fontSize:13,textAlign:'right',marginRight:10}} >立即注册</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        
        return (
            <ScrollView style={styles.container}>
                {navigatorBar}
                <View style={{flex:1,height:80,marginTop:46, alignItems:'center'}}>
                    <Image style={{height: 80, width: 80}}
                        source={require('../../res/ydrlogo.png')}
                    />
                </View>
                <View style={{flex:1,flexDirection:'column',alignItems:'center',marginTop:50}}>
                    {msgPart}
                    <View style={{height:10}}></View>
                    {/* 验证码登录 */}
                    {this.state.loginstate != 'pwd' ? <TouchableOpacity onPress={()=>this.checkVerify()}>
                        <View style={{width:320,height:46,borderRadius:25,backgroundColor:theme.theme_code,marginTop:10,justifyContent:'center',opacity: 0.8}}>
                            <Text style={{lineHeight:40,color:'#fff',fontSize:15,textAlign:'center'}}>登  录</Text>
                        </View>
                    </TouchableOpacity> : <TouchableOpacity onPress={()=>this.checkPwd()}>
                        <View style={{width:320,height:46,borderRadius:25,backgroundColor:theme.theme_code,marginTop:10,justifyContent:'center',opacity: 0.8}}>
                            <Text style={{lineHeight:40,color:'#fff',fontSize:15,textAlign:'center'}}>登  录</Text>
                        </View>
                    </TouchableOpacity>}
                </View>
                <Toast ref={'toast'}
                    position={'center'}
                />
            </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    sendStatus: state.loginstate.sendStatus,
})

const mapDispatchToProps = dispatch => ({
    islogin: (sendData) => dispatch(actions.islogin(sendData)),
    sendCode: (sendData) => dispatch(actions.sendCode(sendData))
})

export default connect(mapStateToProps,mapDispatchToProps)(Login)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});