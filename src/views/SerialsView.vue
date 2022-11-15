<template>
    <div class="serials">
        <header>
            <nav>
                <TimeListVue 
                    :year="timeList" class="times" :selectYear="selectTime" @changeTime="changeTime"
                />
            </nav>
        </header>
        <main>  
            <SerialList 
                v-for="item in serialsData" :key="item.id"
                :serialItem="item"
            />
        </main>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getSerialByYear } from '@/apis/serials'
import { Toast } from 'vant';
import TimeListVue from '@/components/Serials/TimeList.vue'
import SerialList from '@/components/Serials/SerialList.vue'

const startTime:number = new Date().getFullYear()
const endTime:number = startTime - 6

const timeList = ref<Array<number>>([])
const selectTime = ref<number>(new Date().getFullYear())
const serialsData = ref<Array<serialType>>([])

const initTimeList = () => {
    for(let i = startTime; i >= endTime; i--){
        timeList.value.push(i)
    }
}

const getSerials = () => {
    Toast.loading({
        forbidClick: true,
        message: '加载中...',
        duration: 0
    })
    getSerialByYear(selectTime.value).then(res => {
        Toast.clear()
        serialsData.value = res
        console.log(res);
    }).catch(err => {
        Toast.clear()
        Toast.fail(err)
    })
}

const changeTime = (value:number) => {
    selectTime.value = value
}

onMounted(() => {
    getSerials()
})

watch(selectTime, () => {
    getSerials()
})
initTimeList()
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
    display: none;
}
.serials {
    overflow: hidden;
}
header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10rem 10rem 10rem;
    z-index: 100;
}
main {
    margin-top: 64rem;
    max-height: calc(100vh - 124rem);
    overflow: auto;
    box-sizing: border-box;
    padding: 10rem 10rem 0;
    background-color: #f1f1f1;
}
</style>