import { ChangeEvent, useState } from 'react'
import styled from 'styled-components'
import { buttonColor } from '../style-constants'

const Wrapper = styled.div`
    background: linear-gradient(
        127deg,
        rgba(152, 95, 153, 1) 0%,
        rgba(87, 55, 88, 1) 57%
    );

    width: 100vw;
    height: 100vh;
`
const Content = styled.div`
    max-width: 50%;
    margin: auto;
    padding: 5em;
    @media (max-width: 1100px) {
        max-width: none;
        padding-top: 2em;
        padding-left: 1em;
        padding-right: 1em;
    }
`

const Header = styled.h1`
    font-size: 5vmax;
    margin-top: 0;
`
const Intro = styled.p`
    font-size: 2vmax;
`
const Label = styled.label`
    font-size: 2vmax;
`

const Input = styled.input`
    font-size: 2vmax;
`

const SubHeader = styled.h2`
    font-size: 3.5vmax;
`
const FieldSet = styled.fieldset`
    display: flex;
    min-width: 10vw;
    justify-content: space-between;
    border: none;
    padding-left: 0;
    padding-right: 0;
`

const StartButton = styled.button`
    font-size: 2.5vmax;
    border: none;
    outline: none;
    border-radius: 10px;
    background-color: ${buttonColor};
    padding: 0.5em 1em;
    display: block;
    margin: auto;
    margin-top: 2em;
`

export const Settings = ({
    toggleViews,
    setSettings,
}: {
    toggleViews: () => void
    setSettings: (settings: any) => void
}) => {
    const [clockAmount, setClockAmount] = useState({ minutes: 5, seconds: 0 })
    const [increaseAmount, setIncreaseAmount] = useState(0)

    const handleFormSubmit = () => {
        setClockAmount((clock) => {
            const minutes = clock.minutes + Math.floor(clock.seconds / 60)
            const seconds = clock.seconds % 60

            setSettings((settings: any) => {
                console.log('foo')
                return {
                    ...settings,
                    startingTime: minutes * 60 + seconds,
                    increaseAmount: increaseAmount,
                }
            })

            return { seconds, minutes }
        })

        toggleViews()
    }
    const handleSecondsAmountChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setClockAmount((state) => ({ ...state, seconds: +event.target.value }))
    }

    const handleMinutesAmountChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setClockAmount((state) => ({ ...state, minutes: +event.target.value }))
    }

    const handleIncreaseAmountChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setIncreaseAmount(+event.target.value)
    }

    return (
        <Wrapper>
            <Content>
                <Header>A Chess Clock</Header>
                <Intro>
                    Set the amount of time you'd like each clock to have, and
                    the amount to increase by when switching. Press begin to be
                    taken to the clock screen. On the click screen, either
                    tap/click on the clocks, or press "spacebar" to toggle.
                </Intro>
                <SubHeader>Settings</SubHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleFormSubmit()
                    }}
                >
                    <FieldSet>
                        <Label htmlFor="minutesInput">
                            Clock Minutes Amount:
                        </Label>
                        <Input
                            id="timeInput"
                            type="number"
                            min="0"
                            value={clockAmount.minutes}
                            onChange={handleMinutesAmountChange}
                        />
                    </FieldSet>
                    <FieldSet>
                        <Label htmlFor="secondsInput">
                            Clock Seconds Amount:
                        </Label>
                        <Input
                            id="timeInput"
                            type="number"
                            min="0"
                            value={clockAmount.seconds}
                            onChange={handleSecondsAmountChange}
                        />
                    </FieldSet>
                    <FieldSet>
                        <Label htmlFor="increaseAmount">
                            Time to add on toggle (seconds):
                        </Label>
                        <Input
                            id="increaseAmount"
                            type="number"
                            value={increaseAmount}
                            onChange={handleIncreaseAmountChange}
                        />
                    </FieldSet>

                    <StartButton type="submit">Begin!</StartButton>
                </form>
            </Content>
        </Wrapper>
    )
}
