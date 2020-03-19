import React,{ Component } from 'react';
import { 
    StyleSheet,
    Text, 
    View,
    TouchableOpacity,
    TextInput 
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BackPressComponent from "../common/BackPressComponent";
import NavigatorUtil from '../navigators/NavigatorUtil';
import NavigatorBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import actions from "../../action";
import { connect } from 'react-redux';
import url from '../util/url'; 
import { 
    post 
} from '../util/request';

class CommentText extends Component {
    constructor(props){
        super(props);
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

    setContent = (content) => {
        const { addComments, addCommentByCommunity } = this.props;
        addCommentByCommunity({
            retCode: "0002",
            data: {
                commentType: "200",
                questionId: addComments.questionId,
                commentContent: content,
                answerId: "",
            }
        })
    }

    ReleaseComment = async() => {
        const { addComments } = this.props;

        if (!addComments.questionId) {
            console.log("2")
            return
        }

        if (!addComments.commentContent) {
            console.log("3")
            return
        }

        let data = new FormData();
        data.append('commentType', "200")
        data.append('questionId', addComments.questionId)
        data.append('commentContent', encodeURI(addComments.commentContent))
        data.append('answerId', "")

        console.log("adddata",data)
        let result = await post(url.addComment(), data)
        console.log("resultresult",result)
        
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
        const { theme, addComments } = this.props;
        let navigatorBar = <NavigatorBar
                                leftButton = {ViewUtil.getLeftBackButton( () => NavigatorUtil.goBack(this.props.navigation) )}
                                title = {'说点什么'}
                                style={theme.styles.navBar}
                            />
        return(
            <View style={{flex:1}}>
                {navigatorBar}
                <View style={{flexDirection:'column'}}>
                    <TextInput
                        style={{fontSize:14,height:59,color: '#999',backgroundColor:'#f5f5f5',paddingLeft:10}}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#999'
                        onChangeText={(commentContent) => this.setContent(commentContent)}
                        value={addComments && addComments.commentContent ? addComments.commentContent : ""}
                        placeholder='说点什么～'
                    />
                    <TouchableOpacity style={{height:46,alignItems:"center"}} onPress={()=>this.ReleaseComment()}>
                        <View style={{width:320,height:46,borderRadius:25,backgroundColor:theme.theme_code,marginTop:10,justifyContent:'center',opacity: 0.8}}>
                            <Text style={{lineHeight:40,color:'#fff',fontSize:15,textAlign:'center'}}>提交评论</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    addComments : state.comment.addComments
})

const mapDispatchToProps = dispatch => ({
    addCommentByCommunity: (sendInfo) => dispatch(actions.addCommentByCommunity(sendInfo))
})

export default connect(mapStateToProps,mapDispatchToProps)(CommentText)


const styles = StyleSheet.create({

});