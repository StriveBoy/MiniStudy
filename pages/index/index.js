//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    islogin: false,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      'http://www.ssxz.com:8096/carousel/image/01.png',
      'http://www.ssxz.com:8096/carousel/image/02.png'
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动播放
    interval: 3000, //停留时间间隔
    duration: 1000, //播放时长
    previousMargin: '0px', //前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
    nextMargin: '0px', //后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
    circular: true, //是否采用衔接滑动
    currentSwiperIndex: 0, //swiper当前索引
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    // 获取轮播图
    wx.request({
      url:'http://www.ssxz.com:8096/api/carouselList',
      method:'GET',
      dataType:'json',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        if (res.data.errCode == 0) {
          console.log(typeof(res.data))
        } else {
          console.log(res)
        }
      },
      fail: function() {
        console.log('网络服务失败！')
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    // 将用户数据入库
    wx.request({
      url:'http://www.ssxz.com:8096/api/register',
      method:'POST',
      data:{
        'avatarUrl': app.globalData.userInfo.avatarUrl,
        'nickName': app.globalData.userInfo.nickName,
        'name': app.globalData.userInfo.nickName,
        'country': app.globalData.userInfo.country,
        'province': app.globalData.userInfo.province,
        'city': app.globalData.userInfo.city,
        'gender': app.globalData.userInfo.gender,
        'language': app.globalData.userInfo.language
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'bearer ' + app.globalData.authorization
      },
      success: function (res) {
        if (res.data.errCode == 0) {
          console.log(res)
        } else {
          console.log(res)
        }
      },
      fail: function() {
        console.log('网络服务失败！')
      }
    })
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
