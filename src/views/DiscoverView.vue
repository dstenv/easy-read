<template>
    <div class="discover">
        <header>
            <HeadFilterVue :sel-list="filterType" :sel-type="type" @changeType="changeType"/>
        </header>
        <main>
                <div class="contain" v-if="data">
                    <van-popup v-model:show="showTimeSel" position="top">
                        <van-datetime-picker
                            v-model="currentDate"
                            type="year-month"
                            title="选择年月"
                            :min-date="minDate"
                            :max-date="maxDate"
                            :formatter="formatter"
                            @confirm="confirm"
                            @cancel="cancel"
                        />
                    </van-popup>
                    <!-- 013458 -->
                    <div class="time" v-if="skeleArr.indexOf(category) !== -1" @click="showTimeSel = !showTimeSel">
                        <span>{{timeYear}}&nbsp;年&nbsp;{{timeMon}}&nbsp;月</span>
                        <van-icon style="position: relative;top: 2rem;" :size="'12rem'" name="arrow-down" />
                    </div>
                    <van-skeleton :row="18" :loading="skeletonLoad">
                        <div class="main">
                            <!-- 1345 -->
                            <van-list
                                v-show="category == 1 || category == 3 || category == 4 || category == 5"
                                v-model:loading="listLoad"
                                :finished="finished"
                                :offset="0"
                                finished-text="没有更多了"
                                class="pull-list"
                                @load="onLoad"
                                v-model:error="error"
                                error-text="请求失败，点击重新加载"
                            >
                                <van-pull-refresh v-model="loading" @refresh="onRefresh" v-if="data.length>1">
                                    <ReadList 
                                        v-for="item in data" :key="item.id"
                                        :list="item" @click.stop="router.push({path: '/pagedetail', query: {type, id:item.id}})"
                                    />
                                </van-pull-refresh>
                            </van-list>
                            <van-list
                                v-show="category == 0"
                                v-model:loading="listLoad"
                                :finished="finished"
                                :offset="0"
                                finished-text="没有更多了"
                                class="pull-list"
                                @load="onLoad"
                            >
                                <van-pull-refresh v-model="loading" @refresh="onRefresh" v-if="data.length>1">
                                    <!-- <div class="pic-box"> -->
                                    <div class="pic-box">
                                        <PicArtist 
                                            v-for="item in data" :key="item.id"
                                            :list="item" 
                                        />
                                    </div>
                                    <!-- </div> -->
                                </van-pull-refresh>
                            </van-list>
                            <div class="pull-list special" v-if="category == 11 && data.length>1">
                                <SpecialList 
                                    v-for="item in data" :key="item.id"
                                    :list="item"
                                />
                            </div>
                            <div class="pull-list special brank" v-if="category == 12 && data.length>1">
                                <BrankList 
                                    v-for="(item,index) in data" :key="item.id"
                                    :brankData="item" :type="getBrankType(index,item.id)"
                                />
                            </div>
                            <!-- 电台 -->
                            <van-list
                                v-show="category == 8"
                                v-model:loading="listLoad"
                                :finished="finished"
                                :offset="0"
                                finished-text="没有更多了"
                                class="pull-list"
                                @load="onLoad"
                            >
                                <van-pull-refresh v-model="loading" @refresh="onRefresh" v-if="data.length>1">
                                    <RadioListVue 
                                        v-for="item in data" :key="item.id"
                                        :radio="item" @click="router.push({path:'/pagedetail',query: {type: '电台', id: item.id}})"
                                    />
                                </van-pull-refresh>
                            </van-list>
                            <!-- 小记 -->
                            <van-list
                                v-show="category == -1"
                                v-model:loading="square_listLoad"
                                :finished="square_finished"
                                :offset="0"
                                finished-text="没有更多了"
                                class="pull-list s_pl"
                                @load="square_onLoad"
                            >
                                <van-pull-refresh v-model="loading" @refresh="square_onRefresh" v-if="data.length>1">
                                    <div class="square-box">
                                        <SquareListVue 
                                            v-for="item in data" :key="item.id"
                                            :square_items="item"
                                        />
                                    </div>
                                </van-pull-refresh>
                            </van-list>
                            <NoDataVue 
                                v-if="data.length==1"
                                :pic="'/src/assets/Image/no_message_pic.png'"
                            />
                        </div>
                    </van-skeleton>
                </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import HeadFilterVue from '@/components/Discover/HeadFilter.vue';
import ReadList from '@/components/Discover/ReadList.vue'
import PicArtist from '@/components/Discover/PicArtist.vue';
import SpecialList from '@/components/Discover/SpecialList.vue'
import RadioListVue from '@/components/Discover/RadioList.vue'
import SquareListVue from '@/components/Discover/SquareList.vue';
import BrankList from '@/components/Discover/BrankList.vue'
import NoDataVue from '@/components/NoData.vue'
import { onMounted, ref, watch } from 'vue';
import {getListData} from '@/apis/discover'
import { computed } from '@vue/reactivity';
import { Toast } from 'vant';
import {  useRouter } from 'vue-router';

