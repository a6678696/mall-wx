// pages/category/category.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mainActiveIndex: 0,
        activeId: null,
        items: [{
                // 导航名称
                text: '数码',
                // 禁用选项
                disabled: false,
                // 该导航下所有的可选项
                children: [{
                        // 名称
                        text: '手机',
                        // id，作为匹配选中状态的标识
                        id: 1
                    },
                    {
                        text: '电脑',
                        id: 2
                    },
                    {
                        text: '平板',
                        id: 3
                    },
                    {
                        text: '相机',
                        id: 4
                    },
                    {
                        text: '生活家电',
                        id: 5
                    },
                    {
                        text: '大家电',
                        id: 6
                    },
                    {
                        text: '个人家电',
                        id: 7
                    },
                    {
                        text: '休闲家电',
                        id: 8
                    },
                    {
                        text: '数码配件',
                        id: 9
                    }
                ]
            },
            {
                // 导航名称
                text: '美食',
                // 禁用选项
                disabled: false,
                // 该导航下所有的可选项
                children: [{
                        // 名称
                        text: '休闲零食',
                        // id，作为匹配选中状态的标识
                        id: 1
                    },
                    {
                        text: '粮油米面',
                        id: 2
                    },
                    {
                        text: '茗茶冲饮',
                        id: 3
                    },
                    {
                        text: '各地特产',
                        id: 4
                    },
                    {
                        text: '各类坚果',
                        id: 5
                    },
                    {
                        text: '生鲜蔬果',
                        id: 6
                    }
                ]
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
        this.getTabBar().init(1);
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

    onClickItem({
        detail = {}
    }) {
        const activeId = this.data.activeId === detail.id ? null : detail.id;
        this.setData({
            activeId
        });
        wx.navigateTo({
          url: '/pages/goods-list/goods-list',
        })
    }
})