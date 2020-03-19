import React,{ Component } from 'react';
import { 
    StyleSheet,
    Text, 
    View,
    TouchableOpacity, 
    FlatList,
    RefreshControl
} from 'react-native';
import BackPressComponent from "../common/BackPressComponent";
import NavigatorUtil from '../navigators/NavigatorUtil';
import NavigatorBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import actions from "../../action";
import { 
    connect 
} from 'react-redux';
import Toast from 'react-native-easy-toast';
import url from '../util/url'; 
import { 
    get 
} from '../util/request';
import CommentItem from '../common/CommentItem';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestflag: "0",
            start: 0,
            count: 10
        }
        this.backPress = new BackPressComponent({backPress: ()=> this.onBackPress()});
    }

    onBackPress() {
        NavigatorUtil.goBack(this.props.navigation);
        return true;
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        this.loadData(this.state.requestflag, this.state.start, this.state.count)
    }

    componentWillUnmout() {
        this.backPress.componentWillUnmout();
    }

    // 加载数据
    loadData = async (requestflag, start, count, loadmore) => {
        if (loadmore) {
            this.setState({
                start: start + count
            })
        }
        let startIndex = loadmore? start + count : start;
        const { loadCommentByCommunity, loadCommentByQuestion } = this.props;
        if (requestflag == "0") {//分享
            let result = await get(url.getMyCommentByCommunity( startIndex, count ))
            loadCommentByCommunity({
                retCode: "0002",
                data: []
            })
            console.log("cqateresult",result)
            if (result.status == 200 && result.data) {
                let reultdata = result.data.data;
                console.log("reultdata",reultdata)
                loadCommentByCommunity({
                    retCode: "0000",
                    data: reultdata
                })
            } else {
                loadCommentByCommunity({
                    retCode: "0001",
                    data: []
                })
                this.refs.toast.show('查询信息失败');
            }
        } else if (requestflag == "1") {//提问
            let result = await get(url.getMyCommentByQuestion( startIndex, count ))
            loadCommentByQuestion({
                retCode: "0002",
                data: []
            })
            console.log("cqateresult",result)
            if (result.status == 200 && result.data) {
                let reultdata = result.data.data;
                console.log("reultdata",reultdata)
                loadCommentByQuestion({
                    retCode: "0000",
                    data: reultdata
                })
            } else {
                loadCommentByQuestion({
                    retCode: "0001",
                    data: []
                })
                this.refs.toast.show('查询信息失败');
            }
        }
    }

    renderItem(data) {
        const { theme } = this.props;
        console.log("itemdata", data)
        const item = data.item;
        return <CommentItem
            start = {this.state.start}
            count = {this.state.count}
            item={item}
            theme = {theme}
        />
    }

    loadCommunityData (){
        this.setState({
            start: 0,
            count: 10,
            requestflag: "0"
        })
        this.loadData("0", 0, 10)
    }

    loadQuestionData (){
        this.setState({
            start: 0,
            count: 10,
            requestflag: "1"
        })
        this.loadData("1", 0, 10)
    }

    render() {
        const { theme, communityComments, questionComments } = this.props;
        let navigatorBar = <NavigatorBar
                                leftButton = {ViewUtil.getLeftBackButton( () => NavigatorUtil.goBack(this.props.navigation) )}
                                title = {'我的评论'}
                                style={theme.styles.navBar}
                            />
        let targetArr = [];
        console.log("communityComments", communityComments)
        console.log("questionComments", questionComments)
        if (this.state.requestflag == "0") {
            targetArr = communityComments
        } else if (this.state.requestflag == "1") {
            targetArr = questionComments
        }
        return(
            <View style={{flex:1, backgroundColor: '#f5f5f5'}}>
                {navigatorBar}
                <View style={styles.tabDiv}>
                    <TouchableOpacity style={styles.tabItem} onPress={()=>this.loadCommunityData()}>
                        <View style={styles.tabItem}>
                            <Text style={styles.tabText}>分享</Text>
                            <View style={{width:30,height:2,backgroundColor:this.state.requestflag == "0"?theme.theme_code:"#fff"}}></View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem} onPress={()=>this.loadQuestionData()}>
                        <View style={styles.tabItem}>
                            <Text style={styles.tabText}>提问</Text>
                            <View style={{width:30,height:2,backgroundColor:this.state.requestflag == "1"?theme.theme_code:"#fff"}}></View>
                        </View>
                    </TouchableOpacity>
                </View>
                { targetArr && targetArr.length >0 ?
                    <FlatList
                        data={targetArr}
                        renderItem={data => this.renderItem(data)}
                        keyExtractor={item => "" + (item.comment_id)}
                        refreshControl={
                            <RefreshControl
                                title={'loading'}
                                titleColor={theme.theme_code}
                                colors={[theme.theme_code]}
                                refreshing={false}
                                onRefresh={()=> this.loadData(this.state.requestflag, this.state.start, this.state.count)}
                                tintColor={theme.theme_code}
                            />
                        }
                    /> : <View style={{backgroundColor:'#f5f5f5'}}>
                            <Text style={{textAlign:'center',marginTop:100}}>暂时还没有相关的评论哦^_^</Text>
                        </View>
                }
                <Toast
                    ref={'toast'}
                    position={'center'}
                />
            </View>
        )
    }
}
const mapStateToProps = state => ({
    theme: state.theme.theme,
    communityComments : state.comment.communityComments,
    questionComments : state.comment.questionComments,
})

const mapDispatchToProps = dispatch => ({
    loadCommentByQuestion: (sendInfo) => dispatch(actions.loadCommentByQuestion(sendInfo)),
    loadCommentByCommunity: (sendInfo) => dispatch(actions.loadCommentByCommunity(sendInfo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment);

const styles = StyleSheet.create({
    tabDiv: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    tabItem: {
        flexDirection: 'column',
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        height: 30,
        lineHeight: 30,
        fontSize: 13
    }
});