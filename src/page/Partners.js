

import React,{ Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    FlatList, 
    RefreshControl,
    TouchableOpacity,
    ActivityIndicator,
    InteractionManager,
    AsyncStorage
} from 'react-native';
import { 
    connect 
} from 'react-redux';
import actions from '../../action/index';
import Toast from 'react-native-easy-toast';
import PartnersItem from '../common/PartnersItem';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import NavigatorUtil from '../navigators/NavigatorUtil';
import BackPressComponent from '../common/BackPressComponent';
import url from '../util/url'; 
import { 
    get 
} from '../util/request';

class Partners extends Component {
    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
    
        this.loadData();
    }
    
    componentDidMount() {
        this.backPress.componentDidMount();
        InteractionManager.runAfterInteractions(()=>{
            this.loadData();
        });
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    onSearch(pathName){
        NavigatorUtil.goPage(this.props,pathName)
    }

    onBackPress() {
        this.onBack();
        return true;
    }

    onBack() {
        NavigatorUtil.goBack(this.props.navigation)
    }

    loadData = async () => {
        const { loadPartners, islogin } = this.props;

        loadPartners({
            retCode: "0002",
            data: ""
        })
        let result = await get(url.getPartnerList())
        console.log("cqateresult",result)
        if (result.status == 200 && result.data) {
            let reultdata = result.data.data;
            console.log("reultdata",reultdata)
            loadPartners({
                retCode: "0000",
                data: reultdata
            })
            // 有新的令牌就刷新令牌
            if (result.token && result.refreshtoken) {
                let loginstate = {
                    'uniqueToken': result.token,
                    "refreshToken": result.refreshtoken,
                    'invitationCode': result.invitationCode,
                    'mobileNumber': "",
                }
                islogin({
                    retCode: "0000",
                    data: loginstate
                })
                //保存登录信息到本地
                AsyncStorage.setItem('loginStatus',JSON.stringify(loginstate))
            }
        } else {
            loadPartners({
                retCode: "0001",
                data: ""
            })
            this.refs.toast.show('查询小伙伴失败');
        }
    }


    renderItem(data) {
        const { item } = data;
        const { theme } = this.props.navigation.state.params;
        return <PartnersItem
            projectModel={item}
            theme = {theme}
        />
        
    }

    render(){
        const { partner } = this.props;
        console.log("partnerswwww",partner)
        const { theme } = this.props.navigation.state.params;
        let navigationBar = <NavigationBar
                leftButton = { ViewUtil.getLeftBackButton( () => this.onBack() ) }
                title={'我的小伙伴'}
                style={theme.styles.navBar}
        />

        let searchPart = <TouchableOpacity
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
                            <Text style={{fontSize:13}}>{'输入手机号码'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        
        let lists = partner.partners && partner.partners.allpartners.length>0?<FlatList 
            data={partner.partners.allpartners}
            renderItem={data => this.renderItem(data)}
            keyExtractor={item => "" + item.user_id}
            refreshControl = {
                <RefreshControl
                    title={'loading'}
                    titleColor={theme.theme_code}
                    colors={[theme.theme_code]}
                    refreshing={partner.isLoading}
                    onRefresh={() => this.loadData()}
                    titleColor={theme.theme_code}
                />
            }
        /> : <View ><Text style={{height:80,lineHeight:80,textAlign:'center'}}>暂时还没有查询到小伙伴信息^_^</Text></View>
        return (
            <SafeAreaViewPlus>
                {navigationBar}
                {searchPart}
                {lists}
                <Toast ref={'toast'}
                    position={'center'}
                />
            </SafeAreaViewPlus>
        )
    }
}

const mapStateToProps = state => ({
    partner: state.partner
})

const mapDispatchToProps = dispatch => ({
    loadPartners: (sendInfo) => dispatch(actions.loadPartners(sendInfo)),
    islogin: (sendInfo) => dispatch(actions.islogin(sendInfo))
})

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(Partners);

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