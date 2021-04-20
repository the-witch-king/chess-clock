export type AppSettings = {
    activeView: Symbol
    startingTime: number
    increaseAmount: number
}

export type SettingsForm = {
    minutes: number
    seconds: number
    increaseAmount: number
}

export type TimerDisplayProps = {
    time: number
    onClick: () => void
}

interface Timer {
    timeRemaining: number
    lastTick: Date
    active: boolean
}

export interface RunningTimer extends Timer {
    active: true
}
export interface StoppedTimer extends Timer {
    active: false
}

export type TimerState =
    | { first: RunningTimer; second: StoppedTimer }
    | {
          first: StoppedTimer
          second: RunningTimer
      }

export type IntervalReference = ReturnType<typeof setInterval> | null
