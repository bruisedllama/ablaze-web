import React from 'react'
import { Link } from 'react-router-dom'
import { TextInput, Button } from 'carbon-components-react'
import axios from 'axios'
import PartnerRegister from './PartnerRegister'

export default class LogIn extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div id="partner-homepage">
                <div id="partner-home" className="row">
                    <div className="col-sm-5">
                        <h1>Ablaze for Local Businesses</h1>
                        <h3>Rewarding you for supporting the community.</h3>
                    </div>
                    <div className="col-sm-7">
                        <PartnerRegister />
                    </div>
                </div>
            </div>
        )
    }
}
