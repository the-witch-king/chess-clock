import { ChangeEvent, useState } from 'react'
import { SettingsForm } from '../types'
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
    const [
        { minutes, seconds, increaseAmount },
        setFormSettings,
    ] = useState<SettingsForm>({
        minutes: 10,
        seconds: 0,
        increaseAmount: 0,
    })

    const handleFormSubmit = () => {
        setSettings((settings: any) => ({
            ...settings,
            startingTime: minutes * 60 + seconds,
            increaseAmount: increaseAmount,
        }))
        toggleViews()
    }

    const handleSecondsAmountChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setFormSettings((settings: SettingsForm) => ({
            ...settings,
            seconds: +event.target.value,
        }))
    }

    const handleMinutesAmountChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setFormSettings((settings: SettingsForm) => ({
            ...settings,
            minutes: +event.target.value,
        }))
    }

    const handleIncreaseAmountChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setFormSettings((settings) => ({
            ...settings,
            increaseAmount: +event.target.value,
        }))
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
                            value={minutes}
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
                            value={seconds}
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
                            min="0"
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