const router = useRouter()


// 注: 小记可以触底加载id应可以改变
const filterType = ref<Array<Filter>>([
    {
        id: 1,
        category: 1,
        text: '阅读',
        eng: 'essay',
        axios_url: `find/bymonth/`,
        isArtist: true
    },
    {
        id: 0,
        category: 0,
        text: '图文',
        eng: '',
        axios_url: `find/bymonth/`,
        isArtist: true
    },
    {
        id: 4,
        category: 11,
        text: '专题',
        eng: 'topic',
        axios_url: 'banner/list/',
        isArtist: false
    },
    {
        id: '',
        category: 12,
        text:'热榜',
        eng: '',
        axios_url: 'find/rank',
        isArtist: false
    },
    {
        id: 3,
        category: 3,
        text: '问答',
        eng: 'question',
        axios_url: `find/bymonth/`,
        isArtist: true
    },
    {
        id: 4,
        category: 4,
        text: '音乐',
        eng: 'music',
        axios_url: `find/bymonth/`,
        isArtist: true
    },
    {
        id: 5,
        category: 5,
        text: '影视',
        eng: 'movie',
        axios_url: `find/bymonth/`,
        isArtist: true
    },
    {
        id: 8,
        category: 8,
        text: '电台',
        eng: 'radio',
        axios_url: `find/bymonth/`,
        isArtist: true
    },
    {
        id: 0,
        category: -1,
        text: '小记',
        eng: '',
        axios_url: 'diary/square/more/',
        isArtist: false
    }
])
interface brankItemType {
    id: number,
    text: string
}
const brankTypeList = ref<Array<brankItemType>>([
    {
        id: 7,
        text: '阅读'
    },
    {
        id: 8,
        text: '问答'
    },
    {
        id: 9,
        text: '影视'
    },
    {
        id: 10,
        text: '音乐'
    },
    {
        id: 2,
        text: '问答'
    },
    {
        id: 1,
        text: '阅读'
    },
    {
        id: 6,
        text: '影视'
    },
    {
        id: 5,
        text: '连载'
    },
    {
        id: 4,
        text: '音乐'
    },
])

const getBrankType = (index:number,id: number | string) => {
    if(index >=1) {
        return brankTypeList.value.filter((v: brankItemType) => v.id == id)[0].text
    }
    return ''
}

const type = ref<string>('专题')
const axiosUrl = ref<string>('')

// category: 阅读1  专题11  图文0  电台8  音乐4  影视5  问答3  小记-1 热榜12
const data = ref<Array<artistType>>([])
const category = ref<number>(11)
const skeleArr = ref<Array<number>>([0,1,3,4,5,8])
const loading = ref<boolean>(false)

const timeYear = ref<number>(new Date().getFullYear())
const timeMon = ref<number>(new Date().getMonth() + 1)
const isBegin = computed(() => {
    if(timeYear.value >= new Date().getFullYear() && timeMon.value >= new Date().getMonth() + 1) {
        return true
    }
    return false
})
const isDown = ref<boolean>(false)

const skeletonLoad = ref<boolean>(true)
const showTimeSel = ref<boolean>(false)
const minDate = ref<Date>(new Date(2013,0,1))
const maxDate = ref<Date>(new Date())
const currentDate2 = ref<{
    year: number,
    mon: number
}>({
    year: 0,
    mon: 0
})
const isConfirm = ref<boolean>(false)

const currentDate = computed({
    get() {
        return new Date(axios_time.value)
    },
    set(value) {
        currentDate2.value.year = value.getFullYear()
        currentDate2.value.mon = value.getMonth() + 1
    }
})

const listLoad = ref<boolean>(false)
const finished = ref<boolean>(false)
const error = ref<boolean>(false)

const square_finished = ref<boolean>(false)
const square_listLoad = ref<boolean>(false)



const onLoad  = () => {
    console.log('触底了');
    isDown.value = true
    timeMon.value--
    if(timeMon.value <= 0) {
        timeYear.value--
        timeMon.value = 12
    }
}
const square_onLoad  = () => {
    console.log('触底了');
    let lastDarId:string = data.value[data.value.length - 1].id as string
    let axios_arr = axiosUrl.value.split('/')
    axios_arr[axios_arr.length - 1] = lastDarId
    getListData(axios_arr.join('/')).then(res => {
        // console.log(res);
        data.value = [...data.value,{time: axios_time.value,isTime: true},...(res.list || res)]
        loading.value = false
        square_listLoad.value = false
    })
}
const square_onRefresh = () => {
    let id:string = '0'
    let axios_arr = axiosUrl.value.split('/')
    axios_arr[axios_arr.length - 1] = id
    getListData(axios_arr.join('/')).then(res => {
        // console.log(res);
        data.value = [{time: axios_time.value,isTime: true},...(res.list || res)]
        loading.value = false
    })
}

const changeType = (value: string) => {
    type.value = value
}

