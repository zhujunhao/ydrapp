import React, { Component } from 'react';
import { 
    StyleSheet,
    TouchableOpacity, 
    View,
    Clipboard, 
    DeviceInfo,
    Text,
    Image,
    FlatList,
    ScrollView,
    Linking  
} from 'react-native';
import { 
    FLAG_STORAGE 
} from '../ask/DataStore';
import { 
    connect 
} from 'react-redux';
import actions from '../../action/index';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import CommodityItem from '../common/CommodityItem';
import NavigatorUtil from '../navigators/NavigatorUtil';
import BackPressComponent from '../common/BackPressComponent';
import Toast from 'react-native-easy-toast';
import url from '../util/url'; 
import { 
    post,
    get
} from '../util/request';

class DetailByCommodity extends Component {
    constructor(props) {
        super(props);
        console.log("detailprops",JSON.stringify(this.props))
        this.params = this.props.navigation.state.params;

        this.state = {
            canGoBack: false,
        }
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    // _store() {
    //     const { commodityObj } = this.props;
    //     let store = commodityObj;
    //     if (!store) {
    //         store = {
    //             items: commodityObj,
    //             isLoading: false,
    //             projectModels: [],//要显示的数据
    //             hideLoadingMore: true,//默认隐藏加载更多
    //         }
    //     }
    //     return store;
    // }

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

    reqlink = async (goodsID,goType) => {
        let data = new FormData();
        data.append("goodsID", goodsID);
        let result = await post(url.reqLink(), data)
        console.log("req", result)
        if (result.status == 200 && result.data) {
            this.copy(result.data.data.model,goType)
        } else {
            islogin({
                retCode: "0001",
                data: {}
            })
            this.refs.toast.show('获取口令失败');
        }
    }

    async copy( targetText, goType ){
        let contentText = "复制这段内容，打开某宝即可领取专属优惠" + targetText;
        console.log("targetText",targetText)
        Clipboard.setString(contentText);
        let  str = await Clipboard.getString();
        if ( goType == 'goShop') {
            this.refs.toast.show('已复制优惠券口令');
            //let url = 'taobao://www.taobao.com';
            //Linking.openURL(url) 
        } else {
            this.refs.toast.show('已复制到粘贴板');
        }
        console.log('str',str)//我是文本
    }

    favorBtn = async (targetId, favorStatus) => {
        const { addCommodityFavor, loadCommodityDetail, delCommodityFavor, commodityDetail } = this.props;
        let favorFlag;
        if (favorStatus == "0" || favorStatus == "1") {
            favorFlag = favorStatus
        } else {
            favorFlag = commodityDetail.favorStatus
        }
        if (favorFlag == "0") {
            let data = new FormData();
            data.append("favorType", "303");
            data.append("targetId", targetId);
            addCommodityFavor({
                retCode: "0002",
                data: {}
            })
            let result = await post(url.toFavor() ,data)
            if (result && result.data && result.data.msg == 'ok') {
                addCommodityFavor({
                    retCode: "0000",
                    data: {}
                })
                this.refs.toast.show('点赞成功');
                loadCommodityDetail({
                    retCode: "0002",
                    data: {}
                })
                let detailresult = await get(url.getCommodityDetail( targetId ))
                if (detailresult.status == 200 && detailresult.data) {
                    let detaildata = detailresult.data;
                    loadCommodityDetail({
                        retCode: "0000",
                        data: detaildata
                    })
                } else {
                    loadCommodityDetail({
                        retCode: "0001",
                        data: {}
                    })
                    this.refs.toast.show('查询详情失败');
                }
            } else {
                addCommodityFavor({
                    retCode: "0001",
                    data: {}
                })
                this.refs.toast.show('点赞失败');
            }
        } else {
            let data = new FormData();
            data.append("favorType", "303");
            data.append("targetId", targetId);
            delCommodityFavor({
                retCode: "0002",
                data: {}
            })
            let result = await post(url.disFavor() ,data)
            console.log("resuldis",result)
            if (result && result.data && result.data.msg == 'ok') {
                delCommodityFavor({
                    retCode: "0000",
                    data: {}
                })
                this.refs.toast.show('取消点赞成功');
                loadCommodityDetail({
                    retCode: "0002",
                    data: {}
                })
                let detailresult = await get(url.getCommodityDetail( targetId ))
                if (detailresult.status == 200 && detailresult.data) {
                    let detaildata = detailresult.data;
                    loadCommodityDetail({
                        retCode: "0000",
                        data: detaildata
                    })
                } else {
                    loadCommodityDetail({
                        retCode: "0001",
                        data: {}
                    })
                    this.refs.toast.show('查询详情失败');
                }
            } else {
                delCommodityFavor({
                    retCode: "0001",
                    data: {}
                })
                this.refs.toast.show('取消点赞失败');
            }
        }
    }

    collectBtn = async ( targetId, collectStatus ) => {
        const { addCommodityCollect, loadCommodityDetail, delCommodityCollect, commodityDetail } = this.props;
        console.log("collectStatus",collectStatus)
        console.log("commodityDetail123",commodityDetail)
        let collectFlag
        if (collectStatus == "0" || collectStatus == "1") {
            collectFlag = collectStatus
        } else {
            collectFlag = commodityDetail.collectStatus
        }
        if (collectFlag == "0") {
            let data = new FormData();
            data.append("collectType", "501");
            data.append("targetId", targetId);
            addCommodityCollect({
                retCode: "0002",
                data: {}
            })
            console.log("opopopopop")
            let result = await post(url.toCollect() ,data)
            if (result && result.data && result.data.msg == 'ok') {
                addCommodityCollect({
                    retCode: "0000",
                    data: {}
                })
                this.refs.toast.show('收藏成功');
                loadCommodityDetail({
                    retCode: "0002",
                    data: {}
                })
                let detailresult = await get(url.getCommodityDetail( targetId ))
                if (detailresult.status == 200 && detailresult.data) {
                    let detaildata = detailresult.data;
                    loadCommodityDetail({
                        retCode: "0000",
                        data: detaildata
                    })
                } else {
                    loadCommodityDetail({
                        retCode: "0001",
                        data: {}
                    })
                    this.refs.toast.show('查询信息失败');
                }
            } else {
                addCommodityCollect({
                    retCode: "0001",
                    data: {}
                })
                this.refs.toast.show('新增收藏失败');
            }
        } else {
            let data = new FormData();
            data.append("collectType", "501");
            data.append("targetId", targetId);
            delCommodityCollect({
                retCode: "0002",
                data: {}
            })
            let result = await post(url.disCollect() ,data)
            console.log("resuldis",result)
            if (result && result.data && result.data.msg == 'ok') {
                delCommodityCollect({
                    retCode: "0000",
                    data: {}
                })
                this.refs.toast.show('取消收藏成功');
                loadCommodityDetail({
                    retCode: "0002",
                    data: {}
                })
                let detailresult = await get(url.getCommodityDetail( targetId ))
                if (detailresult.status == 200 && detailresult.data) {
                    console.log("dddddd",detailresult.data)
                    let detaildata = detailresult.data;
                    loadCommodityDetail({
                        retCode: "0000",
                        data: detaildata
                    })
                } else {
                    loadCommodityDetail({
                        retCode: "0001",
                        data: {}
                    })
                    this.refs.toast.show('查询信息失败');
                }
            } else {
                delCommodityCollect({
                    retCode: "0001",
                    data: {}
                })
                this.refs.toast.show('取消收藏失败');
            }
        }
    }
    
    renderRightButton() {
        const { commodityDetail } = this.props;
        const { commodityObj } = this.params;
        console.log("commodityDetail", commodityDetail)
        console.log("commodityObj", commodityObj)
        let collectFlag;
        let favorFlag;
        if (commodityDetail) {
            collectFlag = commodityDetail.collectStatus
        } else {
            collectFlag = commodityObj.collectStatus
        }
        if (commodityDetail) {
            favorFlag = commodityDetail.favorStatus
        } else {
            favorFlag = commodityObj.favorStatus
        }
        
        return (<View style={{flexDirection: 'row',alignItems:'center'}}>
            <TouchableOpacity onPress={() => this.favorBtn(commodityObj.commodity_id, favorFlag)} activeOpacity={1}>
                <AntDesign
                    name={favorFlag == "0"? 'hearto':'heart'}
                    size={18}
                    style={{color:'#fff', marginLeft:10 ,marginRight: 10}}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.collectBtn(commodityObj.commodity_id, collectFlag)} activeOpacity={1}>
                <AntDesign
                    name={collectFlag == "0"?'staro':'star'}
                    size={18}
                    style={{color:'#fff', marginLeft:10 ,marginRight: 20}}
                />
            </TouchableOpacity>
        </View>)
    }

