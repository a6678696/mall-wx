// pages/category/category.js
import {
    getBaseUrl,
    requestUtil
} from '../../utils/requestUtil.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        mainActiveIndex: 0,
        activeId: null,
        items: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.loadData();
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
        this.getTabBar().init(1);
    },

    loadData() {
        let items = new Array();
        requestUtil({
            url: '/bigType/getAllBigType',
            method: 'GET',
            header:{
                'token':wx.getStorageSync('token')
            }
        }).then(res => {
            let allBigTypeList = res.data.allBigTypeList;
            if (allBigTypeList.length > 0) {
                for (let i = 0; i < allBigTypeList.length; i++) {
                    items[i] = {
                        text: allBigTypeList[i].name,
                        disabled: false,
                        children: []
                    }
                    for (let j = 0; j < allBigTypeList[i].smallTypeList.length; j++) {
                        items[i].children[j] = {
                            text: allBigTypeList[i].smallTypeList[j].name,
                            id: allBigTypeList[i].smallTypeList[j].id
                        }
                    }
                }
                this.setData({
                    items
                })
            }
        }).catch(err => {

        });
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

    onClickNav({
        detail = {}
    }) {
        this.setData({
            mainActiveIndex: detail.index || 0,
        });
    },

    onClickItem(e) {
        wx.navigateTo({
            url: '/pages/goods-list/goods-list?smallTypeId=' + e.detail.id
        })
    }
})