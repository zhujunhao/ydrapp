import React, { Component } from 'react';
import { 
    StyleSheet, 
    View, 
    Image,
    Dimensions,
    AsyncStorage 
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { 
    connect 
} from 'react-redux';
import NavigatorUtil from '../navigators/NavigatorUtil';

var WINDOW = Dimensions.get("window");
var width = WINDOW.width;
var height = WINDOW.height;

class Welcome extends Component {
    componentDidMount() {
        //AsyncStorage.removeItem('isFirst')
        this.timer = setTimeout(()=> {
            //AsyncStorage.getItem('isFirst').then((value) => {
                SplashScreen.hide()
                // 重置到首页
                //if (value == 'toHome') {
                    NavigatorUtil.resetToHomePage({
                        navigation: this.props.navigation
                    })
                // 重置到引导页
                //} else {
                    //NavigatorUtil.resetToSlidePage({
                        //navigation: this.props.navigation
                    //})
                //}
            //}).catch(() => {
                //NavigatorUtil.resetToHomePage({
                    //navigation: this.props.navigation
                //})
            //});
        },3000)
    }

    componentWillMount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.divbox}>
                <Image
                    style={styles.imgBox}
                    resizeMode={'center'}
                    source={require('../../res/qd.png')}
                ></Image>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({

})

export default connect (null,mapDispatchToProps)(Welcome);

const styles = StyleSheet.create({
    divbox: {
        flex:1,
        width: width,
        height: height,
    },
    imgBox: {
        flex:1,
        width: width,
        height: height,
        backgroundColor: '#fff'
    }
});