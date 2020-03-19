import { 
    AsyncStorage,
    StyleSheet
} from 'react-native';

class ThemeUtil {
    /**
     * 获取当前主题
     */
    getTheme = async() => {
        let result = AsyncStorage.getItem('theme_key');
        if (result) {
            return result
        } else {
            this.saveTheme('#e3007b')
        }
    }

    /**
     * 保存主题标识
     */
    saveTheme = async (themeFlag) => {
        await AsyncStorage.setItem('theme_key',themeFlag)
    }

    /**
     * 创建一个主题样式
     * @param themeFlag 主题标识
     * @returns {{theme_code: *, styles: *}}
     */

    static createTheme(themeFlag) {
        return {
            theme_code: themeFlag,
            styles: StyleSheet.create({
                selectedTitleStyle: {
                    color: themeFlag,
                },
                tabBarSelectedIcon: {
                    tintColor: themeFlag,
                },
                navBar: {
                    backgroundColor: themeFlag,
                }
            })
        }
    }
}

export default ThemeUtil;