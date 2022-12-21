// custom-tab-bar/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        goodsNum: 0,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //用户点击Tabbar的时候调用微信内置函数wx.switchTab()进行Tab切换
        onChange(event) {
            // event.detail 的值为当前选中项的索引
            var that = this
            switch (event.detail) {
                case 0:
                    wx.switchTab({
                        url: '/pages/index/index'
                    })
                    break
                case 1:
                    wx.switchTab({
                        url: '/pages/category/category'
                    })
                    break;
                case 2:
                    // wx.switchTab({
                    //     url: '/pages/cart/cart'
                    // })
                    wx.navigateTo({
                        url: '/pages/cart/cart',
                    })
                    break;
                case 3:
                    wx.switchTab({
                        url: '/pages/my/my'
                    })
                    break;
                default:
                    break;
            }
        },
        //改变active属性，从而告诉Tabbar用户点击的是第几个Tab
        init(active) {
            this.setData({
                active: active
            })
            //购物车商品数量
            if (wx.getStorageSync('carts')) {
                this.setData({
                    goodsNum: wx.getStorageSync('carts').length
                })
            }
        }
    }
})