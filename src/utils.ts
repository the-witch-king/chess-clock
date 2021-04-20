import { AppSettings, Views } from 'types'

/**
 * Creates a default settings object with zero values.
 * The caller of this function is free to modify these values.
 */
export function defaultSettings(): AppSettings {
    return {
        activeView: Views.SETTINGS_VIEW,
        startTime: 0,
        increaseAmount: 0,
    }
}
