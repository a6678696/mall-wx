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
     * 顾客选择图片后上传到服务器
     * @param {*} event 
     */
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
            header: {
                'token': wx.getStorageSync('token')
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

    /**
     * 顾客删除图片后从服务器中删除
     */
    async deleteImage() {
        let url = this.data.fileList[0].url;
        await requestUtil({
            url: '/customer/deleteImage',
            method: 'GET',
            data: {
                url: url
            }
        });
        this.setData({
            fileList: []
        })
    },

    /**
     * 修改个人信息
     */
    async update() {
        const res = await requestUtil({
            url: '/customer/update',
            method: 'POST',
            data: {
                id: this.data.id,
                nickName: this.data.nickName,
                url: this.data.fileList.length === 0 ? '' : this.data.fileList[0].url
            }
        });
        let currentCustomer = {
            id: res.data.customer.id,
            nickName: res.data.customer.nickName,
            avatarImageName: res.data.customer.avatarImageName
        }
        wx.setStorageSync('currentCustomer', currentCustomer);
        wx.navigateBack();
    }
})