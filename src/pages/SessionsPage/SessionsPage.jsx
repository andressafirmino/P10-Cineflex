import { useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FaArrowLeft } from 'react-icons/fa';

export default function SessionsPage() {

    const [movieInfo, setMovieInfo] = useState(undefined);
    const [sessions, setSessions] = useState(undefined);
    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const URL = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${param.idFilme}/showtimes`
        const promise = axios.get(URL);

        promise.then(response => {
            const movie = response.data;
            setMovieInfo(movie);
            const moviesSessions = response.data.days;
            setSessions(moviesSessions);
        });
        promise.catch((erro) => alert(erro.response.data));
    }, [])

    if(movieInfo === undefined) {
        return <Loading src='https://cineflex-hardh7xm0-thalesgomest.vercel.app/static/media/loading.961a48fb.gif' />;
    }

    function back() {
        navigate(-1);
    }
    return (
        <>
        <Back onClick={back} data-test="go-home-header-btn"></Back>
        <PageContainer>
            Selecione o horário
            <div>
                {sessions.map(session =>
                    <SessionContainer key={session.id} data-test="movie-day">
                        <div>{session.weekday} - {session.date}</div>
                        <ButtonsContainer>
                            {session.showtimes.map(showtime => (
                                <StyledLink to={`/assentos/${showtime.id}`} key={showtime.id}>
                                    <button data-test="showtime">
                                        <p>{showtime.name}</p>
                                    </button>
                                </StyledLink>
                            ))}
                        </ButtonsContainer>
                    </SessionContainer>
                )}
            </div>


            <FooterContainer key={movieInfo.id} data-test="footer">
                <div>
                    <img src={movieInfo.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{movieInfo.title}</p>
                </div>
            </FooterContainer>



        </PageContainer>
        </>
    )
}

const Loading = styled.img `
    width: 60%; 
    display: block;
    margin: 100px auto;
`
const Back = styled(FaArrowLeft) `
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
const StyledLink = styled(Link)`
    text-decoration: none;
`