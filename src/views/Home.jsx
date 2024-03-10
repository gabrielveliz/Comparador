import React from 'react';
import { Link } from "react-router-dom";
import "../App.css";
import logo from "../img/logo_flor.png"


const Home = () =>{
    return(
        <>
        <div className='contenedor'>
            <img src={logo} alt="logo" />
    <h1 className='text-light'>Hola Elvira, ¿Que deseas Hacer?</h1>
            <Link to="/convertir" style={{ textDecoration: 'none' }}>
                <div className="options">
                    <span>Convertir CSV a Excel</span>
                </div>
            </Link>
            <Link to="/cruzar" style={{ textDecoration: 'none' }}>
                <div className="options">
                    <span>Cruzar Planillas</span>
                </div>
            </Link>
            </div>  </>

    );
}

export default Home;