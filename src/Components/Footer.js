import React from "react"

import './Footer.css'

class Footer extends React.Component {
    render() {
        return (

<footer>
    <div className="foot">
            <div style={{height:"10px"}} className="bottom section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="copyright">
                                <div style={{float:"right"}}>
                                <a  className="transition">About us</a><p>© <span>2019</span>  All rights reserved.
                                </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <br/> <br/>  <br/>  <br/> <br/>  <br/>
</footer>
        )
    }
}
export default Footer