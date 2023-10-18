import type { Message } from 'icqq'

const group_idMessageQueue = new Map<string, string[]>()
const num = 3
const breakRepeaterNum = 10

export const isRepeater = async (group_id: string , message: Message) => {
    const stringMes = message.toString()

    if(group_idMessageQueue.has(group_id)) {
        let mesqueue = group_idMessageQueue.get(group_id) ?? []
        const lastmessage = mesqueue.at(-1)

        if(lastmessage === stringMes) {
            mesqueue.push(stringMes)
        } else {
            mesqueue = []
            mesqueue.push(stringMes)
        }

        if(mesqueue.length == num) {
            mesqueue.push(stringMes)
            group_idMessageQueue.set(group_id, [...mesqueue])
            return true
        } else if(mesqueue.length > num) {
            if(mesqueue.length == breakRepeaterNum) {
                mesqueue = []
                group_idMessageQueue.set(group_id, [...mesqueue])
                return 'break'
            }
        }

        group_idMessageQueue.set(group_id, [...mesqueue])
    } else {
        group_idMessageQueue.set(group_id, [stringMes])
    }
    return false
}