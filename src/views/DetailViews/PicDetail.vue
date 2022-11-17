<template>
    <div class="pic-detail">
        <header>
            <nav>
                <img src="/src/assets/Icon/aliwx_common_back_btn_pressed.png" @click="router.back()">
                <span>{{date.split('-').join(' / ')}}</span>
                <img src="/src/assets/Icon/share_image.png" @click="setShare(picData?.share_url as string)">
            </nav>
        </header>
        <FirstDataVue v-if="picData" :data="picData"/>
    </div>
</template>

<script setup lang="ts">
import { getPicDetail } from '@/apis/discover'
import { Toast } from 'vant';
import { onMounted, ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import FirstDataVue from '@/components/Home/FirstData.vue';
import {setShare} from '@/apis/utils'

const route = useRoute()
const router = useRouter()

const date = ref<string>('')
const picData = ref<homeInit>()

onMounted(() => {
    date.value = route.params.picId as string
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
    })
    getPicDetail(date.value).then(res => {
        picData.value = res
        console.log(picData.value);
        Toast.clear()
    }).catch(err => {
        Toast.clear()
        Toast.fail(err)
    })
})
</script>

<style lang="scss" scoped>
.pic-detail {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    header {
        nav {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15rem 15rem 5rem;
            margin-bottom: 10rem;
            border-bottom: 1rem solid #ddd;
            box-sizing: border-box;
            img {
                width: 22rem;
                outline: none;
            }
            span {
                font-size: 20rem;
                font-family: 'Courier New', Courier, monospace;
                color: rgb(47, 47, 47);
            }
        }
    }
}
</style>