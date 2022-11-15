<template>
    <div class="square-list" v-if="!props.square_items.isTime">
        <div>
            <div class="t">
                <img v-lazy="props.square_items.img_url">
                <p>{{props.square_items.content}}</p>
            </div>
            <div class="btm">
                <span>{{props.square_items.user?.user_name}}</span>
                <span>{{props.square_items.input_date?.split(' ')[0]}}&nbsp;·&nbsp;{{props.square_items.addr? props.square_items.addr:"地球"}}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { onMounted, ref } from 'vue';

const props = defineProps<{
    square_items: artistType
}>()

</script>

<style lang="scss" scoped>

    .square-list{
        border-radius: 5rem;
        background-color: #fff;
        break-inside: avoid;
        margin-bottom: 15rem;
        box-shadow: 0rem 3rem 5rem 1rem #dedede;
    }
    .t {
        border-radius: 5rem 5rem 0 0;
        img {
            border-radius: 5rem 5rem 0 0;
            width: 100%;
        }
        p {
            padding: 0 7rem;
            margin: 7rem 0 10rem;
            font-size: 13.3rem;
            line-height: 1.3;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2; /* 设置显示文本的行数 */
            -webkit-box-orient: vertical; 
        }
    }
    .btm {
        padding: 0 7rem 10rem;
        span {
            display: block;
            margin-bottom: 3rem;
            color: #737373;
        }
    }

</style>