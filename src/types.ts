export enum Views {
    settings,
    timer,
}

export type AppSettings = {
    activeView: Views
    startingTime: number
    increaseAmount: number
}

export type SettingsForm = {
    minutes: number
    seconds: number
    increaseAmount: number
}

export type TimeDisplayProps = {
    time: number
    onClick: () => void
}

export type IntervalReference = ReturnType<typeof setInterval> | null
