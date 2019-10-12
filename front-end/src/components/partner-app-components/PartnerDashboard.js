import React from 'react'
import { Link, Redirect } from "react-router-dom";
import { TextInput, Button, Search } from 'carbon-components-react'
import Select from "react-select";

export default class PartnerDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    componentDidMount() {
        //info
    }
    
    render() {       
        if (!this.props.loggedIn) {
            return <Redirect to='/partner/login' />
        }
        return(
            <div id="partner-dashboard">
                <h1 style={{fontSize: '150px'}}>DASHBOARD</h1>
            </div>
        )
    }
}