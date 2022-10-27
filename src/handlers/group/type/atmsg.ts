import { GroupOnionRoutine } from "../types";
import { praseCommandMessage } from './../../../utils/commandmessage';
import { RobotConfig } from './../../../config';
import { sample } from "lodash";
import { AtElem } from "oicq";


export const AtMessage: GroupOnionRoutine = async function (event) {
    const messages = event.message
    const atMessageIndex = messages.findIndex((e) => {
        if ((e as AtElem).qq ===RobotConfig.Uid) {
            return e.type === 'at'
        }
    })

    if (atMessageIndex < 0) {
        this.next()
        return
    }

    const afterText = messages[atMessageIndex + 1] as any

    if (afterText && afterText.text !== ' ') {
        const isText = afterText.type = 'text'

        if (isText) {
            const command = await praseCommandMessage(afterText.text, afterText)
            Object.assign(event, command)
            event.isQuote = true

            return this.next()
        }
    } else {
        if(event.sender.user_id == RobotConfig.master) {
            const result = sample(['有什么事情吗','盯...盯...','我在听呢'])
            event.reply(`${result}`)
        } else {
            const result = sample(['没事别艾特我了！！','你想说什么','盯...盯...','没事别瞎整了！'])
            event.reply(`${result}`)
        }
    }

    this.abort()
}