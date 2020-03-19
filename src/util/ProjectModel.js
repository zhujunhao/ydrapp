/**
 * 带点赞和收藏状态的item
 * @param item
 * @param isFavor
 * @param isCollect
 * @constructor
 */

export default function ProjectModel(item, isFavor, isCollect) {
    this.item = item;
    this.isFavor = isFavor;
    this.isCollect = isCollect
}