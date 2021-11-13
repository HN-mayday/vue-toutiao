<template>
  <div class="art-item-container">
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ article.title }}</span>
          <!-- 单张图片 -->
          <img :src="article.cover.images[0]" alt="" class="thumb" v-if="article.cover.type === 1" />
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="article.cover.type === 3">
          <img v-for="(item, i) in article.cover.images" :key="i" :src="item" alt="" class="thumb" />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <span
            >作者 {{ article.aut_name }}&nbsp;&nbsp; {{ article.comm_count }} 评论 &nbsp;&nbsp; 发布日期
            {{ article.pubdate | dateFormat }}</span
          >
          <!-- 关闭按钮 -->
          <van-icon name="cross" />
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    // 文章的信息对象
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.art-item-container {
  border-bottom: 1px solid #f8f8f8;
}
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.thumb {
  // 矩形黄金比例：0.618
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
