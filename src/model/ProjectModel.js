/**
 * 带收藏/点赞状态的item
 * @param item
 * @param isFavor
 * @constructor
 */

 export default function ProjectModel(item, isFavor) {
     this.item = item;
     this.isFavor = isFavor;
 }