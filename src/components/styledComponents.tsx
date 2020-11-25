import styled from 'styled-components'

export const Input = styled.input`
    width: 100%;
    height: 36px;
    border: 2px solid #61dafb;
    border-radius: 5px;
    background-color: #282c34;
    margin-bottom: 25px;
    color: #61dafb;
    font-size: 1em;
    padding-left: 5px;
    ::placeholder,
    ::-webkit-input-placeholder {
    color: #5d8996;
    }
    :-ms-input-placeholder {
        color: #5d8996;
    }
`

export const Form = styled.form`
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Button = styled.button`
    width: 100%;
    height: 36px;
    border: 2px solid #61dafb;
    border-radius: 10px;
    background-color: #282c34;
    color: #61dafb;
    text-align: center;
    font-size: 1em;
    :hover {
        border-width: 3px;
    }
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1600;
`
export const Label = styled.h3`
    color: #5d8996;
    margin: 0;
`
