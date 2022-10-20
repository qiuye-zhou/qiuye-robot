import { CronJob } from 'cron'
import { Client } from 'oicq'
import { sample } from 'lodash'
import { RobotConfig } from '~/config'
import { axiosHitokoto } from './apis/hitokoto'

export const register = (client: Client) => {
    const dayMorning = new CronJob('0 0 7 * * *', async () => {
        const strMorning = sample([
            '今天也要好好加油哦！',
            '今天也是美好的一天呀！',
            '今天也要开开心心啊！'
        ])
        const hitmsg = await axiosHitokoto()
        const days = RobotConfig.groupids.map((gid) => {
            client.sendGroupMsg(gid, `早上好！${strMorning}\n\n${hitmsg}`)
        })

        await Promise.all(days)
    })

    const dayEvening = new CronJob('0 0 22 * * *', async () => {
        const hitmsg = await axiosHitokoto()
        const days = RobotConfig.groupids.map((gid) => {
            client.sendGroupMsg(gid, `晚安！要早点睡哦！\n\n${hitmsg}`)
        })

        await Promise.all(days)
    })

    client.on('notice.group.increase', async (e) => {
        if(!RobotConfig.groupids.includes(e.group_id)) return 

        client.sendGroupMsg(e.group_id, [
            { type: 'text', text: '欢迎新大佬' },
            { type: 'at', qq: e.user_id },
        ])
    })

    dayMorning.start()
    dayEvening.start()

    return {
        job: {
            dayMorning,
            dayEvening
        }
    }
}
