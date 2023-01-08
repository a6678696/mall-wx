// pages/address/address.js
import Dialog from '@vant/weapp/dialog/dialog';
import Notify from '@vant/weapp/notify/notify';
import {
    requestUtil
} from '../../utils/requestUtil.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressList: []
    },

    /**
     * 打开修改页面
     * @param {*} e 
     */
    openModifyPage(e) {
        wx.navigateTo({
            url: '/pages/address-modify/address-modify?id=' + e.currentTarget.dataset.id,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
        this.getAddressList();
    },

    /**
     * 获取当前用户所有收货地址
     */
    async getAddressList() {
        const res = await requestUtil({
            url: '/address/listNoPage',
            method: 'GET',
            data: {
                customerId: wx.getStorageSync('currentCustomer').id
            }
        });
        this.setData({
            addressList: res.data.addressList
        })
    },

    /**
     * 改变默认地址
     * @param {*} e 
     */
    selectAddress(e) {
        const index = e.currentTarget.dataset.index;
        let addressList = this.data.addressList;
        //没有点击复选框前的值
        const flag = addressList[index].isSelected;
        //如果是默认地址的话，不用修改
        if (flag) {
            return;
        }
        Dialog.confirm({
                title: '提示',
                message: '你确定要将这个地址设置为默认地址吗?'
            })
            .then(() => {
                requestUtil({
                    url: '/address/selectAddress',
                    method: 'POST',
                    data: {
                        customerId: wx.getStorageSync('currentCustomer').id,
                        addressId: addressList[index].id,
                    }
                }).then(res => {
                    for (let i = 0; i < addressList.length; i++) {
                        if (i == index) {
                            addressList[i].isSelected = !flag;
                        } else {
                            if (addressList[i].isSelected == true) {
                                addressList[i].isSelected = false;
                            }
                        }
                    }
                    addressList.sort(function (a, b) {
                        return b.isSelected - a.isSelected;
                    });
                    this.setData({
                        addressList
                    });
                    Notify({
                        type: 'success',
                        message: '设置成功',
                        duration: 1000
                    });
                }).catch(err => {

                })
            })
            .catch(() => {
                // on cancel
            });
    },

    /**
     * 删除收货地址
     * @param {*} e 
     */
    deleteAddress(e) {
        Dialog.confirm({
                title: '提示',
                message: '你确定要删除这个地址吗？',
            })
            .then(() => {
                //获取要删除的地址id
                const id = e.currentTarget.dataset.id;
                requestUtil({
                    url: '/address/delete',
                    method: 'POST',
                    data: {
                        addressId: id
                    }
                }).then(res => {
                    Notify({
                        type: 'success',
                        message: '删除成功',
                        duration: 1000
                    });
                    let addressListNew = new Array();
                    let addressListNewIndex = 0;
                    let addressList = this.data.addressList;
                    for (let i = 0; i < addressList.length; i++) {
                        if (addressList[i].id !== id) {
                            addressListNew[addressListNewIndex] = {
                                id: addressList[i].id,
                                name: addressList[i].name,
                                phoneNum: addressList[i].phoneNum,
                                isSelected: addressList[i].isSelected,
                                area: addressList[i].area,
                                address: addressList[i].address,
                                description: addressList[i].description
                            }
                            addressListNewIndex++;
                        }
                    }
                    this.setData({
                        addressList: addressListNew
                    });
                }).catch(err => {

                })
            })
            .catch(() => {
                // 点击取消
            });
    }
})