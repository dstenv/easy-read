<script setup lang="ts">
import { faviorArtist } from '@/apis/utils';
import { useShareStore } from '@/stores/counter'
import { computed } from '@vue/reactivity';
import { storeToRefs } from 'pinia';
import { nextTick, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getIconUrl } from '@/apis/utils'
import useCheckHave from '@/hooks/useCheckHave'

const props = defineProps<{
    data: homeInit
}>()

const date = computed(() => {
    if(props.data) {
        return props.data.post_date.split(' ')[0]
    }
})

const collectPic = ref<{
    active: string
    inActive: string
}>({
    active: getIconUrl('bubble_collected.png'),
    inActive: getIconUrl('bubble_collect.png')
})


const { isHave,isHaveFun } = useCheckHave('pic',props.data?.id as string)


const setLocal = () => {
    isHave.value = !isHave.value
    faviorArtist(router,'pic',
    {id: props.data?.id,forward: props.data?.forward, post_date:date.value, img_url: props.data?.img_url, volume: props.data?.volume},
    !isHave.value)
}

onMounted(() => {
    isHaveFun()
})


const shareStore = useShareStore()
const { showShare } = storeToRefs(shareStore)

const setShare = ():void => {
    shareStore.setShowShare(true) 
    shareStore.setShareUrl(props.data?.share_url as string)
}

const router = useRouter()

</script>
<template>
    <div class="first">
        <div class="container">
            <img v-lazy="props.data?.img_url" >
            <span class="type">{{props.data?.title}}&nbsp;|&nbsp;{{props.data?.pic_info}}</span>
            <div class="info">
                <p class="content">{{props.data?.forward}}</p>
                <span class="author">{{props.data?.words_info}}</span>
            </div>
        </div>
        <div class="control">
            <div class="left">
                <img src="@/assets/Icon/discovery_night.png">
                <span>小记</span>
            </div>
            <div class="right">
                <div>
                    <img src="@/assets/Icon/diary_icon.png" >
                </div>
                <div>
                    <img :src="isHave? collectPic.active:collectPic.inActive" 
                        @click="setLocal"
                    >
                </div>
                <div>
                    <img src="@/assets/Icon/feeds_laud_default.png" >
                    <span>{{props.data?.like_count}}</span>
                </div>
                <div>
                    <img src="@/assets/Icon/feeds_share.png" @click.stop="setShare">
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .first {
        padding: 0 20rem;
        background-color: #ffffff;
    }
    .container {
        width: 100%;
        border-radius: 7rem;
        border: 1rem solid #eee;
        box-shadow: 0 0 5rem 1rem #e8e8e8;
        img {
            width: 100%;
            border-radius: 7rem 7rem 0 0;
        }
        .type {
            color: #bdbdbd;
            display: block;
            padding: 10rem 0;
            text-align: center;
        }
        .info {
            padding: 20rem 20rem 30rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 160rem;
            .content {
                line-height: 1.5;
                font-size: 13rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 4; /* 设置显示文本的行数 */
                -webkit-box-orient: vertical; 
            }
            .author {
                display: block;
                text-align: center;
                color: #bdbdbd;
            }
        }
    }
    .control {
        align-items: center;
        padding: 15rem 8rem;
        display: flex;
        justify-content: space-between;
        .left {
            display: flex;
            flex: none;
            align-items: center;
            img {
                height: 18rem;
            }
            span {
                margin-left: 5rem;
                font-size: 13rem;
                color: #b9b9b9;
            }
        }
        .right {
            display: flex;
            width: calc(100% - 120rem);
            justify-content: space-between;
            div {
                display: flex;
                flex: none;
                align-items: center;
                span {
                    margin-left: 3rem;
                    color: #cfcfcf;
                }
            }
            img {
                height: 18rem;
                
            }
        }
    }
</style>
