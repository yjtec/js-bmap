export default {
  plugins:[
    ['umi-plugin-wx',{
      debug:true,
      action:'/api/cmm/share',
      jsApiList:['getLocation']
    }]
  ],
  routes:[{
    path:'/',
    routes:[{
      path:'/',redirect:'/home/index'
    },{
      path:'/home/index',
      component:'./index'
    },{
      path:'/wx',
      component:'./wxposition'
    },{
      path:'/media',
      component:'./media'
    }]
  }],
  proxy: {
    '/api':{
      target: 'http://dev.gateway.360vrsh.com/api/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      },
    }
  }
}