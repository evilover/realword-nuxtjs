module.exports = {
  router: {
    linkActiveClass:'active',
    // 自定义路由规则
    extendRoutes(routes,resolve){
      // 清除nuxt.js默认生成的路由表规则
      routes.splice(0)
      routes.push(...[
        {
          path:'/',
          component:resolve(__dirname,'pages/layout/'),
          children:[
            {
              path:'',
              name:'home',
              component:resolve(__dirname,'pages/home')
            },
            {
              path:'/login',
              name:'login',
              component:resolve(__dirname,'pages/login/')
            },
            {
              path:'/register',
              name:'register',
              component:resolve(__dirname,'pages/login/')
            },
            {
              path:'/profile/:username',
              name:'profile',
              component:resolve(__dirname,'pages/profile')
            },
            {
              path:'/setting',
              name:'setting',
              component:resolve(__dirname,'pages/setting')
            },
            {
              path:'/editor',
              name:'editor',
              component:resolve(__dirname,'pages/editor')
            },
            {
              path:'/article/:slug',
              name:'article',
              component:resolve(__dirname,'pages/article')
            },
          ]
        },
    ])
    },

  },
  server: {
    // 监听所有网卡地址0.0.0.0
    host: '0.0.0.0',
    port: 3000
  },
  // 注册插件
  plugins:[
    // ~开头，从根路径出发
    '~/plugins/request.js',
    '~plugins/dayjs.js'
  ]
}