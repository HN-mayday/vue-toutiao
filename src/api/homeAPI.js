import request from '@/utils/request.js'

// 获取文章的列表数据
export const getArticleListAPI = function(_page, _limit) {
  return request.get('/articles', {
    params: {
      _page,
      _limit
    }
  })
}
