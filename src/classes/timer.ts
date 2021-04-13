import { Dispatch, SetStateAction } from 'react'

export class Timer {
    initialAmount = 300
    timeRemaining: number = 300
    runnerId: number = 0
    startedAt: Date = new Date()

    start(setState: Dispatch<SetStateAction<{ timer: Timer }>>) {
        this.startedAt = new Date()
        const timeAtStart = this.timeRemaining

        this.runnerId = (setInterval(() => {
            const delta =
                Math.floor(Date.now() - this.startedAt.getTime()) / 1000
            this.timeRemaining = timeAtStart - delta
            setState({ timer: this })
        }, 100) as unknown) as number
    }

    stop() {
        clearInterval(this.runnerId)
    }
}
