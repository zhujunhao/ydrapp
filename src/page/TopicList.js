import React, {Component} from 'react';
import {
    Text,
    ScrollView, 
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import {
    connect
} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import actions from '../../action/index';
import NavigationUtil from '../navigators/NavigatorUtil';
import NavigationBar from '../common/NavigationBar';
import BackPressComponent from '../common/BackPressComponent';
import ViewUtil from '../util/ViewUtil';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import GlobalStyles from '../ask/styles/GlobalStyles';
import Toast from 'react-native-easy-toast';
import url from '../util/url'; 
import { 
    get
} from '../util/request';

class TopicList extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.backPress = new BackPressComponent({backPress: (e)=> this.onBackPress(e)});
        this.changeValues = [];
        this.isRemoveKey = false;
        this.state = {
            keys: []
        }
    }

    // 加载页面
    loadData = async () => {
        const { onloadtopics } = this.props;
        onloadtopics({
            retCode: "0002",
            data: []
        })
        let result = await get(url.getTopicList())
        if (result.status == 200 && result.data) {
            let reultdata = result.data.data;
            onloadtopics({
                retCode: "0000",
                data: reultdata
            })
        } else {
            this.refs.toast.show('查询话题失败');
            onloadtopics({
                retCode: "0002",
                data: []
            })
        }
        
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        this.loadData()
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount()
    }

    componentWillMount() {
        this.loadData()
    }

    onBackPress(e) {
        this.onBack();
        return true;
    }

    seltopic (topicItem) {
        const { editInfo, editInfos} = this.props;
        editInfo({
            retCode: "0002",
            data: {
                questionTitle: editInfos.questionTitle,
                mainimageurl: editInfos.mainimageurl,
                oriimgurl: editInfos.oriimgurl,
                questionArrImg: editInfos.questionArrImg,
                questionContent: editInfos.questionContent,
                description: editInfos.description,
                topics: topicItem.topic_id,
                topicstxt: topicItem.topic_title,
            }
        })
        this.onBack();
    }

    renderView() {
        const { topics, theme } = this.props
        if (!topics || topics.length === 0) return;
        let len = topics.length;
        let views = [];
        for (let i=0,l = len;i<l;i++) {
            let viewitem = <View style={{flexDirection:'column'}}>
                <TouchableOpacity
                    style={styles.setting_item_container}
                    activeOpacity={1}
                    underlayColor='transparent'
                    onPress={() => this.seltopic(topics[i])}
                >
                    <AntDesign
                        name={'slack'}
                        size={13}
                        style={{color:theme.theme_code,marginLeft:5}}
                    />
                    <Text style={{fontSize:14, marginLeft:10}}>{topics[i].topic_title}</Text>
                    <View style={{flex:1, alignItems:'center', justifyContent:'flex-start' ,flexDirection: 'row'}}>

                    </View>
                </TouchableOpacity>
                <View style={GlobalStyles.line}/>
            </View>
            
            views.push(viewitem)
        }
        return views;
    }


    onBack() {
        NavigationUtil.goBack(this.props.navigation)
    }

    render() {
        const { theme } = this.params;
        let navigationBar = <NavigationBar
            title={'相关话题'}
            leftButton={ViewUtil.getLeftBackButton(()=> this.onBack())}
            style={theme.styles.navBar}
        />
        return <SafeAreaViewPlus
            style={styles.container}
            topColor={theme.theme_code}
        >
            {navigationBar}
            <ScrollView>
                {this.renderView()}
            </ScrollView>
            <Toast
                ref={'toast'}
                position={'center'}
            />
        </SafeAreaViewPlus>
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    topics: state.topic.topics,
    editInfos : state.community.editInfos
})

const mapDispatchToProps = dispatch => ({
    onloadtopics: (sendInfo) => dispatch(actions.loadtopics(sendInfo)),
    editInfo: (sendInfo) => dispatch(actions.editInfo(sendInfo))
})

export default connect(mapStateToProps,mapDispatchToProps)(TopicList);

const styles = StyleSheet.create({
    setting_item_container: {
        backgroundColor: '#fff',
        padding: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    container: {
        flex: 1
    },
    item: {
        flexDirection: 'row',
        height:60,
        alignItems:'center',
        marginLeft:10,
        marginRight:10,
        marginBottom:5,
        marginTop:5
    },
    checkBoxPart: {
        flex:1,
        height:60,
        padding:10,
        marginLeft:6,
        marginRight:6,
        backgroundColor:"#eee",
        borderRadius:8
    }
})
