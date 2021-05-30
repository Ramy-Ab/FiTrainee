import React from 'react'
import FeaturesBox from './FeaturesBox'
import fimage1 from '../images/1.svg'
import fimage2 from '../images/2.svg'
import fimage3 from '../images/3.svg'
import fimage4 from '../images/4.svg'
function Feature() {
    return (
        <div id='features'>
            <h1>FEATURES</h1>
            <div className='a-container'>
                <FeaturesBox image={fimage1} title="Weight Lifting"/>
                <FeaturesBox image={fimage2} title="Specific Muscle"/>
                <FeaturesBox image={fimage3} title="Flex Your Muscle"/>
                <FeaturesBox image={fimage4} title="Cardio Exercise"/>                
            </div>
        </div>
    )
}

export default Feature
