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
import UserItem from '../common/UserItem';

class Follow extends Component {
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
        this.setState({
            requestflag: requestflag
        })
        if (loadmore) {
            this.setState({
                start: start + count
            })
        }
        let startIndex = loadmore? start + count : start;
        const { loadOtherFollow, loadFollow } = this.props;
        if (requestflag == "0") {//我的关注
            let result = await get(url.getMyFollowList( startIndex, count ))
            loadFollow({
                retCode: "0002",
                data: []
            })
            console.log("cqateresult",result)
            if (result.status == 200 && result.data) {
                let reultdata = result.data.data;
                console.log("reultdata",reultdata)
                loadFollow({
                    retCode: "0000",
                    data: reultdata
                })
            } else {
                loadFollow({
                    retCode: "0001",
                    data: []
                })
                this.refs.toast.show('查询信息失败');
            }
        } else if (requestflag == "1") {//被关注
            let result = await get(url.getOtherFollowList( startIndex, count ))
            loadOtherFollow({
                retCode: "0002",
                data: []
            })
            console.log("otherresult",result)
            if (result.status == 200 && result.data) {
                let reultdata = result.data.data;
                console.log("reultdata",reultdata)
                loadOtherFollow({
                    retCode: "0000",
                    data: reultdata
                })
            } else {
                loadOtherFollow({
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
        return <UserItem
                    theme={theme}
                    projectModel={item.item}
                    start={this.state.start}
                    count={this.state.count}
                    requestflag={this.state.requestflag}
                />
    }

    render() {
        const { theme, follows, otherfollows } = this.props;
        let navigatorBar = <NavigatorBar
                                leftButton = {ViewUtil.getLeftBackButton( () => NavigatorUtil.goBack(this.props.navigation) )}
                                title = {'我的关注'}
                                style={theme.styles.navBar}
                            />
        let targetArr = [];
        if (this.state.requestflag == "0") {
            targetArr = follows
        } else if (this.state.requestflag == "1") {
            targetArr = otherfollows
        }
        console.log("targetArr",targetArr)
        return(
            <View style={{flex:1, backgroundColor: '#f5f5f5'}}>
                {navigatorBar}
                <View style={styles.tabDiv}>
                    <TouchableOpacity style={styles.tabItem} onPress={()=>this.loadData("0", 0, 10)}>
                        <View style={styles.tabItem}>
                            <Text style={styles.tabText}>关注列表</Text>
                            <View style={{width:60,height:2,backgroundColor:this.state.requestflag == "0"?theme.theme_code:"#fff"}}></View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem} onPress={()=>this.loadData("1", 0, 10)}>
                        <View style={styles.tabItem}>
                            <Text style={styles.tabText}>被关注列表</Text>
                            <View style={{width:60,height:2,backgroundColor:this.state.requestflag == "1"?theme.theme_code:"#fff"}}></View>
                        </View>
                    </TouchableOpacity>
                </View>
                { targetArr && targetArr.length >0 ?
                    <FlatList
                        data={targetArr}
                        renderItem={data => this.renderItem(data)}
                        keyExtractor={item => "" + (item.follow_id)}
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
                    /> : <View style={{backgroundColor:'#f5f5f5'}}><Text style={{textAlign:'center',marginTop:100}}>暂时还没有相关的关注哦^_^</Text></View>
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
    follows : state.follow.follows,
    otherfollows : state.follow.otherfollows
})

const mapDispatchToProps = dispatch => ({
    loadFollow: (sendInfo) => dispatch(actions.loadFollow(sendInfo)),
    loadOtherFollow: (sendInfo) => dispatch(actions.loadOtherFollow(sendInfo)),
    addFollow: (sendInfo) => dispatch(actions.addFollow(sendInfo)),
    delFollow: (sendInfo) => dispatch(actions.delFollow(sendInfo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Follow);

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