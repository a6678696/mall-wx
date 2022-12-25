// pages/address/address.js
import Dialog from '@vant/weapp/dialog/dialog';
import Notify from '@vant/weapp/notify/notify';
import {
    getBaseUrl,
    requestUtil
} from '../../utils/requestUtil.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressList: []
    },

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
        requestUtil({
            url: '/address/listNoPage',
            method: 'GET',
            data: {
                customerId: wx.getStorageSync('currentCustomer').id
            }
        }).then(res => {
            this.setData({
                addressList: res.data.addressList
            })
        }).catch(err => {

        })
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

    //改变默认地址
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
                    },
                    header: { //POST请求一定要加上这个content-type,不然无法传递参数
                        'content-type': 'application/x-www-form-urlencoded',
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
                        addressList: addressList
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
                    },
                    header: { //POST请求一定要加上这个content-type,不然无法传递参数
                        'content-type': 'application/x-www-form-urlencoded',
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