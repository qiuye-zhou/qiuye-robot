import type { GroupMessageEvent, TextElem } from 'oicq'
import { performance } from 'node:perf_hooks';
import PACKAGE from '../../../package.json'
import { axiosfanyi } from './apis/fanyi';
import { GroupOnionRoutine } from '../group/types';
import { sample } from 'lodash';
import { RobotConfig } from 'src/config';

export const CommandMessage: GroupOnionRoutine = async function (event) {
    if (!event.commandName) {
        this.next()
        return
    }
    const { commandName, commandArgs = [''], isQuote = false } = event
    switch (commandName) {
        case 'ping':
            return event.reply('pong', isQuote)
    
        case 'version':
            return event.reply(
                `qiuye-robot: v${PACKAGE.version}` +
                `\nauther: qiuye\nframework: oicq`,
                isQuote,
            )
        case 'uptime': {
            const Time = performance.now()
            const Month = 24 * 60 * 60 * 1000
            const day = Time / Month
            const Day = Math.floor(day)
            const hour = (day - Day) * 24
            const Hour = Math.floor(hour)
            const minute = (hour - Hour) * 60
            const Minute = Math.floor(minute)
            const Second = Math.floor((minute - Minute) * 60)

            return event.reply(`已经运行：${Day}天${Hour}小时${Minute}分${Second}秒`, isQuote)
        }
        case 'help': {
            if(event.sender.user_id == RobotConfig.master) {
                const result = sample(['你自己写的都不知道吗','......'])
                return event.reply(`${result}`, isQuote)
            } else {
                const result = sample(['看文档去吧你！','问Master去！','地址给你了去看吧：https://github.com/qiuye-zhou/qiuye-robot/blob/main/README.md'])
                return event.reply(`${result}`, isQuote)
            }
        }

        case 'tr': {
            const texts = commandArgs[1]
            
            if(texts == '') break;
            try {
                const data = await axiosfanyi(texts)
                let fanyitext = ''
                data.translateResult[0].forEach((e: { tgt: string; }) => {
                    fanyitext +=e.tgt
                })
                return event.reply(`Type:${data.type}\n\n翻译：${fanyitext}`, isQuote)
            } catch (error) {
                return event.reply(`翻译接口出现错误\n\nMaster快去修东西bug呀！\n\nerror: ${error}`, isQuote)
            }
        }

            
        default: {
            if(event.sender.user_id == RobotConfig.master) {
                const result = sample(['盯...盯...','唔...听不懂...','唔...是不是命令敲错了...'])
                return event.reply(`${result}`, isQuote)
            } else {
                const result = sample(['你是不是敲错了命令！','盯...盯...','Master他们在敲什么东西啊！','没事别瞎整了！'])
                return event.reply(`${result}`, isQuote)
            }
        }
            break;
    }

    //没有匹配结束
    this.abort()
}