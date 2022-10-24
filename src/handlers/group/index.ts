import type { GroupMessageEvent, TextElem } from 'oicq'
import { Onion } from 'src/utils/onion'
import { CommandMessage } from '../shared/command'
import { AtMessage } from './type/atmsg'
import { GeneralMessage } from './type/general'
export const GroupMessageHandler = async (e: GroupMessageEvent) => {
    const onionTask = new Onion()

    onionTask.use(
        GeneralMessage,
        AtMessage,
        CommandMessage,
    )

    await onionTask.start(e)
    
    return
}