import React, {Component} from 'react';
import {
    ActivityIndicator,
    FlatList,
    Platform,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    DeviceInfo,
    AsyncStorage
} from 'react-native';
import {
    connect
} from 'react-redux';
import actions from '../../action/index'
import NavigatorUtil from '../navigators/NavigatorUtil'
import CommodityListItem from '../common/CommodityListItem';
import NavigationBar from '../common/NavigationBar';
import Toast from 'react-native-easy-toast'
import ViewUtil from '../util/ViewUtil';
import BackPressComponent from '../common/BackPressComponent';
import url from '../util/url'; 
import { 
    get 
} from '../util/request';

class SearchByCommodity extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
        this.historyView();
        this.state = {
            lastData: false,
            start: 0,
            count: 10,
            historyStr: '',
            searchVal: ""
        }
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

    onBack() {
        NavigatorUtil.goBack(this.props.navigation)
    }

    loadData = async (loadMore, searchVal) => {
        const { searchinfo, searchCommoditys } = this.props;
        let nowstart;
        if (loadMore) {
            nowstart = this.state.start + this.state.count + 1
            this.setState({
                start: nowstart
            })
        } else {
            nowstart = 0;
            this.setState({
                start: 0,
                lastData: false
            })
        }
        let result = await get(url.searchCommodityList(encodeURI(searchVal), nowstart, this.state.count))
        if (result.status == 200 && result.data) {
            let reultdata = result.data.data;
            if (reultdata.length < this.state.count) {
                this.setState({
                    lastData : true
                })
            }
            if (loadMore) {
                let orginArr = searchinfo.searchcommoditys;
                orginArr.push(...reultdata)
                searchCommoditys({
                    retCode: "0000",
                    data: orginArr,
                    inputKey: searchVal
                })
            } else {
                searchCommoditys({
                    retCode: "0000",
                    data: reultdata,
                    inputKey: searchVal
                })
            }
        } else {
            this.refs.toast.show('查询商品失败');
        }
    }

    onBackPress() {
        const { onSearchCancel } = this.props;
        //onSearchCancel();//退出时取消搜索
        this.refs.input.blur();
        NavigatorUtil.goBack(this.props.navigation);
        return true;
    }

    renderItem(data) {
        const { inputKey } = this.props.searchinfo;
        const { theme } = this.params;
        const { item } = data;
        return <CommodityListItem
            theme={theme}
            projectModel={item}
            inputKey={inputKey}
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
        const { theme } = this.params;
        const { searchinfo } = this.props;
        return searchinfo.isLoading ? <View style={styles.indicatorContainer}>
                                            <ActivityIndicator
                                                style={{color:theme.theme_code}}
                                            />
                                            <Text>正在加载更多</Text>
                                      </View> : null
    }

    onRightButtonClick = async (searchVal) => {
        if (searchVal == "" || searchVal == undefined) {
            this.refs.toast.show('请输入搜索信息');
            return
        }
        const { searchinfo } = this.props;
        if (searchinfo.showText === '搜索') {
            let keyval = await  AsyncStorage.getItem('historyArr')
            if (keyval && keyval!=undefined) {
                //排重
                if (keyval.indexOf(searchinfo.inputKey) == -1) {
                    keyval = keyval + ',' + searchinfo.inputKey
                    AsyncStorage.setItem('historyArr',keyval)
                }
            } else {
                AsyncStorage.setItem('historyArr',searchinfo.inputKey)
            }
            
            this.loadData(false, searchVal? searchVal : this.state.searchVal);
        } else {
            //onSearchCancel(this.searchToken);
        }
    }

    changetext(inputtext) {
        const { searchCommoditys } = this.props;
        searchCommoditys({
            retCode: "0003",
            inputKey: inputtext
        })
    }

    renderNavBar() {
        const { showText, inputKey } = this.props.searchinfo;
        const placeholder = inputKey || "请输入您想购买的商品名称";

        let inputView = <TextInput
            ref="input"
            placeholder={placeholder}
            onChangeText={text => this.changetext(text)}
            style={styles.textInput}
            value={inputKey}
        >
        </TextInput>;
        let rightButton =
            <TouchableOpacity
                onPress={() => {
                    this.refs.input.blur();//收起键盘
                    this.onRightButtonClick(inputKey);
                }}
            >
                <View style={{marginRight: 10}}>
                    <Text style={styles.title}>{showText}</Text>
                </View>
            </TouchableOpacity>;
        return <View style={{
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            height: 50,
            borderWidth:1,
            borderColor:'#eee'
        }}>
            {inputView}
            {rightButton}
        </View>
    }

    onItemClick (data,index) {
        this.onRightButtonClick(data);
    }

    historyBox (data,index) {
        return (
            <TouchableOpacity
                onPress={()=>this.onItemClick(data,index)}
            >
                <View style={styles.historybox}>
                    <Text>{data}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    historyView = async () => {
        let result = await AsyncStorage.getItem('historyArr')
        if (result){
            this.setState({
                historyStr: result
            })
        }
    }

    viewsArr = () => {
        let views = [];
        
        if (this.state.historyStr) {

            let values;
            
            values = this.state.historyStr.split(',')
        
            views.push(<View style={{height:40,marginTop:10,justifyContent:'center',marginLeft:16}}>
                <Text >历史搜索</Text>
            </View>)
            for (let i = 0, len = values.length; i < len; i+=5) {
                views.push(
                    <View key={i}>
                        <View style={styles.historyitem}>
                            {this.historyBox(values[i].length>=4?`${values[i].substring(0,4)}...`: values[i], i)}
                            {i + 1 < len ? this.historyBox(values[i + 1].length>=4?`${values[i + 1].substring(0,4)}...`: values[i + 1], i+1) : <View></View>}
                            {i + 2 < len ? this.historyBox(values[i + 2].length>=4?`${values[i + 2].substring(0,4)}...`: values[i + 2], i+2) : <View></View>}
                            {i + 3 < len ? this.historyBox(values[i + 3].length>=4?`${values[i + 3].substring(0,4)}...`: values[i + 3], i+3) : <View></View>}
                            {i + 4 < len ? this.historyBox(values[i + 4].length>=4?`${values[i + 4].substring(0,4)}...`: values[i + 4], i+4) : <View></View>}
                        </View>
                    </View>
                )
            }
        }
        return views
    }

    render() {
        const { searchinfo } = this.props;
        const { theme } = this.params;
        let statusBar = null;
        if (Platform.OS === 'ios' && !DeviceInfo.isIPhoneX_deprecated) {
            statusBar = <View style={[styles.statusBar, {backgroundColor: '#ff4800'}]}/>
        }
        let navigationBar = <NavigationBar
            leftButton = { ViewUtil.getLeftBackButton( () => this.onBack() ) }
            title={'搜索'}
            style={theme.styles.navBar}
        />

        let listView = <FlatList
                data={searchinfo.searchcommoditys}
                renderItem={data => this.renderItem(data)}
                keyExtractor={item => "" + item.commodity_id}
                contentInset={
                    {
                        bottom: 45
                    }
                }
                refreshControl={
                    <RefreshControl
                        title={'Loading'}
                        titleColor={theme.theme_code}
                        colors={[theme.theme_code]}
                        refreshing={searchinfo.isLoading}
                        onRefresh={() => this.loadData(false, searchinfo.inputKey)}
                        tintColor={theme.theme_code}
                    />
                }
                ListFooterComponent={() => this.genIndicator()}
                onEndReached={() => {
                    console.log('---onEndReached----');
                    setTimeout(() => {
                        if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                            this.loadData(true, searchinfo.inputKey);
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
                            this.loadData(true, this.state.searchVal);
                        }
                    }
                    console.log('---onScrollBeginDrag-----')
                }}
            />
        
        let historyViews = this.viewsArr()

        return <View style={{flex:1, backgroundColor:'#f5f5f5'}}>
            {navigationBar}
            {this.renderNavBar()}
            {searchinfo.searchcommoditys && searchinfo.searchcommoditys.length>0? listView : historyViews}
            <Toast ref={'toast'}
                position={'center'}
            />
        </View>
    }
}

const mapStateToProps = state => ({
    searchinfo: state.search
});
const mapDispatchToProps = dispatch => ({
    searchCommoditys: (sendInfo) => dispatch(actions.searchCommoditys(sendInfo)),
});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(SearchByCommodity)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabStyle: {
        // minWidth: 50 //fix minWidth会导致tabStyle初次加载时闪烁
        padding: 0
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: '#fff'
    },
    labelStyle: {
        fontSize: 13,
        margin: 0,
    },
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: 'red',
        margin: 10
    },
    statusBar: {
        height: 20
    },
    bottomButton: {
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9,
        height: 40,
        position: 'absolute',
        left: 10,
        top: 45,
        right: 10,
        borderRadius: 3
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    textInput: {
        flex: 1,
        height: (Platform.OS === 'ios') ? 26 : 36,
        borderWidth: (Platform.OS === 'ios') ? 1 : 0,
        borderColor: "#fff",
        alignSelf: 'center',
        paddingLeft: 5,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 3,
        opacity: 0.7,
        color: '#666'
    },
    title: {
        fontSize: 16,
        color: "#999",
    },
    historyitem: {
        flexDirection:'row',
        height:40,
        alignItems: 'center'
    },
    historybox: {
        marginLeft:10,
        marginTop:10,
        fontSize:13,
        paddingLeft:8,
        paddingRight:8,
        paddingTop:4,
        paddingBottom:4,
        borderRadius:6,
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#eee'
    }
});

