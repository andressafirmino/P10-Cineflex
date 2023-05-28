import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom";
import {FaArrowLeft } from 'react-icons/fa';

export default function SuccessPage(props) {

    const {movie, index, name, cpf} = props;
    const navigate = useNavigate();

    function back() {
        navigate(-1);
    }
    return (
        <>
        <Back onClick={back} data-test="go-home-header-btn"></Back>
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong>Filme e sessão</strong>
                <p>{movie.movie.title}</p>
                <p>{movie.day.date} - {movie.name}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong>Ingressos</strong>
                
                {index.map((seat, i) => {
                    return <p key={i}>Assento {seat}</p>
                })}
                
                
            </TextContainer>

            <TextContainer data-test="client-info">
                <strong>Comprador</strong>
                <p>Nome: {name}</p>
                <p>CPF: {cpf}</p>
            </TextContainer>

            <Link to="/" data-test="go-home-btn"><button><p>Voltar para Home</p></button></Link>
        </PageContainer>
        </>
    )
}

const Loading = styled.img`
    width: 60%; 
    display: block;
    margin: 100px auto;
`
const Back = styled(FaArrowLeft)`
    width: 34px;
    height: 34px;
    font-size: 34px;
    font-weight: 400;
    color: #293845;
    position: fixed;
    left: 15px;
    top: 15px;
`
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        width: 225px;
        height: 42px;
        background-color: #E8833A;
        border-radius: 3px;
        border: none;
        margin-top: 62px;

        p {
            font-size: 18px;
            font-weight: 400;
            color: #FFFFFF;
        }
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
        margin-bottom: 20px;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 33px;
    strong {
        font-size: 24px;
        font-weight: 700;
        color: #293845;
        margin-bottom: 15px;
    }
    p {
        font-size: 22px;
        font-weight: 400;
        color:#293845;
        margin-bottom: 10px;
    }
`