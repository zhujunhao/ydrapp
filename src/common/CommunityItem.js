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

class CommunityItem extends BaseItem {

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
        if (!CommunityObj || !CommunityObj.question_id) return null;
        return (
            <TouchableOpacity
                onPress={()=>this.onItemClick()}
                activeOpacity={1}
            >
                <View style={styles.cell_container}>
                    <View style={styles.ImagePart}>
                        <Image style={styles.picPart}
                            defaultSource={require('../../res/backgroundPic.png')} //默认图片
                            source={{uri: url.imagepath(CommunityObj.question_max_img)}}
                        />
                    </View>
                    <Text style={styles.title} numberOfLines={1}>
                        {CommunityObj.question_title}
                    </Text>
                    <View style={styles.row}>
                        <View style={{height:30,flexDirection: 'row',alignItems:'center'}}>
                            <Image style={{width:20, height:20, borderRadius:10, borderColor:'#eee', borderWidth:1}}
                                defaultSource={require('../../res/backgroundPic.png')} //默认图片
                                source={{uri: url.imagepath(CommunityObj.userAvatar)}}
                            />
                            <Text style={{fontSize:10, marginLeft:6}}>{CommunityObj.nick_name}</Text>
                        </View>
                        <View style={{flex:1}}></View>
                        <TouchableOpacity
                            onPress={()=>this.onFavorClick(CommunityObj.favorStatus, CommunityObj.question_id)}
                            activeOpacity={1}
                        >
                            <View style={{flexDirection: 'row',height:30,alignItems:'center'}}>
                                <View style={{flexDirection: 'row',height:30,lineheight:30, alignItems:'center'}}>
                                   <AntDesign
                                        name={CommunityObj.favorStatus == "1" ? 'heart' : 'hearto'}
                                        size={13}
                                        style={{color: theme.theme_code, marginLeft:5, marginRight:5}}
                                    /> 

                                </View>
                                <Text style={{fontSize:10, marginRight:6}}>
                                    {CommunityObj.favor_nums}
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
    addCommunityFavor: (sendInfo) => dispatch(actions.addCommunityFavor(sendInfo)),
    delCommunityFavor: (sendInfo) => dispatch(actions.delCommunityFavor(sendInfo)),
    loadCommunitys: (sendInfo) => dispatch(actions.loadCommunitys(sendInfo)),
})

export default connect(mapStateToProps,mapDispatchToProps)(CommunityItem)

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
});