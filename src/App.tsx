import { useState } from 'react'
import { TimerView, Settings } from './components'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { AppSettings, Views } from './types'

const defaultSettings: AppSettings = {
    activeView: Views.settings,
    startingTime: 0, // Settings view will set this
    increaseAmount: 0,
} as const

const App = () => {
    const [appSettings, setAppSettings] = useState<AppSettings>(defaultSettings)

    const toggleView = (activeView: Views): void => {
        setAppSettings((settings) => ({
            ...settings,
            activeView,
        }))
    }

    const settingsView = (
        <Settings
            toggleView={() => toggleView(Views.timer)}
            setAppSettings={setAppSettings}
        />
    )

    const timerView = (
        <TimerView
            toggleView={() => toggleView(Views.settings)}
            startingTime={appSettings.startingTime}
            increaseAmount={appSettings.increaseAmount}
        />
    )

    return (
        <ThemeProvider theme={theme}>
            {appSettings.activeView === Views.settings
                ? settingsView
                : timerView}
        </ThemeProvider>
    )
}

export default App
