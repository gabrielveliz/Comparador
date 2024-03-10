import React from 'react';
import { Link } from "react-router-dom";
import Cruzar from "../components/Cruzar"
import "../App.css";
import logo from "../img/logo_flor.png"

const HomeCruzar = () =>{
    return(
        <>
        <div className='contenedor'>
        <Link to="/home" style={{ textDecoration: 'none' }}><img src={logo} alt="logo" /></Link>
            <h2 className='text-light'>Cruzar Planillas</h2>
        <div>
            <Cruzar/>
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

export default HomeCruzar;