// index.js
Page({

    data: {
        swiperImageList: [],
        recommendGoodsList: []
    },

    onShow() {
        this.getTabBar().init(0);
        this.getSwiperImageList();
        this.getRecommendGoodsList();
    },
    // 获取首页轮播图图片
    getSwiperImageList() {
        let swiperImageList = new Array();
        let _this = this;
        wx.request({
            url: 'http://localhost:8080/goods/getIndexSwiperGoodsList',
            method: 'GET',
            success(res) {
                let goodsList = res.data.goodsList;
                for (let i = 0; i < goodsList.length; i++) {
                    swiperImageList[i] = {
                        imageUrl: 'http://localhost:8080/image/goods/swiper/' + goodsList[i].goodsDetailsSwiperImageStr.split(',')[1],
                        url: '/pages/goods/goods?id=' + goodsList[i].id
                    }
                }
                _this.setData({
                    swiperImageList: swiperImageList
                })
            }
        })
    },
    //获取推荐商品列表
    getRecommendGoodsList() {
        let _this = this;
        let recommendGoodsList = new Array();
        wx.request({
            url: 'http://localhost:8080/goods/getRecommendGoodsList',
            method: 'GET',
            success(res) {
                _this.setData({
                    recommendGoodsList: res.data.goodsList
                })
            }
        })
    },

    onLoad() {

    }
})