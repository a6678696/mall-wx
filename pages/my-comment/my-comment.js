// pages/my-comment/my-comment.js
import {getBaseUrl,requestUtil} from '../../utils/requestUtil.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        valuationList: [],
        baseUrl: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const baseUrl = getBaseUrl();
        this.setData({
            baseUrl
        })
        this.loadData();
    },

    loadData() {
        requestUtil({
            url: '/valuation/listNoPage',
            method: 'GET',
            data: {
                customerId: wx.getStorageSync('currentCustomer').id
            }
        }).then(res => {
            this.setData({
                valuationList: res.data.valuationList
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