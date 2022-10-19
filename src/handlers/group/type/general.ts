import type { GroupMessageEvent, MessageElem } from 'oicq'
import { isRepeater } from './../../shared/repeater';

export const GeneralMessage = async (event:GroupMessageEvent, message: MessageElem) => {
    const isrepeater: (string | boolean) = await isRepeater(event.group_id.toString(), event)
    if(isrepeater == 'break') {
        return event.reply('打断复读! ! !')
    } else if(isrepeater) {
        return event.reply(message)
    }

    switch (message.type) {
        case 'text': {
            const isping = message.text === 'ping'
            if(isping) {
                return await event.reply('pong')
            }
        }
    }
}