// index.js
Page({
    
    data: {
        carouselImageList: [
            {
                image:"/images/banner/1.jpeg",
                iamgeUrl:"/pages/goods/goods"
            },
            {
                image:"/images/banner/2.jpeg",
                iamgeUrl:"/pages/goods/goods"
            },
            {
                image:"/images/banner/3.jpeg",
                iamgeUrl:"/pages/goods/goods"
            },
            {
                image:"/images/banner/4.jpeg",
                iamgeUrl:"/pages/goods/goods"
            },
            {
                image:"/images/banner/5.jpeg",
                iamgeUrl:"/pages/goods/goods"
            }
        ]
    },

    onShow() {
        this.getTabBar().init(0);
    },

    onLoad(){
        
    }
})
