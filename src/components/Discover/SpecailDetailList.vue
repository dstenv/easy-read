<template>
    <div class="specail-detial-list">
        <div class="top">
            <img v-lazy="props.data.img_url" >
            <div class="mask">
                <p>{{props.data.title}}</p>
            </div>
        </div>
        <div class="btm">
            <p>{{props.data.forward}}</p>
            <div class="author">
                <span>{{props.data.author?.user_name}}</span>
                <div class="icon">
                    <div class="like">
                        <img src="/src/assets/Icon/bottom_laud_default.png" >
                        <span>{{props.data.like_count}}</span>
                    </div>
                    <img src="/src/assets/Icon/share_image.png" @click="setShare(props.data.share_url as string)">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { setShare } from '@/apis/utils'
const props = defineProps<{
    data: artistType
}>()

</script>

<style lang="scss" scoped>
.specail-detial-list {
    overflow: hidden;
    margin-bottom: 20rem;
    border: 1rem solid #e4e4e4;
}
.top {
    position: relative;
    img {
        width: 100%;
        display: block;
    }
    .mask {
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        color: #fff;
        font-size: 18rem;
        padding: 0 15rem 15rem;
        background-color: rgba(0,0,0,.28);
    }
}
.btm {
    padding: 0 15rem 10rem;
    background-color: #fff;
    color: #ababab;
    overflow: hidden;
    p {
        margin: 20rem 0 25rem;
    }
    .author {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon {
            display: flex;
            div{
                display: flex;
                margin-right: 10rem;
            }
            img {
                height: 20rem;
            }
        }
    }
}
</style>