import { SETTINGS_VIEW, TIMER_VIEW } from './constants'

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
