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
import CommodityItem from '../common/CommodityItem';
import EventBus from "react-native-event-bus";
import EventTypes from "../util/EventTypes";
import AntDesign from 'react-native-vector-icons/AntDesign';
import url from '../util/url'; 
import { 
    get 
} from '../util/request';

class Commodity extends Component {
    constructor(props) {
        super(props);
        this.loadcategoryData();
    }

    loadcategoryData = async() => {
        const { loadcategory } = this.props;
        loadcategory({
            retCode: "0002",
            data: {}
        })
        let result = await get(url.getCategoryList())
        if (result.status == 200 && result.data) {
            let reultdata = result.data.data;
            loadcategory({
                retCode: "0000",
                data: reultdata
            })
        } else {
            this.refs.toast.show('查询分类信息失败');
            loadcategory({
                retCode: "0001",
                data: {}
            })
        }
    }

    _genTabs () {
        const tabs = {};
        const { categorys, theme } = this.props;
        console.log("ioioioioioiyy")
        categorys.forEach((item,index) => {
            if (item.category_ischecked == "1") {
                tabs[`tab${index}`] = {
                    screen: props => <CommodityTabPage {...props} tabLabel={item.category_name} path={item.category_id} theme={theme}/>,
                    navigationOptions: {
                      title: item.category_name
                    }
                }
            }

        });
        return tabs;
    }

    render() {
      const { categorys, theme } = this.props;
      console.log("iiiiiiiiiiiiii")
      const TabNavigator = categorys ? createAppContainer(createMaterialTopTabNavigator(
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

const mapCommodityStateToProps = state => ({
    categorys: state.category.categorys,
    theme: state.theme.theme
})

const mapCommodityDispatchToProps = dispatch => ({
    loadcategory: (sendInfo) => dispatch(actions.loadcategory(sendInfo))
})
//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapCommodityStateToProps,mapCommodityDispatchToProps)(Commodity)

class CommodityTab extends Component {
    constructor(props) {
        super(props);
        const { path } = this.props;
        console.log("tabprops",this.props)
        this.state = {
            count:10,
            start:0,
            category: path,
            lastData: false
        }
    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(()=>{
            this.loadData();
         });
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.bottomTabSelectListener = (data) => {
            if (data.to === 1) {
                this.loadData();
            }
        })
    }

    componentWillUnmount() {
        EventBus.getInstance().removeListener(this.bottomTabSelectListener);
    }

    onSearch(pathName){
        NavigatorUtil.goPage(this.props,pathName)
    }

    loadData = async (loadMore) => {
        console.log("ioioio",loadMore)
        const { loadCommoditys, commodity, path } = this.props;
        let nowstart;
        console.log("nowstart",nowstart)
        if (loadMore) {
            loadCommoditys({
                retCode: "0002",
                data: commodity.commoditys
            })
            nowstart = this.state.start + this.state.count + 1
            console.log("nowstart",nowstart)
            this.setState({
                start: nowstart
            })
        } else {
            loadCommoditys({
                retCode: "0002",
                data: []
            })
            nowstart = 0;
            this.setState({
                start: 0
            })
        }
        console.log("this.state.start",this.state.start)
        let result = await get(url.getCommodityList( path, nowstart, this.state.count))
        console.log("recommodity",result)
        if (result.status == 200 && result.data) {
            let reultdata = result.data.data;
            console.log("reultdata",reultdata)
            if (reultdata.length < this.state.count) {
                this.setState({
                    lastData : true
                })
            }
            if (loadMore) {
                let orginArr = commodity.commoditys;
                orginArr.push(...reultdata)
                loadCommoditys({
                    retCode: "0000",
                    data: orginArr
                })
            } else {
                loadCommoditys({
                    retCode: "0000",
                    data: reultdata
                })
            }
        } else {
            this.refs.toast.show('查询商品失败');
            loadCommoditys({
                retCode: "0001",
                data: []
            })
        }
    }

    renderItem(data) {
        const { item } = data;
        const { theme } = this.props;
        return <CommodityItem
                    commodityObj={item}
                    theme = {theme}
                    start={this.state.start}
                    count={this.state.count}
                    onSelect={(callback)=> {
                        NavigatorUtil.goPage({
                            theme,
                            commodityObj: item,
                            callback
                        },'DetailByCommodity')
                    }}
                />
    }


    genIndicator() {
        const { commodity } = this.props;
        console.log("33333", commodity.isLoading)
        return commodity.isLoading ? <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>正在加载更多</Text>
            </View> : null;
    }

    render() {
        const { commodity } = this.props;
        let commodityList = commodity.commoditys;
        console.log("commoditys", commodity.commoditys)
        const { theme } = this.props;
        let searchPart = <TouchableOpacity
            onPress={()=>this.onSearch("SearchByCommodity")}
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
                    <Text style={{fontSize:13}}>{'搜索更多优惠商品'}</Text>
                </View>
            </View>
        </TouchableOpacity>
        

        return (
            <View style={styles.container}>
                {searchPart}
                <FlatList 
                    data={commodityList}
                    numColumns={2}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + item.commodity_id}
                    refreshControl = {
                        <RefreshControl
                            title={'loading'}
                            titleColor={theme.theme_code}
                            colors={[theme.theme_code]}
                            refreshing={commodity.isLoading}
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
                />
                <Toast ref={'toast'}
                    position={'center'}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    commodity: state.commodity
})

const mapDispatchToProps = dispatch => ({
    loadCommoditys: (sendInfo) => dispatch(actions.loadCommoditys(sendInfo)),
})

//注意：connect只是个function，并不应定非要放在export后面
const CommodityTabPage = connect(mapStateToProps, mapDispatchToProps)(CommodityTab);

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