import { hook } from './utils/plugin'

async function bootstrap() {
    const { client } = await import('./client')
    client.login()
    
    await hook.runAsyncWaterfall(client)
}

bootstrap()