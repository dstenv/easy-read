<template>
    <div class="detail-head">
        <header>
            <nav>
                <img src="/src/assets/Icon/h5_qr_back.png" @click="router.back()">
                <span>{{props.type}}</span>
                <img src="/src/assets/Image/favourite_gray.png" @click="faviorArtist(router)">
            </nav>
        </header>
        <main>
            <div class="cover" v-if="props.cover">
                <img  :src="props.cover">
                <img class="play-icon" :src="isPlay? radioIcon.active:radioIcon.inActive" @click="audioStore.setIsPlay(!isPlay)">
                <div class="i-box" :class="{iactive:isPlay}">
                    <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
                </div>
                <div class="i-box" :class="{iactive:isPlay}">
                    <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
                </div>
            </div>
            <section>
                <h3>{{props.title}}</h3>
                <div class="author-box">
                    <span>{{props.author}}</span>
                    <span v-if="props.much">{{props.much}}</span>
                </div>
                <div class="play" v-if="auchor" @click="audioStore.setIsPlay(!isPlay)">
                    <div class="left">
                        <img src="/src/assets/Icon/24gl-volumeZero.png" >
                        <img v-show="isPlay" src="/src/assets/Icon/aliwx_chatfrom_play_02.png" class="beginplay">
                        <span :class="{playspan: isPlay}">有声阅读 | {{props.auchor}}</span>
                    </div>
                    <div class="right">
                        <span>{{span_duration}}</span>
                    </div>
                </div>
                <div class="question" v-if="props.question_brief || props.simple_answerer">
                    <p>{{props.question_brief}}</p>
                    <span>{{props.simple_answerer}}</span>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
import { useAudioStore } from '@/stores/counter';
import { computed } from '@vue/reactivity';
import { storeToRefs } from 'pinia';
import { watch, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { faviorArtist } from '@/apis/utils'

const router = useRouter()

const props = defineProps<{
    id: string,
    type: string,
    title: string | undefined,
    author?: string | undefined,
    much?: string | undefined,
    auchor?: string | undefined,
    audio?: string | undefined,
    question_brief?: string |undefined,
    simple_answerer?: string | undefined,
    cover?: string | undefined,
    engType?: string | undefined
}>()

const radioIcon = ref<{
    inActive:string,
    active: string
}>({
    inActive: '/src/assets/Image/feeds_radio_play.png',
    active: '/src/assets/Image/feeds_radio_pause.png'
})

const audioStore = useAudioStore()

const {isPlay,duration,currentTime} = storeToRefs(audioStore)

const formatTIme = (time: number):string => {
    let m = (Math.floor(time / 60) + 100 + '').slice(1)
    let s = (Math.floor(time % 60) + 100 + '').slice(1)
    return m + ':' + s
}

const span_duration = computed(():string => {
    return formatTIme(duration.value - currentTime.value)
})

onMounted(() => {
    if(props.audio) {
        audioStore.setPlayArtist({
            id: props.id,
            title: props.title,
            auchor: props.auchor || props.author,
            url: props.audio,
            type: props.engType
        })
    }
})

watch(isPlay, (newv) => {
    if(newv) {
        // 开启定时器 动画 设置正在播放的文章
        audioStore.setPlayArtist({
            id: props.id,
            title: props.title,
            auchor: props.auchor || props.author,
            url: props.audio,
            type: props.engType
        })
    }
})



</script>

<style lang="scss" scoped>
    @keyframes ianimate {
        0% {
            transform: scaleY(1);
        }
        50% {
            transform: scaleY(1.8);
        }
        100% {
            transform: scaleY(1);
        }
    }
    .detail-head {
        overflow: hidden;
    }
    header{
        width: 100%;
        background-color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        nav {
            box-sizing: border-box;
            padding: 15rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            img {
                height: 20rem;
            }
            span {
                font-size: 15rem;
            }
        }
    }
    main {
        overflow: hidden;
        position: relative;
        margin-top: 50rem;
        padding: 5rem 0 0;
        width: 100%;
        box-sizing: border-box;
        // max-height: calc(100vh - 100rem);
        // overflow: auto;
        section {
            margin-bottom: 20rem;
            padding: 0 20rem;
        }
        .cover {
            width: 100vw;
            margin-bottom: 20rem;
            position: relative;
            .play-icon {
                position: absolute;
                left: 0;
                bottom: 30rem;
                right: 0;
                margin: 0 auto;
                width: 40rem;
            }
            img {
                width: 100%;
            }
            .i-box {
                position: absolute;
                left: 50rem;
                bottom: 40rem;
                display: flex;
                align-items: center;
                i {
                    width: 2.5rem;
                    flex: 1;
                    margin-right: 6rem;
                    animation: ianimate 1s ease-in-out infinite;
                    animation-play-state: paused;
                    background-color: #fff;
                    &:first-of-type,
                    &:nth-of-type(2),
                    &:nth-of-type(3),
                    &:nth-of-type(9),
                    &:nth-of-type(10),
                    &:nth-of-type(11) {
                        height: 5rem;
                    }
                    &:nth-of-type(4),
                    &:nth-of-type(8) {
                        animation-delay: .8s;
                        height: 7rem;
                    }
                    &:nth-of-type(5),
                    &:nth-of-type(7) {
                        animation-delay: 1.2s;
                        height: 9rem;
                    }
                    &:nth-of-type(6) {
                        animation-delay: 1.5s;
                        height: 12rem;
                    }
                }
                &:nth-of-type(2) {
                    left: 230rem;
                }
            }
            .iactive {
                i {
                    animation-play-state: running;
                }
            }
        }
        
        h3 {
            font-size: 20rem;
            font-weight: bold;
            margin-bottom: 25rem;
        }
        .author-box {
            display: flex;
            justify-content: space-between;
            span {
                color: rgb(78, 78, 78);
                display: inline-block;
                transform: scale(.85);
            }
        }
        .play {
            padding: 10rem;
            border: 1rem solid black;
            border-radius: 5rem;
            display: flex;
            margin: 30rem 0 20rem;
            justify-content: space-between;
            align-items: center;
            .left {
                display: flex;
                align-items: center;
                .beginplay {
                    position: relative;
                    left: -8rem;
                }
                img {
                    height: 17rem;
                }
                span {
                    position: relative;
                    font-size: 13.5rem;
                    left: 6rem;
                }
                .playspan {
                    left: -7.7rem;
                }
            }
        }
        .question {
            p {
                font-size: 14rem;
                letter-spacing: 1rem;
                line-height: 2;
                padding: 20rem 0;
                border-bottom: 1rem solid #ddd;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3; /* 设置显示文本的行数 */
                -webkit-box-orient: vertical; 
            }
            span {
                display: block;
                padding: 25rem 0 10rem;
            }
        }
    }
</style>