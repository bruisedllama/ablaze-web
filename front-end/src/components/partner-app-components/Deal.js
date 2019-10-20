import React from 'react'
import { Link } from "react-router-dom";
import { TextInput, Button, ModalWrapper } from 'carbon-components-react'
import axios from 'axios'

export default class Deal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    componentDidMount() {

    }

    deactivate = (id) => {
        this.props.deactivate(id)
    }

    render() {
        let display = 'inline'
        if(this.props.deal.active != this.props.active)
            display='none'
        return(
            <div className="deal-sec" style={{display: display}}>
                <h3>{this.props.deal.deal + " " + this.props.deal.item}</h3>
                <hr />
                <p>Original Price: {this.props.deal.origPrice}</p>
                <p>Details: {this.props.deal.details ? this.props.deal.details : 'NA'}</p>
                <div style={{display: this.props.active ? 'block' : 'none'}}>
                 <ModalWrapper
                    buttonTriggerText="De-Activate"
                    className="deactivate-modal"
                    disabled={false}
                    handleSubmit={() => this.deactivate(this.props.deal._id)}
                    id="transactional-passive-modal"
                    modalHeading="Confirm De-Activation"
                    modalLabel={this.props.deal.deal + " " + this.props.deal.item}
                    primaryButtonText="Confirm"
                    secondaryButtonText="Cancel"
                    selectorPrimaryFocus="[data-modal-primary-focus]"
                    shouldCloseAfterSubmit
                    triggerButtonKind="danger"
                    size="small"
                >
                <p className="bx--modal-content__text">
                    Are you sure you want to de-activate this deal?
                </p>
                </ModalWrapper></div>
                <p id="deactivated" style={{display: this.props.active ? 'none' : 'block', color: 'red'}}>De-Activated</p>
            </div>
        )
    }
}