import React from 'react';
import {
    Alert,
    DeviceInfo,
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Clipboard,
    CameraRoll
} from "react-native";
import Toast from 'react-native-easy-toast';
import RNFS from 'react-native-fs';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import BackPressComponent from "../common/BackPressComponent";
import NavigatorUtil from "../navigators/NavigatorUtil";
import GlobalStyles from '../ask/styles/GlobalStyles';
import Imgshare from "../common/Imgshare";
import ViewUtil from '../util/ViewUtil';
import url from '../util/url';
export const FLAG_ABOUT = {flag_about: 'about',flag_about_me:'about_me'};

class ElasticHead {
    constructor(props,updateState,loginstate) {
        this.props = props;
        this.updateState = updateState;
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

    componentWillmout() {
    }

    onShare() {
        this.DownloadLocalImage('http://r.photo.store.qq.com/psb?/V14gV2Ft3x6LH8/UkpBBlV3rJyASB.Zm8K9l7B12oPMOMjFXVN8DHDyYU4!/r/dL4AAAAAAAAA')
    }

    DownloadLocalImage=(uri)=> {
        if (!uri) return null;
        Alert.alert(
            '分享',
            '分享的图片会保存到相册中',
            [
                {text:'取消',onPress:()=>null},
                {text:'确定',onPress:()=> 
                    new Promise((resolve, reject) => {
                        let timestamp = (new Date()).getTime();//获取当前时间错
                        let random = String(((Math.random() * 1000000) | 0))//六位随机数
                        let dirs = Platform.OS === 'ios' ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath; //外部文件，共享目录的绝对路径（仅限android）
                        const downloadDest = `${dirs}/${timestamp+random}.jpg`;
                        const formUrl = uri;
                        const options = {
                            fromUrl: formUrl,
                            toFile: downloadDest,
                            background: true,
                            begin: (res) => {
                                // console.log('begin', res);
                                // console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
                            },
                        };
                        try {
                            const ret = RNFS.downloadFile(options);
                            ret.promise.then(res => {
                                console.log('success', res);
                                // console.log('file://' + downloadDest)
                                var promise = CameraRoll.saveToCameraRoll(downloadDest);
                                promise.then(function(result) {
                                    //alert('保存成功！地址如下：\n' + result);
                                }).catch(function(error) {
                                        console.log('error', error);
                                    // alert('保存失败！\n' + error);
                                });
                                resolve(res);
                            }).catch(err => {
                                reject(new Error(err))
                            });
                        } catch (e) {
                            reject(new Error(e))
                        }
                    })              
                } //打开遮罩
            ]
        );
    }

    gotoLogin(pathName) {
        NavigatorUtil.goPage(this.props,pathName)
    }

    copyText (textContent) {
        Clipboard.setString(textContent);
        //this.refs.toast.show('已复制到粘贴板');
    }

    getParallaxRenderConfig = (params) => {
        const { loginstate } = this.props
        let config = {};
        console.log("par",params)
        
        config.renderBackground = () => (
            <View key="background">
                <Image 
                    style={styles.stretch}
                    source={require('../../res/aboutme.jpg')}
                />
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        width: window.width,
                        backgroundColor: 'raba(0,0,0.4)',
                        height: PARALLAX_HEADER_HEIGHT
                    }}
                />
            </View>
        )

        config.renderForeground = () => (

            <View key="parallax-header" style={styles.parallaxHeader}>
                <View style={styles.avatar}>
                    {loginstate && loginstate.avatar ? <Image style={{height: 60, width: 60,borderRadius:30,borderColor:'#eee',borderWidth:1}}
                            defaultSource={require('../../res/backgroundPic.png')} //默认图片
                            source={{uri: url.imagepath(loginstate.avatar)}}
                        /> : <Image style={{height: 60, width: 60,borderRadius:30,borderColor:'#eee',borderWidth:1}}
                        defaultSource={require('../../res/backgroundPic.png')} //默认图片
                        source={require('../../res/backgroundPic.png')}
                /> }
                </View>
                {loginstate && loginstate.mobileNumber? <View style={{flexDirection:'column'}}>
                    <Text style={styles.loginText}>{`${loginstate && loginstate.mobileNumber.substr(0,3)}****${loginstate && loginstate.mobileNumber.substr(7,4)}`}</Text>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <Text style={styles.loginText}>{`我的邀请码：${loginstate.invitationCode}`}</Text>
                        <View style={{width:1,height:10}}></View>
                        {loginstate.invitationCode?<TouchableOpacity onPress={()=>this.copyText(loginstate.invitationCode)}>
                            <View style={{width:38,height:18,justifyContent:'center',alignItems:'center',backgroundColor:'#ff4800',borderRadius:10,borderColor:'#ff4800',borderWidth:1,marginLeft:10}}>
                                <Text style={{color:'#fff',fontSize:10}}>复制</Text>
                            </View>
                        </TouchableOpacity>:<View></View>}
                    </View>
                </View> : <TouchableOpacity 
                    activeOpacity={1}
                    onPress={()=>this.gotoLogin("Login")}
                >
                    <Text style={styles.sectionSpeakerText}>注册/登录</Text>
                </TouchableOpacity>}
                <Toast ref={'toast'}
                    position={'center'}
                />
            </View>
        )

        config.renderStickyHeader = () => (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{params.name}</Text>
            </View>
        )

        const leftpart = this.props.flagAbout == "about_me" ? ViewUtil.getLeftBackButton(() => NavigatorUtil.goBack(this.props.navigation)) : ViewUtil.getSetButton(() => NavigatorUtil.goPage(this.props,'Setting'));

        config.renderFixedHeader = () => (
            <View key="fixed-header" style={styles.fixedSection}>
                {leftpart}
                {ViewUtil.getShareButton(()=> this.onShare())}
            </View>
        )
        return config;
    }

    render(contentView,params) {
        const {theme}= this.props.flagAbout == "about_me" ? this.props.navigation.state.params : this.props;
        const renderConfig = this.getParallaxRenderConfig(params);
        return (
            <ParallaxScrollView style={{flex:1,flexDirection:'column'}}
                backgroundColor={theme.theme_code}
                contentBackgroundColor={GlobalStyles.backgroundColor}
                parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                backgroundScrollSpeed={10}
                {...renderConfig}>
                {contentView}
            </ParallaxScrollView>
        ) 
    }
}

export default ElasticHead;

const window = Dimensions.get('window');
const AVATAR_SIZE = 60;
const PARALLAX_HEADER_HEIGHT = 180;
const TOP = (Platform.OS === 'ios') ? 20 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0) : 15;
const STICKY_HEADER_HEIGHT = (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios + TOP : GlobalStyles.nav_bar_height_android;

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        alignItems: 'center',
        paddingTop:TOP
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop:TOP
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        paddingTop: 68,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    avatar: {
        marginLeft:30,
        marginRight:10,
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2,
        alignItems:'center',
        justifyContent:'center',
        width:60,
        height:60,
        backgroundColor:'#fff'
    },
    sectionSpeakerText: {
        color: '#fff',
        fontSize: 16,
        paddingVertical: 5,
        marginBottom: 10
    },
    loginText: {
        color: '#e5e5e5',
        height: 20,
        lineHeight: 20,
        fontSize: 14,
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 16,
        marginRight: 10,
        marginLeft: 10
    },
    stretch: {
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    }
});

