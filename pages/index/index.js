// index.js
Page({
    
    data: {
        carouselImageList: [
            {
                image:"/images/1.jpeg",
                iamgeUrl:"/pages/goods/goods"
            },
            {
                image:"/images/2.jpeg",
                iamgeUrl:"/pages/goods/goods"
            },
            {
                image:"/images/3.jpeg",
                iamgeUrl:"/pages/goods/goods"
            },
            {
                image:"/images/4.jpeg",
                iamgeUrl:"/pages/goods/goods"
            },
            {
                image:"/images/5.jpeg",
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
