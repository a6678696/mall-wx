// pages/address-add/address-add.js
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
        name: '',
        phoneNum: '',
        details: '',
        description: '',
        area: '',
        areaCode: '',
        customerAvatarImageUrl: '',
        baseUrl: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const baseUrl = getBaseUrl();
        this.setData({
            baseUrl
        });
        this.setData({
            baseUrl,
            customerAvatarImageUrl: this.data.baseUrl + '/image/customer/avatar/' + wx.getStorageSync('currentCustomer').avatarImageName
        });
    },

    /**
     * 获取子组件的值(选择的省市区)
     * @param {*} e 
     */
    sendMessage(e) {
        this.setData({
            area: e.detail.split(",")[0],
            areaCode: e.detail.split(",")[1]
        })
    },

    /**
     * 添加收货地址
     */
    async addAddress() {
        if (this.data.name === '') {
            Notify('请输入姓名');
            return false;
        }
        if (this.data.phoneNum === '') {
            Notify('请输入手机号');
            return false;
        }
        if (this.data.areaCode === '') {
            Notify('请选择省市区');
            return false;
        }
        if (this.data.details === '') {
            Notify('请输入详细地址');
            return false;
        }
        if (this.data.description === '') {
            Notify('请输入地址说明');
            return false;
        }
        await requestUtil({
            url: '/address/save',
            method: 'POST',
            data: {
                customerId: wx.getStorageSync('currentCustomer').id,
                name: this.data.name,
                phoneNum: this.data.phoneNum,
                area: this.data.area,
                areaCode: this.data.areaCode,
                details: this.data.details,
                description: this.data.description
            }
        });
        wx.navigateBack();
    }
})