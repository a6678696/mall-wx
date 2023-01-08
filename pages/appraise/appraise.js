// pages/appraise/appraise.js
import Notify from '@vant/weapp/notify/notify';
import {
    requestUtil
} from '../../utils/requestUtil.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderGoodsId: 0,
        value: 5,
        content: ''
    },

    onChange(event) {
        this.setData({
            value: event.detail,
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            orderGoodsId: options.orderGoodsId
        })
    },

    /**
     * 评价商品
     */
    async appraise() {
        if (this.data.content === '') {
            Notify('内容不能为空');
            return false;
        }
        await requestUtil({
            url: '/valuation/add',
            method: 'POST',
            data: {
                orderGoodsId: this.data.orderGoodsId,
                rate: this.data.value,
                content: this.data.content,
                customerId: wx.getStorageSync('currentCustomer').id
            }
        });
        wx.navigateBack();
    }
})