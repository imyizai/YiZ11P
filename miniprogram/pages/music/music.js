// pages/music/music.js
 const MAX_LIMIT = 15
 const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   imgUrls:[{
     url:"http://p1.music.126.net/nVUH7O5ZNMG1OQ1kE-tq9g==/109951165665595417.jpg?imageView&quality=89"
    
   },
   {
    url:"http://p1.music.126.net/C9I9GxpvRX7nCZyXNBeqOw==/109951165664694558.jpg?imageView&quality=89"
    },
    {
      url:"http://p1.music.126.net/WOoIZuva_umxxzYOvWINLA==/109951165664707565.jpg?imageView&quality=89"
    },
    {
      url:"http://p1.music.126.net/UdSM2BmqY_h_t9HAOzb5dQ==/109951165664710664.jpg?imageView&quality=89"
    },
    {
      url:"http://p1.music.126.net/vAjwukVm-H0LOqzy4FTJXA==/109951165664851877.jpg?imageView&quality=89"
    },
    {
      url:"http://p1.music.126.net/j0gp3gBDRRoqIXxAs0v7oA==/109951165664720877.jpg?imageView&quality=89"
    },
    {
      url:"http://p1.music.126.net/q5rKcBx9Y0V37DsUSaQKXg==/109951165664695730.jpg?imageView&quality=89"
    },
    {
      url:"http://p1.music.126.net/SLfispSeeEnb6Ezs0cNjBw==/109951165666128356.jpg?imageView&quality=89"
    }],
    playlist:[]
    //playlist:[{
     // "id":"1001",
     //"playCount":622822.6,
     //"picUrl":"http://p1.music.126.net/PiYyOOKQrA-MM3Dx6ExAxg==/109951164445288552.jpg?param=140y140"
     //},
    //{
      //"id":"1002",
      //"playCount":1286423.6,
      //"name":"Sisorelcsoriak的歌单",
      //"picUrl":"https://p1.music.126.net/vmQKokKn92ih3cnC5vh1vg==/3382097774669567.jpg?//////  ///param=140y140"
     //},
    //{
     // "id":"1003",
     // "playCount":473526.6,
     // "name":"无论吃了多少瓜，依旧忠于自己热爱生活",
     // "picUrl":"http://p1.music.126.net/oILIciXGa_33JWkk1MOtnA==/109951165650557478.jpg?//////////param=140y140"
    //},
     // {
      //"id":"1004",
     //"playCount":1128324.6,
      //"name":"【一起吹晚风】",
      //"picUrl":"http://p3.music.126.net/swKlj43m9puewJ-YboeoSg==/109951165325068849.jpg?//////param=140y140"
    //},
    //{
     // "id":"1005",
      //"playCount":1006791.6,
      //"name":"你一定要在自己热爱的世界里闪闪发亮啊",
      //"picUrl":"http://p3.music.126.net/uesfHcJmZ23S3er_1mpeaw==/109951165621856219.jpg?//////////param=140y140"
    //},
    //{
      //"id":"1006",
     // "playCount":873146.6,
     // "name":"放轻松 就当漫游地球 来和我一起听吧！",
      //"picUrl":"http://p3.music.126.net/pv2ya6nRsD0WD1TK4BybQg==/109951165216270090.jpg?//////////param=140y140"
    //}]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       this._getPlaylist()
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
    this.setData({
      playlist:[]
    })
    this._getPlaylist()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom:function(){
    this._getPlaylist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
     _getPlaylist(){
        wx.showLoading({
          title: '加载中',
        })
        wx.cloud.callFunction({
          name:'music',
          data: {
            start:this.data.playlist.length,
            count:MAX_LIMIT,
            $url: 'playlist'
          }
        }).then((res) =>{
          console.log(res)
           this.setData({
             playlist: this.data.playlist.concat(res.result.data)
           })
           wx.stopPullDownRefresh()
           wx.hideLoading()
        })
     },
    })