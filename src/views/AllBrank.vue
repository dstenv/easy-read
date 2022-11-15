<template>
    <div class="all-brank">
        <header>
            <nav @click="router.back()">
                <img src="/src/assets/Icon/ali_feedback_common_back_btn_normal.png" >
                <h3>{{title}}</h3>
            </nav>
        </header>
        <main>
            <AllBrankList 
                v-for="(item,index) in allBrank" :key="item.id" :isSerial="isSerial"
                :top="index + 1" :pic="item.cover" :title="item.title" :subtitle="item.subtitle"
                @click="router.push({path: '/pagedetail', query: {type, id:item.id}})"
            />
        </main>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { getAllBrank } from '@/apis/discover'
import { Toast } from 'vant';
import AllBrankList from '@/components/Discover/AllBrankList.vue'

const router = useRouter()
const route = useRoute()

const brankId = ref< string>('')
const title = ref<string>('')
const type = ref<string>('')
const allBrank = ref<Array<brankContent>>([])
const url = ref<string>('')
const isSerial = ref<boolean>(false)


onMounted(() => {
    brankId.value = route.params.brankId as string
    title.value = route.params.title as string
    type.value = route.params.type as string
    isSerial.value = (route.params.isSerial as string) == '0'? false:true
    url.value = isSerial? 'find/serial/list':'find/rank'
    console.log(brankId.value,title.value,type.value);
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
    })
    // find/rank  find/serial/list
    getAllBrank(url.value,brankId.value).then(res => {
        Toast.clear()
        console.log(res);
        allBrank.value = res
    }).catch(err => {
        Toast.clear()
        Toast.fail(err)
    })
})
</script>

<style lang="scss" scoped>
.all-brank {
    overflow: hidden;
}
header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    nav {
        width: 100%;
        display: flex;
        padding: 10rem 15rem;
        align-items: center;
        border-bottom: 1rem solid #ddd;
        img {
            display: block;
            height: 30rem;
        }
        h3 {
            position: relative;
            top: 1rem;
            font-size: 15rem;
        }
    }
}
main {
    margin-top: 52rem;
    max-height: calc(100vh - 52rem);
    overflow: auto;
    box-sizing: border-box;
    padding: 10rem 20rem 0;
}
</style>