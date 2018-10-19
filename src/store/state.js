import { loadWantedMovie, loadWatchedMovie, loadComment } from 'assets/js/cache'
const state = {
    movie: {}, //电影的信息
    wantedMovies: loadWantedMovie(), // 看过的电影
    watchedMovies: loadWatchedMovie(), //想看的电影
    currentDiscussionType: '', //路由类型
    favoriteComments: loadComment(), //点赞的评论
    currentReviewId: 0 //影评详情
}


export default state;