import React, {Component} from 'react';
import { 
    connect 
} from 'react-redux';
import {
    Image, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View
} from 'react-native'
import BaseItem from "./BaseItem";
import AntDesign from 'react-native-vector-icons/AntDesign';
import actions from "../../action/index";
import url from "../util/url";
import {
    post,
    get
} from "../util/request";

class CommodityListItem extends BaseItem {
    onFavorClick = async (favorStatus, targetId) => {
        const { addCommodityFavor, searchCommoditys, delCommodityFavor, start, count, inputKey} = this.props;
        if (favorStatus == "0") {
            console.log("eeee222222", start)
            console.log("eeee444", count)
            let data = {
                favorType: "303",
                targetId
            }
            addCommodityFavor({
                retCode: "0002",
                data: {}
            })
            console.log("eeee333333")
            let result = await post(url.toFavor() ,data)
            console.log("eeee",result)
            if (result && result.data && result.data.msg == 'ok') {
                addCommodityFavor({
                    retCode: "0000",
                    data: {}
                })
                searchCommoditys({
                    retCode: "0002",
                    data: []
                })
                let result = await get(url.searchCommodityList( encodeURI(inputKey), start, count))
                if (result.status == 200 && result.data) {
                    let reultdata = result.data.data;
                    searchCommoditys({
                        retCode: "0000",
                        data: reultdata,
                        inputKey
                    })
                } else {
                    searchCommoditys({
                        retCode: "0001",
                        data: {}
                    })
                    this.refs.toast.show('查询信息失败');
                }
            } else {
                addCommodityFavor({
                    retCode: "0001",
                    data: {}
                })
            }
        } else {
            let data = {
                favorType: "303",
                targetId
            }
            delCommodityFavor({
                retCode: "0002",
                data: {}
            })
            let result = await post(url.disFavor() ,data)
            if (result && result.data && result.data.msg == 'ok') {
                delCommodityFavor({
                    retCode: "0000",
                    data: {}
                })
                searchCommoditys({
                    retCode: "0002",
                    data: {}
                })
                let result = await get(url.searchCommodityList( encodeURI(inputKey), start, count))
                if (result.status == 200 && result.data) {
                    let reultdata = result.data.data;
                    searchCommoditys({
                        retCode: "0000",
                        data: reultdata,
                        inputKey
                    })
                } else {
                    searchCommoditys({
                        retCode: "0001",
                        data: {}
                    })
                    this.refs.toast.show('输入信息有误');
                }
            } else {
                delCommodityFavor({
                    retCode: "0001",
                    data: {}
                })
            }
        }
    }
    render() {
        const { projectModel, theme } = this.props;
        console.log("ssprops",JSON.stringify(this.props))
        const item  = projectModel;
        if (!item || !item.commodity_id) return null;
        return (
            <TouchableOpacity
                onPress={()=>this.onItemClick()}
                underlayColor={'transparent'}
                activeOpacity={1}
            >
                <View style={styles.cell_container}>
                    <View style={{height: 100, width: 100,borderRadius:6,borderWidth:1,borderColor:'#eee'}}>
                        <Image style={{height: 98, width: 98,borderRadius:6}}
                            defaultSource={require('../../res/backgroundPic.png')} //默认图片
                            source={{uri: item.commodity_img}}
                        />
                    </View>
                    <View style={{flex:1,marginLeft:10,flexDirection:'column'}}>
                        <Text style={styles.title} numberOfLines={2}>
                            {item.commodity_title}
                        </Text>
                        <View style={styles.row}>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:60,height:20,borderColor:theme.theme_code,backgroundColor:theme.theme_code,borderWidth:1,borderRadius:10}}>
                                <Text style={{color:'#fff',fontSize:12}}>{`券${item.coupon}元`}</Text>
                            </View>
                            <View style={{flex:1}}></View>
                            <Text style={{fontSize:12,color:'#9d9d9d',marginRight:5}}>{`月销${item.sales_month}`}</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.row}>
                                <Text style={{fontSize:12}}>券后￥:</Text>
                                <Text style={{fontSize:18,fontWeight:'bold',color:'#666'}}>{item.commodity_discount}</Text>
                                <Text style={{fontSize:10,textDecorationLine:'line-through',color:'#999',marginLeft:5}}>{item.price_ori}</Text>
                            </View>
                            <View style={{flex:1}}></View>
                            <TouchableOpacity
                                onPress={()=>this.onFavorClick(item.favorStatus, item.commodity_id, item.category_id)}
                                activeOpacity={1}
                            >
                                <View style={{flexDirection: 'row',height:30,alignItems:'center'}}>
                                    <View style={{flexDirection: 'row',height:30,lineheight:30, alignItems:'center'}}>
                                    {item.favorStatus == "1" ? <AntDesign
                                            name={'heart'}
                                            size={13}
                                            style={{color: theme.theme_code, marginLeft:5, marginRight:5}}
                                        /> : <AntDesign
                                                name={'hearto'}
                                                size={13}
                                                style={{color: theme.theme_code, marginLeft:5, marginRight:5}}
                                            /> }
                                    </View>
                                    <Text style={{fontSize:10, marginRight:6}}>
                                        {item.favor_nums}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }
}
const mapStateToProps = state => ({
    theme: state.theme.theme,
})

const mapDispatchToProps = dispatch => ({
    addCommodityFavor: (sendInfo) => dispatch(actions.addCommodityFavor(sendInfo)),
    delCommodityFavor: (sendInfo) => dispatch(actions.delCommodityFavor(sendInfo)),
    searchCommoditys: (sendInfo) => dispatch(actions.searchCommoditys(sendInfo)),
})
export default connect(mapStateToProps,mapDispatchToProps)(CommodityListItem);

const styles = StyleSheet.create({
        cell_container: {
            backgroundColor: '#fff',
            flexDirection:'row',
            padding: 10,
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            marginVertical: 3,
            borderColor: '#dddddd',
            borderWidth: 0.5,
            borderRadius: 8,
            shadowColor: 'gray',
            shadowOffset: {width: 0.5, height: 0.5},
            shadowOpacity: 0.4,
            shadowRadius: 1,
            elevation: 2
        },
        row: {
            height:30,
            flexDirection: 'row',
            alignItems: 'center',
        },
        title: {
            flex:1,
            fontSize: 13,
            marginBottom: 2,
            color: '#212121',
        },
        description: {
            fontSize: 14,
            marginBottom: 2,
            color: '#757575',
        }
    }
);