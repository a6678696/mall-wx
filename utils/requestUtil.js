//定义请求的IP地址和端口
const baseUrl = 'http://localhost:8080';

//返回baseUrl
export const getBaseUrl = () => {
    return baseUrl;
}

/**
 * 后端请求工具
 * @param {*} params 
 */
export const requestUtil = (params) => {

    let header = {};

    //统一加请求头
    //执行的是GET请求时
    if (params.method === 'GET') {
        header = {
            'token': wx.getStorageSync('token')
        }
    } else if (params.method === 'POST') { //执行的是POST请求时
        header = {
            //POST请求一定要加上这个content-type,不然无法传递参数
            'content-type': 'application/x-www-form-urlencoded',
            'token': wx.getStorageSync('token')
        }
    }
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            header,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    });
}