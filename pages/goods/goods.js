// pages/goods/goods.js
import Notify from '@vant/weapp/notify/notify';
// 引入请求后端工具类
import {
    getBaseUrl,
    requestUtil
} from '../../utils/requestUtil.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        baseUrl: '',
        id: 0,
        goodsName: '',
        price: 0,
        salesVolume: 0,
        details: '',
        cardImageName: '',
        goodsNum: 0,
        stars: 4.5,
        swiperImageList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //获取请求的IP地址和端口
        const baseUrl = getBaseUrl();
        this.setData({
            baseUrl
        })
        this.loadData(options.id);
    },

    //加载数据
    loadData(id) {
        let swiperImageList = [];
        requestUtil({
            url: '/goods/findById',
            method: 'GET',
            data: {
                id: id
            }
        }).then(res => {
            for (let i = 0; i < res.data.goods.swiperImageNameList.length; i++) {
                if (res.data.goods.swiperImageNameList[i] !== '') {
                    swiperImageList[i] = {
                        imageUrl: res.data.goods.swiperImageNameList[i]
                    }
                }
            }
            this.setData({
                id: res.data.goods.id,
                goodsName: res.data.goods.name,
                price: res.data.goods.price,
                salesVolume: res.data.goods.salesVolume,
                cardImageName: res.data.goods.cardImageName,
                swiperImageList: swiperImageList,
                details: res.data.goods.details,
            })
        }).catch(err => {

        })
    },

    //添加商品到购物车
    addGoodsToCart() {
        let carts = wx.getStorageSync('carts');
        //用于判断购物车中是否存在这个商品
        let flag;
        //用于记录已存在商品的下标
        let cartsIndex;
        //购物车不存在时,定义一个空数组
        if (!carts) {
            carts = [];
        }
        for (let i = 0; i < carts.length; i++) {
            //购物车中存在这个商品
            if (carts[i].id === this.data.id) {
                flag = true;
                cartsIndex = i;
                break;
            }
        }
        //存在这个商品
        if (flag) {
            //数量加1
            carts[cartsIndex].num += 1;
        } else {
            let goods = {
                id: this.data.id,
                title: this.data.goodsName,
                image: this.data.baseUrl + '/image/goods/card/' + this.data.cardImageName,
                num: 1,
                price: this.data.price,
                selected: false
            };
            carts.push(goods);
        }
        Notify({
            type: 'primary',
            duration: 1500,
            message: '商品已添加到购物车'
        });
        wx.setStorageSync('carts', carts);
        this.setData({
            goodsNum: wx.getStorageSync('carts').length
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
        //购物车商品数量
        if (wx.getStorageSync('carts')) {
            this.setData({
                goodsNum: wx.getStorageSync('carts').length
            })
        }
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