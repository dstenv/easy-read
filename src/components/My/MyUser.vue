<template>
    <div class="my-user">
        <header>
            <nav>
                <div class="info">
                    <img src="@/assets/Image/default_head.jpeg">
                    <span>测试用户</span>
                </div>
            </nav>
        </header>
        <main>
            <section class="sec1">
                <div class="sec1-head">
                    <span class="my-write">我的小记</span>
                    <span>全部&nbsp;&gt;</span>
                </div>
                <canvas ref="canvas" width="335" height="120">
                    你的浏览器暂不支持canvas
                </canvas>
                <div class="write">
                    <div>
                        <img src="/src/assets/Icon/diary_icon.png">
                        <span>制作小记</span>
                    </div>
                    <span>记录你此刻的想法</span>
                </div>
            </section>
            <section class="sec2">
                <h3>我的收藏</h3>
                <div class="sec2-box">
                    <MyCollectVue 
                        v-for="item in myCollectionList" :key="item.name"
                        :item="item"
                    />
                </div>
            </section>
            <section class="sec3">
                <div class="my-function">
                    <div class="left">
                        <img src="/src/assets/Icon/my-attention.png">
                        <span>我的关注</span>
                    </div>
                    <div class="right">
                        <span>0</span>
                        <span>&gt;</span>
                    </div>
                </div>
                <div class="my-function">
                    <div class="left">
                        <img src="/src/assets/Icon/song-list-icon.png">
                        <span>歌单</span>
                    </div>
                    <div class="right">
                        <span>&gt;</span>
                    </div>
                </div>
                <div class="my-function">
                    <div class="left">
                        <img src="/src/assets/Icon/contribute_day.png">
                        <span>投稿</span>
                    </div>
                    <div class="right">
                        <span>&gt;</span>
                    </div>
                </div>
                <div class="my-function">
                    <div class="left">
                        <img src="/src/assets/Icon/setting.png">
                        <span>设置</span>
                    </div>
                    <div class="right">
                        <span>&gt;</span>
                    </div>
                </div>
                <div class="my-function" @click="getOut">
                    <div class="left">
                        <img src="/src/assets/Icon/unlogin.png">
                        <span>退出登录</span>
                    </div>
                    <div class="right">
                        <span>&gt;</span>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { getIconUrl } from '@/apis/utils'
import MyCollectVue from './MyCollect.vue';

const canvas = ref<HTMLCanvasElement>()

let ctx:CanvasRenderingContext2D
let offset:number = 10
let timer:null | number = null

onMounted(() => {
    ctx = canvas.value!.getContext('2d') as CanvasRenderingContext2D
    console.log(ctx);
    timer = setInterval(() => {
        ctx.clearRect(0,0,335,150)
        offset++
        ctx.beginPath()
        ctx.moveTo(80,10)
        ctx.setLineDash([20,15,8])
        ctx.lineDashOffset = offset
        ctx.lineTo(250,10)
        ctx.lineTo(250,110)
        ctx.lineTo(80,110)
        ctx.lineTo(80,10)
        ctx.strokeStyle = '#c8c8c8'
        ctx.stroke()
    }, 60)
})

onBeforeUnmount(() => {
    clearInterval(timer as number)
    timer = null
})

const myCollectionList = ref<Array<myCollectListType>>([
    {
        title: '图文',
        img: getIconUrl('indi_hp_icon.png'),
        name: 'pic'
    },
    {
        title: '文章',
        img: getIconUrl('indi_article_icon.png'),
        name: 'artist'
    },
    {
        title: '音乐',
        img: getIconUrl('indi_music_icon.png'),
        name: 'music'
    },
    {
        title: '影视',
        img: getIconUrl('indi_movie_icon.png'),
        name: 'movie'
    },
    {
        title: '电台',
        img: getIconUrl('indi_radio_icon.png'),
        name: 'radio'
    },
])

const getOut = () => {
    localStorage.token = ''
    location.reload()
}

</script>

<style lang="scss" scoped>
.my-user {
    overflow: hidden;
    // color: #c8c8c8;
}
header {
    nav {
        height: 250rem;
        background-image: url('@/assets/Image/default_indi_bg.png');
        overflow: hidden;
        background-size: 100% 100%;
        .info {
            margin: 120rem 0 0 20rem;
            color: #fff;
            display: flex;
            align-items: center;
            img {
                width: 50rem;
                border-radius: 50%;
                outline: none;
            }
            span {
                margin-left: 10rem;
                font-size: 15rem;
                font-weight: bold;
                letter-spacing: 1rem;
            }
        }
    }
}
main {
    position: relative;
    z-index: 10;
    box-sizing: border-box;
    padding: 0 20rem;
    // height: 500rem;
    background-color: #fff;
    top: -55rem;
    max-height: calc(100vh - 255rem);
    overflow: auto;
}
.sec1 {
    position: relative;
    padding-bottom: 10rem;
    .sec1-head {
        display: flex;
        justify-content: space-between;
        padding: 20rem 0 10rem;
        .my-write {
            color: #000;
            font-size: 15rem;
            font-weight: bold;
        }
        span {
            color: #b8b8b8;
        }
    }
    .write {
        position: absolute;
        z-index: 100;
        left: 117rem;
        top: 78rem;
        color: #cfcfcf;
        div {
            display: flex;
            align-items: center;
            margin-bottom: 10rem;
            img {
                width: 25rem;
                outline: none;
            }
            span {
                font-size: 16rem;
                margin-left: 5rem;
                color: #a9a9a9;
            }
        }
    }
}
.sec2 {
    &>h3 {
        font-size: 15rem;
        font-weight: bold;
    }
    .sec2-box {
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 15rem 10rem 20rem;
    }
}
.sec3 {
    overflow: hidden;
    .my-function {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 5rem;
        margin-bottom: 10rem;
        border-bottom: 1rem solid #ddd;
        .left {
            display: flex;
            align-items: center;
            img {
                width: 25rem;
                outline: none;
            }
            span {
                margin-left: 10rem;
                font-size: 14rem;
            }
        }
        .right {
            color: #939393;
            span {
                margin-right: 5rem;
            }
        }
    }
}
</style>