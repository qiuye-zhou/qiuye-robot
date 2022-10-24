export interface OnionCalleAction {
    abort: () => void
    next: () => Promise<void> | void
}

export class OnionAbortError extends Error {
    get [Symbol.toStringTag]() {
        return 'OnionAbortError'
    }
}

type Calle<Args extends any[] = any[], Ctx extends Record<string, any> = {}>
 = (this: OnionCalleAction & Ctx, ...args: Args) => void | Promise<void>

class Runnel<Args extends any[] = any[], Ctx extends Record<string, any> = any> {
    private calle: Calle<Args, Ctx> = null!// ! 非空断言
    private nextStratu: Runnel<Args, Ctx> | null = null
    private ctx: Ctx = null as any

    constructor(private readonly option: {
        nextStratu: Runnel<Args, Ctx> |null
        calle: Calle<Args, Ctx>
        ctx?: Ctx
    }) {
        this.calle = option.calle
        this.nextStratu = option.nextStratu
        this.ctx = (option.ctx || {}) as any
    }

    public setNextStratu(runnel: Runnel<Args, Ctx>) {
        this.nextStratu = runnel
    }

    public async run(args: Args) {
        const calleAction: OnionCalleAction = {
            abort() {
                throw new OnionAbortError()
            },
            next: async () => {
                if (this.nextStratu) {
                    await this.nextStratu.run(args)
                }
            },
        }

        try {
            await this.calle.call(Object.assign({}, calleAction, this.ctx), ...args)
        } catch (error) {
            if (error) {
                return
            }
            throw error
        }
    }
}

export class Onion<Args extends any[] = any[], Ctx extends Record<string, any> = any> {
    private queue: Runnel<Args, Ctx>[] = []
    private ctx: Ctx
    constructor(ctx?: Ctx) {
        this.queue = []
        this.ctx = ctx ?? {} as any
    }

    use(...actions: ((...args: Args) => void)[]) {
        for (let i = 0; i < actions.length; i++) {
            this.queue.push(new Runnel({
                nextStratu: null,
                calle: actions[i]
            }))
        }

        for (let i = 0; i < actions.length - 1; i++) {
            const currRunnel = this.queue[i]
            const nextRunnel = this.queue[i + 1]
            if (nextRunnel) {
                currRunnel.setNextStratu(nextRunnel)
            }
        }
    }

    async start(...args: Args) {
        const runnel = this.queue[0]

        if (runnel) {
            await runnel.run(args)
            return
        }
    }
}