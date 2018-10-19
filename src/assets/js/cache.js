import { saveToLocal, loadFromLocal } from './store';
const USER_ID = 'buptsky';
const COMMENY_KEY = '__comment__'; //点赞的评论
const WANTED_KEY = '__wanted__'; //想看的电影
const WATCHED_KEY = '__watched__'; //已经看过的电影
const WANTED_MAX_LENGTH = 300;
const WATCHED_MAX_LENGTH = 300;
const COMMENT_MAX_LENGTH = 300;


/*
    想看的电影
*/

//保存标记结果 
export function saveWantedMovie(movie) {
    const maxLen = WANTED_MAX_LENGTH;
    let movies = loadFromLocal(USER_ID, WANTED_KEY, []); //获取不到返回空数组
    // 查找缓存数组中是否包含添加的数据、返回索引
    const index = movies.findIndex((item) => {
        return item.id === movie.id
    });
    if (index === -1) {
        movies.push(movie);
        //超过长度时移除起始数据
        if (maxLen && movies.length > maxLen) {
            movies.shift();
        }
    } else { //若已经存在了被标记的id，则代表用户进行了反操作、取消了喜欢
        movies.splice(index, 1)
    }
    saveToLocal(USER_ID, WANTED_KEY, movies);
    return movies;
}
//从缓存中读取
export function loadWantedMovie() {
    return loadFromLocal(USER_ID, WANTED_KEY, [])
}

/*
    看过的电影
*/
//保存标记结果 看过
export function saveWatchedMovie(movie) {
    const maxLen = WATCHED_MAX_LENGTH;
    let movies = loadFromLocal(USER_ID, WATCHED_KEY, []); //获取不到返回空数组
    // 查找缓存数组中是否包含添加的数据、返回索引
    const index = movies.findIndex((item) => {
        return item.id === movie.id
    });
    if (index === -1) {
        movies.push(movie);
        // 超过最大长度时移除期数数据
        if (maxLen && movies.length > maxLen) {
            movies.shift()
        }
    } else { //若已经存在了被标记的id，则用户进行了反操作，取消了喜欢
        movies.splice(index, 1)
    }
    saveToLocal(USER_ID, WATCHED_KEY, movies); //存入数据
    return movies;
}

//缓存中读取
export function loadWatchedMovie() {
    return loadFromLocal(USER_ID, WATCHED_KEY, [])
}


/* 
 * 点赞的评论 
 */
export function saveComment(id) {
    const maxLen = COMMENT_MAX_LENGTH;
    let comments = loadFromLocal(USER_ID, COMMENY_KEY, []);
    //查找缓存中数组中是否包含添加的数据，返回索引

    const index = comments.findIndex((item) => {
        return item.id === id
    });
    if (index === -1) {
        comments.push(id)
            //超过最大长度时移除起始数据
        if (maxLen && comments.length > maxLen) {
            comments.shift()
        }
    } else { //若已经存在了被标记的id，则用户进行了反操作，取消了喜欢
        comments.splice(index, 1);
    }
    saveToLocal(USER_ID, COMMENY_KEY, comments);
    return comments;
}
export function loadComment() {
    return loadFromLocal(USER_ID, COMMENY_KEY, [])
}