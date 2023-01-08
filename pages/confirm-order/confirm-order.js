// pages/confirm-order/confirm-order.js
import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';
import {
    requestUtil
} from '../../utils/requestUtil.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        showAddressSelect: false,
        totalPrice: 0,
        //当前地址
        addressNow: [],
        //可选择的地址
        actions: [],
        //全部地址
        addressList: [],
        goodsList: [],
        orderId: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.loadData();
    },

    //加载数据
    loadData() {
        requestUtil({
            url: '/address/listNoPage',
            method: 'GET',
            data: {
                customerId: wx.getStorageSync('currentCustomer').id
            }
        }).then(res => {
            let addressList2 = res.data.addressList;
            let addressNow = [];
            let actions = [];
            let addressList = [];
            let index = 0;
            for (let i = 0; i < addressList2.length; i++) {
                //如果是默认地址
                if (addressList2[i].isSelected) {
                    addressNow = [addressList2[i].id, addressList2[i].name + ' ' + addressList2[i].phoneNum, addressList2[i].area + addressList2[i].details, addressList2[i].description]
                } else {
                    actions[index] = {
                        id: addressList2[i].id,
                        name: addressList2[i].name + ' ' + addressList2[i].phoneNum + '（' + addressList2[i].description + '）',
                        subname: addressList2[i].area + addressList2[i].details
                    };
                    index++;
                }
                addressList[i] = {
                    id: addressList2[i].id,
                    name: addressList2[i].name + ' ' + addressList2[i].phoneNum,
                    subname: addressList2[i].area + addressList2[i].details,
                    defaultSelected: addressList2[i].isSelected,
                    description: addressList2[i].description
                }
            }
            this.setData({
                addressNow,
                actions,
                addressList
            })
        });
        let carts = wx.getStorageSync('carts');
        let index = 0;
        let goodsList = [];
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].selected) {
                goodsList[index] = {
                    id: carts[i].id,
                    num: carts[i].num,
                    price: carts[i].price,
                    title: carts[i].title,
                    imageUrl: carts[i].image
                }
                index++;
            }
        }
        this.setData({
            goodsList
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getTotalPrice();
    },

    /**
     * 打开或关闭选择地址的弹出层
     */
    showOrCloseSelectAddress() {
        this.setData({
            showAddressSelect: !this.data.showAddressSelect
        });
    },

    /**
     * 选择地址后
     * @param {*} e 
     */
    onSelectAddress(e) {
        this.showOrCloseSelectAddress();
        const selectedId = e.detail.id;
        let addressNow = this.data.addressNow;
        let addressList = this.data.addressList;
        let actions = new Array();
        let actionsIndex = 0;
        for (let i = 0; i < addressList.length; i++) {
            if (selectedId === addressList[i].id) {
                //设置当前地址
                addressNow = [addressList[i].id, addressList[i].name, addressList[i].subname, addressList[i].description]
                //将已选择的地址defaultSelected设置为true
                addressList[i].defaultSelected = true;
            } else {
                addressList[i].defaultSelected = false;
                actions[actionsIndex] = {
                    id: addressList[i].id,
                    name: addressList[i].name + '（' + addressList[i].description + '）',
                    subname: addressList[i].subname
                };
                actionsIndex++;
            }
        }
        this.setData({
            addressNow: addressNow,
            addressList: addressList,
            actions: actions
        });
    },

    /**
     * 计算总价
     */
    getTotalPrice() {
        let goodsList = this.data.goodsList;
        let totalPrice = 0;
        for (let i = 0; i < goodsList.length; i++) {
            totalPrice += goodsList[i].num * goodsList[i].price;
        }
        this.setData({
            totalPrice: totalPrice
        });
    },

    /**
     * 提交订单
     */
    async onSubmit() {
        //保存订单
        const res = await requestUtil({
            url: '/order/save',
            method: 'POST',
            data: {
                price: this.data.totalPrice,
                customerId: wx.getStorageSync('currentCustomer').id,
                address: this.data.addressNow[2],
                phoneNum: this.data.addressNow[1].split(" ")[1],
                customerName: this.data.addressNow[1].split(" ")[0],
                state: 0
            }
        });
        this.setData({
            orderId: res.data.orderId
        });
        //保存订单商品
        for (let i = 0; i < this.data.goodsList.length; i++) {
            await requestUtil({
                url: '/orderGoods/add',
                method: 'POST',
                data: {
                    num: this.data.goodsList[i].num,
                    goodsId: this.data.goodsList[i].id,
                    orderId: this.data.orderId
                }
            });
        }
        let cartsNow = [];
        let carts = wx.getStorageSync('carts');
        for (let i = 0; i < carts.length; i++) {
            if (!carts[i].selected) {
                cartsNow.push(carts[i]);
            }
        }
        wx.setStorageSync('carts', cartsNow);
        Toast.loading({
            message: '提交成功，正在拉起支付...',
            forbidClick: true,
            onClose: () => {
                Dialog.confirm({
                        title: '支付提示',
                        message: '你确定要支付吗？',
                    })
                    .then(() => {
                        // on confirm
                        requestUtil({
                            url: '/order/changeOrderState',
                            method: 'POST',
                            data: {
                                orderId: this.data.orderId,
                                state: 1
                            }
                        });
                        wx.reLaunch({
                            url: '/pages/order/order?activeNum=b',
                        })
                    })
                    .catch(() => {
                        // on cancel
                        requestUtil({
                            url: '/order/changeOrderState',
                            method: 'POST',
                            data: {
                                orderId: this.data.orderId,
                                state: 2
                            }
                        });
                        wx.reLaunch({
                            url: '/pages/order/order?activeNum=c',
                        })
                    });
            }
        });
    }
})