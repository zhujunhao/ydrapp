import React, { Component } from 'react';
import { 
    StyleSheet,
    TouchableOpacity, 
    View,
    DeviceInfo,
    Text,
    Image,
    FlatList,
    ScrollView
} from 'react-native';
import { 
    connect 
} from 'react-redux';
import actions from '../../action/index';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import NavigatorUtil from '../navigators/NavigatorUtil';
import BackPressComponent from '../common/BackPressComponent';
import Toast from 'react-native-easy-toast';
import CommentItem from '../common/CommentItem';
import url from '../util/url'; 
import { 
    get,
    post
} from '../util/request';

class DetailByCommunity extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            canGoBack: false,
            start: 0,
            count: 10
        }
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        this.loadData();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    loadData = async () => {
        const { item } = this.params;
        const { loadCommentByCommunity, loadCommunityDetail, onloadtopics } = this.props;
        loadCommentByCommunity({
            retCode: "0002",
            data: ""
        })
        let result = await get(url.getCommentListByCommunity(item.question_id, 0, 10))
        console.log("res", result)
        if (result.status == 200 && result.data) {
            let reultdata = result.data.data;
            loadCommentByCommunity({
                retCode: "0000",
                data: reultdata
            })
        } else {
            this.refs.toast.show('查询评论失败');
            loadCommentByCommunity({
                retCode: "0001",
                data: ""
            })
        }

        loadCommunityDetail({
            retCode: "0002",
            data: ""
        })
        let detailresult = await get(url.getCommunityDetail( item.question_id ))
        if (detailresult.status == 200 && detailresult.data) {
            let detaildata = detailresult.data.data;
            loadCommunityDetail({
                retCode: "0000",
                data: detaildata
            })
        } else {
            this.refs.toast.show('查询详情失败');
            loadCommunityDetail({
                retCode: "0001",
                data: ""
            })
        }

        onloadtopics({
            retCode: "0002",
            data: []
        })
        let topicresult = await get(url.getTopicList())
        if (topicresult.status == 200 && topicresult.data) {
            let resultdata = topicresult.data.data;
            onloadtopics({
                retCode: "0000",
                data: resultdata
            })
        } else {
            this.refs.toast.show('查询话题失败');
            onloadtopics({
                retCode: "0002",
                data: []
            })
        }
    }

    onBackPress() {
        this.onBack();
        return true;
    }

    onBack() {
        if (this.state.canGoBack) {
            this.WebView.goBack();
        } else {
            NavigatorUtil.goBack(this.props.navigation)
        }
    }

    favorbtn = async( targetId, favorStatus ) => {
        const { addCommunityFavor, loadCommunityDetail, delCommunityFavor, communityDetail } = this.props;
        let favorFlag = favorStatus? favorStatus : communityDetail.favorStatus
        if (favorFlag == "0") {
            let data = new FormData();
            data.append("favorType", "304");
            data.append("targetId", targetId);
            addCommunityFavor({
                retCode: "0002",
                data: {}
            })
            let result = await post(url.toFavor() ,data)
            if (result && result.data && result.data.msg == 'ok') {
                addCommunityFavor({
                    retCode: "0000",
                    data: {}
                })
                this.refs.toast.show('点赞成功');
                loadCommunityDetail({
                    retCode: "0002",
                    data: {}
                })
                let detailresult = await get(url.getCommunityDetail( targetId ))
                if (detailresult.status == 200 && detailresult.data) {
                    let detaildata = detailresult.data.data;
                    loadCommunityDetail({
                        retCode: "0000",
                        data: detaildata
                    })
                } else {
                    loadCommunityDetail({
                        retCode: "0001",
                        data: {}
                    })
                    this.refs.toast.show('查询详情失败');
                }
            } else {
                addCommunityFavor({
                    retCode: "0001",
                    data: {}
                })
                this.refs.toast.show('点赞失败');
            }
        } else {
            let data = new FormData();
            data.append("favorType", "304");
            data.append("targetId", targetId);
            delCommunityFavor({
                retCode: "0002",
                data: {}
            })
            let result = await post(url.disFavor() ,data)
            console.log("resuldis",result)
            if (result && result.data && result.data.msg == 'ok') {
                delCommunityFavor({
                    retCode: "0000",
                    data: {}
                })
                this.refs.toast.show('取消点赞成功');
                loadCommunityDetail({
                    retCode: "0002",
                    data: {}
                })
                let detailresult = await get(url.getCommunityDetail( targetId ))
                if (detailresult.status == 200 && detailresult.data) {
                    let detaildata = detailresult.data.data;
                    loadCommunityDetail({
                        retCode: "0000",
                        data: detaildata
                    })
                } else {
                    loadCommunityDetail({
                        retCode: "0001",
                        data: {}
                    })
                    this.refs.toast.show('查询详情失败');
                }
            } else {
                delCommunityFavor({
                    retCode: "0001",
                    data: {}
                })
                this.refs.toast.show('取消点赞失败');
            }
        }
    }

    followbtn = async( followedUserId, targetId, followStatus ) => {
        const { addFollow, loadCommunityDetail, delFollow, communityDetail } = this.props;
        let followFlag = followStatus? followStatus : communityDetail.followStatus
        console.log("followFlag",followFlag)
        if (followFlag == "0") {
            let data = new FormData();
            data.append("followedUserId", followedUserId);
            addFollow({
                retCode: "0002",
                data: {}
            })
            let result = await post(url.toFollow() ,data)
            if (result && result.data && result.data.msg == 'ok') {
                addFollow({
                    retCode: "0000",
                    data: {}
                })
                this.refs.toast.show('关注成功');
                loadCommunityDetail({
                    retCode: "0002",
                    data: {}
                })
                let detailresult = await get(url.getCommunityDetail( targetId ))
                if (detailresult.status == 200 && detailresult.data) {
                    let detaildata = detailresult.data.data;
                    loadCommunityDetail({
                        retCode: "0000",
                        data: detaildata
                    })
                } else {
                    loadCommunityDetail({
                        retCode: "0001",
                        data: {}
                    })
                    this.refs.toast.show('查询详情失败');
                }
            } else {
                addFollow({
                    retCode: "0001",
                    data: {}
                })
                this.refs.toast.show('关注失败');
            }
        } else {
            let data = new FormData();
            data.append("disfollowedUserId", followedUserId);
            delFollow({
                retCode: "0002",
                data: {}
            })
            let result = await post(url.disFollow() ,data)
            console.log("resuldis",result)
            if (result && result.data && result.data.msg == 'ok') {
                delFollow({
                    retCode: "0000",
                    data: {}
                })
                this.refs.toast.show('取消关注成功');
                loadCommunityDetail({
                    retCode: "0002",
                    data: {}
                })
                let detailresult = await get(url.getCommunityDetail( targetId ))
                if (detailresult.status == 200 && detailresult.data) {
                    let detaildata = detailresult.data.data;
                    loadCommunityDetail({
                        retCode: "0000",
                        data: detaildata
                    })
                } else {
                    loadCommunityDetail({
                        retCode: "0001",
                        data: {}
                    })
                    this.refs.toast.show('查询详情失败');
                }
            } else {
                delFollow({
                    retCode: "0001",
                    data: {}
                })
                this.refs.toast.show('取消关注失败');
            }
        }
    }

    collectbtn = async( targetId, collectStatus ) => {
        const { addCommunityCollect, loadCommunityDetail, delCommunityCollect, communityDetail } = this.props;
        let collectFlag = collectStatus? collectStatus : communityDetail.collectStatus
        if (collectFlag == "0") {
            let data = new FormData();
            data.append("collectType", "502");
            data.append("targetId", targetId);
            addCommunityCollect({
                retCode: "0002",
                data: {}
            })
            let result = await post(url.toCollect() ,data)
            if (result && result.data && result.data.msg == 'ok') {
                addCommunityCollect({
                    retCode: "0000",
                    data: {}
                })
                this.refs.toast.show('收藏成功');
                loadCommunityDetail({
                    retCode: "0002",
                    data: {}
                })
                let detailresult = await get(url.getCommunityDetail( targetId ))
                if (detailresult.status == 200 && detailresult.data) {
                    let detaildata = detailresult.data.data;
                    loadCommunityDetail({
                        retCode: "0000",
                        data: detaildata
                    })
                } else {
                    loadCommunityDetail({
                        retCode: "0001",
                        data: {}
                    })
                    this.refs.toast.show('查询信息失败');
                }
            } else {
                addCommunityCollect({
                    retCode: "0001",
                    data: {}
                })
                this.refs.toast.show('新增收藏失败');
            }
        } else {
            let data = new FormData();
            data.append("collectType", "502");
            data.append("targetId", targetId);
            delCommunityCollect({
                retCode: "0002",
                data: {}
            })
            let result = await post(url.disCollect() ,data)
            if (result && result.data && result.data.msg == 'ok') {
                delCommunityCollect({
                    retCode: "0000",
                    data: {}
                })
                this.refs.toast.show('取消收藏成功');
                loadCommunityDetail({
                    retCode: "0002",
                    data: {}
                })
                let detailresult = await get(url.getCommunityDetail( targetId ))
                if (detailresult.status == 200 && detailresult.data) {
                    let detaildata = detailresult.data.data;
                    loadCommunityDetail({
                        retCode: "0000",
                        data: detaildata
                    })
                } else {
                    loadCommunityDetail({
                        retCode: "0001",
                        data: {}
                    })
                    this.refs.toast.show('查询信息失败');
                }
            } else {
                delCommunityCollect({
                    retCode: "0001",
                    data: {}
                })
                this.refs.toast.show('取消收藏失败');
            }
        }
    }

    commentbtn = async() => {}

    tocomment = async(targetItem) => {
        const { addCommentByCommunity } = this.props;
        addCommentByCommunity({
            retCode: "0002",
            data: {
                commentType: "200",
                questionId: targetItem.question_id,
                commentContent: "",
                answerId: "",
            }
        })
        NavigatorUtil.goPage(this.props,"CommentText")
    }

    renderItem(data) {
        const { item } = data;
        const { theme } = this.props;
        return <CommentItem
            start = {this.state.start}
            count = {this.state.count}
            item={item}
            theme = {theme}
        />
    }

    backHome = () => {
        NavigatorUtil.resetToHomePage({
            navigation: this.props.navigation
        })
      }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url
        })
    }

    render() {
        let targetItem;
        const { communityComments, communityDetail, topics } = this.props;
        const { theme, item } = this.params;
        console.log("this.props",JSON.stringify(this.props))
        console.log("detailthis.params",JSON.stringify(item))
        console.log("communityDetail",JSON.stringify(communityDetail))
        if (communityDetail) {
            targetItem = communityDetail;
        } else {
            targetItem = item;
        }
        const titleLayoutStyle = targetItem && targetItem.question_title ? {paddingRight: 30} : null;
        let navigationBar = <NavigationBar
                leftButton = { ViewUtil.getLeftBackButton( () => this.onBack() ) }
                titleLayoutStyle = {titleLayoutStyle}
                title={targetItem && targetItem.question_title}
                style={theme.styles.navBar}
        />
        // 查询话题
        let topictext;
        if (topics && topics.length>0) {
            topics.forEach(item => {
                if (targetItem && targetItem.topics == item.topic_id) {
                    topictext = item.topic_title
                }
                
            })
        }
        return (
            <SafeAreaViewPlus
                topColor={theme.theme_code}
            >
                <ScrollView>
                    {navigationBar}
                    <View style={{flex:1,backgroundColor:'#fff'}}>
                        <View style={{flex:1,flexDirection:'column'}}>
                            <View style={{flex:1,height:50, lineHeight:50, flexDirection: 'row', alignItems: 'center'}}>
                                <Image style={{width:30, height:30, borderRadius:15, borderColor:'#eee', borderWidth:1, marginLeft:20, marginRight: 10}}
                                    defaultSource={require('../../res/backgroundPic.png')} //默认图片
                                    source={{uri: url.imagepath(targetItem && targetItem.avatar ? targetItem.avatar : "")}}
                                />
                                <Text style={{fontSize: 13}}>{targetItem && targetItem.nick_name ? targetItem.nick_name : ""}</Text>
                                <View style={{flex:1}}></View>
                                <TouchableOpacity onPress={() => this.followbtn(targetItem.user_id , targetItem.question_id, targetItem.followStatus)} activeOpacity={1}>
                                    <View style={{width:80,height:26,justifyContent:'center',alignItems:'center',borderColor:theme.theme_code, borderWidth:1, borderRadius:15, marginRight:20}}>
                                        <Text style={{fontSize:13, color:theme.theme_code}}>{targetItem && targetItem.followStatus == "1" ? "取消关注" : "关注"}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Image style={{height:200}}
                                defaultSource={require('../../res/backgroundPic.png')} //默认图片
                                source={{uri: url.imagepath(targetItem && targetItem.question_max_img ? targetItem.question_max_img : "")}}
                            />
                            <View style={{flexDirection:'row',padding:10,alignItems:'center'}}>
                                <View style={{flex:1}}>
                                    <Text style={{color:'#333',paddingTop:3,paddingBottom:3}}>{targetItem && targetItem.question_title ? targetItem.question_title : ""}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',height:30,alignItems:'center',marginTop:10,paddingLeft:10, paddingRight:10}}>
                                <Text style={{fontSize:13}}>{targetItem && targetItem.question_content ? targetItem.question_content : ""}</Text>
                            </View>
                            <View style={{flexDirection:'row',height:40,padding:10,alignItems:'center',marginBottom:10}}>
                                <AntDesign
                                    name={'slack'}
                                    size={13}
                                    style={{color:theme.theme_code,marginRight:5}}
                                />
                                <Text style={{color: theme.theme_code, fontSize: 13}}>{topictext ? topictext : ""}</Text>
                            </View>
                        </View>
                        <View style={{flex:1,height:10,backgroundColor:'#f5f5f5'}}></View>
                        <View style={styles.topic}>
                            <Text style={styles.topicHead}>{`共 ${targetItem && targetItem.comment_nums ? targetItem.comment_nums : "0"} 条评论`}</Text>
                            <TouchableOpacity onPress={() => this.tocomment(targetItem)} activeOpacity={1}>
                                <View style={{flexDirection: 'row',alignItems:'center'}}>
                                    <Image style={{width:30, height:30, borderRadius:15, borderColor:'#eee', borderWidth:1, marginLeft:10, marginRight: 10}}
                                        defaultSource={require('../../res/backgroundPic.png')} //默认图片
                                        source={{uri: url.imagepath(targetItem && targetItem.avatar ? targetItem.avatar : "")}}
                                    />
                                    <View style={{width: 300, height: 30, justifyContent:'center', backgroundColor: '#f5f5f5',borderColor: '#f5f5f5', borderRadius:15, paddingLeft: 10}}>
                                        <Text style={{color:'#666',fontSize:12}}>说点什么...</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <FlatList
                                data={communityComments}
                                keyExtractor={targetItem => "" + targetItem.commentinfoId}
                                renderItem={data => this.renderItem(data)}
                            />
                            <View style={{height:40}}></View>
                        </View>
                    </View>
                    <Toast ref={'toast'}
                        position={'center'}
                    />
                </ScrollView>
                
                <View style={{flex:1,height:DeviceInfo.isIPhoneX_deprecated ? 71 : 51 , flexDirection:'column',position: 'absolute',bottom: 0,left:0,right:0}}>
                    <View style={{height:1,backgroundColor:'#eee'}}></View>
                    <View style={{flex:1,flexDirection:'row',height:50,opacity:1,backgroundColor:'#fff',paddingTop:4,alignItems:'center'}}>
                        <TouchableOpacity onPress={() => this.tocomment(targetItem)} activeOpacity={1}>
                            <View style={{width:120,height:36,lineHeight:36,marginTop:7,marginBottom:7,flexDirection:'row',backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
                                <AntDesign
                                    name={'edit'}
                                    size={20}
                                    style={{color: theme.theme_code ,marginRight:10}}
                                />
                                <Text style={{color:'#666',fontSize:13}}>说点什么...</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{flex:1}}></View>
                        <TouchableOpacity
                            onPress={() => this.favorbtn(targetItem.question_id, targetItem.favor_status)}
                            activeOpacity={1}
                        >
                            <View style={{width:70,height:36,marginRight:7,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                {targetItem.favor_nums == "1" ? <AntDesign
                                    name={'heart'}
                                    size={18}
                                    style={{color: theme.theme_code, marginLeft:5, marginRight:5}}
                                /> : <AntDesign
                                        name={'hearto'}
                                        size={18}
                                        style={{color: theme.theme_code, marginLeft:5, marginRight:5}}
                                    /> }
                                <Text style={{color:'#666',fontSize:14}}>{targetItem && targetItem.favor_nums ? targetItem.favor_nums : ""}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.collectbtn(targetItem.question_id, targetItem.collect_status)}
                            activeOpacity={1}
                        >
                            <View style={{width:70,height:36, marginRight:7,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                {targetItem.collect_nums == "1" ? <AntDesign
                                    name={'star'}
                                    size={18}
                                    style={{color: theme.theme_code, marginLeft:5, marginRight:5}}
                                /> : <AntDesign
                                        name={'staro'}
                                        size={18}
                                        style={{color: theme.theme_code, marginLeft:5, marginRight:5}}
                                /> }
                                <Text style={{color:'#666',fontSize:14}}>{targetItem.collect_nums}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.commentbtn()}
                            activeOpacity={1}
                        >
                            <View style={{width:70,height:36,marginRight:7,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <AntDesign
                                    name={'message1'}
                                    size={18}
                                    style={{ color:theme.theme_code, marginRight:5 }}
                                />
                                <Text style={{color:'#666',fontSize:14}}>{targetItem.comment_nums}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaViewPlus>
        )
    }
}
const mapStateToProps = state => ({
    theme: state.theme.theme,
    communityComments: state.comment.communityComments,
    topics: state.topic.topics,
    communityDetail: state.detail.communityDetail
})

const mapDispatchToProps = dispatch => ({
    addFollow: (sendInfo) => dispatch(actions.addFollow(sendInfo)),
    delFollow: (sendInfo) => dispatch(actions.delFollow(sendInfo)),
    addCommunityFavor: (sendInfo) => dispatch(actions.addCommunityFavor(sendInfo)),
    addCommunityCollect: (sendInfo) => dispatch(actions.addCommunityCollect(sendInfo)),
    delCommunityFavor: (sendInfo) => dispatch(actions.delCommunityFavor(sendInfo)),
    delCommunityCollect: (sendInfo) => dispatch(actions.delCommunityCollect(sendInfo)),
    loadCommunityDetail: (sendInfo) => dispatch(actions.loadCommunityDetail(sendInfo)),
    loadCommentByCommunity: (sendInfo) => dispatch(actions.loadCommentByCommunity(sendInfo)),
    onloadtopics: (sendInfo) => dispatch(actions.onloadtopics(sendInfo)),
    addCommentByCommunity: (sendInfo) => dispatch(actions.addCommentByCommunity(sendInfo))
})

export default connect(mapStateToProps,mapDispatchToProps)(DetailByCommunity)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: DeviceInfo.isIphoneX_deprecated ? 30 : 0
    },
    topic: {
        flex:1,
        backgroundColor: '#fff',
        paddingBottom:10,
        marginBottom:10,
    },
    topicHead:{
        fontSize:13,
        color:'#333',
        padding:15,
    },
})