const axios_time = computed(() => {
    if(timeMon.value >= 13) {
        timeYear.value++
        if(timeYear.value > new Date().getFullYear()) {
            timeYear.value = new Date().getFullYear()
            timeMon.value = 12
        }else {
            timeMon.value = 1
        }
    }
    
    return timeYear.value + '-' + (timeMon.value<10? '0' + timeMon.value: timeMon.value)
})

const onRefresh = () => {
    // 下拉刷新月份+1去请求数据 但不能超过当前时间的月份
    if(!isBegin.value) {
        timeMon.value++
    }else {
        console.log('已是最新数据');
        Toast.success('已是最新数据')
        // 异步重置刷新状态 此时不做网络请求
        setTimeout(() => {
            loading.value = false
        }, 4);
    }
}

const getTime = (url:string,time: string) => {
    axiosUrl.value = time? url + '/' + time: url
    console.log(axiosUrl);
    // 发起请求
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
    })
    getListData(axiosUrl.value).then(res => {
        res = res.list? res.list:res
        category.value = filterType.value.filter((v: Filter) => v.text == type.value)[0].category
        data.value = [{time: axios_time.value,isTime: true},...res]
        skeletonLoad.value = false
        Toast.clear()
        console.log(data.value,category.value);
    }).catch(err => {
        Toast.clear()
        console.log('错误',err);
        Toast.fail(err)
    })
}

const getUrl = () => {
    let findType: Filter = filterType.value.filter( (v: Filter) => v.text == type.value )[0]
    if(findType.isArtist){
        getTime(findType.axios_url + findType.id, axios_time.value)
    }else {
        getTime(findType.axios_url + findType.id, '')
    }
}

const formatter = (type:string, val: number):string|number => {
    if (type === 'year') {
        return `${val}年`;
    }
    if (type === 'month') {
        return `${val}月`;
    }
    return val;
};

const confirm = (value:Date) => {
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
    })
    showTimeSel.value = !showTimeSel.value
    timeYear.value = value.getFullYear()
    timeMon.value = value.getMonth() + 1
    isConfirm.value = true
}

const cancel = () => {
    showTimeSel.value = !showTimeSel.value
}

onMounted(() => {
    getUrl()
})

watch(type, () => {
    getUrl()
})

watch(axios_time, (newv) => {
    // 网络请求
    console.log(newv,'请求');
    let arr = axiosUrl.value.split('/')
    arr[arr.length - 1] = newv
    getListData(arr.join('/')).then(res => {
        Toast.clear()
        res = res.list? res.list:res
        console.log(category.value == res[0].category && !isConfirm.value);
        if(category.value == undefined) {
            // 小记列表
        }
        else if(category.value != undefined && category.value != res[0].category) {
            category.value = res[0].category
            data.value = [{time: axios_time.value,isTime: true},...res]
        }
        else if(category.value != undefined && category.value == res[0].category && !isConfirm.value){
            res = res.map((v: any) => ({
                ...v,
                time: axios_time.value
            }))
            if(listLoad.value) {
                data.value = [...data.value,{time: axios_time.value,isTime: true},...res]
                setTimeout(() => {
                    listLoad.value = false
                }, 4);
            }else {
                data.value = [{time: axios_time.value,isTime: true},...res,...data.value]
            }
        }
        else {
            data.value = [{time: axios_time.value,isTime: true},...res]
            setTimeout(() => {
                isConfirm.value = false
            }, 50);
        }
        skeletonLoad.value = false
        loading.value = false
        listLoad.value = false
        if(timeYear.value == 2013 && timeMon.value == 1) {
            finished.value = true
        }
        console.log(data.value,category.value);
    }).catch(err => {
        Toast.clear()
        loading.value = false
        listLoad.value = false
        console.log('错误',err);
        error.value = true
        Toast.fail('网络错误')
    })
})



</script>

<style lang="scss" scoped>
.discover {
    overflow: hidden;
}
header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10rem 20rem 15rem 0;
    z-index: 100;
}
main {
    margin-top: 65rem;
}
.contain {
    .time {
        color: rgb(133 133 133);
        font-size: 13rem;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10rem 0;
        span {
            margin-right: 3rem;
        }
    }
    .main {
        width: 100%;
        overflow: hidden;
        .pull-list {
            max-height: calc(100vh - 155rem);
            overflow-y: auto;
            // padding: 0 20rem;
            &.special {
                padding: 10rem 20rem 0;
                max-height: calc(100vh - 135rem);
            }
            &.brank {
                padding: 0 20rem 0;
            }
            &.s_pl {
                background-color: #f3f3f3;
                // padding-top:  0 0;
                max-height: calc(100vh - 135rem);
                .square-box {
                    padding: 20rem 20rem 0; 
                    column-count: 2;
                    column-gap: 10rem;
                    column-width: calc(50% - 5rem);
                    width: 100%;
                }
            }
        }
        .pic-box {
            display: flex;
            box-sizing: border-box;
            width: 100%;
            padding: 0 20rem 20rem;
            justify-content: space-between;
            flex-wrap: wrap;
        }
    }
}


</style>