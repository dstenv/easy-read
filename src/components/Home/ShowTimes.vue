<script lang="ts" setup>
import {useCounterStore} from '@/stores/counter'
import { storeToRefs } from 'pinia';
import { watch,onMounted, ref } from 'vue';
import {getTimeList} from '@/apis/home'
import SkeletonComponent from '@/components/SkeletonComponent.vue'
import { Toast } from 'vant';

const store = useCounterStore()
let {DateMon,DateYear} = storeToRefs(store)
const props = defineProps<{
    selTime:string
}>()

const emits = defineEmits(['setSelDate'])

const timeList = ref<Array<timeList>>([])
const loading = ref<boolean>(false)
const finished = ref(false);

const scrollRoot = ref<HTMLElement>()
const test = ref<HTMLElement>()

watch(DateMon,(newv):void => {
    if(newv == 0) {
        console.log('该到上一年');
    }
})

const onLoad = () => {
        // 异步更新数据
        console.log('触底了');
        // 这里月份-1然后做请求 如果月份小于等于0则将月份重置为12，年份-1
        store.setDateMon(DateMon.value - 1)
        getInit()
    };

const getInit = ():void => {
    getTimeList(`${DateYear.value}-${DateMon.value}`).then(res => {
        res.unshift({
            id: -1,
            cover: '',
            date: res[0].date.split('-')[1]
        })
        console.log(res);
        
        timeList.value = [...timeList.value,...res]
        // 加载状态结束
        loading.value = false;
        console.log(timeList.value);
        // console.log(scrollRoot.value?.scrollTop);
    }).catch(() => {
        // Toast.fail('网络错误,请刷新！')
    })
    
}

onMounted( () => {
    getInit()
    
})




</script>

<template>
    <div class="show-times" ref="scrollRoot">
        <SkeletonComponent v-if="timeList.length == 0" :nums="8"/>
        <main v-if="timeList.length != 0">
            <van-list
                v-model:loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <van-cell class="vanli" v-for="item in timeList" :key="item.id"
                    @click="emits('setSelDate',item.date)"
                    :offset="0" 
                    :class="[
                        {active: props.selTime == item.date},{monLi: item.id == -1}]"
                >
                    <div v-if="item.id == -1">
                        <van-divider content-position="center">{{item.date}}月</van-divider>
                    </div>
                    <div v-if="item.id != -1">
                        <img v-lazy="item.cover">
                        <span>{{item.date.split('-').join(' / ')}}</span>
                    </div>
                </van-cell>
            </van-list>
        </main>
        <div class="testbox" ref="test"></div>
    </div>

</template>
<style lang="scss" scoped>
    .show-times {
        width: 100%;
        height: calc(100vh - 55rem);
        padding: 70rem 20rem 10rem;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .testbox {
        height: 1rem;
    }
    .van-list{
        width: 100%;
        flex-wrap: wrap;
        display: flex;
        justify-content: space-between;
        .vanli {
            flex: none;
            width: calc(50% - 7rem);
            margin-bottom: 10rem;
            border: 1rem solid #e4e4e4;
            // overflow: hidden;
            padding: 0;
            &.active {
                border: 1rem solid #b1b1b1;
            }
            
            img {
                display: block;
                width: calc(100% + 2rem);
                position: relative;
                left: -1rem;
            }
            span {
                display: block;
                text-align: center;
                color: #878787;
                padding: 15rem;
                font-size: 15rem;
            }
        }
        ::v-deep .van-list__loading {
            width: 100%;
        }
        .monLi {
            flex: none;
            margin-bottom: 10rem;
            border: none;
            display: block;
            width: 100%;
        }
    }
</style>