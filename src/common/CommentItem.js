import React, {Component} from 'react';
import { 
    connect 
} from 'react-redux';
import {
    Image, 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity
} from 'react-native'
import Toast from 'react-native-easy-toast';
import AntDesign from 'react-native-vector-icons/AntDesign';
import actions from "../../action/index";
import url from "../util/url";
import {
    post,
    get
} from "../util/request";

class CommentItem extends Component {

    onFavorClick = async (favorStatus, targetId, communityId) => {
        console.log("favorStatus",favorStatus)
        const { addCommentFavor, loadCommentByCommunity, delCommentFavor, start, count} = this.props;
        if (favorStatus == "0") {
            let data = new FormData();
            data.append("favorType", "302");
            data.append("targetId", targetId);
            addCommentFavor({
                retCode: "0002",
                data: {}
            })
            let result = await post(url.toFavor() ,data)
            if (result && result.data && result.data.msg == 'ok') {
                addCommentFavor({
                    retCode: "0000",
                    data: {}
                })
                this.refs.toast.show('点赞成功');
                loadCommentByCommunity({
                    retCode: "0002",
                    data: {}
                })
                let result = await get(url.getCommentListByCommunity( communityId, start, count))
                if (result.status == 200 && result.data) {
                    let reultdata = result.data.data;
                    loadCommentByCommunity({
                        retCode: "0000",
                        data: reultdata
                    })
                } else {
                    loadCommentByCommunity({
                        retCode: "0001",
                        data: {}
                    })
                    //this.refs.toast.show('查询评论列表失败');
                }
            } else {
                addCommentFavor({
                    retCode: "0001",
                    data: {}
                })
                //this.refs.toast.show('点赞失败');
            }
        } else {
            let data = new FormData();
            data.append("favorType", "302");
            data.append("targetId", targetId);
            delCommentFavor({
                retCode: "0002",
                data: {}
            })
            let result = await post(url.disFavor() ,data)
            if (result && result.data && result.data.msg == 'ok') {
                delCommentFavor({
                    retCode: "0000",
                    data: {}
                })
                //this.refs.toast.show('取消点赞成功');
                loadCommentByCommunity({
                    retCode: "0002",
                    data: {}
                })
                let result = await get(url.getCommentListByCommunity( communityId, start, count))
                if (result.status == 200 && result.data) {
                    let reultdata = result.data.data;
                    loadCommentByCommunity({
                        retCode: "0000",
                        data: reultdata
                    })
                } else {
                    loadCommentByCommunity({
                        retCode: "0001",
                        data: {}
                    })
                    //this.refs.toast.show('查询评论列表失败');
                }
            } else {
                delCommentFavor({
                    retCode: "0001",
                    data: {}
                })
                //this.refs.toast.show('取消点赞失败');
            }
        }
    }


    render() {
        const { item, theme } = this.props;
        console.log("sspropsss",JSON.stringify(this.props))
        return (
            <View style={styles.cell_container}>
                <View style={{height: 30, width: 30,borderRadius:15,borderWidth:1,borderColor:'#eee'}}>
                    <Image style={{height: 28, width: 28,borderRadius:15}}
                        defaultSource={require('../../res/backgroundPic.png')} //默认图片
                        source={{uri: url.imagepath(item.commentingAvatar ? item.commentingAvatar : item.avatar)}}
                    />
                </View>
                <View style={{flex:1,marginLeft:10,flexDirection:'column'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between', alignItems: 'center'}}>
                        <Text style={styles.title} numberOfLines={2}>
                            {item.commentingNickname ? item.commentingNickname : item.nick_name}
                        </Text>
                        <TouchableOpacity
                            style={{height: 30,flexDirection:'row', alignItems:'center'}}
                            onPress={()=>this.onFavorClick(item.favorStatus, item.comment_id, item.question_id)}
                            activeOpacity={1}
                        >
                            {item.favorStatus == "0"? <AntDesign
                                name={'hearto'}
                                size={13}
                                style={{color:theme.theme_code, marginRight:5}}
                            /> : <AntDesign
                                name={'heart'}
                                size={13}
                                style={{color:theme.theme_code, marginRight:5}}
                            />}
                            <Text style={{fontSize:13}}>
                                {item.favorNums}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'#333',fontSize:13}}>{item.comment_content}</Text>
                        </View>
                        <View style={{flex:1}}></View>

                    </View>
                    <Text style={{fontSize:12}}>{`2009-09-19`}</Text>
                </View>
                <Toast ref={'toast'}
                    position={'center'}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
})

const mapDispatchToProps = dispatch => ({
    addCommentFavor: (sendInfo) => dispatch(actions.addCommentFavor(sendInfo)),
    delCommentFavor: (sendInfo) => dispatch(actions.delCommentFavor(sendInfo)),
    loadCommentByCommunity: (sendInfo) => dispatch(actions.loadCommentByCommunity(sendInfo)),
})

export default connect(mapStateToProps,mapDispatchToProps)(CommentItem)

const styles = StyleSheet.create({
        cell_container: {
            backgroundColor: '#fff',
            flexDirection:'row',
            justifyContent: 'center',
            padding: 10,
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 10
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
            color: '#666',
        },
        description: {
            fontSize: 14,
            marginBottom: 2,
            color: '#757575',
        }
    }
);