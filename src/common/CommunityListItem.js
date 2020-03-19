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
import AntDesign from 'react-native-vector-icons/AntDesign';
import BaseItem from "./BaseItem";
import actions from "../../action/index";
import url from "../util/url";
import {
    post,
    get
} from "../util/request";

class CommunityListItem extends BaseItem {
    onFavorClick = async (favorStatus, targetId) => {
        const { addCommunityFavor, loadCommunitys, delCommunityFavor, topic, questionType, start, count} = this.props;
        if (favorStatus == "0") {
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
                loadCommunitys({
                    retCode: "0002",
                    data: {}
                })
                let result = await get(url.getCommunityList( topic, questionType, start, count))
                if (result.status == 200 && result.data) {
                    let reultdata = result.data.data;
                    loadCommunitys({
                        retCode: "0000",
                        data: reultdata
                    })
                } else {
                    loadCommunitys({
                        retCode: "0001",
                        data: {}
                    })
                    this.refs.toast.show('输入信息有误');
                }
            } else {
                addCommunityFavor({
                    retCode: "0001",
                    data: {}
                })
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
            if (result && result.data && result.data.msg == 'ok') {
                delCommunityFavor({
                    retCode: "0000",
                    data: {}
                })
                loadCommunitys({
                    retCode: "0002",
                    data: {}
                })
                let result = await get(url.getCommunityList( topic, questionType, start, count))
                if (result.status == 200 && result.data) {
                    let reultdata = result.data.data;
                    loadCommunitys({
                        retCode: "0000",
                        data: reultdata
                    })
                } else {
                    loadCommunitys({
                        retCode: "0001",
                        data: {}
                    })
                    this.refs.toast.show('输入信息有误');
                }
            } else {
                delCommunityFavor({
                    retCode: "0001",
                    data: {}
                })
            }
        }
    }
    render() {
        const { CommunityObj, theme } = this.props;
        console.log("ssprops",JSON.stringify(this.props))
        console.log("CommunityObj",JSON.stringify(CommunityObj))
        const item = CommunityObj;
        if (!item || !item.question_id) return null;
        return (
            <TouchableOpacity
                onPress={()=>this.onItemClick()}
                underlayColor={'transparent'}
                activeOpacity={1}
            >
                <View style={styles.cell_container}>
                    <View style={{height: 60, width: 60,borderRadius:6,borderWidth:1,borderColor:'#eee'}}>
                        <Image style={{height: 58, width: 58,borderRadius:6}}
                            defaultSource={require('../../res/backgroundPic.png')} //默认图片
                            source={{uri: url.imagepath(item.question_max_img)}}
                        />
                    </View>
                    <View style={{flex:1,marginLeft:10,flexDirection:'column'}}>
                        <Text style={styles.title} numberOfLines={2}>
                            {item.question_title}
                        </Text>

                        <View style={styles.row}>
                            <View style={{flex:1}}></View>
                            <View style={{flexDirection: 'row',justifyContent:'center'}}>
                                <AntDesign
                                    name={'staro'}
                                    size={13}
                                    style={{color:'#666', marginLeft:5, marginRight:5}}
                                />
                                <Text style={{fontSize:10,color:'#9d9d9d', marginLeft:5, marginRight:5}}>{item.collect_nums}</Text>
                            </View>
                            <View style={{flexDirection: 'row',justifyContent:'center'}}>
                                <AntDesign
                                    name={'message1'}
                                    size={13}
                                    style={{color:'#666', marginLeft:5, marginRight:5}}
                                />
                                <Text style={{fontSize:10,color:'#9d9d9d', marginLeft:5, marginRight:5}}>{item.comment_nums}</Text>
                            </View>
                            <View style={{flexDirection: 'row',justifyContent:'center'}}>
                                <AntDesign
                                    name={'barchart'}
                                    size={13}
                                    style={{color:'#666', marginLeft:5, marginRight:5}}
                                />
                                <Text style={{fontSize:10,color:'#9d9d9d', marginLeft:5, marginRight:5}}>{item.browse_nums}</Text>
                            </View>
                            <View style={{flexDirection: 'row',justifyContent:'center'}}>
                                <AntDesign
                                    name={'hearto'}
                                    size={13}
                                    style={{color:'#666', marginLeft:5, marginRight:5}}
                                />
                                <Text style={{fontSize:10,color:'#9d9d9d', marginLeft:5, marginRight:5}}>{item.favor_nums}</Text>
                            </View>
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
    addCommunityFavor: (sendInfo) => dispatch(actions.addCommunityFavor(sendInfo)),
    delCommunityFavor: (sendInfo) => dispatch(actions.delCommunityFavor(sendInfo)),
    loadCommunitys: (sendInfo) => dispatch(actions.loadCommunitys(sendInfo)),
})
export default connect(mapStateToProps,mapDispatchToProps)(CommunityListItem)

const styles = StyleSheet.create({
        cell_container: {
            backgroundColor: '#fff',
            flexDirection:'row',
            padding: 10,
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            marginVertical: 3,
            borderRadius: 8,
        },
        row: {
            height:20,
            flexDirection: 'row',
            alignItems: 'center'
        },
        title: {
            flex:1,
            fontSize: 13,
            marginTop: 5,
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