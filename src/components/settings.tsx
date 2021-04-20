import { ChangeEvent, useState } from 'react'
import { AppSettings, SettingsForm } from '../types'
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
} from './settings.styled-components'

export const Settings = ({
    toggleViews,
    setSettings,
}: {
    toggleViews: () => void
    setSettings: (fn: (settings: AppSettings) => AppSettings) => void
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
        setSettings(
            (settings: AppSettings): AppSettings => ({
                ...settings,
                startingTime: minutes * 60 + seconds,
                increaseAmount: increaseAmount,
            })
        )
        toggleViews()
    }

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement>,
        key: keyof SettingsForm
    ): void =>
        setFormSettings((settings: SettingsForm) => ({
            ...settings,
            [key]: +event.target.value,
        }))

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
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                handleInputChange(event, 'minutes')
                            }
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
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                handleInputChange(event, 'seconds')
                            }
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
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                handleInputChange(event, 'increaseAmount')
                            }
                        />
                    </FieldSet>

                    <StartButton type="submit">Begin!</StartButton>
                </form>
            </Content>
        </Wrapper>
    )
}
