// pages/search-page/search-page.js
import Notify from '@vant/weapp/notify/notify';
// 引入请求后端工具类
import {
    getBaseUrl,
    requestUtil
} from '../../utils/requestUtil.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        baseUrl: '',
        recommendGoodsList: [],
        searchWordHistoryList: [],
        searchWord: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const baseUrl = getBaseUrl();
        this.setData({
            baseUrl
        });
        this.getRecommendGoodsList();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getSearchWordHistoryList();
    },

    //获取推荐商品列表
    getRecommendGoodsList() {
        let _this = this;
        let recommendGoodsList = new Array();
        requestUtil({
            url: '/goods/getRecommendGoodsList',
            method: 'GET',
            header:{
                'token':wx.getStorageSync('token')
            }
        }).then(res => {
            this.setData({
                recommendGoodsList: res.data.goodsList
            })
        }).catch(err => {

        })
    },

    getSearchWordHistoryList() {
        let searchWordHistoryList = wx.getStorageSync('searchWordHistoryList');
        this.setData({
            searchWordHistoryList: searchWordHistoryList.reverse()
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    searchByHistory(e) {
        const searchWord = e.currentTarget.dataset.history;
        this.setData({
            searchWord
        });
        wx.navigateTo({
            url: '/pages/goods-list/goods-list?searchWord=' + this.data.searchWord
        });
    },

    searchGoods() {
        if (this.data.searchWord === '') {
            Notify('请输入关键词...');
            return false;
        }
        let searchWordHistoryList = wx.getStorageSync('searchWordHistoryList');
        let searchWordEntity = {
            value: this.data.searchWord,
            time: new Date()
        }
        //用于判断搜索历史是否已经存在
        let flag = false;
        if (!searchWordHistoryList) {
            searchWordHistoryList = [];
        } else {
            for (let i = 0; i < searchWordHistoryList.length; i++) {
                if (searchWordHistoryList[i].value === searchWordEntity.value) {
                    flag = true;
                    break;
                }
            }
        }
        if (!flag) {
            searchWordHistoryList.push(searchWordEntity);
        }
        if (searchWordHistoryList.length > 10) {
            searchWordHistoryList.shift();
        }
        wx.setStorageSync('searchWordHistoryList', searchWordHistoryList);
        wx.navigateTo({
            url: '/pages/goods-list/goods-list?searchWord=' + this.data.searchWord
        });
    }
})