import { ref } from "vue";

export default function useCheckHave (type: string,checkFilter: string) {
    const isHave = ref<boolean>(false)

    const isHaveFun = ():void => {
        let picList:string | Array<localPic | localMusic> = localStorage.getItem(`${type}List`) as string
        console.log(type,checkFilter);
        if(picList) {
            picList = JSON.parse(picList) as Array<localPic | localMusic>
            console.log(picList,checkFilter);
            if(picList.filter((v: localPic | localMusic) => v.id == checkFilter).length > 0) {
                isHave.value = true
                return
            }
            isHave.value = false
            return
        }
        isHave.value = false
    }

    return {
        isHave,
        isHaveFun
    }
}