    gotowebDetail(){
        console.log("thisparams", this.params)
        let { theme, commodityObj } = this.params;
        NavigatorUtil.goPage({
            theme,
            projectModel: commodityObj,
            flag: FLAG_STORAGE.Collection
        },'WebviewDeatil')
    }

    webDetail() {
        return (<View style={{flexDirection:'column',width:30,height:30,justifyContent:'center',alignItems:'center',marginLeft:10}}>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.gotowebDetail()}>
                        <AntDesign
                            name={'filetext1'}
                            size={20}
                            style={{color:'#666'}}
                        />
                        <Text style={{marginTop:5,justifyContent:'center',alignItems:'center',fontSize:12}}>详情</Text>
                    </TouchableOpacity>
                </View>)
    }

    renderItem(data) {
        const { item } = data;
        console.log("tarfet",JSON.stringify(item))
        const { theme } = this.props;
        return <CommodityItem
            projectModel={item}
            theme = {theme}
            onSelect={(callback)=> {
                NavigatorUtil.goPage({
                    theme,
                    projectModel: item,
                    flag: FLAG_STORAGE.Collection,
                    callback
                },'DetailByCommodity')
            }}
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
        const { theme, commodityObj } = this.params;
        let item = commodityObj;
        console.log("itemee",item)
        const titleLayoutStyle = item.commodity_title ? {paddingRight: 30} : null;
        let navigationBar = <NavigationBar
                leftButton = { ViewUtil.getLeftBackButton( () => this.onBack() ) }
                titleLayoutStyle = {titleLayoutStyle}
                title={""}
                style={theme.styles.navBar}
                rightButton = {this.renderRightButton()}
        />
        return (
            <SafeAreaViewPlus
                topColor={theme.theme_code}
            >
                <ScrollView>
                    {navigationBar}
                    <View style={{flex:1,backgroundColor:'#fff'}}>
                        <View style={{flex:1,flexDirection:'column'}}>
                            <Image style={{height:300}}
                                source={{uri: item.commodity_img}}
                            />
                            <View style={{flexDirection:'row',padding:10,alignItems:'center'}}>
                                <View style={{flex:1}}>
                                    <Text style={{color:'#333',paddingTop:3,paddingBottom:3}}>{item.commodity_title}</Text>
                                </View>
                                {this.webDetail()}
                            </View>
                            <View style={{flexDirection:'row',height:30,alignItems:'center',marginTop:10}}>
                                <View style={{height:20,marginLeft:10,borderColor:theme.theme_code,backgroundColor:theme.theme_code,borderRadius:10,borderWidth:2,paddingLeft:8,paddingRight:8,alignItems:'center',marginRight:10}}>
                                    <Text style={{fontSize:13,color:'#fff',fontWeight:'bold'}}>券后价</Text>
                                </View>
                                <Text style={{color:theme.theme_code,fontSize:16}}>{`${item.commodity_discount}元`}</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',height:40,padding:10,alignItems:'center',marginBottom:10}}>
                                <Text style={{textDecorationLine:'line-through',color:'#999'}}>{`原价：￥${item.price_ori}`}</Text>
                                <Text>{`月销量${item.sales_month}`}</Text>
                            </View>
                        </View>
                        <View style={{flex:1,height:10,backgroundColor:'#f5f5f5'}}></View>
                        <View style={styles.topic}>
                            {/* <Text style={styles.topicHead}>-----  相关推荐  -----</Text>
                            <FlatList
                                data={store.projectModels}
                                keyExtractor={item => "" + item.item.goodsNum}
                                renderItem={data => this.renderItem(data)}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            />
                            <View style={{height:40}}></View> */}
                        </View>
                    </View>
                    <Toast ref={'toast'}
                        position={'center'}
                    />
                </ScrollView>
                
                <View style={{flex:1,height:DeviceInfo.isIPhoneX_deprecated ? 71 : 51 , flexDirection:'column',position: 'absolute',bottom: 0,left:0,right:0}}>
                    <View style={{height:1,backgroundColor:'#eee'}}></View>
                    <View style={{flex:1,flexDirection:'row',height:50,opacity:1,backgroundColor:'#fff',paddingTop:4}}>
                        <View style={{flex:1}}>
                            <TouchableOpacity onPress={()=>this.backHome()} activeOpacity={1}>
                                <View style={{width:60,height:36,marginTop:7,marginBottom:7,flexDirection:'column',backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
                                    <AntDesign
                                        name={'home'}
                                        size={20}
                                        style={{color:'#777'}}
                                    />
                                    <Text style={{color:'#777',fontSize:10}}>首页</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={()=>this.reqlink(item.commodity_id,'goShop')}
                            activeOpacity={1}
                        >
                            <View style={{width:120,height:36,marginTop:7,marginBottom:7,marginRight:7,flexDirection:'row',backgroundColor:theme.theme_code,justifyContent:'center',alignItems:'center',borderRadius:18}}>
                                <AntDesign
                                    name={'gift'}
                                    size={20}
                                    style={{color:'#fff',marginRight:10}}
                                />
                                <Text style={{color:'#fff',fontSize:14}}>领券购买</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>this.reqlink(item.commodity_id,'shareGoods')}
                            activeOpacity={1}
                        >
                            <View style={{width:120,height:36,marginTop:7,marginBottom:7,marginRight:7,flexDirection:'row',backgroundColor:'#ff4800',justifyContent:'center',alignItems:'center',borderRadius:18}}>
                                <AntDesign
                                    name={'export'}
                                    size={20}
                                    style={{color:'#fff',marginRight:10}}
                                />
                                <Text style={{color:'#fff',fontSize:14}}>复制分享</Text>
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
    commodityDetail: state.detail.commodityDetail
})

const mapDispatchToProps = dispatch => ({
    addCommodityFavor: (sendInfo) => dispatch(actions.addCommodityFavor(sendInfo)),
    addCommodityCollect: (sendInfo) => dispatch(actions.addCommodityCollect(sendInfo)),
    delCommodityFavor: (sendInfo) => dispatch(actions.delCommodityFavor(sendInfo)),
    delCommodityCollect: (sendInfo) => dispatch(actions.delCommodityCollect(sendInfo)),
    loadCommodityDetail: (sendInfo) => dispatch(actions.loadCommodityDetail(sendInfo)),
})

export default connect(mapStateToProps,mapDispatchToProps)(DetailByCommodity)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: DeviceInfo.isIphoneX_deprecated ? 30 : 0
    },
    topic: {
        alignItems:'center',
        backgroundColor: '#fff',
        paddingBottom:10,
        marginBottom:10,
    },
    topicHead:{
        fontSize:14,
        color:'#666',
        padding:15,
    },
})