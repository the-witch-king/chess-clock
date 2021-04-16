import { ChangeEvent, useState } from 'react'
import {
    Wrapper,
    Content,
    Header,
    Intro,
    Label,
    Input,
    SubHeader,
    FieldSet,
    StartButton,
} from './settings.styles'

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
