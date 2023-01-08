// pages/my-comment/my-comment.js
import {
    getBaseUrl,
    requestUtil
} from '../../utils/requestUtil.js'

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

    /**
     * 加载数据
     */
    async loadData() {
        const res = await requestUtil({
            url: '/valuation/listNoPage',
            method: 'GET',
            data: {
                customerId: wx.getStorageSync('currentCustomer').id
            }
        });
        this.setData({
            valuationList: res.data.valuationList
        })
    }
})