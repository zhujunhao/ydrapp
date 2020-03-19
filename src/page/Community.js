import React,{ Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View ,
    FlatList, 
    RefreshControl,
    TouchableOpacity,
    ActivityIndicator,
    InteractionManager
} from 'react-native';
import { 
    connect 
} from 'react-redux';
import actions from "../../action";
import { 
    createMaterialTopTabNavigator,
    createAppContainer 
} from 'react-navigation';
import NavigatorUtil from '../navigators/NavigatorUtil';
import Toast from 'react-native-easy-toast';
import CommunityItem from '../common/CommunityItem';
import EventBus from "react-native-event-bus";
import EventTypes from "../util/EventTypes";
import AntDesign from 'react-native-vector-icons/AntDesign';
import url from '../util/url'; 
import { 
    get 
} from '../util/request';

class Community extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.loadtopicData();
    }

    loadtopicData = async() => {
        const { onloadtopics } = this.props;
        onloadtopics({
            retCode: "0002",
            data: []
        })
        let result = await get(url.getTopicList())
        if (result.status == 200 && result.data) {
            let reultdata = result.data.data;
            onloadtopics({
                retCode: "0000",
                data: reultdata
            })
        } else {
            this.refs.toast.show('查询话题失败');
            onloadtopics({
                retCode: "0002",
                data: []
            })
        }
    }

    _genTabs () {
        const tabs = {};
        const { topics, theme } = this.props;
        if (topics.length>0) {
            topics.forEach((item,index) => {
                tabs[`tab${index}`] = {
                    screen: props => <CommunityTabPage {...props} tabLabel={item.topic_title} path={item.topic_id} theme={theme}/>,
                    navigationOptions: {
                        title: item.topic_title
                    }
                }
            });
        }
        return tabs;
    }

    render() {
      const { topics, theme } = this.props;
      const TabNavigator = topics ? createAppContainer(createMaterialTopTabNavigator(
          this._genTabs(),{
              tabBarOptions: {
                  tabStyle: styles.tabStyle,
                  upperCaseLabel: false,//是否使标签大写，默认为true
                  scrollEnabled: true,//是否支持选项卡滚动，默认false
                  style: {
                      paddingTop: 25,
                      backgroundColor: '#fff',//TabBar 的背景颜色
                      height: 59//fix 开启scrollEnabled后再Android上初次加载时闪烁问题
                  },
                  indicatorStyle: {
                      backgroundColor:theme.theme_code,
                      height: 2
                  },//标签指示器的样式
                  labelStyle: {
                      fontSize: 13,
                      margin: 0,
                      color:theme.theme_code
                  },//文字的样式
              },
              lazy: true
          }
      )) : null;

      return (
        <View style={styles.container}>
          {TabNavigator && <TabNavigator/>}
        </View>
      );
    }
}

const mapCommunityStateToProps = state => ({
    topics: state.topic.topics,
    theme: state.theme.theme
})

const mapCommunityDispatchToProps = dispatch => ({
    onloadtopics: (sendInfo) => dispatch(actions.loadtopics(sendInfo))
})
//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapCommunityStateToProps,mapCommunityDispatchToProps)(Community)

class CommunityTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 10,
            start: 0,
            questionType: "01"
        }
    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(()=>{
            this.loadData();
         });
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.bottomTabSelectListener = (data) => {
            if (data.to === 0) {
                this.loadData();
            }
        })
    }

    componentWillUnmount() {
        EventBus.getInstance().removeListener(this.bottomTabSelectListener);
    }

    onSearch(pathName){
        NavigatorUtil.goPage(this.props, pathName)
    }

    loadData = async (loadMore) => {
        const { community, loadCommunitys, path } = this.props;
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
        let result = await get(url.getCommunityList( path, this.state.questionType, nowstart, this.state.count))
        if (result.status == 200 && result.data) {
            let reultdata = result.data.data;
            if (reultdata.length < this.state.count) {
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

    renderItem(data) {
        const { item } = data;
        const { theme } = this.props;
        return <CommunityItem
            CommunityObj={item}
            topic={this.state.topic}
            questionType={this.state.questionType}
            start={this.state.start}
            count={this.state.count}
            theme = {theme}
            onSelect={(callback)=> {
                NavigatorUtil.goPage({
                    theme,
                    item,
                    callback
                },'DetailByCommunity')
            }}
        />
        
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

    render() {
        const { community } = this.props;
        const { theme } = this.props;
        let searchPart = <TouchableOpacity
            onPress={()=>this.onSearch("SearchByCommunity")}
            activeOpacity={1}
            style={{width:360,height:50}}
        >
            <View style={{height:50,justifyContent:"center",alignItems:'center'}}>
                <View style={{flexDirection:'row',alignItems:"center",justifyContent:'flex-start' ,width:320,height:32,backgroundColor:'#eee',borderRadius:18}}>
                    <AntDesign
                        name={'search1'}
                        size={20}
                        style={{
                            marginRight: 10,
                            color: '#999',
                            marginLeft: 10
                        }}
                    />
                    <Text style={{fontSize:13}}>{'搜索更多'}</Text>
                </View>
            </View>
        </TouchableOpacity>
        

        return (
            <View style={styles.container}>
                {searchPart}
                {community && community.communitys && community.communitys.length >0 ?<FlatList 
                    data={community.communitys}
                    numColumns={2}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + item.question_id}
                    refreshControl = {
                        <RefreshControl
                            title={'loading'}
                            titleColor={theme.theme_code}
                            colors={[theme.theme_code]}
                            refreshing={community.isLoading}
                            onRefresh={() => this.loadData()}
                            titleColor={theme.theme_code}
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
                /> : <View style={{flex:1,alignItems:'center',marginTop:50}}>
                    <Text>暂时还没有相关的数据哦</Text>
                </View>}

                <Toast ref={'toast'}
                    position={'center'}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    community: state.community
})

const mapDispatchToProps = dispatch => ({
    loadCommunitys: (sendInfo) => dispatch(actions.loadCommunitys(sendInfo))
})

// //注意：connect只是个function，并不应定非要放在export后面
const CommunityTabPage = connect(mapStateToProps, mapDispatchToProps)(CommunityTab);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabStyle: {
        width:50,
    },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        flex:1,
        color: 'red',
        margin: 10
    }
});