import { useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios";
import { useEffect, useState } from "react";

export default function SessionsPage(props) {

    const [poster, title] = props;
    const [sessoes, setSessoes] = useState(undefined);
    const parametros = useParams();

    useEffect(() => {
        const URL = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${parametros.idFilme}/showtimes`
        const promise = axios.get(URL);
        promise.then(resposta => {
            const sessoesFilme = resposta.data.days;
            const sessaoFilme = resposta.data.days.showtimes;
            setSessoes(sessoesFilme);
        });
        promise.catch();
    }, [])

    if (sessoes === undefined) {
        return <div>Carregando...</div>;
    }

    return (
        <PageContainer>
            Selecione o horário
            <div>
                {sessoes.map(sessao =>
                    <SessionContainer key={sessao.id}>
                        <div>{sessao.weekday} - {sessao.date}</div>
                        <ButtonsContainer>
                            <button><p>{sessao.showtimes[0].name}</p></button>
                            <button><p>{sessao.showtimes[1].name}</p></button>
                        </ButtonsContainer>
                    </SessionContainer>
                )}
            </div>

            <FooterContainer>
                <div>
                    <img src={poster} alt="poster" />
                </div>
                <div>
                    <p>{title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;

    div {
        display: flex;
        justify-content: space-around;
    }
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        width: 82px;
        height: 43px;
        margin-right: 20px;
        background-color: #E8833A;
        border-radius: 3px;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;

        p {
            font-size: 18px;
            font-weight: 400;
            color: #FFFFFF;
        }
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`