import React from 'react';
import { Link } from "react-router-dom";
import Convertir from "../components/Convertir"
import "../App.css";
import logo from "../img/logo_flor.png"

const HomeConvertir = () =>{
    return(
        <><div className='contenedor'>
            <Link to="/home" style={{ textDecoration: 'none' }}><img src={logo} alt="logo" /></Link>
            <h2 className='text-light'>Convertir CSV a Excel</h2>
        <div>
            <Convertir/>
        </div>
        <Link to="/home" style={{ textDecoration: 'none' }}>
                    <div className="options regresar" >
                        <span>Regresar</span>
                    </div>
        </Link>
            </div>
        </>
    );
}

export default HomeConvertir;