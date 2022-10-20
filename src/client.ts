import { createClient, Platform } from 'oicq'
import { RobotConfig } from './config'
import { GroupMessageHandler } from './handlers/group'

import './plugin'

const account = RobotConfig.Uid

const client = createClient(account, {
    platform: Platform.iPad
})

client.on('system.online', () => console.log('Login succeeded'))
client.on('system.login.slider', function (e) {
    console.log('请输入ticket:');
    process.stdin.once('data', (ticket) => {
        this.submitSlider(String(ticket).trim())
    })
}).login(RobotConfig.password)

client.on('message.private', function (e) {
    console.log(e);
})

client.on('message.group', async function (e) {
    const { group_id } = e
    if(RobotConfig.groupids.includes(group_id)) {
        return await GroupMessageHandler(e)
    }
})

export { client }