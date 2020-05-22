import React from "react"
import {useHistory} from "react-router-dom"

const Home = () => {
    const history = useHistory 
    // const routeToOrder = () => {
    //     history.push('/pizza')
    // } 
    return(
        <>
            <h2>You Are Home</h2>

            {/* <button onClick={routeToOrder}     className='md-button order-button'
            >
                    Order Now!
            </button> */}
        </>
    )
}
export default Home