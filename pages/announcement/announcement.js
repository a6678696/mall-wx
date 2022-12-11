// pages/announcement/announcement.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeName: 1,
        announcementList:[
            {
                title:'公告1',
                content:'公告1公告1公告1公告1公告1公告1公告1公告1公告1公告1公告1',
                name:1
            },
            {
                title:'公告2',
                content:'公告2公告2公告2公告2公告2公告2公告2公告2公告2公告2公告2公告2公告2公告2公告2',
                name:2
            },
            {
                title:'公告3',
                content:'公告3公告3公告3公告3公告3公告3公告3公告3公告3公告3公告3',
                name:3
            }
        ]
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

    onChange(event) {
        this.setData({
            activeName: event.detail,
        });
    },
})