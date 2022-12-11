// pages/search-page/search-page.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchWord: '',
        searchWordHistoryList: [
            {
                time:'2022-12-11 01:55:07',
                value:'笔记本电脑32G'
            },
            {
                time:'2022-12-11 01:55:07',
                value:'樱桃键盘'
            },
            {
                time:'2022-12-11 01:55:07',
                value:'一加8T手机壳'
            },
            {
                time:'2022-12-11 01:55:03',
                value:'5G'
            },
            {
                time:'2022-12-11 01:54:58',
                value:'一加'
            },
            {
                time:'2022-12-11 01:54:22',
                value:'华为'
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

    searchByHistory(e) {
        const searchWord = e.currentTarget.dataset.history;
        this.setData({
            searchWord: searchWord
        });
    }
})