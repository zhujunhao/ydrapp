import React,{ Component } from 'react';
import ImagePicker from 'react-native-image-picker'
import { 
    StyleSheet,
    Text, 
    View,
    TouchableOpacity, 
    TextInput, 
    Image 
} from 'react-native';
import NavigatorUtil from '../navigators/NavigatorUtil';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigatorBar from '../common/NavigationBar';
import BackPressComponent from '../common/BackPressComponent';
import GlobalStyles from '../ask/styles/GlobalStyles';
import actions from "../../action";
import { 
    connect 
} from 'react-redux';
import Toast from 'react-native-easy-toast';
import url from '../util/url'; 
import { 
    post 
} from '../util/request';

class Add extends Component {
    constructor(props){
        super(props);
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
    }
    
    componentDidMount() {
        this.backPress.componentDidMount();
        const { editInfo } = this.props;
        editInfo({
            retCode: "0002",
            data: {
                questionTitle: "",
                mainimageurl: "",
                questionArrImg: "",
                questionContent: "",
                description: "",
                topics: "",
                oriimgurl: "",
                topicstxt: "",
                questionType: "01"
            }
        })
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    onBackPress() {
        this.onBack();
        return true;
    }

    onBack() {
        NavigatorUtil.goBack(this.props.navigation)
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
            const { editInfos, editInfo } = this.props;
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
                editInfo({
                    retCode: "0002",
                    data: {
                        questionTitle: editInfos.questionTitle,
                        mainimageurl: source.uri,
                        oriimgurl: source,
                        questionArrImg: editInfos.questionArrImg,
                        questionContent: editInfos.questionContent,
                        description: editInfos.description,
                        topics: editInfos.topics,
                        topicstxt: editInfos.topicstxt,
                        questionType: editInfos.questionType
                    }
                })
                console.warn(source.uri);
            }
        });
    }

    toTopicList = ()=> { 
        NavigatorUtil.goPage(this.props,'TopicList')
    }

    // 设置标题
    setTitle = (title) => {
        const { editInfos, editInfo } = this.props;
        editInfo({
            retCode: "0002",
            data: {
                questionTitle: title,
                mainimageurl: editInfos.mainimageurl,
                oriimgurl: editInfos.oriimgurl,
                questionArrImg: editInfos.questionArrImg,
                questionContent: editInfos.questionContent,
                description: editInfos.description,
                topics: editInfos.topics,
                topicstxt: editInfos.topicstxt,
                questionType: editInfos.questionType
            }
        })
    }

    // 设置内容
    setContent = (content) => {
        const { editInfos, editInfo } = this.props;
        editInfo({
            retCode: "0002",
            data: {
                questionTitle: editInfos.questionTitle,
                mainimageurl: editInfos.mainimageurl,
                oriimgurl: editInfos.oriimgurl,
                questionArrImg: editInfos.questionArrImg,
                questionContent: content,
                description: editInfos.description,
                topics: editInfos.topics,
                topicstxt: editInfos.topicstxt,
                questionType: editInfos.questionType
            }
        })
    }

    // 发布
    Release = async() => {
        const { editInfos } = this.props;
        if (!editInfos.questionTitle) {
            return
        }

        if (!editInfos.questionContent) {
            return
        }

        if (!editInfos.topics) {
            return
        }
        // if (!editInfos.questionType) {
        //     return
        // }
        let data = new FormData();
        data.append('questionTitle', encodeURI(editInfos.questionTitle))
        data.append("file", {
            type: 'multipart/form-data',
            uri: editInfos.oriimgurl.uri,
            name: 'timg.png'
        });
        data.append('questionArrImg', editInfos.questionArrImg)
        data.append('questionContent', encodeURI(editInfos.questionContent))
        data.append('topics', editInfos.topics)
        data.append('description', editInfos.description)
        data.append('questionType', "01")

        let result = await post(url.addCommunity(), data)
        
        if (result.status == 201 && result.data) {
            this.refs.toast.show('提交成功');
            NavigatorUtil.resetToHomePage({
                navigation: this.props.navigation
            })
        } else {
            this.refs.toast.show('提交失败');
        }
    }

    render(){
        const {
            theme,
            editInfos
        } = this.props;

        let navigatorBar = <NavigatorBar
                                title = {'发布'}
                                style={theme.styles.navBar}
                            />
        return(
            <View style={GlobalStyles.root_container}>
                {navigatorBar}
                <View style={{flex:1,flexDirection:'column'}}>
                    {/*展示图片*/}
                    <TouchableOpacity style={{alignItems:'center',justifyContent:'center', marginTop: 20, marginBottom:20}} onPress={() => this.onClickChoosePicture()} activeOpacity={1}>
                        {editInfos && editInfos.oriimgurl ?<Image 
                            defaultSource={require('../../res/backgroundPic.png')} //默认图片
                            source={editInfos && editInfos.oriimgurl ? editInfos.oriimgurl : ""} 
                            style={styles.uploadAvatar}
                        />: <View style={{width:340, height:170,backgroundColor:"#fff",borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                                <AntDesign
                                    name={'plus'}
                                    size={50}
                                    style={{color:'#999'}}
                                />
                        </View>}
                    </TouchableOpacity>
                    
                    <TextInput
                        style={{fontSize:14,height:59,color: '#999',backgroundColor:'#fff',paddingLeft:10}}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#999'
                        onChangeText={(questionTitle) => this.setTitle(questionTitle)}
                        value={editInfos && editInfos.questionTitle ? editInfos.questionTitle : ""}
                        placeholder='填写标题会有更多点赞哦～'
                    />
                    <View style={{height:1,backgroundColor:'#e5e5e5',marginLeft:20,marginRight:20}}></View>
                    <TextInput
                        style={{fontSize:14,height:59,color: '#999',backgroundColor:'#fff',paddingLeft:10}}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#999'
                        onChangeText={(questionContent) => this.setContent(questionContent)}
                        value={editInfos && editInfos.questionContent ? editInfos.questionContent : ""}
                        placeholder='添加正文～'
                    />
                    <View style={{height:1,backgroundColor:'#e5e5e5',marginLeft:20,marginRight:20}}></View>
                    <View style={{flexDirection:'column'}}>
                        <TouchableOpacity
                            style={styles.setting_item_container}
                            activeOpacity={1}
                            underlayColor='transparent'
                            onPress={() => this.toTopicList()}
                        >
                            <AntDesign
                                name={'slack'}
                                size={13}
                                style={{color:theme.theme_code,marginLeft:5}}
                            />
                            <Text style={{fontSize:14, marginLeft:10}}>{editInfos && editInfos.topicstxt ? editInfos.topicstxt : "选择更多话题"}</Text>
                            <View style={{flex:1, alignItems:'center', justifyContent:'flex-start' ,flexDirection: 'row'}}>

                            </View>
                            <AntDesign
                                name={'right'}
                                size={13}
                                style={{color:theme.theme_code,marginLeft:5,marginRight:10}}
                            />
                        </TouchableOpacity>
                        <View style={GlobalStyles.line}/>
                    </View>
                    <View style={{height:1,backgroundColor:'#e5e5e5',marginLeft:10,marginRight:10,marginBottom:30}}></View>
                    <TouchableOpacity style={{height:46,alignItems:"center"}} onPress={()=>this.Release()}>
                        <View style={{width:320,height:46,borderRadius:25,backgroundColor:theme.theme_code,marginTop:10,justifyContent:'center',opacity: 0.8}}>
                            <Text style={{lineHeight:40,color:'#fff',fontSize:15,textAlign:'center'}}>发  布</Text>
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
    editInfos : state.community.editInfos
})

const mapDispatchToProps = dispatch => ({
    editInfo: (sendInfo) => dispatch(actions.editInfo(sendInfo))
})

export default connect(mapStateToProps,mapDispatchToProps)(Add)

const styles = StyleSheet.create({
    setting_item_container: {
        backgroundColor: '#fff',
        padding: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        marginTop: 30,
    },
    uploadAvatar:{
        width: 360,
        height: 150,
        borderRadius: 10
    }
});


