import axios from 'axios'

export const axiosfanyi: any = async (texts: string) => {
    return (await axios.get(`http://fanyi.youdao.com/translate?&doctype=json&type=AUTO`, { params: {i: texts},timeout: 3000 })).data
}