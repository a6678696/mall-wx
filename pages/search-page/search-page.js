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
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getSearchWordHistoryList();
    },

    /**
     * 获取推荐商品列表
     */
    async getRecommendGoodsList() {
        const res = await requestUtil({
            url: '/goods/getRecommendGoodsList',
            method: 'GET'
        });
        this.setData({
            recommendGoodsList: res.data.goodsList
        })
    },

    /**
     * 获取所有搜索历史
     */
    getSearchWordHistoryList() {
        let searchWordHistoryList = wx.getStorageSync('searchWordHistoryList');
        this.setData({
            searchWordHistoryList: searchWordHistoryList.reverse()
        })
    },

    /**
     * 根据搜索历史搜索商品
     * @param {*} e 
     */
    searchByHistory(e) {
        const searchWord = e.currentTarget.dataset.history;
        this.setData({
            searchWord
        });
        wx.navigateTo({
            url: '/pages/goods-list/goods-list?searchWord=' + this.data.searchWord
        });
    },

    /**
     * 搜索商品
     */
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