// pages/address-modify/address-modify.js
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
        id: -1,
        area: '',
        areaCode: '',
        details: '',
        phoneNum: '',
        name: '',
        description: '',
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
            customerAvatarImageUrl: this.data.baseUrl + '/image/customer/avatar/' + wx.getStorageSync('currentCustomer').avatarImageName,
            id:options.id
        });
        requestUtil({
            url: '/address/findById',
            method: 'GET',
            data: {
                id: options.id
            }
        }).then(res => {
            this.setData({
                name: res.data.address.name,
                phoneNum: res.data.address.phoneNum,
                details: res.data.address.details,
                description: res.data.address.description,
                areaCode: res.data.address.areaCode,
                area: res.data.address.area,
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

    },

    sendMessage(e) {
        console.log(e.detail);
        this.setData({
            area: e.detail.split(",")[0],
            areaCode: e.detail.split(",")[1]
        })
    },

    saveAddress() {
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
        requestUtil({
            url: '/address/save',
            method: 'POST',
            data: {
                id: this.data.id,
                customerId: wx.getStorageSync('currentCustomer').id,
                name: this.data.name,
                phoneNum: this.data.phoneNum,
                area: this.data.area,
                areaCode: this.data.areaCode,
                details: this.data.details,
                description: this.data.description
            },
            header: { //POST请求一定要加上这个content-type,不然无法传递参数
                'content-type': 'application/x-www-form-urlencoded',
            }
        }).then(res => {
            wx.navigateBack();
        }).catch(err => {

        })
    }
})