// pages/order/order.js
import {
    getBaseUrl,
    requestUtil
} from '../../utils/requestUtil.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        orderListDone: [],
        orderListPay: [],
        orderListWantToPay: [],
        orderListCancel: [],
        baseUrl: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const baseUrl = getBaseUrl();
        this.setData({
            active: options.activeNum,
            baseUrl
        });
        this.loadData();
    },

    loadData() {
        //获取已完成的订单
        requestUtil({
            url: '/order/listNoPage',
            method: 'GET',
            data: {
                customerId: wx.getStorageSync('currentCustomer').id,
                state: 4
            }
        }).then(res => {
            this.setData({
                orderListDone: res.data.orderList
            })
        }).catch(err => {

        })
        //获取已付款的订单
        requestUtil({
            url: '/order/listNoPage',
            method: 'GET',
            data: {
                customerId: wx.getStorageSync('currentCustomer').id,
                state: 1
            }
        }).then(res => {
            this.setData({
                orderListPay: res.data.orderList
            })
        }).catch(err => {

        })
        //获取待付款的订单
        requestUtil({
            url: '/order/listNoPage',
            method: 'GET',
            data: {
                customerId: wx.getStorageSync('currentCustomer').id,
                state: 2
            }
        }).then(res => {
            this.setData({
                orderListWantToPay: res.data.orderList
            })
        }).catch(err => {

        })
        //获取已取消的订单
        requestUtil({
            url: '/order/listNoPage',
            method: 'GET',
            data: {
                customerId: wx.getStorageSync('currentCustomer').id,
                state: 3
            }
        }).then(res => {
            this.setData({
                orderListCancel: res.data.orderList
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