<template>
  <div class="home-container">
    <van-nav-bar title="今日头条" fixed />

    <van-pull-refresh v-model="isLoading" :disabled="finished" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ArticleItem v-for="item in artlist" :key="item.art_id" :article="item"></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/Article/ArticleItem.vue'
import { getArticleListAPI } from '@/api/homeAPI.js'
// 鲁大师 提供了许多牛逼的函数 节流的函数、防抖的函数、操作数组的一系列函数、操作对象的一系列函数（对象的深拷贝、浅拷贝）
import _ from 'lodash'
let fn = null

export default {
  name: 'Home',
  data() {
    return {
      page: 1,
      pageSize: 10,
      artlist: [],
      loading: true,
      finished: false,
      isLoading: false
    }
  },
  created() {
    this.initArticleList()
  },
  activated() {
    fn = this.recordTopHandler()
    window.addEventListener('scroll', fn)
  },
  deactivated() {
    window.removeEventListener('scroll', fn)
  },
  methods: {
    async initArticleList(isRefresh) {
      const { data: res } = await getArticleListAPI(this.page, this.pageSize)
      if (isRefresh) {
        this.artlist = [...res, ...this.artlist]
        this.isLoading = false
      } else {
        this.artlist = [...this.artlist, ...res]
        this.loading = false
      }

      if (res.length === 0) {
        this.finished = true
      }
    },
    // 上拉加载更多
    onLoad() {
      this.page++
      this.initArticleList()
    },
    // 下拉刷新
    onRefresh() {
      this.page++
      this.initArticleList(true)
    },
    recordTopHandler() {
      return _.debounce(
        () => {
          this.$route.meta.top = window.scrollY
        },
        50,
        { trailing: true }
      )
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>
