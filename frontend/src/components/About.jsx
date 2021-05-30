import React from 'react'
import aboutimage from '../images/about.png'
function About() {
    return (
        <div id='about'>
            <div className='about-image'>
                <img src={aboutimage} alt=''/>
            </div>
            <div className='about-text'>
                <h1>LEARN MORE ABOUT US</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur maiores iusto vel explicabo nostrum, voluptates omnis veritatis laborum reprehenderit officiis exercitationem molestiae necessitatibus, suscipit quidem hic optio eveniet quasi? Doloribus.</p>
                <button>Read More</button>
            </div>
        </div>
    )
}

export default About
