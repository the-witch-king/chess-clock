import { ChangeEvent, useState } from 'react'
import { AppSettings, SettingsForm } from '../types'
import styled from 'styled-components'

export const Wrapper = styled.div`
    background: linear-gradient(
        127deg,
        ${(props) => props.theme.colors.purple} 0%,
        ${(props) => props.theme.colors.pink} 87%
    );

    width: 100vw;
    height: 100vh;
`
export const Content = styled.div`
    max-width: 600px;
    margin: auto;
    padding: 5em;
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding-top: 20%;
        padding-left: 1em;
        padding-right: 1em;
    }
`

export const Header = styled.h1`
    font-size: 5vmin;
    text-align: center;
    margin-top: 0;
`
export const Intro = styled.p`
    font-size: 2vmin;
`
export const Label = styled.label`
    font-size: 2vmin;
`

export const Input = styled.input`
    font-size: 2vmin;
    border-radius: 5px;
    box-shadow: none;
    border: none;
    outline: none;
    padding: 10px 15px;
    border: 2px solid transparent;
    &:hover {
        border: 2px solid ${({ theme }) => theme.colors.blue + 'aa'};
    }

    &:focus {
        border: 2px solid ${({ theme }) => theme.colors.blue};
    }
    transition: 0.2s;
`

export const SubHeader = styled.h2`
    font-size: 3.5vmin;
`
export const FieldSet = styled.fieldset`
    display: flex;
    align-items: center;
    min-width: 10vw;
    justify-content: space-between;
    border: none;
    padding-left: 0;
    padding-right: 0;
`

export const StartButton = styled.button`
    font-size: 2.5vmin;
    border: none;
    outline: none;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.yellow};
    padding: 0.5em 1em;
    display: block;
    margin: auto;
    margin-top: 2em;
    transition: 0.2s;
    cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => theme.colors.darkYellow};
        box-shadow: 0px 0px 20px -10px black;
    }
`

const defaultSettings: SettingsForm = {
    minutes: 10,
    seconds: 0,
    increaseAmount: 0,
} as const

export const Settings = ({
    toggleView,
    setAppSettings,
}: {
    toggleView: () => void
    setAppSettings: (fn: (settings: AppSettings) => AppSettings) => void
}) => {
    const [
        { minutes, seconds, increaseAmount },
        setFormSettings,
    ] = useState<SettingsForm>(defaultSettings)

    const handleFormSubmit = () => {
        setAppSettings(
            (settings: AppSettings): AppSettings => ({
                ...settings,
                startingTime: minutes * 60 + seconds,
                increaseAmount: increaseAmount,
            })
        )
        toggleView()
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
                    taken to the clock screen. On the clock screen, either
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
                        <Label htmlFor="minutesInput">Minutes:</Label>
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
                        <Label htmlFor="secondsInput">Seconds:</Label>
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
