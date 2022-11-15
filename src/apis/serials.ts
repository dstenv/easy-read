import { MyAxios } from "./utils"

// 获取年度连载列表
export const getSerialByYear = async (year: number) => {
    let {data} = await MyAxios(`find/serial/byyear/${year}`)
    return data.data
}

// 获取连载章节列表  find/serial/list/
export const getAllSerial = async (id: string) => {
    let { data } = await MyAxios(`find/serial/list/${id}`)
    return data.data
}