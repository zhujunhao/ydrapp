import React, {Component} from 'react';
import {
    Alert, 
    TouchableHighlight, 
    StyleSheet, 
    View, 
    Text, 
    Dimensions
} from 'react-native';
import {
    connect
} from 'react-redux';
import actions from '../../action';
import NavigationUtil from '../navigators/NavigatorUtil';
import NavigationBar from '../common/NavigationBar';
import CategoryDao,{FLAG_CATEGORY} from '../ask/categoryDao';
import BackPressComponent from '../common/BackPressComponent';
import ViewUtil from '../util/ViewUtil';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DragSortableView from 'react-native-drag-sort';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import GlobalStyles from '../ask/styles/GlobalStyles';
import ArrayUtil from '../util/ArrayUtil';

var WINDOW = Dimensions.get("window");

var width = WINDOW.width;
var height = WINDOW.height;

class Sortcategory extends Component {
    constructor(props) {
        super(props);
        console.log("sortprops",JSON.stringify(props))
        this.params = this.props.navigation.state.params;
        this.backPress = new BackPressComponent({backPress: (e) => this.onBackPress(e)})
        this.categoryDao = new CategoryDao(FLAG_CATEGORY.flag_category);
        this.state = {
            checkedArray: Sortcategory._keys(this.props),
            data: this.props.category.categorys
        }
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        //如果props中标签为空则从本地存储中获取标签
        if (Sortcategory._keys(this.props).length === 0) {
            let {onLoadCategory} = this.props;
            onLoadCategory(FLAG_CATEGORY.flag_category);
        }
    }

    componentWillUnmount(){
        this.backPress.componentWillUnmount();
    }

    componentWillMount() {
        this.setState({
            checkedArray: Sortcategory._keys(this.props)
        })
    }


    /**
     * 获取标签
     * @param props
     * @param state
     * @returns {*}
     * @private
     */
    static _keys(props,state) {
        //如果state中有checkedArray则使用state中的checkedArray
        if (state && state.checkedArray && state.checkedArray.length) {
            return state.checkedArray;
        }
        //否则从原始数据中获取checkedArray
        const flag = Sortcategory._flag(props);
        let dataArray = props.category[flag] || [];
        let keys = [];
        for (let i = 0,j = dataArray.length; i<j;i++) {
            let data = dataArray[i];
            if (data.checked) keys.push(data);
        }
        return keys;
    }

    static _flag(props) {
        const flag = FLAG_CATEGORY.flag_category;
        console.log("inflag",flag)
        return flag === FLAG_CATEGORY.flag_key ? "keys" : "categorys";
    }

    onBackPress(e) {
        this.onBack();
        return true;
    }

    onSave(hasChecked){
        if(!hasChecked) {
            //如果没有排序则直接返回
            if(ArrayUtil.isEqual(Sortcategory._keys(this.props),this.state.checkedArray)) {
                NavigationUtil.goBack(this.props.navigation);
                return;
            }
        }

        //保存排序后的数据
        //获取排序后的数据
        //更新本地数据
        this.categoryDao.save(this.getSortResult());

        //重新加载排序后的标签，一边其他页面及时更新
        const {onLoadCategory} = this.props;
        //更新store
        onLoadCategory(FLAG_CATEGORY.flag_category);
        NavigationUtil.goBack(this.props.navigation);
    }

    /**
     * 获取排序后的标签结果
     */
    // getSortResult() {
    //     const flag = Sortcategory._flag(this.props);
    //     //从原始数据中复制一份出来，以便对这份数据进行排序
    //     let sortResultArray = ArrayUtil.clone(this.props.category[flag]);
    //     //获取排序之前的排序顺序
    //     const originalCheckedArray = Sortcategory._keys(this.props);
    //     //遍历排序之前的数据，用排序后的数据checkArray进行替换
    //     for (let i=0,j = originalCheckedArray.length;i<j;i++) {
    //         let item = originalCheckedArray[i];
    //         //找到要替换的元素所在的位置
    //         let index = this.props.category[flag].indexOf(item);
    //         //进行替换
    //         sortResultArray.splice(index,1,this.state.checkedArray[i]);
    //     }
    //     console.log("sortResultArray",JSON.stringify(sortResultArray));
    //     return sortResultArray;
    // }

    onBack() {
        if(!ArrayUtil.isEqual(Sortcategory._keys(this.props),this.state.checkedArray)) {
            Alert.alert('提示','要保存修改吗？',[
                {
                    text: '否', onPress: () => {
                        NavigationUtil.goBack(this.props.navigation)
                    }
                },{
                    text: '是', onPress: () => {
                        this.onSave(true);
                    }
                }
            ])
        } else {
            NavigationUtil.goBack(this.props.navigation)
        }
    }

    renderItem(item) {
        console.log("SortCell",JSON.stringify(this.state))
        const {theme} = this.props;
        return <TouchableHighlight
            underlayColor={'#eee'}
        >
            <View style={{height:39,flexDirection: 'column'}}>
                <View style={{marginLeft:10, flexDirection: 'row',height:38,alignItems: 'center'}}>
                    <AntDesign
                        name={'menufold'}
                        size={16}
                        style={{marginRight: 10, color: '#ff4800'}}/>
                    <Text>{item.name}</Text>
                </View>
                <View style={{height:1,backgroundColor:'#eee'}}></View>
            </View>
        </TouchableHighlight>
    }

    render() {
        console.log("checkedArrays",JSON.stringify(this.state.checkedArray))
        const {theme} = this.params;
        console.log("this.params",JSON.stringify(this.params))
        let title = '类目排序'
        let navigationBar = <NavigationBar
            title={title}
            leftButton = {ViewUtil.getLeftBackButton(() => this.onBack())}
            style={theme.styles.navBar}
            rightButton={ViewUtil.getRightButton('保存',() => this.onSave())}
        />
        console.log("obj",JSON.stringify(Object.keys(this.state.checkedArray)))
        return <SafeAreaViewPlus
            style={GlobalStyles.root_container}
            topColor={theme.themeColor}
        >
            {navigationBar}
            <View>
                <DragSortableView
                    dataSource={this.state.data}
                    parentWidth={width}
                    childrenWidth= {width}
                    sortable={false}
                    childrenHeight={39}
                    marginChildrenTop={10}
                    onDataChange = {(data)=>{
                        // delete or add data to refresh
                        console.log('onDataChange')
                        if (data.length != this.state.data.length) {
                            this.setState({
                                data: data
                            })
                        }
                    }}
                    onDragStart= {() => {
                        console.log("ondrag")
                    }}
                    onClickItem={(data,item,index)=>{
                        console.log('clickitem')
                    }}
                    renderItem={(item,index)=>{
                        return this.renderItem(item,index)
                }}/>
            </View>

        </SafeAreaViewPlus>
    }
}


const mapPopularStateToProps = state => ({
    category: state.category
})

const mapPopularDispatchToProps = dispatch => ({
    onLoadCategory: (flag) => dispatch(actions.onLoadCategory(flag))
})

export default connect(mapPopularStateToProps,mapPopularDispatchToProps)(Sortcategory);


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
    hidden: {
        height: 20
    },
    item: {
        backgroundColor: "#ff4800",
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 50,
        justifyContent: 'center'
    },
    itemsty: {
        height:20,
        width: width,
    }
});

