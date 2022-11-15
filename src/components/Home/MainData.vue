<script setup lang="ts">
import { ref } from 'vue';
import { useShareStore,useAudioStore } from '@/stores/counter'
import { storeToRefs } from 'pinia';
import { setAudioArtist } from '@/apis/utils'
import { computed } from '@vue/reactivity';

const props = defineProps<{
    listData: homeData
}>()

const audioStore = useAudioStore()

const { playArtist,isPlay, radioIsPlay } = storeToRefs(audioStore)

const shareStore = useShareStore()
const { showShare } = storeToRefs(shareStore)

const setShare = ():void => {
    shareStore.setShowShare(true) 
    shareStore.setShareUrl(props.listData?.share_url)
}


const playIcon = ref<{
    play: string,
    paused:string
}>({
    play: '/src/assets/Icon/songlist_play_white.png',
    paused: '/src/assets/Icon/feeds_radio_pause.png'
})

const isCurrentRadio = computed(() => {
    return props.listData.id == playArtist.value?.id
})

</script>
<template>
    <div class="maindata">
        <span class="type">-&nbsp;&nbsp;{{props.listData.type}}&nbsp;&nbsp;-</span>
        <div class="info" v-if="props.listData.category != '8'">
            <p class="title">{{props.listData.title}}</p>
            <span class="author">{{props.listData.author}}</span>
            <p class="content">{{props.listData.forward}}</p>
            <img v-lazy="props.listData.img_url">
        </div>
        <div class="radio" v-if="props.listData.category == '8'">
            <img v-lazy="props.listData.img_url">
            <div class="publish">
                <span class="pub-title">{{props.listData.type}}&nbsp;&nbsp;</span>
                <span>{{props.listData.volume}}</span>
            </div>
            <div class="control">
                <span>{{props.listData.title}}</span>
                <img :src="radioIsPlay? playIcon.paused:playIcon.play" 
                    @click.stop="setAudioArtist('radio',props.listData.id, isCurrentRadio)"
                >
            </div>
        </div>
        <div class="btm">
            <div class="left">
                <div class="radio-author" v-if="listData.category == '8'">
                    <img v-lazy="listData.author_url">
                    <span>{{listData.author}}</span>
                </div>
            </div>
            <div class="right">
                <img src="@/assets/Icon/feeds_laud_default.png" >
                <span>{{listData.like_count}}</span>
                <img src="@/assets/Icon/feeds_share.png" @click.stop="setShare">
            </div>

        </div>
    </div>
</template>
<style lang="scss" scoped>
    .maindata {
        background-color: #ffffff;
        padding: 0 20rem;
        margin-top: 7rem;
    }
    .type {
        padding: 15rem 0;
        display: block;
        text-align: center;
        color: #a1a1a1;
    }
    .info {
        img {
            width: 100%;
            display: block;
            border-radius: 8rem;
        }
        
        .title {
            padding-bottom: 8rem;
            font-size: 17rem;
            font-weight: bold;
        }
        .author {
            color: #bababa;
        }
        .content {
            font-size: 13rem;
            padding: 17rem 0 12rem;
            line-height: 1.3;
            color: #a1a1a1;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3; /* 设置显示文本的行数 */
            -webkit-box-orient: vertical; 
        }
    }
    .radio {
        width: 100%;
        position: relative;
        .publish {
            color: #fff;
            position: absolute;
            left: 15rem;
            top: 15rem;
            .pub-title {
                font-weight: bold;
            }
        }
        .control {
            color: #fff;
            width: 100%;
            position: absolute;
            bottom: 13rem;
            align-items: center;
            left: 0;
            padding: 0 15rem;
            display: flex;
            justify-content: space-between;
            span {
                display: inline-block;
                width: 265rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 16rem;
            }
            img {
                width: 25rem;
            }
        }
        img {
            width: 100%;
            display: block;
            border-radius: 8rem;
        }
    }
    .btm {
        display: flex;
        justify-content: space-between;
        padding: 20rem 7rem;
        .left {
            .radio-author {
                display: flex;
                align-items: center;
                span {
                    margin-left: 7rem;
                    color: #a1a1a1;
                }
                img {
                    height: 22rem;
                    border-radius: 50%;
                }
            }
        }
        .right {
            display: flex;
            align-items: center;
            img {
                height: 18rem;
            }
            span {
                margin: 0 18rem 0 3rem;
                color: #cfcfcf;
            }
        }
    }
</style>