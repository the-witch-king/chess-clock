import { useState } from 'react'
import './App.css'
import { TimerDisplay } from './components'
import {
    FIRST_TIMER,
    SECOND_TIMER,
    initializeTimer,
    Timer,
    TimerState,
    toggleTimers,
    IntervalState,
} from './timer'

function App() {
    const [state, setState] = useState<TimerState>([
        initializeTimer(300, FIRST_TIMER),
        initializeTimer(300, SECOND_TIMER),
    ])

    const [intervalReference, setIntervalReference] = useState<IntervalState>({
        runningTimerId: SECOND_TIMER,
        intervalReference: null,
    })

    const onToggle = (): void => {
        toggleTimers(state, setState, intervalReference, setIntervalReference)
    }

    return (
        <>
            <TimerDisplay
                timeToDisplay={
                    state.find((t: Timer) => t.id === FIRST_TIMER)
                        ?.timeRemaining
                }
                onClick={() => onToggle()}
            />

            <TimerDisplay
                timeToDisplay={
                    state.find((t: Timer) => t.id === SECOND_TIMER)
                        ?.timeRemaining
                }
                onClick={() => onToggle()}
            />
        </>
    )
}

export default App
