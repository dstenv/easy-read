<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAudioStore,useShareStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { computed } from '@vue/reactivity';
import PlayControl from '@/components/PlayControl.vue'
import ShareComponentVue from '@/components/ShareComponent.vue';
import { useRoute } from 'vue-router'
const route = useRoute()


    interface floatImgType {
        active: string,
        inActive: string
    }

    const shareStore = useShareStore()
    const { showShare } = storeToRefs(shareStore)

    const timer = ref<number | null>(null)
    const audio = ref<HTMLAudioElement | undefined>()

    const audioStore = useAudioStore()

    const {isPlay,showControl,playArtist,radioIsPlay} = storeToRefs(audioStore)

    const floatIndex = ref<number>(1)
    const floatPlayImg = computed(():floatImgType => {
        let imgStr:string = floatIndex.value<10? '0' + floatIndex.value:floatIndex.value + '' 
        return {
            active: `/src/assets/Image/float_player_play_${imgStr}.png`,
            inActive: '/src/assets/Image/float_player_pause.png'
        }
    })

    const transitionName = ref<string>('')

    const animateEle = (playStatus: boolean) => {
        if(playStatus) {
            // 开启定时器 动画
            timer.value = setInterval(() => {
                floatIndex.value = (floatIndex.value + 1) % 20 == 0? 1:(floatIndex.value + 1) % 20
            }, 60)
            setTimeout(() => {
                audio.value?.play()
            },4)
        }else {
            // 关闭定时器
            clearInterval(timer.value as number)
            timer.value = null
            audio.value?.pause()
        }
    }

    watch(isPlay, (newv) => {
        // audio.value?.load()
        animateEle(newv)
    })

    watch(radioIsPlay, (newv) => {
        console.log(newv);
        animateEle(newv)
    })

    const animateRoutes = ref<Array<string>>([
        'picdetail',
        'specaildetail',
        'allbrank',
        'collectlist'
    ])

    // picdetail-move
    watch(route,(newv) => {
        // console.log(animateRoutes.value.includes(newv.name as string));
        if(animateRoutes.value.includes(newv.name as string)) {
            transitionName.value = 'picdetail-move'
        }else {
            transitionName.value = ''
        }
    })

    const getDuration = ():void => {
        // console.log(audio.value?.duration);
        if(audio.value) {
            audioStore.setDuration(audio.value.duration)
        }
    }
    const getCurrent = ():void => {
        if(audio.value) {
            audioStore.setCurrentTime(audio.value.currentTime)
        }
    }

    const changeCurrent = (value: number):void => {
        if(audio.value) {
            // console.log(value);
            audio.value.currentTime = value
            audioStore.setCurrentTime(audio.value.currentTime)
        }
        
    }
</script>

<template>
    <router-view v-slot="{ Component }">
        <transition :name="transitionName">
            <component :is="Component" />
        </transition>
    </router-view>
    <audio :src="playArtist?.url" ref="audio"
        @canplay="getDuration"
        @timeupdate="getCurrent"
    />
    <van-popup 
        v-model:show="showControl" position="top" :duration=".2" style="z-index: 5010;"
        :overlay-style="{'z-index': 5010}"
    >
        <PlayControl @changeCurrent="changeCurrent"/>
    </van-popup>
    <Transition name="share-move">
        <ShareComponentVue v-show="showShare"/>
    </Transition>
    <Transition name="float-move">
        <div class="float" v-if="playArtist">
            <img :src="isPlay || radioIsPlay? floatPlayImg.active:floatPlayImg.inActive" @click="audioStore.setShowControl(!showControl)">
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
    .float {
        position: fixed;
        right: 0;
        top: 100rem;
        img {
            height: 40rem;
        }
    }
    .share-move-enter-from,
    .share-move-leave-to {
        opacity: .1;
    }
    .share-move-enter-active {
        transition: all .08s ease-in-out;
    }
    .share-move-leave-active {
        transition: all .08s ease-in-out .1s;
    }
    .share-move-enter-to,
    .share-move-leave-from {
        opacity: .95;
    }

    .float-move-enter-from,
    .float-move-leave-to {
        transform: translateX(45rem);
    }
    .float-move-enter-active,
    .float-move-leave-active {
        transition: all .2s linear;
    }
    .float-move-enter-to,
    .float-move-leave-from {
        transform: translateX(0);
    }
    .picdetail-move-enter-from {
        transform: translateX(100vw);
    }
    // .picdetail-move-leave-from {
    //     opacity: 1;
    // }
    // .picdetail-move-leave-active {
    //     transition: all .1s linear;
    // }
    // .picdetail-move-leave-to {
    //     opacity: 0;
    // }

    .picdetail-move-enter-active{
        transition: all .2s ease-out;
    }
    .picdetail-move-enter-to {
        transform: translateX(0);
    }
</style>
