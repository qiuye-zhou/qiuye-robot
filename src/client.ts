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

client.on('system.login.device', (e) => {
    console.log('请选择验证方式:(1：短信验证   其他：扫码验证)')
    process.stdin.once('data', (data) => {
        if (data.toString().trim() === '1') {
            client.sendSmsCode()
            console.log('请输入手机收到的短信验证码:')
            process.stdin.once('data', (res) => {
                client.submitSmsCode(res.toString().trim())
            })
        } else {
            console.log('扫码完成后回车继续：' + e.url)
            process.stdin.once('data', () => {
                client.login()
            })
        }
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