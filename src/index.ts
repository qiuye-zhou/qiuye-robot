import { register as registerNotificatios } from './modules/notifications'

async function bootstrap() {
    const { client } = await import('./client')
    client.login()
    
    client.use(registerNotificatios)
}

bootstrap()