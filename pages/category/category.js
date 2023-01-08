// pages/category/category.js
import {
    getBaseUrl,
    requestUtil
} from '../../utils/requestUtil.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        mainActiveIndex: 0,
        activeId: null,
        items: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.loadData();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getTabBar().init(1);
    },

    /**
     * 加载数据
     */
    async loadData() {
        let items = [];
        const res = await requestUtil({
            url: '/bigType/getAllBigType',
            method: 'GET'
        });
        let allBigTypeList = res.data.allBigTypeList;
        if (allBigTypeList.length > 0) {
            for (let i = 0; i < allBigTypeList.length; i++) {
                items[i] = {
                    text: allBigTypeList[i].name,
                    disabled: false,
                    children: []
                }
                for (let j = 0; j < allBigTypeList[i].smallTypeList.length; j++) {
                    items[i].children[j] = {
                        text: allBigTypeList[i].smallTypeList[j].name,
                        id: allBigTypeList[i].smallTypeList[j].id
                    }
                }
            }
            this.setData({
                items
            })
        }
    },

    /**
     * 点击商品大类后
     * @param {*} param0 
     */
    onClickNav({
        detail = {}
    }) {
        this.setData({
            mainActiveIndex: detail.index || 0,
        });
    },

    /**
     * 点击商品小类后
     * @param {*} e 
     */
    onClickItem(e) {
        wx.navigateTo({
            url: '/pages/goods-list/goods-list?smallTypeId=' + e.detail.id
        })
    }
})