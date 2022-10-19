import type { GroupMessageEvent, TextElem } from 'oicq'
import { performance } from 'node:perf_hooks';
import PACKAGE from '../../../package.json'

export const CommandMessage = async (event: GroupMessageEvent, message: TextElem, isquote?: boolean) => {
    if(!message) return
    const command = message.text.trim().slice(1)
    const arrs = command.split('—')
    const commandName = arrs[0]
    switch (commandName) {
        case 'ping':
            return event.reply('pong', isquote)
    
        case 'version':
            return event.reply(
                `qiuye-robot: v${PACKAGE.version}` +
                `\nauther: qiuye\nframework: oicq`,
                isquote,
            )
        case 'uptime': {
            const Time = performance.now()
            console.log(Time);
            
            const Month = 24 * 60 * 60 * 1000
            const day = Time / Month
            const Day = Math.floor(day)
            const hour = (day - Day) * 24
            const Hour = Math.floor(hour)
            const minute = (hour - Hour) * 60
            const Minute = Math.floor(minute)
            const Second = Math.floor((minute - Minute) * 60)

            return event.reply(`已经运行：${Day}天${Hour}小时${Minute}分${Second}秒`, isquote)
        }

            
        default:
            break;
    }
}