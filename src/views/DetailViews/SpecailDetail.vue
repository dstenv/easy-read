<template>
    <div class="specail-detail" :style="{'background-color': specailData?.bg_color}">
        <header>
            <nav>
                <img src="/src/assets/Icon/h5_qr_back.png" @click.stop="router.back()">
                <h3>专题</h3>
                <span></span>
            </nav>
        </header>
        <FooterComponentVue 
            :praisenum="specailData?.praisenum" :commentnum="specailData?.commentnum"
            :web_url="specailData?.web_url"
        />
        <main>
            
            <img v-lazy="specailData?.json_content.special.cover">
            <div>
                <h2>{{specailData?.title}}</h2>
                <SpecailDetailList 
                    v-for="item in specailData?.json_content.oneDataArticles" :key="item.id"
                    :data="item" @click="router.push({path:'/pagedetail',query: {type: '阅读', id: item.item_id}})"
                />
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { getPageDetail } from '@/apis/home'
import { Toast } from 'vant';
import FooterComponentVue from '@/components/FooterComponent.vue';
import SpecailDetailList from '@/components/Discover/SpecailDetailList.vue'

const route = useRoute()
const router = useRouter()

const specailId = ref<string>('')
const specailData = ref<ToppicType>()

onMounted(() => {
    specailId.value = route.params.specailId as string
    Toast.loading({
        forbidClick:true,
        message: '加载中...',
        duration: 0
    })
    getPageDetail('topic', specailId.value).then(res => {
        specailData.value = res
        console.log(res);
        Toast.clear()
    }).catch(err => {
        Toast.clear()
        Toast.fail(err)
    })
})
</script>

<style lang="scss" scoped>
.specail-detail {
    overflow: hidden;
    width: 100%;
    // height: 200rem;
    header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        background-color: #fff;
        width: 100%;
        nav {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding: 10rem 15rem;
            img {
                height: 20rem;
                outline: none;
            }
            h3 {
                font-size: 15rem;
            }
        }
    }
    main {
        max-height: calc(100vh - 90rem);
        overflow: auto;
        margin-top: 40rem;
        &>img {
            width: 100%;
        }
        &>div {
            box-sizing: border-box;
            padding: 0 20rem;
            h2 {
                font-size: 18rem;
                margin: 20rem 0;
            }
        }
    }
}
</style>