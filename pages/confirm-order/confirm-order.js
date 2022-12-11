// pages/confirm-order/confirm-order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showAddressSelect: false,
        totalPrice: 0,
        //当前地址
        addressNow: [1, '王明 18020666575', '北京市市辖区门头沟区北京市市辖区门头沟区龙泉地区21号', '家'],
        //可选择的地址
        actions: [{
                id: 2,
                name: '石霞 13112131229（学校）',
                subname: '吉林省四平市梨树县霍家店街道12号'
            },
            {
                id: 3,
                name: '阎天昊 19034879089（公司）',
                subname: '云南省保山市腾冲市团田乡33号'
            },
        ],
        //全部地址
        addressList: [{
                id: 1,
                name: '王明 18020666575',
                subname: '北京市市辖区门头沟区北京市市辖区门头沟区龙泉地区21号',
                defaultSelected: true,
                description: '家'
            },
            {
                id: 2,
                name: '石霞 13112131229',
                subname: '吉林省四平市梨树县霍家店街道12号',
                defaultSelected: false,
                description: '学校'
            },
            {
                id: 3,
                name: '阎天昊 19034879089',
                subname: '云南省保山市腾冲市团田乡33号',
                defaultSelected: false,
                description: '公司'
            },
        ],
        goodsList: [{
                num: 2,
                price: 2.00,
                desc: '描述信息',
                title: '商品标题',
                imageUrl: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
            },
            {
                num: 2,
                price: 2.00,
                desc: '描述信息',
                title: '商品标题',
                imageUrl: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
            },
            {
                num: 2,
                price: 2.10,
                desc: '描述信息',
                title: '商品标题',
                imageUrl: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
            },
            {
                num: 2,
                price: 2.00,
                desc: '描述信息',
                title: '商品标题',
                imageUrl: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
            }
        ]
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
        this.getTotalPrice();
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

    showOrCloseSelectAddress() {
        const showAddressSelect = !this.data.showAddressSelect;
        this.setData({
            showAddressSelect: showAddressSelect
        });
    },

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
                addressNow[0] = addressList[i].id;
                addressNow[1] = addressList[i].name;
                addressNow[2] = addressList[i].subname;
                addressNow[3] = addressList[i].description;
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

    getTotalPrice() {
        let goodsList = this.data.goodsList;
        let totalPrice = 0;
        for (let i = 0; i < goodsList.length; i++) {
            totalPrice += goodsList[i].num * goodsList[i].price;
        }
        this.setData({
            totalPrice: totalPrice
        });
    }
})