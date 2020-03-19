import React, {Component} from 'react';
import {
    Image, 
    StyleSheet, 
    Text, 
    View
} from 'react-native'

class PartnersItem extends Component {
    render() {
        const {projectModel,theme} = this.props;
        console.log("sspropsss",JSON.stringify(this.props))
        if (!projectModel || !projectModel.user_id) return null;
        return (
            <View style={styles.cell_container}>
                <View style={{height: 50, width: 50,borderRadius:25,borderWidth:1,borderColor:'#eee'}}>
                    <Image style={{height: 48, width: 48,borderRadius:24}}
                        defaultSource={require('../../res/backgroundPic.png')} //默认图片
                        source={require('../../res/backgroundPic.png')}
                    />
                </View>
                <View style={{flex:1,marginLeft:10,flexDirection:'column'}}>
                    <Text style={styles.title} numberOfLines={2}>
                        {`${projectModel.mobile_number.substr(0,3)}****${projectModel.mobile_number.substr(7,4)}`}
                    </Text>
                    <View style={styles.row}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:80,height:20,borderColor:theme.theme_code,backgroundColor:theme.theme_code,borderWidth:1,borderRadius:10}}>
                            <Text style={{color:'#fff',fontSize:10}}>{`悦达人合伙人`}</Text>
                        </View>
                        <View style={{flex:1}}></View>
                        {/* 下标0开始剪切10个 */}
                        {/* <Text style={{fontSize:12}}>{projectModel.nick_name}</Text> */}
                    </View>
                </View>
            </View>
        )
    }
}

export default PartnersItem;

const styles = StyleSheet.create({
        cell_container: {
            backgroundColor: '#fff',
            flexDirection:'row',
            justifyContent: 'center',
            alignItems:'center',
            padding: 10,
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            marginVertical: 3,
            borderColor: '#dddddd',
            borderWidth: 0.5,
            borderRadius: 8,
            shadowColor: 'gray',
            shadowOffset: {width: 0.5, height: 0.5},
            shadowOpacity: 0.4,
            shadowRadius: 1,
            elevation: 2
        },
        row: {
            height:30,
            flexDirection: 'row',
            alignItems: 'center',
        },
        title: {
            flex:1,
            fontSize: 16,
            marginBottom: 2,
            color: '#212121',
        },
        description: {
            fontSize: 14,
            marginBottom: 2,
            color: '#757575',
        }
    }
);