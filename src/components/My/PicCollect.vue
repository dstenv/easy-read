<template>
    <div class="pic-collect">
        <div class="t">
            <img :src="picItem.img_url">
        </div>
        <div class="btm">
            <p>{{picItem.forward}}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    picItem: localPic
}>()
</script>

<style lang="scss" scoped>
.pic-collect {
    width: 100%;
    border: 1rem solid #ddd;
    border-radius: 5rem;
    box-shadow: 0 1rem 5rem 1rem #e3e3e3;
    margin-bottom: 10rem;
    .t {
        border-radius: 5rem 5rem 0 0;
        width: 100%;
        img {
            border-radius: 5rem 5rem 0 0;
            width: 100%;
            display: block;
        }
    }
    .btm {
        width: 100%;
        padding: 15rem 10rem;
        p {
            font-size: 14rem;
            color: #9d9d9d;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2; /* 设置显示文本的行数 */
            -webkit-box-orient: vertical; 
        }
    }
}
</style>