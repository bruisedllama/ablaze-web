import React from 'react'
import { Link } from "react-router-dom";
import { TextInput, Button } from 'carbon-components-react'
import axios from 'axios'

export default class Deal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    componentDidMount() {

    }

    render() {
        return(
            <div className="deal-sec" style={{display: this.props.shown ? 'inline' : 'none'}}>
                <h3>{this.props.deal.deal + " " + this.props.deal.item}</h3>
                <p>Original Price: {this.props.deal.origPrice}</p>
                <p>Details: {this.props.deal.details ? this.props.deal.details : 'NA'}</p>
            </div>
        )
    }
}