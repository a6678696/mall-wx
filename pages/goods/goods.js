// pages/goods/goods.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsName: '',
        price: 0,
        salesVolume: 0,
        details:'',
        stars: 4.5,
        swiperImageList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let _this = this;
        let swiperImageList = [];
        wx.request({
            url: 'http://localhost:8080/goods/findById?id=' + options.id,
            method: 'GET',
            success(res) {
                for (let i = 0; i < res.data.goods.swiperImageNameList.length; i++) {
                    if (res.data.goods.swiperImageNameList[i] !== '') {
                        swiperImageList[i] = {
                            imageUrl: res.data.goods.swiperImageNameList[i]
                        }
                    }
                }
                _this.setData({
                    goodsName: res.data.goods.name,
                    price: res.data.goods.price,
                    salesVolume: res.data.goods.salesVolume,
                    swiperImageList: swiperImageList,
                    details: res.data.goods.details.replace(/\<img/gi, '<img style="max-width:100%;height:auto"'),
                })
            }
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
        console.log(this.data.id);
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

    }
})