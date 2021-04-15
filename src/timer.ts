import { Dispatch, SetStateAction } from 'react'

const TICK_INTERVAL = 25

export const FIRST_TIMER = Symbol('firstTimer')
export const SECOND_TIMER = Symbol('secondTimer')

/** Types */
export type Timer = {
    timeRemaining: number
    id: Symbol
    lastTick: Date
}
export type TimerState = [Timer, Timer]

/** Functions */
export const initializeTimer = (allotedTime: number, id: Symbol): Timer => ({
    lastTick: new Date(),
    timeRemaining: allotedTime,
    id,
})

export type IntervalState = {
    intervalReference: ReturnType<typeof setInterval> | null
    runningTimerId: Symbol
}

const isTimerRunning = (timer: Timer, id: Symbol): boolean => timer.id === id

export const toggleTimers = (
    [firstTimer, secondTimer]: TimerState,
    setState: Dispatch<SetStateAction<TimerState>>,
    { runningTimerId, intervalReference }: IntervalState,
    setIntervalReference: Dispatch<SetStateAction<IntervalState>>
): void => {
    // Game's done!
    if (firstTimer.timeRemaining <= 0 || secondTimer.timeRemaining <= 0) return

    let timerToStart: Timer
    let timerToStop: Timer

    if (isTimerRunning(firstTimer, runningTimerId)) {
        timerToStart = { ...secondTimer, lastTick: new Date() }
        timerToStop = firstTimer
    } else {
        timerToStart = { ...firstTimer, lastTick: new Date() }
        timerToStop = secondTimer
    }

    if (!!intervalReference) clearInterval(intervalReference)

    const newIntervalReference = setInterval(() => {
        const now = new Date()
        const delta =
            Math.floor(now.getTime() - timerToStart.lastTick.getTime()) / 1000
        const newRemainingTime = timerToStart.timeRemaining - delta

        setState(() => [
            {
                timeRemaining: newRemainingTime,
                lastTick: now,
                id: timerToStart.id,
            },
            {
                timeRemaining: timerToStop.timeRemaining,
                lastTick: new Date(),
                id: timerToStop.id,
            },
        ])

        if (newRemainingTime <= 0) {
            clearInterval(newIntervalReference)
        }
    }, TICK_INTERVAL)

    setIntervalReference({
        intervalReference: newIntervalReference,
        runningTimerId: timerToStart.id,
    })
}
