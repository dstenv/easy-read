<template>
    <div class="play-control">
        <div class="controller">
            <div class="title">
                <h4>{{playArtist?.title}}</h4>
            </div>
            <div class="slider">
                <van-slider v-model="slideValue"
                    :bar-height="'3rem'" :button-size="'15rem'" active-color="#000"
                />
                <div class="slide-time">
                    <span>{{showCurrent}}</span>
                    <span>-{{showDuration}}</span>
                </div>
            </div>
            <div class="auchor">
                <span>{{playArtist?.auchor}}</span>
            </div>
            <div class="imgs">
                <img src="/src/assets/Image/last_disable.png" >
                <img :src="isPlay || radioIsPlay? playImg.active:playImg.inActive" @click="playArtist?.type != 'radio'? audioStore.setIsPlay(!isPlay):audioStore.setRadioIsPlay(!radioIsPlay)">
                <img src="/src/assets/Image/next_disable.png" >
            </div>
            <div class="bottom">
                <!-- music_collection_night.png -->
                <div class="left">
                    <img src="/src/assets/Image/player_all_cycle.png">
                </div>
                <div class="from">
                    <img src="/src/assets/Image/push_small.png" >
                    <span>来自一个音乐</span>
                </div>
                <div class="right">
                    <img src="/src/assets/Image/music_collection_night.png" >
                    <img src="/src/assets/Image/detail_content.png" >
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAudioStore } from '@/stores/counter';
import { computed } from '@vue/reactivity';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';


// const props = defineProps<{

// }>()
const emits = defineEmits(['changeCurrent'])

const formatTIme = (time: number):string => {
    let m = (Math.floor(time / 60) + 100 + '').slice(1)
    let s = (Math.floor(time % 60) + 100 + '').slice(1)
    return m + ':' + s
}

const audioStore = useAudioStore()

const {currentTime,duration,isPlay,playArtist,radioIsPlay} = storeToRefs(audioStore)

const showCurrent = computed(() => {
    return formatTIme(currentTime.value)
})
const showDuration = computed(() => {
    return formatTIme(duration.value - currentTime.value)
})

const slideValue = computed({
    get() {
        return (currentTime.value / duration.value) * 100
    },
    set(value) {
        let current = value / 100 * duration.value
        emits('changeCurrent',current)
    }
})

const playImg = ref<{
    inActive: string,
    active: string
}>({
    inActive: '/src/assets/Image/player_play.png',
    active: '/src/assets/Image/player_pause.png'
})

watch(isPlay, (newv) => {
    if(newv) {
        console.log('播放');
    }else {
        console.log('暂停');
    }
})

</script>

<style lang="scss" scoped>
    .play-control {

    }
    .controller {
        display: flex;
        flex-direction: column;
        padding: 10rem 20rem;
        &>div {
            display: flex;
            justify-content: center;
        }
        .title {
            font-size: 14rem;
            color: #828282;
            h4 {
                font-weight: bold;
                letter-spacing: 1rem;
            }
        }
        .slider {
            flex-direction: column;
            padding: 20rem 0 10rem;
            .slide-time {
                display: flex;
                justify-content: space-between;
                padding-top: 10rem;
            }
        }
        .auchor {
            color: #828282;
            padding-bottom: 20rem;
            span {
                font-weight: bold;
                font-size: 20rem;
                letter-spacing: 1rem;
                transform: scale(.5);
            }
        }
        .imgs {
            img {
                height: 40rem;
                &:nth-of-type(2) {
                    margin: 0 15rem;
                }
            }
        }
        .bottom {
            padding: 15rem 0 5rem;
            display: flex;
            justify-content: space-between;
            img {
                height: 20rem;
            }
            .left {
                width: 60rem;
            }
            .from {
                color: #828282;
                display: flex;
                align-items: center;
            }
            .right {
                img {
                    &:first-of-type {
                        margin-right: 20rem;
                    }
                }
            }
        }
    }
</style>