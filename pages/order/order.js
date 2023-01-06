// pages/order/order.js
import Dialog from '@vant/weapp/dialog/dialog';
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
    },

    loadData() {
        //获取已完成的订单
        requestUtil({
            url: '/order/listNoPage',
            method: 'GET',
            data: {
                customerId: wx.getStorageSync('currentCustomer').id,
                state: 4
            },
            header:{
                'token':wx.getStorageSync('token')
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
            },
            header:{
                'token':wx.getStorageSync('token')
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
            },
            header:{
                'token':wx.getStorageSync('token')
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
            },
            header:{
                'token':wx.getStorageSync('token')
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
        this.loadData();
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

    /**
     * 支付订单
     * @param {*} e 
     */
    payOrder(e) {
        const orderId = e.currentTarget.dataset.orderid;
        Dialog.confirm({
                title: '提示',
                message: '你确定要支付这个订单吗?',
            })
            .then(() => {
                // on confirm
                requestUtil({
                    url: '/order/changeOrderState',
                    method: 'POST',
                    data: {
                        orderId: orderId,
                        state: 1
                    },
                    header: { //POST请求一定要加上这个content-type,不然无法传递参数
                        'content-type': 'application/x-www-form-urlencoded',
                        'token':wx.getStorageSync('token')
                    }
                }).then(res => {
                    wx.reLaunch({
                        url: '/pages/order/order?activeNum=b',
                    })
                }).catch(err => {

                })
            })
            .catch(() => {
                // on cancel
            });
    },

    /**
     * 取消订单
     * @param {*} e 
     */
    cancelOrder(e) {
        const orderId = e.currentTarget.dataset.orderid;
        Dialog.confirm({
                title: '提示',
                message: '你确定要取消这个订单吗?',
            })
            .then(() => {
                // on confirm
                requestUtil({
                    url: '/order/changeOrderState',
                    method: 'POST',
                    data: {
                        orderId: orderId,
                        state: 3
                    },
                    header: { //POST请求一定要加上这个content-type,不然无法传递参数
                        'content-type': 'application/x-www-form-urlencoded',
                        'token':wx.getStorageSync('token')
                    }
                }).then(res => {
                    wx.reLaunch({
                        url: '/pages/order/order?activeNum=d',
                    })
                }).catch(err => {

                })
            })
            .catch(() => {
                // on cancel
            });
    },

    /**
     * 确认收货
     * @param {*} e 
     */
    confirmOrder(e) {
        const orderId = e.currentTarget.dataset.orderid;
        Dialog.confirm({
                title: '提示',
                message: '你确定要确认收货吗?',
            })
            .then(() => {
                // on confirm
                requestUtil({
                    url: '/order/changeOrderState',
                    method: 'POST',
                    data: {
                        orderId: orderId,
                        state: 4
                    },
                    header: { //POST请求一定要加上这个content-type,不然无法传递参数
                        'content-type': 'application/x-www-form-urlencoded',
                        'token':wx.getStorageSync('token')
                    }
                }).then(res => {
                    wx.reLaunch({
                        url: '/pages/order/order?activeNum=a',
                    })
                }).catch(err => {

                })
            })
            .catch(() => {
                // on cancel
            });
    },

    toAppraisePage(e) {
        wx.navigateTo({
            url: '/pages/appraise/appraise?orderGoodsId=' + e.currentTarget.dataset.id,
        })
    },

    getOrderDetails(e) {
        wx.navigateTo({
            url: '/pages/order-details/order-details?orderId=' + e.currentTarget.dataset.orderid,
        })
    }
})