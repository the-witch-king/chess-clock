import { ChangeEvent, useState } from 'react'

export const Settings = ({
    toggleViews,
    setSettings,
}: {
    toggleViews: () => void
    setSettings: (settings: any) => void
}) => {
    const [clockAmount, setClockAmount] = useState(100)

    const handleFormSubmit = () => {
        setSettings((settings: any) => ({
            ...settings,
            startingTime: clockAmount,
        }))
        toggleViews()
    }
    const handleClockAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        setClockAmount(+event.target.value)
    }

    return (
        <>
            <h1>Settings</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    handleFormSubmit()
                }}
            >
                <label htmlFor="timeInput">Clock Time Amount:</label>
                <input
                    id="timeInput"
                    type="number"
                    value={clockAmount}
                    onChange={handleClockAmountChange}
                />

                <button type="submit">Begin!</button>
            </form>
        </>
    )
}
