import React, { useState } from 'react'
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
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
`

const SPACE_KEY_CODE = 'Space'

function App() {
    const [state, setState] = useState<TimerState>([
        initializeTimer(5, FIRST_TIMER),
        initializeTimer(5, SECOND_TIMER),
    ])

    const [intervalReference, setIntervalReference] = useState<IntervalState>({
        runningTimerId: SECOND_TIMER,
        intervalReference: null,
    })

    const onToggle = (): void => {
        toggleTimers(state, setState, intervalReference, setIntervalReference)
    }

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.code === SPACE_KEY_CODE) {
            toggleTimers(
                state,
                setState,
                intervalReference,
                setIntervalReference
            )
            event.preventDefault()
            event.stopPropagation()
        }
    }

    return (
        <Wrapper onKeyDown={onKeyDown}>
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
        </Wrapper>
    )
}

export default App
