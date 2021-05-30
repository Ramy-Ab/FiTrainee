import React from 'react'

function Contact() {
    return (
        <div id='contact'>
            <h1>Contact Us</h1>
            <form >
                <input typr='text' placeholder='Full Name' required/>
                <input type='email' placeholder='Type Your E-Mail' required/>
                <textarea placeholder='Write here ...' name='message'/>
                <input type='submit' value='Send'/>
            </form>
        </div>
    )
}

export default Contact
