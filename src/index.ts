async function bootstrap() {
    console.log('bootstrap');
    const { client } = await import('./client')
    client.login()
}

bootstrap()