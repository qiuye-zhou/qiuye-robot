import { praseCommandMessage } from '../../../utils/commandmessage';
import { GroupOnionRoutine } from '../types';
import { isRepeater } from './../../shared/repeater';

export const GeneralMessage: GroupOnionRoutine = async function (event) {
    const messages = event.message

    if(messages.length !== 1) {
        this.next()
        return
    }

    const message = messages[0] as any

    if (message.type = 'text') {
        const text = message.text
        const isCommand = text.startsWith('/')

        if (isCommand) {
            const command = await praseCommandMessage(text, message)
            Object.assign(event, command)
            this.next()
            return
        }
        
        const isping = message.text === 'ping'
        if (isping) {
            return await event.reply('pong')
        }

        const isrepeater: (string | boolean) = await isRepeater(event.group_id.toString(), event)

        if (isrepeater == 'break') {
            return event.reply('打断复读! ! !')
        } else if (isrepeater) {
            return event.reply(message)
        }

        this.abort()
    }
    this.next()
}