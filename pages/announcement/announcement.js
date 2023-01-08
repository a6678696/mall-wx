// pages/announcement/announcement.js
import Notify from '@vant/weapp/notify/notify';
import {
    requestUtil
} from '../../utils/requestUtil.js'

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
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.loadData();
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
        } else {
            Notify({
                type: 'primary',
                message: '当前已经是第一页了'
            });
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

    onChange(event) {
        this.setData({
            activeName: event.detail,
        });
    },

    /**
     * 加载数据
     */
    async loadData() {
        let currentPage = this.data.currentPage;
        let pageSize = this.data.pageSize;
        const res = await requestUtil({
            url: '/announcement/list',
            method: 'GET',
            data: {
                page: currentPage,
                size: pageSize
            }
        });
        this.setData({
            announcementList: res.data.announcementList
        });
    }
})