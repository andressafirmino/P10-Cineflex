import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import axios from "axios"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"
import ResetStyle from "./style/ResetStyle"

export default function App() {

    axios.defaults.headers.common['Authorization'] = 'FRRhZyVqP9JHRPgHDlN7TsXg';

    const [movie, setMovie] = useState(undefined);
    const [isSelected, setIsSelected] = useState([]);
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [index, setIndex] = useState([]);

    return (
        <>
            <ResetStyle />
            <BrowserRouter>
                <NavContainer>CINEFLEX</NavContainer>
                <Routes>
                    <Route path='' element={<HomePage />} />
                    <Route path='/assentos/:idSessao' element={<SeatsPage
                        movie={movie} setMovie={setMovie}
                        isSelected={isSelected} setIsSelected={setIsSelected}
                        name={name} setName={setName}
                        cpf={cpf} setCpf={setCpf}
                        index={index} setIndex={setIndex} />} />
                    <Route path='/sessoes/:idFilme' element={<SessionsPage />} />
                    <Route path='/sucesso' element={<SuccessPage
                        movie={movie} name={name} cpf={cpf} index={index} />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    font-weight: 400;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
