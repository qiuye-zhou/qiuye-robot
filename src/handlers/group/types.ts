import { GroupMessageEvent, MessageElem } from "oicq";
import { OnionCalleAction } from "src/utils/onion";

export type GroupOnionRoutine = (
    this: OnionCalleAction,
    message: GroupMessageEvent,
  ) => void

  declare module 'oicq' {
    interface TextElem {
      commandName?: string
      commandArgs?: string[]
      messageElems?: MessageElem[]
    }

    export interface GroupMessageEvent {
        commandName?: string
        commandArgs?: string[]    
        isQuote?: boolean
      }
  }