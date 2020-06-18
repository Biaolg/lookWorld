import Notify from '@vant/weapp/notify/notify';



// pages/posts/posts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateid: null,
    page: 1,
    // page: 119,
    posts: [],
    showLoading: false,
    hasMore: true
  },

  getPostsByCateId(id) {

    // 显示加载图标
    this.setData({
      showLoading: true
    })

    wx.request({
      url: `https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/getPostInCate?p=${this.data.page}&size=10&cateid=${id}`,
      success: (response) => {
        console.log('response', response)
        this.setData({
          posts: [...this.data.posts, ...response.data.data]
        })
        if (response.data.msg !=='OK') {
          // 没有更多内容了
          Notify('没有更多内容了');
          this.setData({
            hasMore: false
          })
        }
      },
      complete: () => {
        this.setData({
          showLoading: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      cateid: options.id
    })




  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getPostsByCateId(this.data.cateid)
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
    // console.log('触底')
    if (this.data.hasMore) {
      
      this.setData({
        page: this.data.page + 1
      })
      this.getPostsByCateId(this.data.cateid)
    } else {
      Notify('没有更多内容了');
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})