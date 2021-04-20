import React, { useEffect, useState } from 'react'
import { TimeDisplay } from '.'
import { FIRST_TIMER, SECOND_TIMER, TICK_INTERVAL } from '../constants'
import { Timer, TimerState, IntervalState, TimerId } from '../types'

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

const initializeTimer = (allotedTime: number, id: TimerId): Timer => ({
    lastTick: new Date(),
    timeRemaining: allotedTime,
    id,
})

const isTimerRunning = (timer: Timer, id: Symbol): boolean => timer.id === id

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

    const [intervalState, setIntervalReference] = useState<IntervalState>({
        runningTimerId: SECOND_TIMER,
        intervalReference: null,
    })

    const toggleTimers = (): void => {
        const [firstTimer, secondTimer] = state
        const { runningTimerId, intervalReference } = intervalState

        // Game's done!
        if (firstTimer.timeRemaining <= 0 || secondTimer.timeRemaining <= 0)
            return

        let timerToStart: Timer
        let timerToStop: Timer

        if (isTimerRunning(firstTimer, runningTimerId)) {
            timerToStart = { ...secondTimer, lastTick: new Date() }
            timerToStop = firstTimer
        } else {
            timerToStart = { ...firstTimer, lastTick: new Date() }
            timerToStop = secondTimer
        }

        // Initial state, don't add time on starting the clocks for first time
        if (timerToStop.timeRemaining !== timerToStart.timeRemaining) {
            timerToStop.timeRemaining += increaseAmount
        }

        if (!!intervalReference) clearInterval(intervalReference)

        const newIntervalReference = setInterval(() => {
            const now = new Date()
            const delta =
                Math.floor(now.getTime() - timerToStart.lastTick.getTime()) /
                1000
            const newRemainingTime = timerToStart.timeRemaining - delta

            setState(() => [
                {
                    timeRemaining: newRemainingTime,
                    lastTick: now,
                    id: timerToStart.id,
                },
                {
                    timeRemaining: timerToStop.timeRemaining,
                    lastTick: new Date(),
                    id: timerToStop.id,
                },
            ])

            if (newRemainingTime <= 0) {
                clearInterval(newIntervalReference)
            }
        }, TICK_INTERVAL)

        setIntervalReference({
            intervalReference: newIntervalReference,
            runningTimerId: timerToStart.id,
        })
    }

    const clearTimer = () => {
        clearInterval(
            (intervalState.intervalReference as unknown) as ReturnType<
                typeof setInterval
            >
        )
    }

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.code === SPACE_KEY_CODE) {
            toggleTimers()
            event.preventDefault()
            event.stopPropagation()
        }
    }

    const onToggleViews = () => {
        clearTimer()
        toggleViews()
    }

    const onToggle = (): void => {
        toggleTimers()
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
            <ToSettings onClick={onToggleViews}>
                &lt; Back To Settings
            </ToSettings>
        </>
    )
}
