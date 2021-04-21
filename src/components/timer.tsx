import React, { useState } from 'react'
import { TimeDisplay } from '.'
import { IntervalReference } from '../types'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    width: 100vw;
    height: 90vh;
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        flex-direction: column;
    }
`

const ToSettings = styled.button`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.purple};
    height: 10vh;
    font-size: 2vmax;
`

const SPACE_KEY_CODE = 'Space'
const TICK_INTERVAL = 25

export const Timer = ({
    startingTime,
    toggleView,
    increaseAmount,
}: {
    startingTime: number
    toggleView: () => void
    increaseAmount: number
}) => {
    const [timers, setTimers] = useState<[number, number]>([
        startingTime,
        startingTime,
    ])
    const [intervalState, setIntervalReference] = useState<IntervalReference>(
        null
    )
    const [activeTimerIndex, setActiveTimerIndex] = useState<0 | 1>(0)

    const toggleTimers = (): void => {
        const [first, second] = timers

        // Game's done!
        if (first <= 0 || second <= 0) return

        // Don't increment on game start
        const increase = Number(first !== second) * increaseAmount

        if (!!intervalState) clearInterval(intervalState)

        setActiveTimerIndex(
            // Can't XOR here bc TS (unreasonably) believes any number could come back
            activeTimerIndex === 0 ? 1 : 0
        )

        const lastToggled = new Date()

        const newIntervalReference = setInterval(() => {
            const activeTimer = timers[activeTimerIndex]
            const delta = (Date.now() - lastToggled.getTime()) / 1000
            const newRemainingTime = activeTimer - delta

            // Time's up!
            if (newRemainingTime <= 0) clearInterval(newIntervalReference)

            // Change the first timer's remaining amount
            if (activeTimerIndex === 0) {
                setTimers([newRemainingTime, timers[1] + increase])
                return
            }

            // Change the second timer's remaining amount
            setTimers([timers[0] + increase, newRemainingTime])
        }, TICK_INTERVAL)

        setIntervalReference(newIntervalReference)
    }

    const clearTimer = () => {
        intervalState && clearInterval(intervalState)
    }

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.code === SPACE_KEY_CODE) {
            event.preventDefault()
            event.stopPropagation()
            toggleTimers()
        }
    }

    const onToggleView = () => {
        clearTimer()
        toggleView()
    }

    const onToggle = (): void => {
        toggleTimers()
    }

    const [firstTimer, secondTimer] = timers

    return (
        <>
            <Wrapper onKeyDown={onKeyDown}>
                <TimeDisplay time={firstTimer} onClick={onToggle} />
                <TimeDisplay time={secondTimer} onClick={onToggle} />
            </Wrapper>
            <ToSettings onClick={onToggleView}>New Timer</ToSettings>
        </>
    )
}
