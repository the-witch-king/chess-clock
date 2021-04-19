import {
    FIRST_TIMER,
    SECOND_TIMER,
    SETTINGS_VIEW,
    TIMER_VIEW,
} from './constants'

export type ViewType = typeof SETTINGS_VIEW | typeof TIMER_VIEW

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

export type TimerId = typeof FIRST_TIMER | typeof SECOND_TIMER

export type Timer = {
    timeRemaining: number
    id: TimerId
    lastTick: Date
}
export type TimerState = [Timer, Timer]

export type IntervalState = {
    intervalReference: ReturnType<typeof setInterval> | null
    runningTimerId: TimerId
}
