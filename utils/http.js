function http(params) {
  /*params 对象包含 url,success,content-type,method,data, authorization*/
  if(!params.method){
      params.method ="GET";
  }
  wx.request({
      url:params.url,
      method:params.method,
      data:params.data,
      header: {
          'Content-Type': params.content-type,
          'Authorization': params.authorization
        },
      success: function (res) {
          if (res.errCode == 0) {
              params.success(res.data);
          } else {
            _show_error(res.errCode, res.errMsg);
          }
      },
      fail: err => {
          _show_error(1003, '无网络!');
      }
  })
}

function _show_error(errCode, errMsg) {
  wx.showToast({
      title: '错误码：' + errCode + ' -- 错误信息：' + errMsg,
      icon: "none",
      duration: 3000
  })
}