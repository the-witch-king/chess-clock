import styled from 'styled-components'

export const Wrapper = styled.div`
    background: linear-gradient(
        127deg,
        rgba(152, 95, 153, 1) 0%,
        rgba(87, 55, 88, 1) 57%
    );

    width: 100vw;
    height: 100vh;
`
export const Content = styled.div`
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

export const Header = styled.h1`
    font-size: 5vmin;
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
`

export const SubHeader = styled.h2`
    font-size: 3.5vmin;
`
export const FieldSet = styled.fieldset`
    display: flex;
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
    background-color: blue;
    padding: 0.5em 1em;
    display: block;
    margin: auto;
    margin-top: 2em;
`
