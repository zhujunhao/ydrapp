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
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BaseItem from './BaseItem';
import {
    Dimensions
} from "react-native";
import actions from "../../action/index";
import url from "../util/url";
import {
    post,
    get
} from "../util/request";

class CommodityItem extends BaseItem {

    onFavorClick = async (favorStatus, targetId, categoryId) => {
        const { addCommodityFavor, loadCommoditys, delCommodityFavor, start, count} = this.props;
        if (favorStatus == "0") {
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
                loadCommoditys({
                    retCode: "0002",
                    data: {}
                })
                let result = await get(url.getCommodityList( categoryId, start, count))
                if (result.status == 200 && result.data) {
                    let reultdata = result.data.data;
                    loadCommoditys({
                        retCode: "0000",
                        data: reultdata
                    })
                } else {
                    loadCommoditys({
                        retCode: "0001",
                        data: {}
                    })
                    this.refs.toast.show('输入信息有误');
                }
            } else {
                addCommodityFavor({
                    retCode: "0001",
                    data: {}
                })
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
            if (result && result.data && result.data.msg == 'ok') {
                delCommodityFavor({
                    retCode: "0000",
                    data: {}
                })
                loadCommoditys({
                    retCode: "0002",
                    data: {}
                })
                let result = await get(url.getCommodityList( categoryId, start, count))
                if (result.status == 200 && result.data) {
                    let reultdata = result.data.data;
                    loadCommoditys({
                        retCode: "0000",
                        data: reultdata
                    })
                } else {
                    loadCommoditys({
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
        const { commodityObj, theme } = this.props;
        const item = commodityObj;
        if (!item || !item.commodity_id) return null;
        return (
            <TouchableOpacity
                onPress={()=>this.onItemClick()}
                activeOpacity={1}
            >
                <View style={styles.cell_container}>
                    <View style={styles.ImagePart}>
                        <Image style={styles.picPart}
                            defaultSource={require('../../res/backgroundPic.png')} //默认图片
                            source={{uri: item.commodity_img}}
                        />
                    </View>
                    <Text style={styles.title} numberOfLines={1}>
                        {item.commodity_title}
                    </Text>
                    <View style={styles.row}>
                        <TouchableOpacity
                            onPress={()=>this.dialog.show()}
                            activeOpacity={1}
                        >
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:60,height:20,borderColor:theme.theme_code,backgroundColor:theme.theme_code,borderWidth:1,borderRadius:10}}>
                                <Text style={{color:'#fff',fontSize:10}}>{`券${item.coupon}元`}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{flex:1}}></View>
                        <Text style={{fontSize:10,color:'#9d9d9d',marginRight:5}}>{`月销${item.sales_month}`}</Text>
                    </View>
                    <View style={styles.row}>
                        <View style={{height:30,flexDirection: 'row',alignItems:'center'}}>
                            <Text style={{fontSize:10}}>券后￥:</Text>
                            <Text style={{fontSize:14,fontWeight:'bold',color:'#666'}}>{item.commodity_discount}</Text>
                        </View>
                        <View style={{flex:1}}></View>
                        <TouchableOpacity
                            onPress={()=>this.onFavorClick(item.favorStatus, item.commodity_id, item.category_id)}
                            activeOpacity={1}
                        >
                            <View style={{flexDirection: 'row',height:30,alignItems:'center'}}>
                                <View style={{flexDirection: 'row',height:30,lineheight:30, alignItems:'center'}}>
                                   <AntDesign
                                        name={item.favorStatus == "1" ? 'heart':'hearto'}
                                        size={13}
                                        style={{color: theme.theme_code, marginLeft:5, marginRight:5}}
                                    /> 
                                </View>
                                <Text style={{fontSize:10, marginRight:6}}>
                                    {item.favor_nums}
                                </Text>
                            </View>
                        </TouchableOpacity>

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
    loadCommoditys: (sendInfo) => dispatch(actions.loadCommoditys(sendInfo)),
})

export default connect(mapStateToProps,mapDispatchToProps)(CommodityItem)

var WINDOW = Dimensions.get("window");

var width = WINDOW.width;
function scaleWidth(w) {
    return width / 375.00 * w
}

const styles = StyleSheet.create({
        cell_container: {
            width: width / 2 - scaleWidth(12),
            backgroundColor: 'white',
            paddingBottom: 10,
            marginLeft: scaleWidth(6),
            marginRight: scaleWidth(6),
            marginBottom: scaleWidth(10),
            marginVertical: 3,
            borderColor: '#dddddd',
            borderWidth: 0.5,
            borderRadius: 6,
            shadowColor: 'gray',
            shadowOffset: {width: 0.5, height: 0.5},
            shadowOpacity: 0.4,
            shadowRadius: 1,
            elevation: 2
        },
        ImagePart: {
            flex:1,
            height:160,
        },
        picPart: {
            borderRadius: 6,
            flex:1
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop:8,
            paddingLeft:6,
            paddingRight:6,
            height:20,
        },
        title: {
            flex:1,
            fontSize: 12,
            marginLeft:10,
            marginTop:10,
            color: '#212121',
            
        }
    }
);