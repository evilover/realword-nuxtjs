<template>
<div class="article-page">

  <div class="banner">
    <div class="container">

      <h1>{{article.title}}</h1>

      <artile-meta :article="article"></artile-meta>

    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class="col-md-12" v-html="article.body">
      </div>
    </div>

    <hr />

    <div class="article-actions">
       <artile-meta :article="article"></artile-meta>
    </div>

    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">
        <article-comments :article='article' />

        
      </div>

    </div>

  </div>

</div>

</template>
<script>
import {getArticle} from '@/api/article.js'
import markdownIt from 'markdown-it'
import ArtileMeta from './component/article-meta.vue'
import articleComments from './component/article.comment.vue'
export default {
  name:'articles',
  async asyncData({params}){
    const {data} = await getArticle(params.slug)
    const {article} = data
    const md = new markdownIt()
    article.body = md.render(article.body)
    console.log(data)
    return {
      article,
    }
  },
  components: {
    ArtileMeta,
    articleComments
  },
  props: {},
  data(){
    return {}
  },
  computed: {},
  watch: {},
  created(){},
  mounted(){},
  methods: {}
}
</script>