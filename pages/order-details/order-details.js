// pages/order-details/order-details.js
import {
    getBaseUrl,
    requestUtil
} from '../../utils/requestUtil.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderId: 0,
        order: null,
        baseUrl: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const baseUrl = getBaseUrl();
        this.setData({
            orderId: options.orderId,
            baseUrl
        });
        this.loadData();
    },

    /**
     * 加载数据
     */
    async loadData() {
        const res = await requestUtil({
            url: '/order/findById',
            method: 'GET',
            data: {
                id: this.data.orderId
            }
        });
        this.setData({
            order: res.data.order
        });
    }
})