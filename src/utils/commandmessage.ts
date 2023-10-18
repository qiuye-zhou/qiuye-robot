import { TextElem } from "icqq";

export const praseCommandMessage = async (messageText: string, messageEle?: TextElem) => {
    const args = messageText.split('—')
    const commandName = args[0].trim()

    const command = {
        commandName: String(commandName).slice(1),
        commandArgs: args
    }

    if (messageEle) {
        messageEle.commandName = commandName
        messageEle.commandArgs = args
    }

    return command
}