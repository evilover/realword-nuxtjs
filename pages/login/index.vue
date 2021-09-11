<template>
<div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">{{isLogin?'Sign in':'Sign up'}}</h1>
        <p class="text-xs-center">
          <nuxt-link v-if="!isLogin" to="/login">Have an account?</nuxt-link>
          <nuxt-link v-else to="/register">need an account?</nuxt-link>
        </p>

        <ul class="error-messages">
          <template v-for="(messages,field) in errors" >
            <!-- <li v-for="(message,index) in messages" :key="index">{{field}} {{message}}</li> -->
            <li :key="field">{{field}} {{messages}}</li>
          </template>
          
        </ul>

        <form @submit.prevent="onSubmit">
          <fieldset class="form-group" v-if="!isLogin">
            <input class="form-control form-control-lg" type="text" v-model="user.username" placeholder="Your Name">
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg"  required type="email" v-model="user.email" placeholder="Email">
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" required minlength="8" v-model="user.password" type="password" placeholder="Password">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            {{isLogin?'Sign in':'Sign up'}}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>

</template>
<script>
// 仅在客户端加载js-cookie
const Cookie = process.client?require('js-cookie'):undefined
import {login,register} from "@/api/user"
export default {
  middleware:'noauthenticated',
  name:'login',
  components: {},
  props: {},
  data(){
    return {
      user:{
        username:'',
        email:'',
        password:''
      },
      errors:{
        // email:['a','b'],
        // password:['a','a']
      }
    }
  },
  computed: {
    isLogin(){
      return this.$route.name==='login'
    }
  },
  watch: {},
  created(){},
  mounted(){},
  methods: {
    async onSubmit(){
      try {
        const {data} = this.isLogin? await login({
          user:this.user
        }):await register({
          user:this.user
        })
      this.$store.commit('setUser',data.user)
      // 防止刷新页面数据丢失
      Cookie.set('user',data.user)
      // Cookie.set('user',JSON.stringify(data.user))
      this.$router.push('/')
      } catch(err) {
        this.errors = err.response.data.errors
      }
    }
  }
}
</script>