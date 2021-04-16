import { useState } from 'react'
import { TimerView, Settings } from './components'

const SETTINGS_VIEW = Symbol('settings')
const TIMER_VIEW = Symbol('timer')

const App = () => {
    const [settings, setSettings] = useState({
        activeView: SETTINGS_VIEW,
        startingTime: 300,
        increaseAmount: 0,
    })

    const toggleViews = () => {
        setSettings((settings) => ({
            ...settings,
            activeView:
                settings.activeView === SETTINGS_VIEW
                    ? TIMER_VIEW
                    : SETTINGS_VIEW,
        }))
    }

    return (
        <>
            {settings.activeView === SETTINGS_VIEW ? (
                <Settings toggleViews={toggleViews} setSettings={setSettings} />
            ) : (
                <TimerView
                    toggleViews={toggleViews}
                    startingTime={settings.startingTime}
                    increaseAmount={settings.increaseAmount}
                />
            )}
        </>
    )
}

export default App
