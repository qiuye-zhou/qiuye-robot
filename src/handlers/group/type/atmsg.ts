import { GroupMessageEvent, MessageElem, TextElem } from "oicq";
import { CommandMessage } from "~/handlers/shared/command";


export const AtMessage = async (event: GroupMessageEvent, message: MessageElem[]) => {
    const atMessage: TextElem = message[1] as TextElem

    if(atMessage) {
        const isText = atMessage.type = 'text'
        const isCommand = isText && atMessage.text.trim().startsWith('/')
        const isPing = isText && (atMessage.text.trim() == 'ping')

        if(isCommand) {
            return await CommandMessage(event, atMessage, true)
        }
        if(isPing) {
            return event.reply('pong', true)
        }
    }
}