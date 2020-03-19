import React, {Component} from 'react';
import {
    Image, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import BaseItem from "./BaseItem";

class SearchItem extends BaseItem {
    render() {
        const { projectModel, theme } = this.props;
        console.log("ssprops",JSON.stringify(this.props))
        const item = projectModel;
        if (!item || !item.question_id) return null;
        return (
            <TouchableOpacity
                onPress={()=>this.onItemClick()}
                underlayColor={'transparent'}
                activeOpacity={1}
            >
                <View style={styles.cell_container}>
                    <View style={{height: 60, width: 60,borderRadius:6,borderWidth:1,borderColor:'#eee'}}>
                        <Image style={{height: 58, width: 58,borderRadius:6}}
                            defaultSource={require('../../res/backgroundPic.png')} //默认图片
                            source={{uri: item.questionMaxImg}}
                        />
                    </View>
                    <View style={{flex:1,marginLeft:10,flexDirection:'column'}}>
                        <Text style={styles.title} numberOfLines={2}>
                            {item.question_title}
                        </Text>

                        <View style={styles.row}>
                            <View style={{height:30,flexDirection: 'row',alignItems:'center'}}>
                                <Image style={{width:20, height:20, borderRadius:10, borderColor:'#eee', borderWidth:1}}
                                    defaultSource={require('../../res/backgroundPic.png')} //默认图片
                                    source={{uri: item.questionMaxImg}}
                                />
                                <Text style={{fontSize:10, marginLeft:6}}>{item.userName}</Text>
                            </View>
                            <View style={{flex:1}}></View>
                            <View style={{flexDirection: 'row',justifyContent:'center'}}>
                                <AntDesign
                                    name={'staro'}
                                    size={13}
                                    style={{color:'#666', marginLeft:5, marginRight:5}}
                                />
                                <Text style={{fontSize:10,color:'#9d9d9d', marginLeft:5, marginRight:5}}>{item.collect_nums}</Text>
                            </View>
                            <View style={{flexDirection: 'row',justifyContent:'center'}}>
                                <AntDesign
                                    name={'message1'}
                                    size={13}
                                    style={{color:'#666', marginLeft:5, marginRight:5}}
                                />
                                <Text style={{fontSize:10,color:'#9d9d9d', marginLeft:5, marginRight:5}}>{item.comment_nums}</Text>
                            </View>
                            <View style={{flexDirection: 'row',justifyContent:'center'}}>
                                <AntDesign
                                    name={'barchart'}
                                    size={13}
                                    style={{color:'#666', marginLeft:5, marginRight:5}}
                                />
                                <Text style={{fontSize:10,color:'#9d9d9d', marginLeft:5, marginRight:5}}>{item.browse_nums}</Text>
                            </View>
                            <View style={{flexDirection: 'row',justifyContent:'center'}}>
                                <AntDesign
                                    name={'hearto'}
                                    size={13}
                                    style={{color:'#666', marginLeft:5, marginRight:5}}
                                />
                                <Text style={{fontSize:10,color:'#9d9d9d', marginLeft:5, marginRight:5}}>{item.favor_nums}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
export default SearchItem;

const styles = StyleSheet.create({
        cell_container: {
            backgroundColor: '#fff',
            flexDirection:'row',
            padding: 10,
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            marginVertical: 3,
            borderRadius: 8,
        },
        row: {
            height:20,
            flexDirection: 'row',
            alignItems: 'center'
        },
        title: {
            flex:1,
            fontSize: 13,
            marginTop: 5,
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
