// pages/announcement/announcement.js
import Notify from '@vant/weapp/notify/notify';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeName: 0,
        announcementList: [],
        currentPage: 1,
        pageSize: 12,
        pageNum: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
        if (this.data.currentPage > 1) {
            this.setData({
                currentPage: this.data.currentPage - 1
            });
            this.loadData();
        }else{
            Notify({ type: 'primary', message: '当前已经是第一页了' });
        }
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        this.setData({
            currentPage: this.data.currentPage + 1
        });
        this.loadData();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    onChange(event) {
        this.setData({
            activeName: event.detail,
        });
    },

    loadData() {
        let announcementList;
        let _this = this;
        let currentPage = this.data.currentPage;
        let pageSize = this.data.pageSize;
        wx.request({
            url: 'http://localhost:8080/announcement/list',
            method: 'GET',
            data: {
                page: currentPage,
                size: pageSize
            },
            success(result) {
                announcementList = result.data.announcementList;

                if (announcementList.length > 0) {
                    for (let i = 0; i < announcementList.length; i++) {
                        announcementList[i] = {
                            name: i,
                            id: announcementList[i].id,
                            title: announcementList[i].title,
                            content: announcementList[i].content,
                            addDate: announcementList[i].addDate
                        };
                    }
                    _this.setData({
                        announcementList: announcementList
                    });
                }
            }
        })
    }
})