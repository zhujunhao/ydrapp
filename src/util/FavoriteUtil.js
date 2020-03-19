import {
    AsyncStorage,
} from 'react-native';

class CacheUtil {
    constructor(flag) {
        this.cacheflags = flag;
    }
    /**
     * CacheIcon单击回调函数
     * @param channel 问题/分享/商品
     * @param cacheFlag 点赞/收藏/关注
     * @param item
     * @param isCache 取消/新增
     */
    static onCache(channel, cacheFlags, item, isCache) {
        if (!channel || !cacheFlags || !isCache) {
            return
        }
        let channelkey;
        let numKey;
        if (channel == 'question') {
            channelkey = "q";
            numKey = item.question_id.toString();
        } else if (channel == 'share') {
            channelkey = "s";
            numKey = item.question_id.toString();
        } else if (channel == 'commodity') {
            channelkey = "c";
            numKey = item.commodity_id.toString();
        }

        let cacheFlag;
        if (cacheFlags == 'favor') {
            cacheFlag = "f";
        } else if (cacheFlags == 'collect') {
            cacheFlag = "c";
        } else if (cacheFlags == 'follow') {
            cacheFlag = "c";
        }
        if (isFavorite) {
            this.saveCacheItem(channelkey, cacheFlag, numKey, isCache);
        } else {
            this.removeCacheItem(channelkey, cacheFlag, numKey, isCache);
        }
    }

    saveCacheItem = async (channelkey, cacheFlag, numKey, isCache) => {
        let result = await AsyncStorage.getItem(channelkey+cacheFlag) 
        if (result) {//存在就更新
            this.updateCacheItem(channelkey, cacheFlag, numKey, isCache)
        } else {
            await AsyncStorage.setItem(channelkey+cacheFlag, numKey)
        }
    }

    updateCacheItem= async (channelkey, cacheFlag, numKey, isCache) => {
        let result = await AsyncStorage.getItem(channelkey+cacheFlag)
        if (result) {
            let cacheItemArr = JSON.parse(result);
            let index = cacheItemArr.indexOf(numKey);
            if (isCache == "add") {//如果是添加且key不在存在则添加到数组中
                if (index === -1) cacheItemArr.push(numKey);
            } else {//如果是删除且key存在则将其从数值中移除
                if (index !== -1) cacheItemArr.splice(index, 1);
            }
            await AsyncStorage.setItem(channelkey+cacheFlag, JSON.stringify(cacheItemArr));//将更新后的key集合保存到本地
        }
    }

    getCacheItem = async (channelkey, cacheFlag) => {
        return await AsyncStorage.getItem(channelkey+cacheFlag)
    }

    removeCacheItem = async(channelkey, cacheFlag, numKey) => {
        this.updateCacheItem(channelkey, cacheFlag, numKey, "del")
    }
    
    getAllItems = async(channelkey, cacheFlag) => {
        return await AsyncStorage.multiGet(channelkey+cacheFlag);
    }
}

export default CacheUtil;