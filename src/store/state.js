import { loadWantedMovie, loadWatchedMovie, loadComment, loadCelebrity, loadSearch } from 'assets/js/cache'
const state = {
    movie: {}, //电影的信息
    wantedMovies: loadWantedMovie(), // 看过的电影
    watchedMovies: loadWatchedMovie(), //想看的电影
    currentDiscussionType: '', //路由类型
    favoriteComments: loadComment(), //点赞的评论
    currentReviewId: 0, //影评详情
    currentCelebrityId: 0, //影人详情
    collectedCelebrities: loadCelebrity(), //收藏的影人
    searchHistory: loadSearch() //搜索历史、每次刷新从缓存中读取
}


export default state;