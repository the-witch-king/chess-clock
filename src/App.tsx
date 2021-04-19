import { useState } from 'react'
import { TimerView, Settings } from './components'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { AppSettings, ViewType } from './types'
import { SETTINGS_VIEW, TIMER_VIEW } from './constants'

const App = () => {
    const [settings, setSettings] = useState<AppSettings>({
        activeView: SETTINGS_VIEW,
        startingTime: 300,
        increaseAmount: 0,
    })

    const toggleView = (activeView: ViewType): void => {
        setSettings((settings) => ({
            ...settings,
            activeView,
        }))
    }

    return (
        <ThemeProvider theme={theme}>
            {settings.activeView === SETTINGS_VIEW ? (
                <Settings
                    toggleViews={() => toggleView(TIMER_VIEW)}
                    setSettings={setSettings}
                />
            ) : (
                <TimerView
                    toggleViews={() => toggleView(SETTINGS_VIEW)}
                    startingTime={settings.startingTime}
                    increaseAmount={settings.increaseAmount}
                />
            )}
        </ThemeProvider>
    )
}

export default App
