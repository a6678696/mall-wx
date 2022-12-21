// pages/my-information-modify/my-information-modify.js
import {
    getBaseUrl,
    requestUtil
} from "../../utils/requestUtil";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        nickName: '',
        avatarImageUrl: '',
        baseUrl: '',
        fileList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const baseUrl = getBaseUrl();
        this.setData({
            baseUrl,
            nickName: wx.getStorageSync('currentCustomer').nickName,
            id: wx.getStorageSync('currentCustomer').id,
            avatarImageUrl: baseUrl + '/image/customer/avatar/' + wx.getStorageSync('currentCustomer').avatarImageName
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

    //顾客选择图片后上传到服务器
    afterRead(event) {
        const {
            file
        } = event.detail;
        let _this = this;
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        wx.uploadFile({
            url: this.data.baseUrl + '/customer/uploadImage',
            filePath: file.url,
            name: 'file',
            formData: {
                id: 1
            },
            success(res) {
                // 上传完成需要更新 fileList
                let fileList = [];
                fileList[0] = {
                    url: res.data
                }
                _this.setData({
                    fileList
                })
            },
        });
    },

    // 顾客删除图片后从服务器中删除
    deleteImage() {
        let url = this.data.fileList[0].url;
        requestUtil({
            url: '/customer/deleteImage',
            method: 'GET',
            data: {
                url: url
            }
        }).then(res => {
            this.setData({
                fileList: []
            })
        }).catch(err => {

        })
    },

    //修改个人信息
    update() {
        requestUtil({
            url: '/customer/update',
            method: 'POST',
            data: {
                id: this.data.id,
                nickName: this.data.nickName,
                url: this.data.fileList.length===0?'':this.data.fileList[0].url
            },
            header: { //POST请求一定要加上这个content-type,不然无法传递参数
                'content-type': 'application/x-www-form-urlencoded',
            }
        }).then(res => {
            let currentCustomer = {
                id: res.data.customer.id,
                nickName: res.data.customer.nickName,
                avatarImageName: res.data.customer.avatarImageName
            }
            wx.navigateBack();
            wx.setStorageSync('currentCustomer', currentCustomer);
        }).catch(err => {

        })
    }
})