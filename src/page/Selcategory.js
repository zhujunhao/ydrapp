import React, {Component} from 'react';
import {
    Alert,
    ScrollView, 
    StyleSheet,
    View
} from 'react-native';
import {
    connect
} from 'react-redux';
import CheckBox from 'react-native-check-box';
import AntDesign from 'react-native-vector-icons/AntDesign';
import actions from '../../action/index';
import NavigationUtil from '../navigators/NavigatorUtil';
import NavigationBar from '../common/NavigationBar';
import BackPressComponent from '../common/BackPressComponent';
import ViewUtil from '../util/ViewUtil';
import ArrayUtil from '../util/ArrayUtil';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import Toast from 'react-native-easy-toast';
import url from '../util/url'; 
import { 
    get,
    post,
    patch
} from '../util/request';

class Selcategory extends Component {
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
        const { loadcategory } = this.props;
        loadcategory({
            retCode: "0002",
            data: {}
        })
        let result = await get(url.getCategoryList())
        if (result.status == 200 && result.data) {
            let reultdata = result.data.data;
            loadcategory({
                retCode: "0000",
                data: reultdata
            })
        } else {
            loadcategory({
                retCode: "0001",
                data: {}
            })
            this.refs.toast.show('查询失败');
        }
    }

    // 更新分类
    changeCategory = async (categoryId, categoryIschecked) => {
        const { updatecategory } = this.props;
        let data = {
            categoryId,
            categoryIschecked: categoryIschecked == "0"? "1" : "0"
        }
        updatecategory({
            retCode: "0002",
            data: {}
        })
        let result = await patch(url.editCategory() ,data)
        if (result && result.data && result.data.msg == 'ok') {
            updatecategory({
                retCode: "0000",
                data: {}
            })
            this.refs.toast.show('更新成功');
            this.loadData()
        } else {
            updatecategory({
                retCode: "0001",
                data: {}
            })
            this.refs.toast.show('更新失败');
        }
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (prevState.keys !== Selcategory._keys(nextProps, null, prevState)) {
    //         return {
    //             keys: Selcategory._keys(nextProps, null, prevState),
    //         }
    //     }
    //     return null;
    // }

    componentDidMount() {
        this.backPress.componentDidMount();
        this.loadData()
        //如果props中标签为空则本地存储中获取标签
        // if (Selcategory._keys(this.props.category).length === 0) {
        //     let {onLoadCategory} = this.props;
        //     onLoadCategory(FLAG_CATEGORY.flag_category)
        // }
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount()
    }

    componentWillMount() {
        this.loadData()
        // this.setState({
        //     keys: Selcategory._keys(this.props.category),
        // })
    }

    /**
     * 获取标签
     */
    
    static _keys(props, original, state) {
        let key = "categorys";
        if (this.isRemoveKey && !original) {
            //如果state中的keys为空则从props中取
            return state && state.keys && state.keys.length !== 0 && state.keys || props.language[key].map(val => {
                return {//注意：不直接修改props，copy一份
                    ...val,
                    checked: false
                };
            });
        } else {
            return props[key]
        }
    }

    onBackPress(e) {
        this.onBack();
        return true;
    }

    onSave() {
        if (this.changeValues.length === 0) {
            NavigationUtil.goBack(this.props.navigation);
            return;
        }
        let keys;
        if (this.isRemoveKey) {//移除标签的特殊处理
            for (let i=0, l = this.changeValues.length; i<l;i++) {
                ArrayUtil.remove(keys = Selcategory._keys(this.props.category,true),this.changeValues[i],"name");
            }
        }
        //更新本地数据
        const {onLoadCategory} = this.props;
        //更新store
        onLoadCategory(FLAG_CATEGORY.flag_category);
        NavigationUtil.goBack(this.props.navigation);
    }

    renderView() {
        const { categorys } = this.props
        if (!categorys || categorys.length === 0) return;
        let len = categorys.length;
        let views = [];
        for (let i=0,l = len;i<l;i+=2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(categorys[i],i)}
                        {i + 1 < len ? this.renderCheckBox(categorys[i + 1], i+1) : <View style={{flex:1,padding:10,marginLeft:6,marginRight:6}}></View>}
                    </View>
                </View>
            )
        }
        return views;
    }

    editCategory(data,index) {
        this.changeCategory(data.category_id, data.category_ischecked)
    }

    onBack() {
        if (this.changeValues.length > 0) {
            Alert.alert('提示','要保存修改吗？',[
                {
                    text: '否',onPress:() => {
                        NavigationUtil.goBack(this.props.navigation)
                    }
                },{
                    text: '是',onPress: ()=> {
                        this.onSave();
                    }
                }
            ])
        } else {
            NavigationUtil.goBack(this.props.navigation)
        }
    }

    _CheckedImage(checked) {
        const { theme } = this.params;
        return <AntDesign
            name={checked? 'checkcircle' : 'checkcircleo'}
            size={20}
            style={{
                color: theme.theme_code
            }}
        />
    }

    renderCheckBox(data,index) {
        return <CheckBox
            style={styles.checkBoxPart}
            onClick={()=> this.editCategory(data,index)}
            isChecked={data.category_ischecked == "1" ? true:false}
            leftText={data.category_name}
            checkedImage={this._CheckedImage(true)}
            unCheckedImage={this._CheckedImage(false)}
        />
    }

    render() {
        const { theme } = this.params;
        let title = this.isRemoveKey ? '移除分类' : '自定义分类';
        title =  '自定义分类'
        let rightButtonTitle = this.isRemoveKey ? '移除' : '保存';
        let navigationBar = <NavigationBar
            title={title}
            leftButton={ViewUtil.getLeftBackButton(()=> this.onBack())}
            style={theme.styles.navBar}
            rightButton = {ViewUtil.getRightButton(rightButtonTitle, () => this.onSave())}
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
    categorys: state.category.categorys
})

const mapDispatchToProps = dispatch => ({
    updatecategory: (sendInfo) => dispatch(actions.updatecategory(sendInfo)),
    loadcategory: (sendInfo) => dispatch(actions.loadcategory(sendInfo))
})

export default connect(mapStateToProps,mapDispatchToProps)(Selcategory);

const styles = StyleSheet.create({
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
