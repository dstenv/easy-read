import { MyAxios } from '@/apis/utils'

// 获取首页数据
export const getHomeData = async (date:string) => {
    let {data} = await MyAxios(`channel/one/${date}`)
    return data.data
}
// getHomeData()

// 获取日期选择数据 feeds/list/2022-05
export const getTimeList = async (mon:string) => {
    let {data} = await MyAxios(`feeds/list/${mon}`)
    return data.data
}

// 获取文章详情 需要根据文章类型动态拼接url
export const getPageDetail = async (type: string, id: string) => {
    let {data} = await MyAxios(`${type}/htmlcontent/${id}`)
    // console.log(data);
    return data.data
}

// 获取文章评论 comment/praiseandtime/essay/5635/0
export const getPageComment = async (type: string, id: string, commentId: string) => {
    let {data} = await MyAxios(`comment/praiseandtime/${type}/${id}/${commentId}`)
    return data.data
}
