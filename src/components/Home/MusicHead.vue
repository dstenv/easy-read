<template>
    <div class="music-head">
        <header>
            <nav>
                <img src="/src/assets/Icon/h5_qr_back.png" @click="router.back()">
                <img src="/src/assets/Image/favourite_gray.png" @click="faviorArtist(router)">
            </nav>
        </header>
        <main :class="{'movie-main': type == 'movie'}">
            <section class="sec1" v-if="props.music_img" :style="{'background-image': `url(${props.backgroundImg})`}">
                <div class="info">
                    <img v-lazy="props.music_img">
                    <img :src="props.music_disk" class="disk" :class="{active: isCurrentMusic && isPlay}">
                    <img :src="isCurrentMusic && isPlay? playIcon.inActive:playIcon.active" class="play-icon" @click="audioStore.setIsPlay(!isPlay)">
                    <span>{{props.description}}</span>
                </div>
            </section>
            <section class="sec2">
                <h3>{{props.title}}</h3>
                <div>
                    <span>{{props.author}}</span>
                    <img :src="type == 'music'? '/src/assets/Image/detail_content.png':'/src/assets/Icon/ic_menu_camera_video_view.png'">
                </div>
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
import { useAudioStore } from '@/stores/counter';
import { computed } from '@vue/reactivity';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import { faviorArtist } from '@/apis/utils'

const props = defineProps<{
    id: string,
    title: string | undefined,
    music_img?: string | undefined,
    music_disk?: string | undefined,
    description?: string | undefined,
    audio_url?: string | undefined,
    backgroundImg?: string | undefined,
    author: string | undefined,
    type: string | undefined,
    dataArticle?: {
        cover: string,
        info: string,
        lyric: string
    } | undefined
}>()

const showDesc = computed(() => {
    return props.description?.split(' ').filter((v:string) => v !== '').join('')
})

const isCurrentMusic = computed(() => {
    return props.id == playArtist.value?.id
})

const audioStore = useAudioStore()

const { playArtist,isPlay } = storeToRefs(audioStore)

const playIcon = ref<{
    active: string,
    inActive: string
}>({
    active: '/src/assets/Icon/play.png',
    inActive: '/src/assets/Icon/pause.png'
})

onMounted(() => {
    if(props.audio_url) {
        audioStore.setPlayArtist({
            id: props.id,
            title: props.title,
            url: props.audio_url,
            auchor: props.author,
            type: props.type
        })
    }
})

const router = useRouter()
</script>

<style lang="scss" scoped>
.music-head {
    overflow: hidden;
    position: relative;
}
header {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 100;
    nav {
        width: 100%;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 15rem 20rem;
        img {
            height: 25rem;
            outline: none;
        }
    }
}
main {
    &.movie-main {
        margin-top: 55rem;
    }
    .sec1 {
        width: 100%;
        height: 215rem;
        background-size: cover;
        overflow: hidden;
        color: #8b7987;
        .info {
            width: 100%;
            text-align: center;
            overflow: hidden;
            margin-top: 80rem;
            position: relative;
            img {
                margin: 0 auto;
                width: 100rem;
                display: block;
                margin-bottom: 8rem;
                position: relative;
                z-index: 10;
            }
            .play-icon {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto; 
                width: 30rem;
                transform: translateY(-10rem);
            }
            .disk {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                width: 87rem;
                z-index: 5;
                transition: all .2s linear;
                &.active {
                    transform: translateX(24rem);
                }
            }
        }
    }
    .sec2 {
        overflow: hidden;
        padding: 0 20rem;
        h3 {
            margin: 25rem 0;
            font-size: 20rem;
            font-weight: bold;
        }
        div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20rem;
            img {
                height: 20rem;
                outline: none;
            }
        }
    }
}
</style>