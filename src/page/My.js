import React, { Component } from 'react';
import { 
    FlatList,
    TouchableOpacity, 
    RefreshControl, 
    StyleSheet, 
    View, 
    Text,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import { 
    connect 
} from 'react-redux';
import actions from '../../action/index';
import CommunityListItem from '../common/CommunityListItem';
import NavigatorUtil from '../navigators/NavigatorUtil';
import Toast from 'react-native-easy-toast';
import BackPressComponent from '../common/BackPressComponent';
import EventBus from "react-native-event-bus";
import EventTypes from "../util/EventTypes";
import config from '../../res/data/config';
import ElasticHead from './ElasticHead';
import AntDesign from 'react-native-vector-icons/AntDesign';
import url from '../util/url'; 
import { 
    get 
} from '../util/request';

class My extends Component {
    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
        this.params = this.props.navigation.state.params;

        this.state = {
            start: 0,
            count: 10,
            topic: "0",
            data: config,
            invitationCode: '',
            questionType: "01"
        }
    }

    loginstatecheck = async () => {
        const { sendCode } = this.props;
        let loginstateStr = await AsyncStorage.getItem('loginStatus')
        let loginstateObj = JSON.parse(loginstateStr)
        if (loginstateObj && loginstateObj.mobileNumber) {
            const { islogin } = this.props;
            islogin({
                retCode: "0000",
                data: loginstateObj
            })
        } else {
            sendCode({
                retCode: "0000",
                data: {
                    "smscode": "0",
                    "timeStr": "60"
                }
            })
            NavigatorUtil.goPage({},'Login')
        }
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        this.loadData(false, "01");
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select,this.listener = data => {
            if(data.to === 4) {
                this.loginstatecheck()
                this.loadData(false, "01");
            }
        })
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
        EventBus.getInstance().removeListener(this.listener);
    }

    onBackPress() {
        this.onBack();
        return true;
    }

    onBack() {
        NavigatorUtil.goBack(this.props.navigation)
    }

    loadData = async (loadMore, questiontype) => {
        if (questiontype) {
            this.setState({
                questionType: questiontype
            })
        }
        const { community, loadCommunitys } = this.props;
        let nowstart;
        if (loadMore) {
            loadCommunitys({
                retCode: "0002",
                data: community.communitys
            })
            nowstart = this.state.start + this.state.count + 1
            this.setState({
                start: nowstart
            })
        } else {
            loadCommunitys({
                retCode: "0002",
                data: []
            })
            nowstart = 0;
            this.setState({
                start: 0
            })
        }
        let result = await get(url.getCommunityList( this.state.topic, questiontype, nowstart, this.state.count))
        if (result.status == 200 && result.data) {
            let reultdata = result.data.data;
            if (reultdata.length >0 && reultdata.length < this.state.count) {
                this.setState({
                    lastData : true
                })
            }
            if (loadMore) {
                let orginArr = community.communitys;
                orginArr.push(...reultdata)
                loadCommunitys({
                    retCode: "0000",
                    data: orginArr
                })
            } else {
                loadCommunitys({
                    retCode: "0000",
                    data: reultdata
                })
            }
        } else {
            this.refs.toast.show('查询失败');
            loadCommunitys({
                retCode: "0001",
                data: []
            })
        }
    }

    genIndicator() {
        const { community } = this.props;
        return community.isLoading ? <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>正在加载更多</Text>
            </View> : null
    }

    renderItem(data) {
        const { theme } = this.props;
        const item = data.item;
        return <CommunityListItem
            theme={theme}
            CommunityObj={item}
            onSelect={(callback)=> {
                NavigatorUtil.goPage({
                    theme,
                    item: item,
                    callback
                },'DetailByCommunity')
            }}
        />
    }

    render(){
        const { theme, loginstate, community } = this.props;
        let maxpage = <View style={styles.containerTab}>
                        {/* 团队信息 */}
                        <View style={{flex:1,height:70,backgroundColor:'#f5f5f5',flexDirection:'column'}}>
                            <View style={{height:10,backgroundColor:'#f5f5f5'}}></View>
                            <View style={{flex:1,backgroundColor:'#fff',marginLeft:10,marginRight:10,borderRadius:6}}>
                                <TouchableOpacity onPress={()=> {
                                                        loginstate && loginstate.mobileNumber? NavigatorUtil.goPage({
                                                            theme: theme
                                                        },'Partners') : NavigatorUtil.goPage(this.props,"Login")
                                                    }} activeOpacity={1}>
                                    <View style={{height:50,width:80,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                                        <AntDesign
                                            name={'addusergroup'}
                                            size={22}
                                            style={{color:'#999',marginLeft:36,marginRight:10}}
                                        />
                                        <Text style={{color:'#999',fontSize:14}}>邀请好友</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{height:10,backgroundColor:'#f5f5f5'}}></View>
                        </View>
                        <View style={styles.tabDiv}>
                            <TouchableOpacity style={styles.tabItem} onPress={()=>this.loadData(false, "01")}>
                                <View style={styles.tabItem}>
                                    <Text style={styles.tabText}>分享</Text>
                                    <View style={{width:30,height:2,backgroundColor:this.state.questionType == "01"?theme.theme_code:'#fff'}}></View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tabItem} onPress={()=>this.loadData(false, "02")}>
                                <View style={styles.tabItem}>
                                    <Text style={styles.tabText}>提问</Text>
                                    <View style={{width:30,height:2,backgroundColor:this.state.questionType == "02"?theme.theme_code:'#fff'}}></View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {community && community.communitys.length >0 ?
                            <FlatList
                                data={community.communitys}
                                renderItem={data => this.renderItem(data)}
                                keyExtractor={item => "" + (item.question_id)}
                                refreshControl={
                                    <RefreshControl
                                        title={'loading'}
                                        titleColor={theme.theme_code}
                                        colors={[theme.theme_code]}
                                        refreshing={community.isLoading}
                                        onRefresh={()=> this.loadData()}
                                        tintColor={theme.theme_code}
                                    />
                                }
                                ListFooterComponent={() => this.genIndicator()}
                                onEndReached={() => {
                                    console.log('---onEndReached----');
                                    setTimeout(() => {
                                        if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                                            if (this.state.lastData) {
                                                this.refs.toast.show('已经到底了');
                                            } else {
                                                this.loadData(true);
                                            }
                                            
                                            this.canLoadMore = false;
                                        }
                                    }, 100);
                                }}
                                onEndReachedThreshold={0.2}
                                // onMomentumScrollBegin={() => {
                                //     this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
                                //     console.log('---onMomentumScrollBegin-----')
                                // }}
                                onScrollBeginDrag={() => {
                                    this.canLoadMore = true;
                                    if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                                        if (this.state.lastData) {
                                            this.refs.toast.show('已经到底了');
                                        } else {
                                            this.loadData(true);
                                        }
                                        this.canLoadMore = false;
                                    }
                                    console.log('---onScrollBeginDrag-----')
                                }}
                            /> : <View style={{backgroundColor:'#f5f5f5'}}><Text style={{textAlign:'center',marginTop:100}}>暂时还没有分享或提问哦^_^</Text></View>
                        }

                        <Toast
                            ref={'toast'}
                            position={'center'}
                        />
                    </View>
        this.elasticHead = new ElasticHead({
                ...this.props,
                navigation: this.props.navigation,
            },data => this.setState({...data})
        )
        return this.elasticHead.render(maxpage,this.state.data.app,loginstate)
    }
}

const mapStateToProps = state => ({
    community : state.community,
    theme: state.theme.theme,
    loginstate: state.loginstate.loginstate,
})

const mapDispatchToProps = dispatch => ({
    islogin: (sendInfo) => dispatch(actions.islogin(sendInfo)),
    loadCommunitys: (sendInfo) => dispatch(actions.loadCommunitys(sendInfo)),
    sendCode: (sendInfo) => dispatch(actions.sendCode(sendInfo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(My);

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    containerTab:{
        flex:1,
        backgroundColor:'#f5f5f5'
    },
    tabStyle: {
        height:39,
        paddingTop:10
    },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: 'red',
        margin: 10
    },
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
})
