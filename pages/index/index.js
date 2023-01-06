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
    },
    // 获取首页轮播图图片
    getSwiperImageList() {
        let swiperImageList = new Array();
        requestUtil({
            url: '/goods/getIndexSwiperGoodsList',
            method: 'GET',
            header: {
                'token': wx.getStorageSync('token')
            }
        }).then(res => {
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
        })
    },
    //获取推荐商品列表
    getRecommendGoodsList() {
        requestUtil({
            url: '/goods/getRecommendGoodsList',
            method: 'GET',
            header: {
                'token': wx.getStorageSync('token')
            }
        }).then(res => {
            this.setData({
                recommendGoodsList: res.data.goodsList
            })
        })
    },

    onLoad() {
        const baseUrl = getBaseUrl();
        this.setData({
            baseUrl
        });
        this.checkToken();
    },

    checkToken() {
        let flag = true;
        if (wx.getStorageSync('token') !== null) {
            requestUtil({
                url: '/token/check',
                method: 'GET',
                data: {
                    token: wx.getStorageSync('token')
                },
                header: {
                    'token': wx.getStorageSync('token')
                }
            }).then(result => {
                //token验证成功
                if (result.data.code === 0) {
                    if (result.data.roleName !== 'customer') {
                        flag = false;
                        console.log('当前用户身份不是customer');
                        wx.removeStorageSync('token');
                        wx.removeStorageSync('currentCustomer');
                    } else {
                        flag = true;
                    }
                } else if (result.data.code === 500) {
                    flag = false;
                    console.log("token验证失败");
                    wx.removeStorageSync('token');
                    wx.removeStorageSync('currentCustomer');
                }
                this.login();
            })
        }
    },

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
                        },
                        header: { //POST请求一定要加上这个content-type,不然无法传递参数
                            'content-type': 'application/x-www-form-urlencoded',
                            'token': wx.getStorageSync('token')
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