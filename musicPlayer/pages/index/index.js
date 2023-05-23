// index.js
Page({
  data: {
    item: 0,
    tab: 0,

    playlist: [{
      id: 1, title: '单车', singer: '陈奕迅',
      src: '/music/陈奕迅-单车.mp3',
      coverImgUrl: '/images/富士山下.jpg'
    }, {
      id: 2, title: '不要说话', singer: '陈奕迅',
      src: '/music/陈奕迅 - 不要说话.mp3',
      coverImgUrl: '/images/不要说话.jpg'
    }, {
      id: 3, title: '红玫瑰', singer: '陈奕迅',
      src: '/music/陈奕迅-红玫瑰.mp3',
      coverImgUrl: '/images/红玫瑰.jpg'
    }, {
      id: 4, title: '阴天快乐', singer: '陈奕迅',
      src: '/music/陈奕迅-阴天快乐.mp3',
      coverImgUrl: '/images/阴天快乐.jpg'
    }, {
      id: 5, title: '花海', singer: '周杰伦',
      src: '/music/周杰伦-花海.mp3',
      coverImgUrl: '/images/花海.jpg'
    }, {
      id: 6, title: '暗号', singer: '周杰伦',
      src: '/music/周杰伦-暗号.mp3',
      coverImgUrl: '/images/暗号.jpg'
    }],
    state: 'paused',
    playIndex: 0,
    play: {
      currentTime: '00:00',
      duration: '00:00',
      percent: 0,
      title: '',
      singer: '',
      coverImgUrl: ''
    },
    audioCtx: null,
  },
  onReady: function () {
    this.audioCtx = wx.createInnerAudioContext()
    var that = this
    // 播放失败检测
    this.audioCtx.onError(function () {
      console.log('播放失败：' + this.audioCtx.src)
    })
    // 播放完成自动播放下一首
    this.audioCtx.onEnded(function () {
      that.next()
    })
    // 自动更新播放进度
    this.audioCtx.onPlay(function () { })
    this.audioCtx.onTimeUpdate(function () {
      that.setData({
        'play.currentTime': formatTime(that.audioCtx.currentTime),
        'play.duration': formatTime(that.audioCtx.duration),
        'play.percent': that.audioCtx.currentTime / that.audioCtx.duration * 100
      })
      console.log('setTime')

    })
    // 默认选择第一首歌播放
    this.setMusic(0)
    // 定义时间格式
    function formatTime(time) {
      var minute = Math.floor(time / 60) % 60;
      var second = Math.floor(time) % 60;
      return (minute < 10 ? '0' + minute : minute) + ':' +
        (second < 10 ? '0' + second : second)
    }
  },
  setMusic: function (index) {
    var music = this.data.playlist[index]
    this.audioCtx.src = music.src
    this.setData({
      playIndex: index,
      'play.title': music.title,
      'play.singer': music.singer,
      'play.coverImgUrl': music.coverImgUrl,
      'play.currentTime': '00:00',
      'play.duration': '00:00',
      'play.percent': 0
    })
  },
  changeItem: function (e) {
    this.setData({
      item: e.target.dataset.item
    })
  },
  changeTab: function (e) {
    this.setData({
      tab: e.detail.current
    })
  },
  // 播放
  play: function () {
    this.audioCtx.play()
    this.setData({ state: 'running' })
    console.log(this.data.state)
  },
  // 暂停
  pause: function () {
    this.audioCtx.pause()
    this.setData({ state: 'paused' })
  },
  // 下一首歌
  next: function () {
    var index = this.data.playIndex >= this.data.playlist.length - 1 ? 0 : this.data.playIndex + 1;
    this.setMusic(index)
    if (this.data.state === 'running') {
      console.log(this.data.playlist[this.data.playIndex])
      this.play()
    }
  },
  sliderChange:function(e){
    var second = e.detail.value * this.audioCtx.duration / 100
    this.audioCtx.seek(second)
  },
  // 点击播放列表中的曲目，播放对应歌曲
  change:function(e){
    this.setMusic(e.currentTarget.dataset.index)
    this.play()
  }
})
