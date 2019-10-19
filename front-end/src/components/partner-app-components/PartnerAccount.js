import React from 'react'
import { Link, Redirect } from "react-router-dom";
import { TextInput, Button, Search } from 'carbon-components-react'
import Select from "react-select";

export default class PartnerAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    componentDidMount() {

    }
    
    render() {   
        return(
            <div id="partner-account" style={{display: this.props.display ? 'block' : 'none'}}>
                <h1 style={{padding: '100px 0px', fontSize: '150px'}}>ACCOUNT</h1>
            </div>
        )
    }
}