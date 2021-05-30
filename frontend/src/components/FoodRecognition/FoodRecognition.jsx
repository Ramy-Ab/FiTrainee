import React from 'react'
import './FoodRecognition.css'
import {useDropzone} from 'react-dropzone'

function FoodRecognition({imageUrl}) {
    return (
        <div className='center ma centred'>
            <div className='absolute mt2 center'>
            <img className='inputimage'  src={imageUrl} width='500px' height='auto'/>
            </div>
        </div>
    )
}

export default FoodRecognition
