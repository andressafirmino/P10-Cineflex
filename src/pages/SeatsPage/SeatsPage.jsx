import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios";

export default function SeatsPage() {

    const parametro = useParams();
    const [movie, setMovie] = useState(undefined);
    const [place, setPlace] = useState(undefined);
    const [isSelected, setIsSelected] = useState([]);

    useEffect(() => {
        const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parametro.idSessao}/seats`;
        const promise = axios.get(URL);
        promise.then(resposta => {
            console.log(resposta.data.seats);
            const movieInfo = resposta.data;
            setMovie(movieInfo);
            const places = resposta.data.seats;
            setPlace(places);
        });


    }, [])

    if (movie === undefined) {
        return <div>Carregando...</div>;
    }

    function select() {
        const arraySelected = [...isSelected, place.id]
        setIsSelected(arraySelected);
    }
    return (
        <PageContainer>
            Selecione o(s) assento(s)
            <SeatsContainer>
                {place.map(seat => {
                    if (seat.isAvailable === true) {
                        if (isSelected === [place.id]) {
                            return (<Available key={seat.name} onClick={select}>
                                {seat.name}
                            </Available>
                            )
                        } else {
                            return (<Select key={seat.name} >
                                {seat.name}
                            </Select>
                            )
                        }                        
                    } else {
                        return (
                            <Unavailable key={seat.name}>
                                {seat.name}
                            </Unavailable>
                        )
                    }
                }
                )}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <Select></Select>
                    <p>Selecionado</p>
                </CaptionItem>
                <CaptionItem>
                    <Available></Available>
                    <p>Disponível</p>
                </CaptionItem>
                <CaptionItem>
                    <Unavailable></Unavailable>
                    <p>Indisponível</p>
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={movie.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{movie.movie.title}</p>
                    <p>{movie.day.weekday} - {movie.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;

    div {
        
        display: flex;
        justify-content: space-around;
        align-items: center;

        
    }
    
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

        p {
        font-size: 13px;
        font-weight: 400;
    }
`
const SeatItem = styled.div`
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
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

const Select = styled.div`
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    border: 1px solid #0E7D71;
    background-color: #1AAE9E;
    font-size: 11px;
    font-weight: 400;
`
const Available = styled.div`
height: 25px;
        width: 25px;
        border-radius: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 5px 3px;
    border: 1px solid #7B8B99;
    background-color: #C3CFD9;
    font-size: 11px;
    font-weight: 400;
`
const Unavailable = styled.div`
height: 25px;
        width: 25px;
        border-radius: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 5px 3px;
     border: 1px solid #F7C52B;
    background-color: #FBE192;
    font-size: 11px;
    font-weight: 400;
`