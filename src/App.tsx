import { useState } from 'react'
import { TimerView, Settings } from './components'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { AppSettings, Views } from './types'
import { defaultSettings } from 'utils'

const App = () => {
    const [appSettings, setAppSettings] = useState<AppSettings>(
        defaultSettings()
    )

    const toggleView = (activeView: Views): void => {
        setAppSettings((settings) => ({
            ...settings,
            activeView,
        }))
    }

    const settingsView = (
        <Settings
            toggleViews={() => toggleView(Views.CLOCK_VIEW)}
            setSettings={setAppSettings}
        />
    )

    const timerView = (
        <TimerView
            toggleView={() => toggleView(Views.SETTINGS_VIEW)}
            startingTime={appSettings.startTime}
            increaseAmount={appSettings.increaseAmount}
        />
    )

    return (
        <ThemeProvider theme={theme}>
            {appSettings.activeView === Views.SETTINGS_VIEW
                ? settingsView
                : timerView}
        </ThemeProvider>
    )
}

export default App
