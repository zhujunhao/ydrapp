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
import { 
    connect 
} from 'react-redux';
import BackPressComponent from "../common/BackPressComponent";
import NavigatorUtil from '../navigators/NavigatorUtil';
import NavigatorBar from '../common/NavigationBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ViewUtil from '../util/ViewUtil';
import actions from "../../action";
import url from '../util/url'; 
import { 
    post 
} from '../util/request';

class Forpwd extends Component {
    constructor(props){
        super(props);
        this.state = {
            mobileNumber: '',
            passWord : '',
            verifyCode : '',
            time : 60,
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
        this.backPress.componentWillUnmout();
    }

    // 检查手机号码并发送验证码
    checkMob = async() => {
        if (!this.state.mobileNumber) {
            console.log("请输入正确的手机号码")
            return '0001'
        }
        let data = {
            mobileNumber: this.state.mobileNumber
        }
        let result = await post(url.sendCode() ,data)
        if (result && result.data && result.data.msg == 'ok') {
            return "0000"
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

    //修改密码
    changePwdBtn = async() => {
        if (!this.state.mobileNumber) {
            return '手机号码不能为空'
        }
        if (!this.state.passWord) {
            return '密码不能为空'
        }
        if (!this.state.verifyCode) {
            return '验证码不能为空'
        }
        let data = new FormData();
        data.append("mobileNumber", this.state.mobileNumber);
        data.append("verifyCode", this.state.verifyCode);
        data.append("passWord", this.state.passWord);
        let result = await post(url.changePw() ,data)
        console.log("regidter",result)
        if (result.status == 200 && result.data) {
            const { changepw } = this.props;
            changepw({
                retCode: "0000",
                data: {}
            })
            //保存登录信息到本地
            AsyncStorage.setItem('loginstate',JSON.stringify({}))
            NavigatorUtil.resetToHomePage({
                navigation: this.props.navigation
            })
        } else {
            this.refs.toast.show('修改密码失败');
        }
    }

    render(){
        const { theme, sendStatus } = this.props;
        let navigatorBar = <NavigatorBar
                                leftButton = {ViewUtil.getLeftBackButton( () => NavigatorUtil.goBack(this.props.navigation) )}
                                title = {'修改登录密码'}
                                style={theme.styles.navBar}
                            />
        return(
            <View style={{flex:1}}>
                {navigatorBar}
                <ScrollView style={styles.container}>
                    <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:100}}>
                        {/* 用户名 */}
                        <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'center',height:59}}>
                                <AntDesign
                                    name={'mobile1'}
                                    size={20}
                                    style={{color:'#999',marginRight: 6,marginTop: 20}}
                                />
                                <TextInput
                                    style={{width:189,fontSize:14,height:59}}
                                    underlineColorAndroid='transparent'
                                    placeholderTextColor='#999'
                                    maxLength={11}
                                    onChangeText={(mobileNumber) => this.setState({mobileNumber})}
                                    value={this.state.mobileNumber}
                                    keyboardType='numeric'
                                    placeholder='请输入绑定的手机号码'
                                />
                                <View style={{width:100,height:59,justifyContent:'center'}}></View>
                            </View>
                            <View style={{backgroundColor:'#eee',height:1,width:320}}></View>
                        </View>
                        {/* 密码 */}
                        <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'center',height:59}}>
                                <AntDesign
                                    name={'lock'}
                                    size={20}
                                    style={{color:'#999',marginRight: 6,marginTop: 20}}
                                />
                                <TextInput
                                    style={{width:189,fontSize:14,height:59}}
                                    underlineColorAndroid='transparent'
                                    placeholderTextColor='#999'
                                    onChangeText={(passWord) => this.setState({passWord})}
                                    value={this.state.passWord}
                                    secureTextEntry={true}
                                    placeholder='请输入新登录密码'
                                />
                                <View style={{width:100,height:59,justifyContent:'center'}}></View>
                            </View>
                            <View style={{backgroundColor:'#eee',height:1,width:320}}></View>
                        </View>
                        <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'center',height:59}}>
                                <AntDesign
                                    name={'hourglass'}
                                    size={20}
                                    style={{color:'#999',marginRight: 6,marginTop: 20}}
                                />
                                <TextInput
                                    style={{width:189,fontSize:14,height:59}}
                                    underlineColorAndroid='transparent'
                                    placeholderTextColor='#999'
                                    maxLength={6}
                                    onChangeText={(verifyCode) => this.setState({verifyCode})}
                                    value={this.state.verifyCode}
                                    keyboardType='numeric'
                                    placeholder='请输入手机验证码'
                                />
                                <View style={{width:1,height:20,marginLeft:10,marginRight:10,marginTop:20,backgroundColor:'#dcdcdc'}}></View>
                                {sendStatus && sendStatus.smscode == 1  ? <View style={{width:80,justifyContent:'center'}}>
                                                                                <Text style={{height:59,lineHeight:59,color:'#999',fontSize:13,textAlign:'center'}}>{`剩余${sendStatus && sendStatus.timeStr}秒`}</Text>
                                                                          </View> : <TouchableOpacity onPress={() => this.sendSms() }>
                                                                                    <View style={{width:80,justifyContent:'center'}}>
                                                                                        <Text style={{height:59,lineHeight:59,color:'#999',fontSize:13}}>获取验证码</Text>
                                                                                    </View>
                                                                          </TouchableOpacity>}
                            </View>
                            <View style={{backgroundColor:'#eee',height:1,width:320}}></View>
                        </View>
                        {/* 修改登录密码 */}
                        <TouchableOpacity onPress={() => this.changePwdBtn() }>
                            <View style={{width:320,height:46,borderRadius:25,backgroundColor:theme.theme_code,marginTop:30,justifyContent:'center'}}>
                                <Text style={{lineHeight:40,color:'#fff',fontSize:15,textAlign:'center'}}>修改登录密码</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    sendStatus: state.loginstate.sendStatus,
})

const mapDispatchToProps = dispatch => ({
    changepw: (sendInfo) => dispatch(actions.changepw(sendInfo)),
    sendCode: (sendData) => dispatch(actions.sendCode(sendData))
})

export default connect(mapStateToProps,mapDispatchToProps)(Forpwd)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    valNameTxt: {
        fontSize: 13,
        color: "#333"
    },
    txtPut: {
        fontSize: 13,
        color: "#333"
    }
});