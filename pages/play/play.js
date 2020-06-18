// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId: null,
    postView: null
  },

  getPostView: function (id) {
    wx.request({
      url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/view?postid='+ id,
      success: (response)=> {

        console.log(response)
        this.setData( {
          postView: response.data.data
        }) 
      },
      complete:()=> {

      }
    })
  },
  navigateToPlay: function (e) {
    console.log(e.currentTarget.dataset.post.postid)
    wx.navigateTo({
      url: '/pages/play/play?postid=' + e.currentTarget.dataset.post.postid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('play options', options)
    this.setData({
      postId: options.postid
    })
    
    this.getPostView(this.data.postId)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})