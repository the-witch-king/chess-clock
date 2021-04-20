import React, { useState } from 'react'
import { TimerDisplay } from '.'
import { TimerState, IntervalReference } from '../types'

import styled from 'styled-components'

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
    background-color: blue;
`

const SPACE_KEY_CODE = 'Space'
const TICK_INTERVAL = 25

export const TimerView = ({
    startingTime,
    toggleViews,
    increaseAmount,
}: {
    startingTime: number
    toggleViews: () => void
    increaseAmount: number
}) => {
    const [state, setState] = useState<TimerState>({
        first: {
            lastTick: new Date(),
            timeRemaining: startingTime,
            active: false,
        },
        second: {
            lastTick: new Date(),
            timeRemaining: startingTime,
            active: true,
        },
    })

    const [intervalState, setIntervalReference] = useState<IntervalReference>(
        null
    )

    const toggleTimers = (): void => {
        const { first, second } = state

        // Game's done!
        if (first.timeRemaining <= 0 || second.timeRemaining <= 0) return

        // Don't increment on game start
        const shouldIncrementTime = Number(
            first.timeRemaining !== second.timeRemaining
        )

        const newFirst = {
            lastTick: new Date(),
            active: !first.active,
            timeRemaining:
                first.timeRemaining +
                shouldIncrementTime * Number(first.active) * increaseAmount,
        }

        const newSecond = {
            lastTick: new Date(),
            active: !second.active,
            timeRemaining:
                second.timeRemaining +
                shouldIncrementTime * Number(second.active) * increaseAmount,
        }

        !!intervalState && clearInterval(intervalState)

        const newIntervalReference = setInterval(() => {
            const activeTimer = newFirst.active ? newFirst : newSecond
            const now = new Date()
            const delta =
                (now.getTime() - activeTimer.lastTick.getTime()) / 1000
            const newRemainingTime = activeTimer.timeRemaining - delta

            if (newRemainingTime <= 0) {
                clearInterval(newIntervalReference)
            }

            setState(
                newFirst.active
                    ? {
                          first: {
                              lastTick: now,
                              active: true,
                              timeRemaining: newRemainingTime,
                          },
                          second: { ...newSecond, active: false },
                      }
                    : {
                          first: { ...newFirst, active: false },
                          second: {
                              lastTick: now,
                              active: true,
                              timeRemaining: newRemainingTime,
                          },
                      }
            )
        }, TICK_INTERVAL)

        setIntervalReference(newIntervalReference)
    }

    const clearTimer = () => {
        intervalState && clearInterval(intervalState)
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
                <TimerDisplay
                    time={state.first.timeRemaining}
                    onClick={() => onToggle()}
                />

                <TimerDisplay
                    time={state.second.timeRemaining}
                    onClick={() => onToggle()}
                />
            </Wrapper>
            <ToSettings onClick={onToggleViews}>
                &lt; Back To Settings
            </ToSettings>
        </>
    )
}
