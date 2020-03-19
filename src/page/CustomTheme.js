import React ,{ Component } from 'react';
import {
    DeviceInfo,
    Modal, 
    TouchableHighlight,
    Platform, 
    ScrollView, 
    StyleSheet, 
    View
} from 'react-native';
import { 
    connect 
} from 'react-redux';
import ThemeUtil from '../util/ThemeUtil';
import GlobalStyles from '../ask/styles/GlobalStyles';
import actions from '../../action';
import url from '../util/url'; 
import { 
    get,
    post
} from '../util/request';

const ThemeFlags = {
    Default: '#e3007b',
    Red: '#b11732',
    Pink: '#ffd7e6',
    Purple: '#79d7da',
    DeepPurple: '#673AB7',
    Indigo: '#3F51B5',
    Blue: '#2196F3',
    LightBlue: '#03A9F4',
    Cyan: '#00BCD4',
    Teal: '#009688',
    Green: '#4CAF50',
    LightGreen: '#8BC34A',
    Lime: '#CDDC39',
    Yellow: '#FFEB3B',
    Amber: '#FFC107',
    Orange: '#FF9800',
    DeepOrange: '#FF5722',
    Brown: '#795548',
    Grey: '#9E9E9E',
    BlueGrey: '#607D8B',
    Black: '#000000'
};

class CustomTheme extends Component {
    constructor(props) {
        super(props);
        this.themeUtil = new ThemeUtil();
        this.loadData()
    }

    onSelectTheme = async (themeCode) => {
        this.props.onClose();
        this.themeUtil.saveTheme(themeCode);
        const { onThemeChange,addmytheme } = this.props;
        onThemeChange({
            retCode: "0000",
            data: {
                theme_code: themeCode
            }
        })
        // 记录到我的颜色中
        addmytheme({
            retCode: "0002",
            data: {}
        })
        let data = new FormData();
        data.append("themeCode", themeCode);
        let result = await post(url.editMyTheme() ,data)
        console.log("resultffff",result)
        if (result.status == 201 && result.data) {
            addmytheme({
                retCode: "0000",
                data: {}
            })
            this.refs.toast.show('修改成功');
        } else {
            addmytheme({
                retCode: "0001",
                data: {}
            })
            this.refs.toast.show('修改失败');
        }
    }

    loadData = async () => {
        const { onThemeInit, loadmytheme } = this.props;
        //获取我的颜色
        loadmytheme({
            retCode: "0002",
            data: {}
        })
        //获取颜色集合
        onThemeInit({
            retCode: "0002",
            data: {}
        })
        let mytheme = await get(url.getMyTheme())
        let result = await get(url.getThemeList())
        console.log("cqateresult",result)
        if (result.status == 200 && result.data) {
            let resultdata = result.data.data;
            console.log("resultdata",resultdata)
            onThemeInit({
                retCode: "0000",
                data: resultdata
            })

        } else {
            onThemeInit({
                retCode: "0001",
                data: {}
            })
        }

        if (mytheme.status == 200 && mytheme.data) {
            let mythemedata = mytheme.data.data;
            console.log("mythemedata",mythemedata)
            loadmytheme({
                retCode: "0000",
                data: mythemedata
            })

        } else {
            loadmytheme({
                retCode: "0001",
                data: {}
            })
        }
    }

    /**
     * 创建主题Item
     */
    getThemeItem(themeKey) {
        console.log("themeKey",themeKey)
        return <TouchableHighlight
            style={{flex:1}}
            underlayColor="#fff"
            onPress={()=>{this.onSelectTheme(ThemeFlags[themeKey])}}
        >
            <View style={[{backgroundColor: ThemeFlags[themeKey]},styles.themeItem]}></View>
        </TouchableHighlight>
    }

    getloadThemeItem(themeCode) {
        console.log("themeCode",themeCode)
        return <TouchableHighlight
            style={{flex:1}}
            underlayColor="#fff"
            onPress={()=>{this.onSelectTheme(themeCode)}}
        >
            <View style={[{backgroundColor: themeCode},styles.themeItem]}></View>
        </TouchableHighlight>
    }

    renderThemeItems = () => {
        console.log("8888888")
        let views = [];
        for (let i=0,keys = Object.keys(ThemeFlags),l = keys.length;i<l;i+=3) {
            const key1= keys[i],key2 = keys[i+1],key3 = keys[i+2];
            views.push(<View key={i} style={{flexDirection:'row'}}>
                {this.getThemeItem(key1)}
                {this.getThemeItem(key2)}
                {this.getThemeItem(key3)}
            </View>)
        }
        return views;
    }

    loadThemeItems = (themearr) => {
        console.log("9999999",JSON.stringify(themearr))
        let views = [];
        for (let i=0,l = themearr.length;i<l;i+=3) {
            const key1= themearr[i] && themearr[i].theme_code ? themearr[i].theme_code : "#f5f5f5",key2 = themearr[i+1] && themearr[i+1].theme_code ? themearr[i+1].theme_code : "#f5f5f5",key3 = themearr[i+2] && themearr[i+2].theme_code ? themearr[i+2].theme_code: '#f5f5f5';
            views.push(<View key={i} style={{flexDirection:'row'}}>
                {this.getloadThemeItem(key1)}
                {this.getloadThemeItem(key2)}
                {this.getloadThemeItem(key3)}
            </View>)
        }
        return views;
    }

    renderContentView() {
        const { themeArr } = this.props;
        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {
                    this.props.onClose()
                }}
            >
                <View style={styles.modalContainer}>
                    <ScrollView>
                        {themeArr && themeArr.length >0 ? this.loadThemeItems(themeArr): this.renderThemeItems()}
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    render(){
        console.log("this.props.visible",this.props.visible)
        let view = this.props.visible ? <View style={GlobalStyles.root_container}>
            {this.renderContentView()}
        </View> : null
        return view;
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    themeArr: state.theme.themeArr
})
const mapDispatchToProps = dispatch => ({
    onThemeInit: (sendInfo) => dispatch(actions.onThemeInit(sendInfo)),
    onThemeChange: (sendInfo) => dispatch(actions.onThemeChange(sendInfo)),
    loadmytheme: (sendInfo) => dispatch(actions.loadmytheme(sendInfo)),
    addmytheme: (sendInfo) => dispatch(actions.addmytheme(sendInfo))
})

export default connect (mapStateToProps,mapDispatchToProps)(CustomTheme);

const styles = StyleSheet.create({
    themeItem: {
        flex: 1,
        height: 120,
        margin: 3,
        padding: 3,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        margin: 10,
        marginBottom: 10 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0),
        marginTop: Platform.OS === 'ios' ? 20 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0) : 10,
        backgroundColor: 'white',
        borderRadius: 3,
        shadowColor: 'gray',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        padding: 3
    },
    themeText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16
    }
});