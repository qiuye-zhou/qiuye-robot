import { Client } from "oicq";

//声明Client有use接口
declare module 'oicq' {
    interface Client {
        use: (registerFun: (client: Client) => any) => any
    }
}

Client.prototype.use = async function(this: Client, registerFun: (client: Client) => any) {
    await registerFun(this)
}