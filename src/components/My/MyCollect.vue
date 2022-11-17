<template>
    <RouterLink :to="'/collectlist/' + item.title">
        <div class="my-collect">
            <img :src="item.img" >
            <span>{{item.title}}</span>
        </div>
    </RouterLink>
</template>

<script setup lang="ts">
const props = defineProps<{
    item : myCollectListType
}>()
</script>

<style lang="scss" scoped>
.my-collect {
    img {
        display: block;
        height: 35rem;
    }
    span {
        margin-top: 10rem;
        font-size: 14rem;
        display: block;
        color: #b5b5b5;
        text-align: center;
    }
}
</style>