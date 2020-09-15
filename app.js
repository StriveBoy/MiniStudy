//app.js

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    wx.login({
      success: res => {
        var that = this
        that.globalData.code = res.code
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let data = {'code': res.code}
        wx.request({
          url:that.data.url,
          method:'POST',
          data:data,
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            if (res.data.errCode == 0) {
              that.globalData.authorization = res.data.data
            } else {
              _show_error(res.data.errCode, res.data.errMsg)
            }
          },
          fail: err => {
            _show_error(500, '网络服务错误！')
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    authorization: null,
    code: null
  },
  data:{
    url: 'http://www.ssxz.com:8096/api/auth'
  }
})

function _show_error(errCode, errMsg) {
  wx.showToast({
      title: '错误码：' + errCode + ' -- 错误信息：' + errMsg,
      icon: "none",
      duration: 3000
  })
}