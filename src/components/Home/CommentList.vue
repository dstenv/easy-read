<template>
    <div class="comment-list">
        <div class="info">
            <!-- :style="{'background-image': `url(${props.user_img})`}" -->
            <div class="lf">
                <div class="img" v-lazy:background-image="props.user_img" :style="{'background-image': `url(${props.user_img})`}" ></div>
                <span>{{props.user_name}}</span>
            </div>
            <span>{{props.publish_time.split(':').slice(0,2).join(':')}}</span>
        </div>
        <div class="content">
            <p>{{props.content}}</p>
        </div>
        <div class="bottom">
            <img src="/src/assets/Icon/comment_image.png" >
            <img src="/src/assets/Image/comment_laud.png" >
            <span>{{props.like_count}}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    user_img: string,
    user_name: string,
    content: string,
    publish_time: string,
    like_count: number
}>()
</script>

<style lang="scss" scoped>
.comment-list {
    border-bottom: 1rem solid #ddd;
    .info {
        padding-top: 15rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
            color: #5b5b5b;
        }
    }
    .lf {
        display: flex;
        align-items: center;
        .img {
            width: 25rem;
            height: 25rem;
            background-size: cover;
            border-radius: 50%;
        }
        span {
            margin-left: 8rem;
        }
    }
    .content {
        overflow: hidden;
        padding-left: 18rem;
        p {
            font-size: 13rem;
            margin: 15rem 0 7rem;
            line-height: 1.5;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 6; /* 设置显示文本的行数 */
            -webkit-box-orient: vertical; 
        }
    }
    .bottom {
        display: flex;
        justify-content: right;
        align-items: center;
        padding: 5rem 35rem 8rem 0;
        img {
            height: 15rem;
            margin-right: 12rem;
            &:nth-of-type(2) {
                margin-right: 5rem;
                position: relative;
                top: -2rem;
            }
        }
        span {
            position: relative;
            top: -1rem;
            color: #5b5b5b;
        }
    }
}
</style>