// 引入请求后端工具类
import {
    getBaseUrl,
    requestUtil
} from '../../utils/requestUtil.js'
// index.js
Page({

    data: {
        baseUrl: '',
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
        requestUtil({
            url: '/goods/getIndexSwiperGoodsList',
            method: 'GET'
        }).then(res => {
            let goodsList = res.data.goodsList;
            for (let i = 0; i < goodsList.length; i++) {
                swiperImageList[i] = {
                    imageUrl: this.data.baseUrl + '/image/goods/swiper/' + goodsList[i].goodsDetailsSwiperImageStr.split(',')[1],
                    url: '/pages/goods/goods?id=' + goodsList[i].id
                }
            }
            this.setData({
                swiperImageList
            })
        })
    },
    //获取推荐商品列表
    getRecommendGoodsList() {
        requestUtil({
            url: '/goods/getRecommendGoodsList',
            method: 'GET',
        }).then(res => {
            this.setData({
                recommendGoodsList: res.data.goodsList
            })
        }).catch(err => {

        })
    },

    onLoad() {
        const baseUrl = getBaseUrl();
        this.setData({
            baseUrl
        })
    }
})