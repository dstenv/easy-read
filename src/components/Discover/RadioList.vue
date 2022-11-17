<template>
    <div class="radio-list">
        <div v-if="!props.radio.isTime">
            <div class="info">
                <img v-lazy="props.radio.cover">
            </div>
            <div class="publish">
                <span class="pub-title">ONE电台&nbsp;&nbsp;</span>
                <span>{{props.radio.volume}}</span>
            </div>
            <div class="control">
                <span>{{props.radio.title}}</span>
                <img :src="isCurrentRadio && radioIsPlay? playIcon.paused:playIcon.play" 
                @click.stop="setAudioArtist('radio',props.radio.id as string,isCurrentRadio)"
                >
            </div>
            <div class="avatar">
                <div class="left">
                    <div :style="{'background-image': `url(${props.radio.author?.web_url})`}"></div>
                    <span>{{props.radio.author?.user_name}}</span>
                </div>
                <div class="right">
                    <div>
                        <img src="/src/assets/Icon/feeds_laud_default.png" />
                        <span>{{props.radio.like_count}}</span>
                    </div>
                    <img src="/src/assets/Icon/feeds_share.png" @click.stop="setShare(props.radio.share_url as string)">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { getIconUrl, setAudioArtist } from '@/apis/utils'
import { useAudioStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import {setShare} from '@/apis/utils'
import { computed } from '@vue/reactivity';

const props = defineProps<{
    radio: artistType
}>()


const audioStore = useAudioStore()

const { playArtist,isPlay,radioIsPlay } = storeToRefs(audioStore)

const playIcon = ref<{
    play: string,
    paused:string
}>({
    play: getIconUrl('songlist_play_white.png'),
    paused: getIconUrl('feeds_radio_pause.png')
})

const isCurrentRadio = computed(() => {
    return props.radio.id == playArtist.value?.id
})

</script>

<style lang="scss" scoped>
.radio-list {
    padding: 0 20rem;
    margin-bottom: 10rem;
    &>div {
        position: relative;
    }
    .info {
        border-radius: 8rem;
        img {
            width: 100%;
            display: block;
            border-radius: 8rem;
        }
    }
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
        bottom: 53rem;
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
    .avatar {
        padding: 10rem 10rem 10rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
            display: flex;
            align-items: center;
            &>div {
                width: 22rem;
                height: 22rem;
                border-radius: 50%;
                background-size: cover;
            }
            span {
                margin-left: 5rem;
                color: #b6b6b6;
            }
        }
        .right {
            width: 100rem;
            justify-content: space-between;
            display: flex;
            div {
                display: flex;
                align-items: center;
            }
            img {
                height: 20rem;
            }
            span {
                margin-left: 3rem;
                color: #b6b6b6;
            }
        }
    }
}
</style>