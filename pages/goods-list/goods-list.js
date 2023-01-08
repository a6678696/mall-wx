// pages/search/search.js
import {
    getBaseUrl,
    requestUtil
} from '../../utils/requestUtil.js'

Page({

    data: {
        baseUrl: '',
        goodsList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const baseUrl = getBaseUrl();
        this.setData({
            baseUrl
        });
        if (options.smallTypeId !== undefined) {
            this.loadDataCategory(options.smallTypeId);
        }
        if (options.searchWord !== undefined) {
            this.loadDataSearchGoods(options.searchWord);
        }
        if (options.isGoodsListNew !== undefined) {
            this.loadDataGoodsListNew();
        }
        if (options.isGoodsListHot !== undefined) {
            this.loadDataGoodsListHot();
        }
        if (options.isGoodsListPriceDrop !== undefined) {
            this.loadDataGoodsListPriceDrop();
        }
    },

    /**
     * 分类页面使用
     * @param {*} smallTypeId 
     */
    async loadDataCategory(smallTypeId) {
        const res = await requestUtil({
            url: '/goods/listNoPage',
            method: 'GET',
            data: {
                smallTypeId: smallTypeId
            }
        });
        this.setData({
            goodsList: res.data.goodsList
        })
    },

    /**
     * 搜索商品时使用
     * @param {*} searchWord 
     */
    async loadDataSearchGoods(searchWord) {
        const res = await requestUtil({
            url: '/goods/listNoPage',
            method: 'GET',
            data: {
                name: searchWord
            }
        });
        this.setData({
            goodsList: res.data.goodsList
        })
    },

    /**
     * 新品页面使用
     */
    async loadDataGoodsListNew() {
        const res = await requestUtil({
            url: '/goods/getNewGoodsList',
            method: 'GET'
        });
        this.setData({
            goodsList: res.data.goodsList
        })
    },

    /**
     * 热卖页面使用
     */
    async loadDataGoodsListHot() {
        const res = await requestUtil({
            url: '/goods/getHotGoodsList',
            method: 'GET'
        });
        this.setData({
            goodsList: res.data.goodsList
        })
    },

    /**
     * 降价商品页面使用
     */
    async loadDataGoodsListPriceDrop() {
        const res = await requestUtil({
            url: '/goods/getPriceDropGoodsList',
            method: 'GET'
        });
        this.setData({
            goodsList: res.data.goodsList
        })
    },
})