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
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    });
}