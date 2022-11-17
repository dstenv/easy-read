import axios from 'axios'
import { useShareStore,useCounterStore } from '@/stores/counter'
import pinia from '@/stores/store' 
import { storeToRefs } from 'pinia';


const useStore = useCounterStore(pinia)
const { baseAxiosUrl } = useStore

const shareStore = useShareStore()
const { showShare } = storeToRefs(shareStore)

export const MyAxios = async (url:string, params = {}) => {
    let res = await axios({
        method: 'get',
        url: baseAxiosUrl + url,
        params
    })
    return res
}

export const setShare = (url: string):void => {
    shareStore.setShowShare(true) 
    shareStore.setShareUrl(url)
}

import { useAudioStore } from '@/stores/counter'
import {getPageDetail} from './home'
import type { Router } from 'vue-router';
import { Toast } from 'vant';
const audioStore = useAudioStore()
const { playArtist,isPlay,radioIsPlay }  = storeToRefs(audioStore)

export const setAudioArtist = async (type: string,id: string,isChange: boolean) => {
    if(isChange) {
        audioStore.setRadioIsPlay(!radioIsPlay.value)
    }else {
        let res:PageContent = await getPageDetail(type,id)
        console.log(res);
        audioStore.setPlayArtist({
            id,
            title: res.title,
            auchor: res.author_list[0].user_name,
            url: res.audio,
            type
        })
        audioStore.setRadioIsPlay(true)
    }
}


export const faviorArtist = (router: Router, type: string,data: localPic | localMusic | localArtist,isDelete: boolean) => {
    let local_token = localStorage.token
    let users = localStorage.usersInfo
    if(isDelete) {
        // 执行删除操作
        // console.log('删除',data);
        let localList:Array<localPic | localMusic | localArtist> = JSON.parse(localStorage.getItem(`${type}List`) as string)
        localList = localList.filter((v:localPic | localMusic | localArtist) => v.id != data.id)
        // console.log(localList);
        localStorage.setItem(`${type}List`, JSON.stringify(localList))
        Toast.success('删除成功')
    }
    else if(local_token && users && JSON.parse(users).filter((v: localUser) => v.token == JSON.parse(local_token)).length > 0) {
        // 可以收藏
        console.log('收藏成功',type,data);
        let localList:string | Array<localPic | localMusic | localArtist> = localStorage.getItem(`${type}List`) as string
        if(localList) {
            localList = JSON.parse(localList) as Array<localPic | localMusic | localArtist>
            localList.push(data)
            localStorage.setItem(`${type}List`, JSON.stringify(localList))
        }else {
            localList = [
                data
            ]
            localStorage.setItem(`${type}List`, JSON.stringify(localList))
        }
        Toast.success('收藏成功')
    }else {
        // 跳转到登录页
        Toast.fail('未登录！')
        router.push('/login')
    }
}

export function getIconUrl(url: string) {
    return new URL(`../assets/Icon/${url}`, import.meta.url).href
}

export function getImageUrl(url: string) {
    return new URL(`../assets/Image/${url}`, import.meta.url).href
}


