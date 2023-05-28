import { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom"
import styled from "styled-components"
import axios from "axios";

export default function SeatsPage(props) {

    const {movie, setMovie, isSelected, setIsSelected, name, setName, cpf, setCpf, index, setIndex} = props;
    const parametro = useParams();
    const [place, setPlace] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parametro.idSessao}/seats`;
        const promise = axios.get(URL);
        promise.then(resposta => {
            const movieInfo = resposta.data;
            setMovie(movieInfo);
            const places = movieInfo.seats;
            setPlace(places);
        });


    }, [])

    if (movie === undefined) {
        return <div>Carregando...</div>;
    }

    function select(id, name) {
        let newId = [...index, name]
        setIndex(newId);
        const newArray = [...isSelected, id];
        setIsSelected(newArray);
        console.log(newId);
    }
    function desselect(id, name) {
        const newArray = [... isSelected];
        let position = newArray.indexOf(id);
        let remove = newArray.splice(position, 1);   
        setIsSelected(newArray);
        const newId = [... index];
        let positionId = newId.indexOf(name);
        let removeID = newId.splice(positionId, 1);   
        setIndex(newId);
    }
    function send(e) {
        e.preventDefault();

        const reserve = {
            ids: isSelected,
            name: name,
            cpf: cpf
        }

        const URL_API = 'https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many';
        const promise = axios.post(URL_API, reserve);
        promise.then(() => navigate('/sucesso'));
        promise.catch((erro) => alert(erro.response.data));
    }
    return (
        <PageContainer>
            Selecione o(s) assento(s)
            <SeatsContainer>
                {place.map(seat => {
                    if (seat.isAvailable === true) {
                        if (index.includes(seat.name) === false) {
                            return (<Available key={seat.name} onClick={() => select(seat.id, seat.name)} data-test="seat">
                                {seat.name}
                            </Available>
                            )
                        } else {
                            return (<Select key={seat.name} onClick={() => desselect(seat.id, seat.name)} data-test="seat">
                                {seat.name}
                            </Select>
                            )
                        }                        
                    } else {
                        return (
                            <Unavailable key={seat.name} onClick={() => alert("Esse assento não está disponível")} data-test="seat">
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

            <FormContainer onSubmit={send}>
                <label htmlFor="nome">Nome do Comprador:</label>
                <input type="text" 
                id="nome" 
                placeholder="Digite seu nome..." 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required data-test="client-name"/>

                <label htmlFor="CPF">CPF do Comprador:</label>
                <input type="text" 
                id="CPF" 
                placeholder="Digite seu CPF..." 
                value={cpf} 
                onChange={(e) => setCpf(e.target.value)}
                required data-test="client-cpf"/>

                <button type="submit"><p>Reservar Assento(s)</p></button>
            </FormContainer>

            <FooterContainer data-test="footer">
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
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        width: 225px;
        height: 42px;
        border-radius: 3px;
        background-color: #E8833A;
        border: none;
        align-self: center;
        margin-top: 57px;

        p {
            font-size: 18px;
            font-weight: 400;
            color: #FFFFFF;
        }
    }
    input {
        width: calc(100vw - 60px);
        height: 51px;
        padding-left: 18px;
        border: 1px solid #D5D5D5;
        border-radius: 3px;

        &::placeholder {
            font-size: 18px;
            font-weight: 400;
            font-style: italic;
            color: #AFAFAF;          
        }
    }
    label {
        font-size: 18px;
        font-weight: 400;
        margin: 5px 0;
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin:  20px 20px 41px;

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