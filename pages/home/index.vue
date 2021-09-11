<template>
<div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li v-if="user" class="nav-item">
              <nuxt-link class="nav-link" exact :class="{active:tab==='your_feed'}" :to="{name:'home',query:{tab:'your_feed'}}">Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" exact :class="{active:tab==='global_feed'}" :to="{name:'home',query:{tab:'global_feed'}}">Global Feed</nuxt-link>
            </li>
            <li class="nav-item" v-if="tag">
              <nuxt-link class="nav-link " exact :class="{active:tab==='tag'}" :to="{name:'home',query:{tab:'tag',tag}}">#{{tag}}</nuxt-link>
            </li>
          </ul>
        </div>

        <div 
        v-for="article in articles"
        :key="article.slug"
        class="article-preview"
        >
          <div class="article-meta">
            <nuxt-link :to="{name:'profile',params:{username:article.author.username}}" ><img :src="article.author.image" /></nuxt-link>
            <div class="info">
                <nuxt-link :to="{name:'profile',params:{username:article.author.username}}" >{{article.author.username}}</nuxt-link>
              <span class="date">{{article.author.createdAt | date}}</span>
            </div>
            <button :disabled="article.favoriteDisabled = false" class="btn btn-outline-primary btn-sm pull-xs-right" @click="onFavorite(article)" :class="{active:article.favorited}">
              <i class="ion-heart"></i> {{article.favoritesCount}}
            </button>
          </div>
          <nuxt-link :to="{name:'article',params:{slug:article.slug}}" class="preview-link">
            <h1>{{article.title}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>
        <!-- 分页 -->
        <nav>
          <ul class="pagination">

            <li v-for="item in totalPage" :key="item"
            :class="{active:item===page}"
             class="page-item ng-scope" >

              <nuxt-link class="page-link ng-binding" :to="{name:'home',query:{page:item,tag:$route.query.tag,tab:tab}}">{{item}}</nuxt-link>

            </li><!-- end ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->

          </ul>
      </nav>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <nuxt-link :to="{name:'home',query:{tag:item,tab:'tag'}}" v-for="item in tags" :key="item" class="tag-pill tag-default">{{item}}</nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>
<script>
import {getArtiles,getFeedArtiles,addFavorite,deleteFavorite} from "@/api/article"
import {getTags} from "@/api/tag.js"
import {mapState} from "vuex"
export default {
  name:'homeIndex',
  // middleware:'authenticated',
  watchQuery:['page','tag','tab'], 
  async asyncData({query,store}){
    const page= Number.parseInt(query.page)||1;
    const limit = 20
    const {tag} = query
    const tab = query.tab||'global_feed'
    const loadArtiles = store.state.user&&tab=='your_feed'?getFeedArtiles:getArtiles
    // const {data} = await getArtiles({
    //   limit,
    //   offset:(page-1) * limit
    // })
    // const {data:tags} = await getTags()
    const [artlesRes,tagsRes] = await Promise.all([
        loadArtiles({
        limit,
        offset:(page-1) * limit,
        tag:query.tag
      }),
      getTags()
    ]
    )
    const {articles,articlesCount} = artlesRes.data
    const {tags} = tagsRes.data
    articles.forEach(article=>{
      article.favoriteDisabled = false
    })
    return {
      articles,
      articlesCount,
      tags:tags,
      limit,
      page,
      tag,
      tab
    }
  },
  props: {},
  data(){
    return {}
  },
  computed: {
    ...mapState(['user']),
    totalPage(){
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  watch: {},
  created(){},
  mounted(){},
  methods: {
    async onFavorite(article){
      console.log(article)
      article.favoriteDisabled = true
      if(article.favorited){
        await deleteFavorite(article.slug)
        article.favorited=false
        article.favoritesCount+=-1
      }else{
        await addFavorite(article.slug)
        article.favorited=true
        article.favoritesCount+=1
      }
      article.favoriteDisabled = false
    }
  }
}
</script>