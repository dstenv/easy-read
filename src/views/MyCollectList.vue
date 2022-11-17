<template>
    <div class="my-collect-list">
        <header>
            <nav>
                <img src="/src/assets/Icon/aliwx_common_back_btn_pressed.png" @click="router.back()">
                <span>{{type}}</span>
                <div></div>
            </nav>
        </header>
        <main>
            <NoData v-if="!collectlist" :pic="getImageUrl('no_message_pic.png')"/>
            <section class="sec1" v-if="eng == 'pic'">
                <PicCollect 
                    v-for="item in collectlist" :key="item.id" class="sec1-collect"
                    :pic-item="(item as localPic)"
                />
            </section>
            <section class="sec2" v-if="eng == 'artist'">

            </section>
            <section class="sec3" v-if="showArr.includes(eng)">
                <AllBrankList 
                    v-for="item in collectlist" :key="item.id"
                    :pic="(item as localMusic).img"  :title="(item as localMusic).title" :subtitle="(item as localMusic).subtitle"
                    @click="router.push({path: '/pagedetail', query: {type, id:item.id}})"
                />
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PicCollect from '@/components/My/PicCollect.vue'
import AllBrankList from '@/components/Discover/AllBrankList.vue'
import NoData from '@/components/NoData.vue'
import { getImageUrl } from '@/apis/utils';

interface engBytype {
    text: string,
    eng: string
}

const typeList:engBytype[] = [
    {
        text: '图文',
        eng: 'pic'
    },
    {
        text: '文章',
        eng: 'artist'
    },
    {
        text: '音乐',
        eng: 'music'
    },
    {
        text: '影视',
        eng: 'movie'
    },
    {
        text: '电台',
        eng: 'radio'
    },
]

const route = useRoute()
const router = useRouter()
let type = ref<string>('')
let eng = ref<string>('')
const collectlist = ref<Array<localArtist | localPic | localMusic>>([])
const showArr:string[] = [
    'music',
    'movie',
    'radio'
]

onMounted(() => {
    type.value = route.params.type as string
    eng.value = typeList.filter((v:engBytype) => v.text == type.value)[0].eng
    collectlist.value = JSON.parse(localStorage.getItem(`${eng.value}List`) as string) as Array<localArtist | localPic | localMusic>
    console.log(collectlist.value,eng.value);
})
</script>

<style lang="scss" scoped>
.my-collect-list {
    overflow: hidden;
    position: relative;
}
header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: #fff;
    width: 100%;
    nav {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10rem 15rem;
        border-bottom: 1rem solid #ddd;
        img {
            height: 25rem;
            outline: none;
        }
        span {
            font-size: 15rem;
            font-weight: bold;
        }
    }
}
main {
    margin-top: 46rem;
    max-height: calc(100vh - 46rem);
    overflow: auto;
    box-sizing: border-box;
    padding: 15rem 20rem;
}
.sec1 {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .sec1-collect {
        width: calc(50% - 10rem);
    }
}
</style>