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
import actions from "../../action/index";
import url from "../util/url";
import {
    post,
    get
} from "../util/request";

class UserItem extends Component {

    // 关注
    followbtn = async( followedUserId, followStatus ) => {
        const { addFollow, delFollow } = this.props;
        let followFlag = followStatus;
        if (followFlag == "0") {
            let data = new FormData();
            data.append("followedUserId", followedUserId);
            addFollow({
                retCode: "0002",
                data: {}
            })
            let result = await post(url.toFollow() ,data)
            if (result && result.data && result.data.msg == 'ok') {
                addFollow({
                    retCode: "0000",
                    data: {}
                })
                this.refs.toast.show('关注成功');
                this.loadData()
            } else {
                addFollow({
                    retCode: "0001",
                    data: {}
                })
                this.refs.toast.show('关注失败');
            }
        } else {
            let data = new FormData();
            data.append("disfollowedUserId", followedUserId);
            delFollow({
                retCode: "0002",
                data: {}
            })
            let result = await post(url.disFollow() ,data)
            console.log("resuldis",result)
            if (result && result.data && result.data.msg == 'ok') {
                delFollow({
                    retCode: "0000",
                    data: {}
                })
                this.refs.toast.show('取消关注成功');
                this.loadData()
            } else {
                delFollow({
                    retCode: "0001",
                    data: {}
                })
                this.refs.toast.show('取消关注失败');
            }
        }
    }

    // 加载数据
    loadData = async () => {
        const { loadFollow, loadOtherFollow, requestflag, start, count } = this.props;
        if (requestflag == "0") {//我的关注
            let result = await get(url.getMyFollowList( start, count ))
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
            let result = await get(url.getOtherFollowList( start, count ))
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


    render() {
        const { projectModel, theme, requestflag } = this.props;
        console.log("sspropsss",JSON.stringify(this.props))
        return (
            <View style={{flex:1,height:50, lineHeight:50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', margin: 10, borderRadius: 8}}>
                <Image style={{width:30, height:30, borderRadius:15, borderColor:'#eee', borderWidth:1, marginLeft:10, marginRight: 10}}
                    defaultSource={require('../../res/backgroundPic.png')} //默认图片
                    source={{uri: projectModel.avatar}}
                />
                <Text style={{fontSize: 13}}>{projectModel.nick_name}</Text>
                <View style={{flex:1}}></View>
                <TouchableOpacity onPress={() => this.followbtn(projectModel.followed_user_id, projectModel.followStatus)} activeOpacity={1}>
                    <View style={{width:60,height:20,justifyContent:'center',alignItems:'center',borderColor:theme.theme_code, borderWidth:1, borderRadius:15, marginRight:20}}>
                        <Text style={{fontSize:10, color:theme.theme_code}}>{requestflag == "0" ? "取消关注" : projectModel.followStatus =="1"?"取消关注":"关注"}</Text>
                    </View>
                </TouchableOpacity>
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
    addFollow: (sendInfo) => dispatch(actions.addFollow(sendInfo)),
    delFollow: (sendInfo) => dispatch(actions.delFollow(sendInfo)),
    loadFollow: (sendInfo) => dispatch(actions.loadFollow(sendInfo)),
    loadOtherFollow: (sendInfo) => dispatch(actions.loadOtherFollow(sendInfo)),
})

export default connect(mapStateToProps,mapDispatchToProps)(UserItem)

const styles = StyleSheet.create({
        cell_container: {
            width: 360,
            backgroundColor: '#fff',
            flexDirection:'row',
            justifyContent: 'center',
            padding: 10,
            marginTop: 10
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