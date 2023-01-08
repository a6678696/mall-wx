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
        this.checkToken();
    },

    /**
     * 获取首页轮播图图片
     */
    async getSwiperImageList() {
        let swiperImageList = new Array();
        const res = await requestUtil({
            url: '/goods/getIndexSwiperGoodsList',
            method: 'GET'
        });
        let goodsList = res.data.goodsList;
        for (let i = 0; i < goodsList.length; i++) {
            //只展示前6个首页轮播图商品
            if (i === 6) {
                break;
            }
            swiperImageList[i] = {
                imageUrl: this.data.baseUrl + '/image/goods/swiper/' + goodsList[i].goodsDetailsSwiperImageStr.split(',')[1],
                url: '/pages/goods/goods?id=' + goodsList[i].id
            }
        }
        this.setData({
            swiperImageList
        })
    },

    /**
     * 获取推荐商品列表
     */
    async getRecommendGoodsList() {
        const res = await requestUtil({
            url: '/goods/getRecommendGoodsList',
            method: 'GET'
        });
        this.setData({
            recommendGoodsList: res.data.goodsList
        })
    },

    onLoad() {
        const baseUrl = getBaseUrl();
        this.setData({
            baseUrl
        });
    },

    /**
     * 验证token
     */
    async checkToken() {
        let flag = true;
        if (wx.getStorageSync('token') !== null) {
            const res = await requestUtil({
                url: '/token/check',
                method: 'GET',
                data: {
                    token: wx.getStorageSync('token')
                }
            });
            //token验证成功
            if (res.data.code === 0) {
                if (res.data.roleName !== 'customer') {
                    flag = false;
                    console.log('当前用户身份不是customer');
                    wx.removeStorageSync('token');
                    wx.removeStorageSync('currentCustomer');
                } else {
                    flag = true;
                }
            } else if (res.data.code === 500) {
                flag = false;
                console.log("token验证失败");
                wx.removeStorageSync('token');
                wx.removeStorageSync('currentCustomer');
            }
            this.login();
        }
    },

    /**
     * 顾客登录
     */
    login() {
        //当顾客未登录时
        if (!wx.getStorageSync('currentCustomer')) {
            //登录
            wx.login({
                success: (res) => { //登录成功
                    //请求后端,给后端发送code以获取openid
                    requestUtil({
                        url: '/customer/login',
                        method: 'POST',
                        data: {
                            loginCode: res.code
                        }
                    }).then(result => {
                        //后端返回一个customer对象
                        wx.setStorageSync('currentCustomer', result.data.customer);
                        wx.setStorageSync('token', result.data.token);
                        this.getSwiperImageList();
                        this.getRecommendGoodsList();
                    })
                },
            })
        } else {
            this.getSwiperImageList();
            this.getRecommendGoodsList();
        }
    }
})