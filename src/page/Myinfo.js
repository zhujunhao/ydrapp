import React,{ Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import ImagePicker from 'react-native-image-picker'
import NavigatorUtil from '../navigators/NavigatorUtil';
import NavigatorBar from '../common/NavigationBar';
import BackPressComponent from '../common/BackPressComponent';
import GlobalStyles from '../ask/styles/GlobalStyles';
import ViewUtil from '../util/ViewUtil';
import actions from "../../action";
import { 
    connect 
} from 'react-redux';
import Toast from 'react-native-easy-toast';
import url from '../util/url'; 
import { 
    get,
    post
} from '../util/request';
import { 
    Base64 
} from "js-base64";

class Myinfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            avatarimage: ''
        }
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
        this.loadData()
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    onBackPress() {
        this.onBack();
        return true;
    }

    loadData = async() => {
        const { onLoadMyInfo } = this.props;
        onLoadMyInfo({
            retCode: "0002",
            data: {}
        })
        let result = await get(url.getMyInfo())
        console.log("loginresult",result)
        if (result.status == 200 && result.data) {

            onLoadMyInfo({
                retCode: "0000",
                data: result.data
            })
        } else {
            onLoadMyInfo({
                retCode: "0001",
                data: {}
            })
            this.refs.toast.show('查询信息失败');
        }
    }

    saveMyInfo = async() => {
        const { myinfo } = this.props;

        let data = new FormData();
        data.append("nickName", encodeURI(myinfo.nickName));
        data.append("file", {
            type: 'multipart/form-data',
            uri: this.state.avatarimage.uri,
            name: 'timg.png'
        });

        let result = await post(url.editMyInfo() ,data)
        console.log("resultffff",result)
        if (result.status == 201 && result.data) {
            this.refs.toast.show('修改成功');
        } else {
            this.refs.toast.show('修改失败');
        }
    }

    // 选择图片或相册
    onClickChoosePicture = () => {
        const options = {
            title: '',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择照片',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
                console.log("用户已取消图像选取器")
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = {uri: response.uri};
                this.setState({
                    avatarimage: source,
                });
                console.warn(this.state.avatarimage.uri);
            }
        });
    }

    changetext(text) {
        const { onLoadMyInfo, myinfo } = this.props;
        console.log("myinfo333",myinfo)
        let changeinfo = {
            nickName: text,
            gender: myinfo.gender,
            avatar: myinfo.avatar,
            invitationCode: myinfo.invitationCode,
            mobileNumber: myinfo.mobileNumber,
            customerLevel: myinfo.customerLevel
        }
        onLoadMyInfo({
            retCode: "0003",
            data: changeinfo
        })
    }

    onBack() {
        NavigatorUtil.goBack(this.props.navigation)
    }

    render(){
        const { theme, myinfo } = this.props;
        console.log("myinfo23",myinfo)
        let navigatorBar = <NavigatorBar
                                leftButton = {ViewUtil.getLeftBackButton( () => NavigatorUtil.goBack(this.props.navigation) )}
                                title = {'个人资料'}
                                style={theme.styles.navBar}
                            />
        const placeholder = myinfo && myinfo.nickName? myinfo.nickName:"";
        let inputView = <TextInput
                            ref="input"
                            placeholder={placeholder}
                            onChangeText={text => this.changetext(text)}
                            style={styles.textInput}
                            value={myinfo && myinfo.nickName? myinfo.nickName:''}
                        ></TextInput>
        return(
            <View style={GlobalStyles.root_container}>
                {navigatorBar}
                <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                    <TouchableOpacity style={{height:120,flexDirection:'row',alignItems:'center',justifyContent:'center'}} onPress={() => this.onClickChoosePicture()} activeOpacity={1}>
                        <View style={{height:120,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            {myinfo && myinfo.avatar && this.state.avatarimage =="" ? <Image style={{height: 80, width: 80,borderRadius:40,borderColor:'#eee',borderWidth:1}}
                                defaultSource={require('../../res/backgroundPic.png')} //默认图片
                                source={{uri: url.imagepath(myinfo.avatar)}}
                            /> : <Image style={{height: 80, width: 80,borderRadius:40,borderColor:'#eee',borderWidth:1}}
                                defaultSource={require('../../res/backgroundPic.png')} //默认图片
                                source={this.state.avatarimage} 
                            />}
                        </View>
                    </TouchableOpacity>

                    <View style={{flexDirection:'row',height:50,backgroundColor:'#fff'}}>
                        <Text style={{height:50,lineHeight:50,fontSize:14,marginLeft:10}}>昵称：</Text>
                        <View style={{flex:1}}></View>
                        {inputView}
                    </View>
                    <View style={{height:1,backgroundColor:'#e5e5e5',marginLeft:10,marginRight:10}}></View>
                    <View style={{flexDirection:'row',height:50,backgroundColor:'#fff'}}>
                        <Text style={{height:50,lineHeight:50,fontSize:14,marginLeft:10}}>账号：</Text>
                        <View style={{flex:1}}></View>
                        <Text style={{height:50,lineHeight:50,fontSize:14,marginRight:10}}>{myinfo && myinfo.mobileNumber?`${myinfo.mobileNumber.substr(0,3)}****${myinfo.mobileNumber.substr(7,4)}`:`暂无`}</Text>
                    </View>
                    <View style={{height:1,backgroundColor:'#e5e5e5',marginLeft:10,marginRight:10}}></View>
                    <View style={{flexDirection:'row',height:50,backgroundColor:'#fff'}}>
                        <Text style={{height:50,lineHeight:50,fontSize:14,marginLeft:10}}>邀请码：</Text>
                        <View style={{flex:1}}></View>
                        <Text style={{height:50,lineHeight:50,fontSize:14,marginRight:10}}>{myinfo && myinfo.invitationCode ? myinfo.invitationCode : `暂无` }</Text>
                    </View>
                    <View style={{height:1,backgroundColor:'#e5e5e5',marginLeft:10,marginRight:10}}></View>
                    <View style={{flexDirection:'row',height:50,backgroundColor:'#fff'}}>
                        <Text style={{height:50,lineHeight:50,fontSize:14,marginLeft:10}}>级别：</Text>
                        <View style={{flex:1}}></View>
                        <Text style={{height:50,lineHeight:50,fontSize:14,marginRight:10}}>暂无</Text>
                    </View>
                    <View style={{height:1,backgroundColor:'#e5e5e5',marginLeft:10,marginRight:10}}></View>

                    <TouchableOpacity onPress={()=>this.saveMyInfo()}>
                        <View style={{width:320,height:46,borderRadius:25,backgroundColor:theme.theme_code,marginTop:30,justifyContent:'center',opacity: 0.8}}>
                            <Text style={{lineHeight:40,color:'#fff',fontSize:15,textAlign:'center'}}>保  存</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Toast ref={'toast'}
                    position={'center'}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    myinfo : state.myinfo.myinfo,
})

const mapDispatchToProps = dispatch => ({
    onLoadMyInfo: (sendData) => dispatch(actions.onLoadMyInfo(sendData))
})

export default connect(mapStateToProps,mapDispatchToProps)(Myinfo)

const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        textAlign: 'right',
        fontSize: 13,
        marginRight: 10
    },
});

