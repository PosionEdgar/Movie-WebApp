<template>
    <div class="celebrity-list">
        <ul>
            <li 
                class="celebrity-item" 
                v-for="(item, index) of celebrities"
                :key="index"
                @click="selectItem(item.id, $event)"
            >
                <div class="image">
                    <img v-lazy="replaceUrl(item.images)" width="70" height="100">
                </div>
                <div class="desc">
                    <p class="title">{{item.name}}</p>
                    <div class="works">代表作：{{item.works}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'CelebrityList',
        props: {
            celebrities: {
                type: Array,
                default: []
            }
        },
        methods:{ 

            selectItem(id) {
                this.$emit('select', id)
            },
            replaceUrl(srcUrl) {
                if (srcUrl !== undefined) { // 图片防盗链处理
                    return ('https://images.weserv.nl/?url=' + srcUrl.replace(/http\w{0,1}:\/\//, ''));
                }
            }
        }
    }
</script>

<style scoped lang="stylus">
    @import '~assets/stylus/variable.styl';
    @import '~assets/stylus/mixin.styl';
    .celebrity-item
        display flex
        align-items top
        box-sizing border-box
        height 130px
        padding 15px
        border-bottom-1px($color-line)
        background $color-background
        .image
            flex 70px 0 0
            margin-right 10px
        .desc
            flex 1
            box-sizing border-box
            .title
                font-size $font-size-medium-x
                color $colot-text-f
            .works
                margin-top 10px
                font-size $font-size-medium
                line-height 20px
</style>
