<script setup lang="ts">
import ShowTimes from '@/components/Home/ShowTimes.vue'
import DateTimeVue from '@/components/Home/DateTime.vue'
import FirstDataVue from '@/components/Home/FirstData.vue';
import MainDataVue from '@/components/Home/MainData.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { getHomeData } from '@/apis/home'
import { onMounted, watch } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'
import { Toast } from 'vant';
const isSelectTime = ref(false)

const store = useCounterStore()

const { DateTime } = storeToRefs(store)

const selTime = ref<string>('')

const router = useRouter()

const showTime = (value:boolean) => {
    isSelectTime.value = value
}
const changeselTime = (value:string) => {
    let reg = /\//
    selTime.value = value.split(reg).join('-')
    isSelectTime.value = false
}

interface typeListObj {
    category: string,
    text: string
}

const typeList = ref<Array<typeListObj>>([
    {
        category: '1',
        text: '阅读',
    },
    {
        category: '0',
        text: '图文',
    },
    {
        category: '11',
        text: '专题',
    },
    {
        category: '3',
        text: '问答',
    },
    {
        category: '4',
        text: '音乐',
    },
    {
        category: '5',
        text: '影视',
    },
    {
        category: '8',
        text: '电台',
    },
    {
        category: '-1',
        text: '小记',
    }
])

const format = (time: string): Array<string> => {
    let date: Date = new Date(time)
    let year: number = date.getFullYear()
    let day: string = (date.getDate() + 100 + '').slice(1)
    let mon: string = date.toDateString().split(' ')[1]
    return [day, mon, `${year}`]
}
const HomeData = ref<Array<homeData>>([])
const OneData = ref<homeInit>()
const homeWeather = ref<homeWeather>()

const initHome = async (datestr:string): Promise<void> => {
    let initData = await getHomeData(datestr)
    Toast.clear()
    console.log(initData);
    OneData.value = initData.content_list.filter((v: any) => v.category == '0')[0]
    HomeData.value = initData.content_list.map((v: any) => ({
        id: v.item_id,
        title: v.title,
        forward: v.forward,
        like_count: v.like_count,
        category: v.category,
        img_url:v.img_url,
        share_url: v.share_url,
        type: v.category == '8'? '电台':v.share_list.wx_timeline.title.split('|')[0].trim().split('').filter((v:string) => v != ' ').join(''),
        author: v.category == '8'? v.author.user_name:v.share_list.wx_timeline.desc.split(' ')[0],
        volume: v.volume,
        author_url: v.author.web_url,
        dataType: typeList.value.filter((val:typeListObj) => val.category === (v.category + ''))[0].text
    }))
    homeWeather.value = initData.weather
    HomeData.value?.shift()
    console.log(OneData.value, HomeData.value, homeWeather.value);
    if(homeWeather.value?.date && selTime.value == '') {
        selTime.value = homeWeather.value.date
    }
}

onMounted(async () => {
    initHome('0')
})

watch(selTime, (newv, oldv) => {
    if (oldv != '') {
        Toast.loading({
            message:'加载中...',
            forbidClick: true,
            duration: 0
        })
        initHome(newv)
        let newdate = new Date(newv)
        let olddate = new Date(oldv)
        if(newdate.getDay() > olddate.getDay()) {
            // 添加上滑特效
            console.log('日期应该上滑动');
        }else {
            // 添加下滑特效
            console.log('日期应该下滑动');
        }
    }
    store.setDateMon(parseInt(newv.split('-')[1]))
    store.setDateTime(format(newv))
})

</script>

<template>
    <div class="home">
        <van-popup v-model:show="isSelectTime" position="top" :overlay="false" :duration=".25">
            <ShowTimes :selTime="selTime" @setSelDate="changeselTime"/>
        </van-popup>
        <header>
            <DateTimeVue :isSelectTime="isSelectTime" :selTime="selTime" :homeWeather="homeWeather" @changeSel="showTime" @changeselTime="changeselTime"/>
        </header>
        <main>
            <FirstDataVue :data="OneData"/>
            <MainDataVue 
                v-for="(item,index) in HomeData" :key="index"
                :list-data="item" @click="router.push({path: '/pagedetail', query: {type: item.dataType, id: item.id}})"
            />
        </main>
    </div>
</template>

<style lang="scss" scoped>
    .home {
        width: 100vw;
        height: calc(100vh - 55rem);
        padding: 35rem 0 0;
        overflow-y: auto;
    }
    header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 5000;
        padding: 30rem 20rem 0;
        background-color: #ffffff;
        opacity: .95;
    }
    main {
        background-color: #f3f3f3;
        margin-top: 40rem;
        box-sizing: border-box;
        padding-bottom: 15rem;
    }
</style>