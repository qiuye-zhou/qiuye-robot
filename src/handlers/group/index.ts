import type { GroupMessageEvent, TextElem } from 'oicq'
import { CommandMessage } from '../shared/command'
import { GeneralMessage } from './type/general'
export const GroupMessageHandler = async (e: GroupMessageEvent) => {
    const isGeneralMessage = e.message.length === 1
    const isAtMessage = e.message[0].type === 'at'
    const isCommandMessage = e.message[0].type === 'text' && e.message[0].text.trim().startsWith('/')

    if(isAtMessage) {
        console.log('isAtMessage');
    }
    if(isCommandMessage) {
        console.log('isCommandMessage');
        return await CommandMessage(e, e.message[0] as TextElem)
    }
    if(isGeneralMessage) {
        console.log('isGeneralMessage');
        return await GeneralMessage(e, e.message[0])
    }
}