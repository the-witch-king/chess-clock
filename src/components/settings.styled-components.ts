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
