import axios from 'axios'

export const axiosHitokoto = async () => {
    return (await axios.get('https://v1.hitokoto.cn/', { timeout: 3000 })).data.hitokoto
}