<template>
    <div class="footer-component">
        <footer>
            <input type="text" placeholder="写一个评论..">
            <div class="right">
                <div>
                    <img src="/src/assets/Icon/bottom_laud_default.png">
                    <span>{{props?.praisenum}}</span>
                </div>
                <div>
                    <img src="/src/assets/Icon/comment_image.png">
                    <span>{{props?.commentnum}}</span>
                </div>
                <div>
                    <img src="/src/assets/Icon/share_image.png" @click.stop="setShare">
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { useShareStore } from '@/stores/counter';

const props = defineProps<{
    praisenum?: number | undefined,
    commentnum?: number | undefined,
    web_url?: string | undefined
}>()

const shareStore = useShareStore()

const setShare = ():void => {
    shareStore.setShowShare(true) 
    if(props.web_url) {
        shareStore.setShareUrl(props.web_url)
    }
}
</script>

<style lang="scss" scoped>
.footer-component {
    background-color: #fff;
    position: fixed;
    bottom: -2rem;
    width: 100%;
    z-index: 500;
}
footer {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 10rem 15rem;
    input {
        padding: 1rem 0;
        outline: none;
        height: 25rem;
        border: 1rem solid rgb(136, 136, 136);
        width: 140rem;
        padding-left: 10rem;
        border-radius: 5rem;
    }
    .right {
        align-items: center;
        display: flex;
        div {
            display: flex;
            margin-right: 15rem;
            &:last-of-type {
                margin-right: 0;
            }
        }
        img {
            height: 20rem;
        }
        span {
            margin-left: 2rem;
            color: #b8b8b8;
        }
    }
}
</style>