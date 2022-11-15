<template>
    <div class="pic-artist" v-if="props.list && date" :class="{ptime: props.list.isTime}">
        <router-link :to="'/picdetail/' + date">
            <div v-if="!props.list.isTime">
                <img v-lazy="props.list.cover">
                <span>{{date}}</span>
            </div>
        </router-link>
        <div v-if="props.list.isTime">
            <van-divider content-position="center"
                :style="{color: '#9a9a9a',margin: '5rem'}"
            >
                {{props.list.time?.split('-')[1]}}&nbsp;月
            </van-divider>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';

const props = defineProps<{
    list: artistType
}>()

const router = useRouter()

const date = computed(() => {
    if(props.list.maketime) {
        return props.list.maketime.split(' ')[0]
    }
})

</script>

<style lang="scss" scoped>
.pic-artist {
    width: calc(50% - 7rem);
    margin-bottom: 10rem;
    flex: none;
    border: 1rem solid #e4e4e4;
    &>a {
        div {
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
    }
    &.ptime {
        border: none;
        display: block;
        flex: none;
        width: 100%;
    }
}


</style>