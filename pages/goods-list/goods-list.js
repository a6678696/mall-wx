// pages/search/search.js
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
        goodsList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const baseUrl = getBaseUrl();
        this.setData({
            baseUrl
        });
        if (options.smallTypeId !== undefined) {
            this.loadDataCategory(options.smallTypeId);
        }
        if (options.searchWord !== undefined) {
            this.loadDataSearchGoods(options.searchWord);
        }
        if (options.isGoodsListNew !== undefined) {
            this.loadDataGoodsListNew();
        }
        if (options.isGoodsListHot !== undefined) {
            this.loadDataGoodsListHot();
        }
        if (options.isGoodsListPriceDrop !== undefined) {
            this.loadDataGoodsListPriceDrop();
        }
    },

    // 分类页面使用
    loadDataCategory(smallTypeId) {
        requestUtil({
            url: '/goods/listNoPage',
            method: 'GET',
            data: {
                smallTypeId: smallTypeId
            }
        }).then(res => {
            this.setData({
                goodsList: res.data.goodsList
            })
        }).catch(err => {

        })
    },

    // 搜索商品时使用
    loadDataSearchGoods(searchWord) {
        requestUtil({
            url: '/goods/listNoPage',
            method: 'GET',
            data: {
                name: searchWord
            }
        }).then(res => {
            this.setData({
                goodsList: res.data.goodsList
            })
        }).catch(err => {

        })
    },

    loadDataGoodsListNew() {
        requestUtil({
            url: '/goods/getNewGoodsList',
            method: 'GET'
        }).then(res => {
            this.setData({
                goodsList: res.data.goodsList
            })
        }).catch(err => {

        })
    },

    loadDataGoodsListHot() {
        requestUtil({
            url: '/goods/getHotGoodsList',
            method: 'GET'
        }).then(res => {
            this.setData({
                goodsList: res.data.goodsList
            })
        }).catch(err => {

        })
    },

    loadDataGoodsListPriceDrop(){
        requestUtil({
            url: '/goods/getPriceDropGoodsList',
            method: 'GET'
        }).then(res => {
            this.setData({
                goodsList: res.data.goodsList
            })
        }).catch(err => {

        })
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

    }
})