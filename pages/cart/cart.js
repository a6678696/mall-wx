// pages/shoppingCart/shoppingCart.js
import Notify from '@vant/weapp/notify/notify';
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        carts: [], // 购物车列表
        totalPrice: 0, // 总价，初始为0
        selectAllStatus: false // 全选状态，默认全选
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //如果购物车不存在于Storage
        if (!wx.getStorageSync('carts')) {
            wx.setStorageSync('carts', this.data.carts);
        } else {
            this.setData({
                carts: wx.getStorageSync('carts').reverse()
            });
            Toast({
                message: '数量设置为 0 即可删除商品',
                duration: 1000,
                position: 'top'
            });
            this.getTotalPrice();
        }
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

    /**
     * 当前商品选中事件
     */
    selectList(e) {
        const index = e.currentTarget.dataset.index;
        let carts = this.data.carts;
        const selected = carts[index].selected;
        carts[index].selected = !selected;
        this.setData({
            carts: carts
        });
        this.getTotalPrice();
    },

    /**
     * 删除购物车当前商品
     */
    deleteList(e) {
        Dialog.confirm({
                title: '提示',
                message: '你确定从购物车中删除这个商品吗？'
            })
            .then(() => {
                let carts = this.data.carts;
                const index = e.currentTarget.dataset.index;
                const name = carts[index].title;
                Notify({
                    type: 'danger',
                    duration: 1500,
                    message: '商品\"' + name + '\"已从购物车中删除'
                });
                carts.splice(index, 1);
                this.setData({
                    carts: carts
                });
                if (carts.length) {
                    this.getTotalPrice();
                }
            })
            .catch(() => {

            });
    },

    /**
     * 购物车全选事件
     */
    selectAll(e) {
        let selectAllStatus = this.data.selectAllStatus;
        selectAllStatus = !selectAllStatus;
        let carts = this.data.carts;
        for (let i = 0; i < carts.length; i++) {
            carts[i].selected = selectAllStatus;
        }
        this.setData({
            selectAllStatus: selectAllStatus,
            carts: carts
        });
        this.getTotalPrice();
    },

    /**
     * 绑定加数量事件
     */
    addCount(e) {
        const index = e.currentTarget.dataset.index;
        let carts = this.data.carts;
        let num = carts[index].num;
        num = num + 1;
        carts[index].num = num;
        this.setData({
            carts: carts
        });
        this.getTotalPrice();
    },

    /**
     * 绑定减数量事件
     */
    minusCount(e) {
        const index = e.currentTarget.dataset.index;
        let carts = this.data.carts;
        let num = carts[index].num;
        num = num - 1;
        carts[index].num = num;
        this.setData({
            carts: carts
        });
        if (num === 0) {
            Dialog.confirm({
                    title: '提示',
                    message: '你确定从购物车中删除这个商品吗？',
                })
                .then(() => {
                    let carts = this.data.carts;
                    const index = e.currentTarget.dataset.index;
                    const name = carts[index].title;
                    Notify({
                        type: 'danger',
                        duration: 1500,
                        message: '商品\"' + name + '\"已从购物车中删除'
                    });
                    carts.splice(index, 1);
                    this.setData({
                        carts: carts
                    });
                    if (!carts.length) {
                        this.setData({
                            totalPrice: 0,
                            selectAllStatus: false
                        });
                        wx.setStorageSync('carts', carts);
                    } else {
                        this.getTotalPrice();
                    }
                })
                .catch(() => {
                    carts[index].num = 1;
                    this.setData({
                        carts: carts
                    });
                    this.getTotalPrice();
                });
        } else {
            this.getTotalPrice();
        }
    },

    /**
     * 计算总价
     */
    getTotalPrice() {
        let carts = this.data.carts; // 获取购物车列表
        let total = 0;
        let selectCount = 0;
        for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
            if (carts[i].selected) { // 判断选中才会计算价格
                selectCount++;
                total += carts[i].num * carts[i].price; // 所有价格加起来
            }
        }
        this.setData({ // 最后赋值到data中渲染到页面
            carts: carts,
            totalPrice: total.toFixed(2)
        });
        //如果选择的商品数和购物车商品数量一样，就勾上全选
        if (selectCount === carts.length) {
            this.setData({
                selectAllStatus: true
            });
        } else {
            this.setData({
                selectAllStatus: false
            });
        }
        wx.setStorageSync('carts', carts);
    },

    settleAccounts() {
        wx.navigateTo({
            url: '/pages/confirm-order/confirm-order',
        })
    }
})