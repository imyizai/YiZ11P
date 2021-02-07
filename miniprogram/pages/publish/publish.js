//输入文字最大个数
const MAX_WORDS_NUM = 140
// 最大上传图片数量
const MAX_IMG_NUM = 9
// 输入文字内容
let content = ''
// 用户信息
let userInfo = {}
Page({

  data: {
   //输入的文字个数
   wordsNum: 0,
   //发布操作区高底部距离
   footerBottom:10,
   //选择的图片数组
   images: [],
   //添加图片的元素是否显示
   selectPhoto: true,
  },

  onLoad: function (options) {
    console.log(options)
    userInfo = options
  },
  onInput(event) {
    console.log(event.detail.value)
    let wordsNum = event.edtail.value.length
    if (wordsNum >= MAX_WORDS_NUM) {
      wordsNum = `最大字数为${MAX_WORDS_NUM}`
    }
    this.setData({
      wordsNum
    })
    content = event.detail.value
  },
  onFoucs(event) {
   //模拟器获取的键盘高度为0
    console.log(event)
   // 设置手机键盘高度
   this.setData({
     footerBottom: event.detail.height,
   })
  },
  onBlur() {
    this.setData({
      footerBottom: 10,
    })
  },
})