<template>
    <div class="brank-list">
        <div v-if="!props.brankData.isTime">
            <div class="top">
                <h3>{{props.brankData.title}}</h3>
                <router-link :to="'/allbrank/' + props.brankData.id + '/' + props.brankData.title + '/' + props.type + '/0'">
                    <span>完整榜单&nbsp;&gt;</span>
                </router-link>
            </div>
            <div class="bottom">
                <div class="left">
                    <img v-lazy="props.brankData.img_url">
                </div>
                <div class="right" v-if="props.brankData.contents">
                    <div v-for="(item,index) in props.brankData.contents" :key="item.id"
                        @click="router.push({path: '/pagedetail', query: {type:props.type, id:item.id}})"
                    >
                        {{index + 1}}.&nbsp;
                        <span class="title">{{item.title}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';


const props = defineProps<{
    brankData: brankType,
    type: string
}>()


const router = useRouter()
</script>

<style lang="scss" scoped>
.brank-list {
    overflow: hidden;
    margin-bottom: 15rem;
}

.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
        margin: 10rem;
        font-weight: bold;
        font-size: 15rem;
    }
    span {
        color: #d1d1d1;
    }
}
.bottom {
    display: flex;
    padding-left: 10rem;
    .left {
        border-radius: 10rem;
        img {
            border-radius: 10rem;
            width: 80rem;
            display: block;
        }
    }
    .right {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding-left: 15rem;
        &>div {
            font-size: 13rem;
            display: flex;
            align-items: center;
            &:first-of-type {
                color: #bb514b;
            }
            &:nth-of-type(2) {
                color: #daa0a9;
            }
            &:last-of-type {
                color: #f0c788;
            }
        }
        .title {
            color: #b0b0b0;
            display: inline-block;
            width: 200rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>

