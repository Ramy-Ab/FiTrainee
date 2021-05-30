import React,{useState} from 'react'
import './ImageLinkForm.css'

function ImageLinkForm({onInputChange,onButtonSubmit}) {


    const fileSelectedHandler = (e) => {
        console.log(e.target.files[0]);
    }

    return (
        <div>
            <p className='f3 c foodP'>
                {'This Food Ai will classify your food'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                    <button
                    className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}
                    >Detect</button>
                    
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm
