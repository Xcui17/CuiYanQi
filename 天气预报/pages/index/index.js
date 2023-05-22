// index.js
var userKey = 'b53cc94608e840c6ab40d843bdf135c7'
Page({
  data:{
      text:'',
      temp:''+'℃',
      wind:'',
      windScale:'',
      city:'',
      cityId:''
  },
  // 查询用户输入的城市ID
  bindKeyInput:function(e){
    var name = e.detail.value
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup?location='+name+'&key='+userKey,
      success:res=>{
        console.log(res)
        this.setData({
          city:res.data.location[0].name,
          cityId:res.data.location[0].id
        })
      }
    })
  },
  //点击按钮查询天气
  search:function(e){
      console.log(this.data.cityId)
      wx.request({
        url:'https://devapi.qweather.com/v7/weather/now?location='+this.data.cityId+'&key='+userKey,
        success:res=>{
          console.log(res)
          this.setData({
              text:res.data.now.text,
              temp:res.data.now.temp+'℃',
              imgUrl:'/icons/'+res.data.now.icon+'.svg',
              wind:res.data.now.windDir,
              windScale:res.data.now.windScale+'级'
          })
        }
      })
  }
})
