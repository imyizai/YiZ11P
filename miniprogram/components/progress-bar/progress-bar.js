let movableAreaWidth = 0 //可移动区域的宽度
let movableViewWidth = 0 //移动元素的宽度
const backgroundAudioManager = wx.getBackgroundAudioManager()
let currentSec = -1 //当前的秒数
let duration = 0  //歌曲总时长
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
     showTime:{
       currentTime : '00:00',
       totalTime : '00:00',
     },
     distance : 0,
     progress : 0,
    },
    lifetimes : {
       ready(){
          this._bindBGMEvent()
          this._getDistance()
       }
    },

  /**
   * 组件的方法列表
   */
  methods: {
    _getDistance(){
      const query = this.createSelectorQuery()
      query.select('.movable-area').boundingClientRect()
      query.select('.movable-view').boundingClientRect()
      query.exec((rect) => {
        console.log(rect)
        movableAreaWidth = rect[0].width
        movableViewWidth = rect[1].width
      })
    },
      _bindBGMEvent(){
        backgroundAudioManager.onPlay(() => {
          console.log('onPlay')
        })
        backgroundAudioManager.onStop(() => {
          console.log('onStop')
        })
        backgroundAudioManager.onPause(() => {
          console.log('onPause')
        })
        backgroundAudioManager.onWaiting(() => {
          console.log('onWaiting')
        })
        backgroundAudioManager.onCanplay(() => {
          console.log('onCanPlay')
          console.log(`歌曲总时长:${backgroundAudioManager.duration}`)
          let duration = backgroundAudioManager.duration
          if (typeof duration != 'undefined') {
            //设置总时长
            this._setTotalTime()
          }else{
            setTimeout(() => {
              console.log(`歌曲总时长:${backgroundAudioManager.duration}`)
              //设置总时长
              this._setTotalTime()
            },1000)
          }
        })
        backgroundAudioManager.onTimeUpdate(() => {
          //console.log('onTimeUpdate')
          const duration = backgroundAudioManager.duration
          const currentTime = backgroundAudioManager.currentTime
          console.log(currentTime)
          const currentTimeFmt = this._timeFormat(currentTime)
          this.setData({
            distance: (movableAreaWidth - movableViewWidth) * currentTime / duration,
            progress : currentTime / duration * 100,
            ['showTime.currentTime'] : `${currentTimeFmt.min}:${currentTimeFmt.sec}`
          })
        })
        backgroundAudioManager.onEnded(() => {
          console.log('onEnded')
        })
        backgroundAudioManager.onError(() => {
          console.log('onError')
          wx.showToast({
            title: '发生错误' + resizeBy.errMsg,
          })
        })
      },
      _setTotalTime(){
        duration = backgroundAudioManager.duration
        const durationFmt = this._timeFormat(duration)
        this.setData({
          ['showTime.totalTime'] : `${durationFmt.min}:${durationFmt.sec}`
        })
      },
      _timeFormat(sec){
       const min = Math.floor(sec / 60) //分钟
        sec = Math.floor(sec % 60) //秒
        return{
          'min' : this._fillZero(min),
          'sec' : this._fillZero(sec),
        }
      },
      _fillZero(num){
       return num < 10 ? '0' + num : num
      }
  }
})
