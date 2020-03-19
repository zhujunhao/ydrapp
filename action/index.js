
import { loadcategory, addcategory, updatecategory, delcategory } from './category';
import { loadmytheme, addmytheme, updatemytheme, onThemeChange, onThemeInit, onShowCustomThemeView } from './theme';
import { onLoadMyInfo, updateMyInfo } from './myinfo';
import { loadtopics, addtopics, deltopics, updatetopics } from './topic';
import { 
    loadCommunitys, addCommunitys, updateCommunitys, delCommunitys,
    loadQuestions, addQuestions, updateQuestions, delQuestions, editInfo
} from './community';
import { loadCommoditys } from './commodity';
import { loadPartners } from './partners';
import { islogin, islogout, changepw, register, sendCode } from './loginstate';
import { 
    loadCommentByCommunity, addCommentByCommunity, updateCommentByCommunity, delCommentByCommunity,
    loadCommentByQuestion, addCommentByQuestion, updateCommentByQuestion, delCommentByQuestion
} from './comment';
import { 
    loadQuestionCollect, addQuestionCollect, delQuestionCollect,
    loadCommunityCollect, addCommunityCollect, delCommunityCollect,
    loadCommodityCollect, addCommodityCollect, delCommodityCollect
} from './collect';
import { 
    loadQuestionFavor, addQuestionFavor, delQuestionFavor,
    loadCommunityFavor, addCommunityFavor, delCommunityFavor,
    loadCommodityFavor, addCommodityFavor, delCommodityFavor,
    loadCommentFavor, addCommentFavor, delCommentFavor,
    loadAnswerFavor, addAnswerFavor, delAnswerFavor
} from './favor';
import { loadFollow, loadOtherFollow, addFollow, delFollow  } from './follow';
import { addAnswer, updateAnswer, loadAnswer, delAnswer } from './answer';
import { searchCommoditys, searchCommunitys, searchQuestions } from './search';
import { loadCommunityDetail, loadCommodityDetail, loadQuestionDetail, loadAnswerDetail } from './detail';

export default {
    loadCommoditys,
    loadcategory,
    addcategory, 
    updatecategory,
    delcategory,
    loadmytheme, 
    addmytheme, 
    updatemytheme,
    onThemeChange,
    onShowCustomThemeView,
    onThemeInit,
    onLoadMyInfo,
    updateMyInfo,
    loadtopics, 
    addtopics, 
    deltopics, 
    updatetopics,
    islogin,
    islogout,
    sendCode,
    changepw,
    register,
    loadPartners,
    editInfo,
    loadCommentByCommunity, 
    addCommentByCommunity, 
    updateCommentByCommunity, 
    delCommentByCommunity,
    loadCommentByQuestion, 
    addCommentByQuestion, 
    updateCommentByQuestion, 
    delCommentByQuestion,
    loadQuestionFavor, 
    addQuestionFavor, 
    delQuestionFavor,
    loadCommunityFavor, 
    addCommunityFavor, 
    delCommunityFavor,
    loadCommodityFavor, 
    addCommodityFavor, 
    delCommodityFavor,
    loadCommentFavor, 
    addCommentFavor, 
    delCommentFavor,
    loadAnswerFavor, 
    addAnswerFavor, 
    delAnswerFavor,
    loadQuestionCollect, 
    addQuestionCollect, 
    delQuestionCollect,
    loadCommunityCollect, 
    addCommunityCollect, 
    delCommunityCollect,
    loadCommodityCollect, 
    addCommodityCollect, 
    delCommodityCollect,
    loadFollow,
    loadOtherFollow,
    addFollow,
    delFollow,
    addAnswer, 
    updateAnswer, 
    loadAnswer, 
    delAnswer,
    loadCommunityDetail, 
    loadCommodityDetail, 
    loadQuestionDetail, 
    loadAnswerDetail,
    loadCommunitys, 
    addCommunitys, 
    updateCommunitys, 
    delCommunitys,
    loadQuestions, 
    addQuestions, 
    updateQuestions, 
    delQuestions,
    searchCommoditys, 
    searchCommunitys, 
    searchQuestions,
}