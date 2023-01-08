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

    /**
     * 加载数据
     */
    async loadData() {
        //获取已完成的订单
        const res = await requestUtil({
            url: '/order/listNoPage',
            method: 'GET',
            data: {
                customerId: wx.getStorageSync('currentCustomer').id,
                state: 4
            }
        });
        this.setData({
            orderListDone: res.data.orderList
        })

        //获取已付款的订单
        const res2 = await requestUtil({
            url: '/order/listNoPage',
            method: 'GET',
            data: {
                customerId: wx.getStorageSync('currentCustomer').id,
                state: 1
            }
        });
        this.setData({
            orderListPay: res2.data.orderList
        })

        //获取待付款的订单
        const res3 = await requestUtil({
            url: '/order/listNoPage',
            method: 'GET',
            data: {
                customerId: wx.getStorageSync('currentCustomer').id,
                state: 2
            }
        });
        this.setData({
            orderListWantToPay: res3.data.orderList
        })

        //获取已取消的订单
        const res4 = await requestUtil({
            url: '/order/listNoPage',
            method: 'GET',
            data: {
                customerId: wx.getStorageSync('currentCustomer').id,
                state: 3
            }
        });
        this.setData({
            orderListCancel: res4.data.orderList
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.loadData();
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

    /**
     * 跳转到评价页面
     * @param {*} e 
     */
    toAppraisePage(e) {
        wx.navigateTo({
            url: '/pages/appraise/appraise?orderGoodsId=' + e.currentTarget.dataset.id,
        })
    },

    /**
     * 跳转到订单详情页面
     * @param {*} e 
     */
    getOrderDetails(e) {
        wx.navigateTo({
            url: '/pages/order-details/order-details?orderId=' + e.currentTarget.dataset.orderid,
        })
    }
})