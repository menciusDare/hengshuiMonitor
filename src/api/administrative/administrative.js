import {get, post, deletefn, put} from '@/utils/axios'
// 经营方式
export const getTypeOptionsList = () => {
    return  get('/api/regulatory/type/getTypeOptionsList/15')
}