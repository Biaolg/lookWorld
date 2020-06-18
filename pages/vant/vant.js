// pages/vant/vant.js

// "banner":"../../components/banner"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    show: false,
    dishow: false,
    zhans: false,
    cateList: [],
    indexData: null,
    banner: null,
    zhansCar: null,
    searchData: null,
    searchHot: null,
    search: false,
    keyWork: '',
    dateData: []
  },

  routeToPostsList(e) {
    wx.navigateTo({
      url: '/pages/posts/posts?id=' + e.currentTarget.dataset.cateid,
    })
  },

  //视图控制
  showPopup() {
    this.setData({
      zhans: !this.data.zhans
    });
  },
  showOverlay() {
    this.setData({
      show: true
    })
  },
  hideOverlay() {
    this.setData({
      show: false
    })
  },
  hideSearch() {
    this.setData({
      search: !this.data.search,
      searchData: null
    })
  },

  //输入变化
  onChange(e) {
    if (e.detail == '') {
      this.setData({
        searchData: null
      })
    }
  },
  //键盘搜索按钮
  onSearch(e) {
    //节流
    if (this.data.keyWork == e.detail) {
      return;
    }
    this.setData({
      keyWork: e.detail
    })
    this.getSearchData(e.detail);
  },

  //数据获取
  getCateList() {

    // 先去本地拿
    var cachedCateList = wx.getStorageSync('cateList')
    console.log('cachedCateList', cachedCateList)

    if (cachedCateList) {
      cachedCateList = JSON.parse(cachedCateList)
    }
    console.log('parsedCachedCateList', cachedCateList)

    if (cachedCateList.expires > Date.now()) {
      // 还没过期
      this.setData({
        cateList: cachedCateList.data
      })
    } else {
      // 已经过期

      this.showOverlay();
      wx.request({
        url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/cate/getList',

        success: (response) => {
          // 获取成功
          console.log(response)
          if (response.data.data) {
            wx.setStorage({
              data: JSON.stringify({
                expires: Date.now() + 3 * 60 * 60 * 1000,
                data: response.data.data
              }),
              key: 'cateList'
            })

            this.setData({
              cateList: response.data.data
            })
          } else {
            // 网络请求正常 数据错误 降级是否通知用户

          }
        },
        fail: () => {
          // 网络请求失败 服务器挂掉

        },
        complete: () => {
          // this.hideOverlay();
        }
      })
    }


  },
  getIndexData() {

    // 先去本地拿
    var indexData = wx.getStorageSync('IndexData')

    if (indexData) {
      indexData = JSON.parse(indexData)
    }

    if (indexData.expires > Date.now()) {
      // 还没过期
      this.setData({
        indexData: indexData,
        banner: indexData.banner
      })
    } else {
      // 已经过期

      this.showOverlay();
      wx.request({
        url: 'https://api.kele8.cn/agent/app.vmovier.com/apiv3/index/index',

        success: (response) => {
          // 获取成功
          if (response.data.data) {
            wx.setStorage({
              data: JSON.stringify({
                expires: Date.now() + 3 * 60 * 60 * 1000,
                data: response.data.data
              }),
              key: 'indexData'
            })

            // var toDlet = response.data.data;
            var obj = JSON.parse(JSON.stringify(response.data.data));
            delete obj.banner;
            // console.log('obj==>',obj);

            this.setData({
              indexData: obj,
              banner: response.data.data.banner
            })
          } else {
            // 网络请求正常 数据错误 降级是否通知用户

          }
        },
        fail: () => {
          // 网络请求失败 服务器挂掉

        },
        complete: () => {

        }
      })
    }


  },
  getPageData() {
    //节流
    if (this.data.dishow) {
      return;
    }
    this.setData({
      dishow: true
    })

    var url = this.data.dateData.length ? this.data.dateData[this.data.dateData.length - 1].next_page_url_full : this.data.indexData.posts.next_page_url_full;

    console.log('触底', url);
    // return
    wx.request({
      url: 'https://api.kele8.cn/agent/' + url,

      success: (response) => {
        // console.log(response.data.data)

        this.data.dateData.push(response.data.data);
        var ts = this.data.dateData;

        this.setData({
          dateData: ts,
          dishow: false
        })
      },
      fail: () => {
        // 网络请求失败 服务器挂掉

      },
      complete: () => {

      }
    })
  },
  getZhansCar() {

    // 先去本地拿
    var zhansCar = wx.getStorageSync('ZhansCar')

    if (zhansCar) {
      zhansCar = JSON.parse(zhansCar)
    }

    if (zhansCar.expires > Date.now()) {
      // 还没过期
      this.setData({
        zhansCar: zhansCar,
      })
    } else {
      // 已经过期

      this.showOverlay();
      wx.request({
        url: 'https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/DayCover/getDayCover',

        success: (response) => {
          // 获取成功
          if (response.data.data) {
            wx.setStorage({
              data: JSON.stringify({
                expires: Date.now() + 3 * 60 * 60 * 1000,
                data: response.data.data
              }),
              key: 'zhansCar'
            })

            this.setData({
              zhansCar: response.data.data,
            })
          } else {
            // 网络请求正常 数据错误 降级是否通知用户

          }
        },
        fail: () => {
          // 网络请求失败 服务器挂掉

        },
        complete: () => {

        }
      })
    }
  },
  getSearchData(kw) {
    wx.request({
      url: 'https://api.kele8.cn/agent/https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/search?kw=' + kw,
      success: (response) => {
        this.setData({
          searchData: response.data.data,
        })
      },
      fail: () => {
        // 网络请求失败 服务器挂掉
      },
      complete: () => {}
    })
  },
  hotKwsearch(e){
    console.log(1)
    console.log(e);
  },

  //页面跳转
  navigateToPlay: function(e) {
    // console.log(e.currentTarget.dataset.post.bannerid)
    wx.navigateTo({
      url: '/pages/play/play?postid=' + e.currentTarget.dataset.post.extra_data.app_banner_param,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCateList();
    this.getIndexData();
    this.getZhansCar();
    //搜索热词
    wx.request({
      url: 'https://api.kele8.cn/agent/https://api.kele8.cn/agent/https://app.vmovier.com/apiv3/search?kw=one',
      success: (response) => {
        this.setData({
          searchHot: response.data.data.recommend_keywords,
        })
      },
      fail: () => {
        // 网络请求失败 服务器挂掉
      },
      complete: () => {}
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getPageData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})