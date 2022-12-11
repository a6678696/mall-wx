// components/area-select/area-select.js
import {
    areaList
} from '@vant/area-data';

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        area: {
            type: String
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        area: '',
        address: '',
        areaList,
        value: 110102,
        show: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        /**
         * 打开弹出层
         */
        showPopup() {
            this.setData({
                show: true
            });
        },

        /**
         * 关闭弹出层
         */
        onClose() {
            this.setData({
                show: false
            });
        },

        /**
         * 确认选择省市区触发的事件: 关闭弹出层后设置value和address的值
         * @param {*} e 
         */
        onConfirm(e) {
            this.onClose();
            let area = e.detail.values[0].name + e.detail.values[1].name + e.detail.values[2].name;
            let code = e.detail.values[2].code;
            this.setData({
                value: code,
                area: area
            });
        },

        /**
         * 点击取消后触发的事件: 关闭弹出层
         */
        onCancel() {
            this.onClose();
        },
    }
})