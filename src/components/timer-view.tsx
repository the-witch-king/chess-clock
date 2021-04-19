import React, { useState } from 'react'
import { TimeDisplay } from '.'
import { FIRST_TIMER, SECOND_TIMER } from '../constants'
import { Timer, TimerState } from '../types'
import { initializeTimer, toggleTimers, IntervalState } from '../timer'
import styled from 'styled-components'
import { buttonColor } from '../style-constants'

const Wrapper = styled.div`
    display: flex;
    width: 100vw;
    height: 90vh;
`

const ToSettings = styled.button`
    width: 100%;
    background-color: #77cbb9;
    height: 10vh;
    font-size: 2vmax;
    background-color: ${buttonColor};
`

const SPACE_KEY_CODE = 'Space'

export const TimerView = ({
    startingTime,
    toggleViews,
    increaseAmount,
}: {
    startingTime: number
    toggleViews: () => void
    increaseAmount: number
}) => {
    const [state, setState] = useState<TimerState>([
        initializeTimer(startingTime, FIRST_TIMER),
        initializeTimer(startingTime, SECOND_TIMER),
    ])

    const [intervalReference, setIntervalReference] = useState<IntervalState>({
        runningTimerId: SECOND_TIMER,
        intervalReference: null,
    })

    const onToggle = (): void => {
        toggleTimers(
            state,
            setState,
            intervalReference,
            setIntervalReference,
            increaseAmount
        )
    }

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.code === SPACE_KEY_CODE) {
            toggleTimers(
                state,
                setState,
                intervalReference,
                setIntervalReference,
                increaseAmount
            )
            event.preventDefault()
            event.stopPropagation()
        }
    }

    return (
        <>
            <Wrapper onKeyDown={onKeyDown}>
                <TimeDisplay
                    time={
                        state.find((t: Timer) => t.id === FIRST_TIMER)!
                            .timeRemaining
                    }
                    onClick={() => onToggle()}
                />

                <TimeDisplay
                    time={
                        state.find((t: Timer) => t.id === SECOND_TIMER)!
                            .timeRemaining
                    }
                    onClick={() => onToggle()}
                />
            </Wrapper>
            <ToSettings onClick={toggleViews}>&lt; Back To Settings</ToSettings>
        </>
    )
}
