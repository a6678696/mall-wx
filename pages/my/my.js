// pages/my/my.js
// 引入请求后端工具类
import {
    getBaseUrl
} from '../../utils/requestUtil.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        baseUrl: '',
        customerAvatarImageUrl: '',
        nickName: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const baseUrl = getBaseUrl();
        this.setData({
            baseUrl
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getTabBar().init(3);
        this.setData({
            customerAvatarImageUrl: this.data.baseUrl+'/image/customer/avatar/'+wx.getStorageSync('currentCustomer').avatarImageName,
            nickName: wx.getStorageSync('currentCustomer').nickName
        });
    }
})