# vue2.0 豆瓣电影WebApp

### 此项目参考于[buptsky](https://github.com/buptsky/vue-douban-movie)，感谢[buptsky](https://github.com/buptsky/vue-douban-movie)

## 项目简介

使用vue2.0仿豆瓣电影app，根据豆瓣电影api对功能作了适当修改

api来源自豆瓣官方api，详情请戳[豆瓣电影api](https://developers.douban.com/wiki/?title=movie_v2)

>  如果对您有帮助，可以点右上角 "Star" 支持一下 谢谢！ ^_^

## 项目运行

clone项目源码
```
git clone https://github.com/poisonIt/Movie-WebApp.git

```
安装依赖
```
cd vue-douban-movie
npm install
```
运行
```
npm run dev
```
打开浏览器进入localhost:8000，在开发者工具的移动端模式下查看效果

#### 运行环境
node 6+ npm 4+

## 项目描述
### 技术栈
- vue2.0 + vue-router + vuex：vue全家桶
- axios：用于ajax请求
- vue-lazyload：用于图片懒加载
- better-scroll：移动端滚动库，优化移动端滚动效果
- webpack： 构建工具
- es6: 使用es6语法
- stylus: css预处理

## 部分效果演示
### 上映电影信息和电影详情

![image](https://github.com/buptsky/vue-douban-movie/raw/master/screenshots/movie-show.gif)
![image](https://github.com/buptsky/vue-douban-movie/raw/master/screenshots/detail.gif)

### 排行和影人

![image](https://github.com/buptsky/vue-douban-movie/raw/master/screenshots/rank.gif)
![image](https://github.com/buptsky/vue-douban-movie/raw/master/screenshots/celebrity.gif)

### 搜索和收藏

![image](https://github.com/buptsky/vue-douban-movie/raw/master/screenshots/search.gif)
![image](https://github.com/buptsky/vue-douban-movie/raw/master/screenshots/collect.gif)

#### 开发环境
项目通过vue脚手架vue-cli进行配置，可在'config/index'目录下进行如下配置
```
proxyTable: {
      '/v2': {
        target: 'http://api.douban.com',
        changeOrigin: true,
        pathRewrite: {
          '^/v2': '/v2'
        }
      }
    }
    
