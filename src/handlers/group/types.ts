import { GroupMessageEvent, MessageElem } from "icqq";
import { OnionCalleAction } from "../../utils/onion";

export type GroupOnionRoutine = (
    this: OnionCalleAction,
    message: GroupMessageEvent,
  ) => void

  declare module 'icqq' {
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