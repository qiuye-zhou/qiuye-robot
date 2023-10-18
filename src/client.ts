import { createClient, Platform } from 'icqq'
import { RobotConfig } from './config'
import { GroupMessageHandler } from './handlers/group'

const client = createClient({
    platform: Platform.Watch
})

client.on('system.online', () => console.log('Login succeeded'))
client.on('system.login.slider', function (e) {
    console.log(`请输入滑块地址获取的ticket: \n滑块地址：   ${e.url}`);
    process.stdin.once('data', (data) => {
        client.submitSlider(data.toString().trim())
    })
})
client.on('system.login.qrcode', (e) => {
    console.log('扫码完成后回车继续：   ')
    process.stdin.once('data', () => {
      client.login()
    })
})

client.login(RobotConfig.Uid, RobotConfig.password)

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