import React,{ Component } from 'react';
import { 
    StyleSheet,
    ScrollView, 
    Text, 
    View,
    TouchableOpacity, 
    TextInput,
    AsyncStorage,
    FlatList,
    RefreshControl
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
import Toast from 'react-native-easy-toast';
import url from '../util/url'; 
import { 
    get 
} from '../util/request';
import CommunityListItem from '../common/CommunityListItem';
import CommodityListItem from '../common/CommodityListItem';
import CommentItem from '../common/CommentItem';

class Favor extends Component {
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
        const { loadCommodityFavor, loadCommunityFavor, loadQuestionFavor, loadCommentFavor, loadAnswerFavor } = this.props;
        if (requestflag == "0") {//商品
            let result = await get(url.getMyFavorListByCommodity( startIndex, count ))
            loadCommodityFavor({
                retCode: "0002",
                data: []
            })
            console.log("cqateresult",result)
            if (result.status == 200 && result.data) {
                let reultdata = result.data.data;
                console.log("reultdata",reultdata)
                loadCommodityFavor({
                    retCode: "0000",
                    data: reultdata
                })
            } else {
                loadCommodityFavor({
                    retCode: "0001",
                    data: []
                })
                this.refs.toast.show('查询信息失败');
            }
        } else if (requestflag == "1") {//分享
            let result = await get(url.getMyFavorListByCommunity( startIndex, count ))
            loadCommunityFavor({
                retCode: "0002",
                data: []
            })
            console.log("cqateresult",result)
            if (result.status == 200 && result.data) {
                let reultdata = result.data.data;
                console.log("reultdata",reultdata)
                loadCommunityFavor({
                    retCode: "0000",
                    data: reultdata
                })
            } else {
                loadCommunityFavor({
                    retCode: "0001",
                    data: []
                })
                this.refs.toast.show('查询信息失败');
            }
        } else if (requestflag == "2") {//问题
            let result = await get(url.getMyFavorListByQuestion( startIndex, count ))
            loadQuestionFavor({
                retCode: "0002",
                data: []
            })
            console.log("cqateresult",result)
            if (result.status == 200 && result.data) {
                let reultdata = result.data.data;
                console.log("reultdata",reultdata)
                loadQuestionFavor({
                    retCode: "0000",
                    data: reultdata
                })
            } else {
                loadQuestionFavor({
                    retCode: "0001",
                    data: []
                })
                this.refs.toast.show('查询信息失败');
            }
        } else if (requestflag == "3") {//评论
            let result = await get(url.getMyFavorListByComment( startIndex, count ))
            loadCommentFavor({
                retCode: "0002",
                data: []
            })
            console.log("cqateresult",result)
            if (result.status == 200 && result.data) {
                let reultdata = result.data.data;
                console.log("reultdata",reultdata)
                loadCommentFavor({
                    retCode: "0000",
                    data: reultdata
                })
            } else {
                loadCommentFavor({
                    retCode: "0001",
                    data: []
                })
                this.refs.toast.show('查询信息失败');
            }
        } else if (requestflag == "4") {//答案
            let result = await get(url.getMyFavorListByAnswer( startIndex, count ))
            loadAnswerFavor({
                retCode: "0002",
                data: []
            })
            console.log("cqateresult",result)
            if (result.status == 200 && result.data) {
                let reultdata = result.data.data;
                console.log("reultdata",reultdata)
                loadAnswerFavor({
                    retCode: "0000",
                    data: reultdata
                })
            } else {
                loadAnswerFavor({
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
        const item = data;
        if ( this.state.requestflag == "0" ) {
            return <CommodityListItem
                        theme={theme}
                        projectModel={item.item}
                        onSelect={(callback)=> {
                            NavigatorUtil.goPage({
                                theme,
                                commodityObj: item.item,
                                callback
                            },'DetailByCommodity')
                    }}/>
        } else if ( this.state.requestflag == "1" ) {
            return <CommunityListItem
                        theme={theme}
                        CommunityObj={item.item}
                        onSelect={(callback)=> {
                            NavigatorUtil.goPage({
                                theme,
                                projectModel: item,
                                callback
                            },'DetailByCommunity')
                        }}
                    />
        } else if ( this.state.requestflag == "2" ) {
            return <CommunityListItem
                        theme={theme}
                        CommunityObj={item}
                        onSelect={(callback)=> {
                            NavigatorUtil.goPage({
                                theme,
                                projectModel: item,
                                callback
                            },'DetailByCommunity')
                        }}
                    />
        } else if ( this.state.requestflag == "3" ) {
            return <CommentItem
                        start = {this.state.start}
                        count = {this.state.count}
                        item={item.item}
                        theme = {theme}
                    />

        } else if ( this.state.requestflag == "4" ) {
            console.log("答案")
        }
    }

    loadCommodityData (){
        console.log("uuiuiuiuiu")
        this.setState({
            start: 0,
            count: 10,
            requestflag: "0"
        })
        this.loadData("0", 0, 10)
    }

    loadCommunityData (){
        this.setState({
            start: 0,
            count: 10,
            requestflag: "1"
        })
        this.loadData("1", 0, 10)
    }

    loadQuestionData (){
        this.setState({
            start: 0,
            count: 10,
            requestflag: "2"
        })
        this.loadData("2", 0, 10)
    }

    loadCommentData (){
        this.setState({
            start: 0,
            count: 10,
            requestflag: "3"
        })
        this.loadData("3", 0, 10)
    }

    loadAnswerData (){
        this.setState({
            start: 0,
            count: 10,
            requestflag: "4"
        })
        this.loadData("4", 0, 10)
    }

    render() {
        const { theme, questionFavors, communityFavors, commentFavors, answerFavors, commodityFavors } = this.props;
        let navigatorBar = <NavigatorBar
                                leftButton = {ViewUtil.getLeftBackButton( () => NavigatorUtil.goBack(this.props.navigation) )}
                                title = {'我的点赞'}
                                style={theme.styles.navBar}
                            />
        let targetArr = [];
        if (this.state.requestflag == "0") {
            targetArr = commodityFavors
        } else if (this.state.requestflag == "1") {
            targetArr = communityFavors
        } else if (this.state.requestflag == "2") {
            targetArr = questionFavors
        } else if (this.state.requestflag == "3") {
            targetArr = commentFavors
        } else if (this.state.requestflag == "4") {
            targetArr = answerFavors
        }
        return(
            <View style={{flex:1, backgroundColor: '#f5f5f5'}}>
                {navigatorBar}
                <View style={styles.tabDiv}>
                    <TouchableOpacity style={styles.tabItem} onPress={()=>this.loadCommodityData()}>
                        <View style={styles.tabItem}>
                            <Text style={styles.tabText}>商品</Text>
                            <View style={{width:30,height:2,backgroundColor:this.state.requestflag == "0"?theme.theme_code:"#fff"}}></View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem} onPress={()=>this.loadCommunityData()}>
                        <View style={styles.tabItem}>
                            <Text style={styles.tabText}>分享</Text>
                            <View style={{width:30,height:2,backgroundColor:this.state.requestflag == "1"?theme.theme_code:"#fff"}}></View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem} onPress={()=>this.loadQuestionData()}>
                        <View style={styles.tabItem}>
                            <Text style={styles.tabText}>提问</Text>
                            <View style={{width:30,height:2,backgroundColor:this.state.requestflag == "2"?theme.theme_code:"#fff"}}></View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem} onPress={()=>this.loadCommentData()}>
                        <View style={styles.tabItem}>
                            <Text style={styles.tabText}>评论</Text>
                            <View style={{width:30,height:2,backgroundColor:this.state.requestflag == "3"?theme.theme_code:"#fff"}}></View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem} onPress={()=>this.loadAnswerData()}>
                        <View style={styles.tabItem}>
                            <Text style={styles.tabText}>答案</Text>
                            <View style={{width:30,height:2,backgroundColor:this.state.requestflag == "4"?theme.theme_code:"#fff"}}></View>
                        </View>
                    </TouchableOpacity>
                </View>
                { targetArr && targetArr.length >0 ?
                    <FlatList
                        data={targetArr}
                        renderItem={data => this.renderItem(data)}
                        keyExtractor={item => "" + (this.state.requestflag == "1" ? item.question_id : item.commodity_id)}
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
                            <Text style={{textAlign:'center',marginTop:100}}>暂时还没有相关的点赞哦^_^</Text>
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
    questionFavors : state.favor.questionFavors,
    communityFavors : state.favor.communityFavors,
    commentFavors : state.favor.commentFavors,
    answerFavors : state.favor.answerFavors,
    commodityFavors: state.favor.commodityFavors,
})

const mapDispatchToProps = dispatch => ({
    loadCommunityFavor: (sendInfo) => dispatch(actions.loadCommunityFavor(sendInfo)),
    loadQuestionFavor: (sendInfo) => dispatch(actions.loadQuestionFavor(sendInfo)),
    loadCommodityFavor: (sendInfo) => dispatch(actions.loadCommodityFavor(sendInfo)),
    loadCommentFavor: (sendInfo) => dispatch(actions.loadCommentFavor(sendInfo)),
    loadAnswerFavor: (sendInfo) => dispatch(actions.loadCommentFavor(sendInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Favor);

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