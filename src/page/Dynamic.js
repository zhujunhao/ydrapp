import React,{ Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigatorUtil from '../navigators/NavigatorUtil';
import BackPressComponent from '../common/BackPressComponent';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import NavigatorBar from '../common/NavigationBar';
import GlobalStyles from '../ask/styles/GlobalStyles';
import ViewUtil from '../util/ViewUtil';
import actions from "../../action";
import { connect } from 'react-redux';

class Dynamic extends Component {
    constructor(props){
        super(props);

        this.state = {
            phoneNum: '',
            checkNum : ''
        }
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    onBackPress() {
        this.onBack();
        return true;
    }

    onBack() {
        NavigatorUtil.goBack(this.props.navigation)
    }

    toPage(pageName) {
        NavigatorUtil.goPage({},pageName)
    }

    render(){
        const { theme } = this.props;
        let navigatorBar = <NavigatorBar
                                title = {'动态'}
                                style={theme.styles.navBar}
                            />

        return(
            <SafeAreaViewPlus
                topColor={theme.theme_code}
            >
                {navigatorBar}
                <View style={styles.modelMax}>
                    <TouchableOpacity
                        onPress={()=>this.toPage("Collect")}
                        activeOpacity={1}
                        style={styles.modelpart}
                    >
                        <View style={{ width: 38, height: 38, alignItems:'center', justifyContent:'center',backgroundColor:'#FF9800', borderColor:'#FF9800', borderRadius:10, borderWidth:1}}>
                            <AntDesign
                                name={'staro'}
                                size={20}
                                style={{color:'#fff'}}
                            />
                        </View>
                        <Text style={styles.textPart}>收藏</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.toPage("Favor")}
                        activeOpacity={1}
                        style={styles.modelpart}
                    >
                        <View style={{ width: 38, height: 38, alignItems:'center', justifyContent:'center',backgroundColor:'#d81e06', borderColor:'#d81e06', borderRadius:10, borderWidth:1}}>
                            <AntDesign
                                name={'hearto'}
                                size={20}
                                style={{color:'#fff'}}
                            />
                        </View>
                        <Text style={styles.textPart}>点赞</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.toPage("Comment")}
                        activeOpacity={1}
                        style={styles.modelpart}
                    >
                        <View style={{ width: 38, height: 38, alignItems:'center', justifyContent:'center',backgroundColor:'#00BCD4', borderColor:'#00BCD4', borderRadius:10, borderWidth:1}}>
                            <AntDesign
                                name={'message1'}
                                size={20}
                                style={{color:'#fff'}}
                            />
                        </View>
                        <Text style={styles.textPart}>评论</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.toPage("Follow")}
                        activeOpacity={1}
                        style={styles.modelpart}
                    >
                         <View style={{ width: 38, height: 38, alignItems:'center', justifyContent:'center',backgroundColor:'#1296db', borderColor:'#1296db', borderRadius:10, borderWidth:1}}>
                            <AntDesign
                                name={'addusergroup'}
                                size={20}
                                style={{color:'#fff'}}
                            />
                        </View>
                        <Text style={styles.textPart}>关注</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.line}/>
                {/* <TouchableOpacity
                    onPress={()=>this.toPage("Assistant")}
                    activeOpacity={1}
                >
                    <View style={styles.message}>
                        <View style={{width:20,height:1}}></View>
                        <View style={{ width: 38, height: 38, alignItems:'center', justifyContent:'center',backgroundColor:'#00BCD4', borderColor:'#00BCD4', borderRadius:10, borderWidth:1}}>
                            <AntDesign
                                name={'questioncircleo'}
                                size={20}
                                style={{color:'#fff'}}
                            />
                        </View>
                        <View style={{width:20,height:1}}></View>
                        <View style={styles.connect}>
                            <View style={styles.infoLine}>
                                <Text style={styles.listTitle}>悦达人小助手</Text>
                            </View>
                            <View style={styles.infoLine}>

                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.line}/>
                <TouchableOpacity
                    onPress={()=>this.toPage("Messagepush")}
                    activeOpacity={1}
                >
                    <View style={styles.message}>
                        <View style={{width:20,height:1}}></View>
                        <View style={{ width: 38, height: 38, alignItems:'center', justifyContent:'center',backgroundColor:'#673AB7', borderColor:'#673AB7', borderRadius:10, borderWidth:1}}>
                            <AntDesign
                                name={'mail'}
                                size={20}
                                style={{color:'#fff'}}
                            />
                        </View>
                        <View style={{width:20,height:1}}></View>
                        <View style={styles.connect}>
                            <View style={styles.infoLine}>
                                <Text style={styles.listTitle}>推送消息</Text>
                            </View>
                            <View style={styles.infoLine}>

                            </View>
                        </View>
                    </View>
                </TouchableOpacity> */}
                <View style={styles.line}/>
                <View style={{flex:1,backgroundColor:'#eee'}}>
                </View>
            </SafeAreaViewPlus>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
})

const mapDispatchToProps = dispatch => ({
    
})

export default connect(mapStateToProps,mapDispatchToProps)(Dynamic)
const styles = StyleSheet.create({
    modelMax: {
        flexDirection: 'row',
        backgroundColor: '#fff'
    },  
    modelpart: {
        flex:1,
        height:120,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    picPart: {
        width: 50,
        height: 50,
        borderColor:'#eee',
        borderRadius:10,
        borderWidth:1
    },
    textPart: {
        textAlign: 'center',
        fontSize: 12,
        height: 30,
        lineHeight: 30
    },
    message: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    connect: {
        flex: 1,
        flexDirection: 'column',
    },
    infoLine: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        height: 10,
        backgroundColor: '#eee'
    },
    listImg: {
        width:40,
        height:40,
        borderColor:'#eee',
        borderRadius:10,
        borderWidth:1
    },
    listTitle: {
        fontSize: 13
    }
});

