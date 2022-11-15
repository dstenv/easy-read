<template>
    <div class="no-data">
        <img :src="props.pic">
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    pic: string
}>()
</script>

<style lang="scss" scoped>
.no-data {
    width: 100%;
    padding-top: 50rem;
    img {
        width: 200rem;
        display: block;
        margin: 0 auto;
    }
}
</style>