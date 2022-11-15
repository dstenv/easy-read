import { MyAxios } from "./utils"

// 根据筛选列表请求数据
export const getListData = async (url: string) => {
    let {data} = await MyAxios(url, {})
    return data.data
}

// 获取图文详情  hp/bydate/
export const getPicDetail = async (date: string) => {
    let {data} = await MyAxios(`hp/bydate/${date}`)
    return data.data
}

// 获取完整榜单
export const getAllBrank = async (url: string,brankId:string) => {
    let {data} = await MyAxios(`${url}/${brankId}`)
    return data.data
}