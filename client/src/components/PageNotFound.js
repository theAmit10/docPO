import {useEffect, useRef} from 'react'
import { Container } from '@material-ui/core'
import lottie from 'lottie-web'
import './page.css'

const PageNotFound = () => {

    const container = useRef(null)

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current, // the dom element that will contain the animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('./error.json') 
        });
    },[])

    return (
        <div className="page" >
                <div className="container" ref={container}>

                </div>
            
        </div>
    )
}

export default PageNotFound
