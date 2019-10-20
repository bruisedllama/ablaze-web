import React from 'react'
import { Link, Redirect } from "react-router-dom";
import { TextInput, Button, Search } from 'carbon-components-react'
import axios from 'axios'
import PartnerDeals from './PartnerDeals'
import PartnerBusiness from './PartnerBusiness'
import PartnerAccount from './PartnerAccount'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faTicketAlt, faBuilding, faUser, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Deal from './Deal'

export default class PartnerDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comp: 'deals',   
            deals: [] 
        }
    }

    componentDidMount() {
        this.updateDeals()
    }

    updateDeals = () => {
        //get deals for current partner from db
        axios.get('http://localhost:5000' + '/api/deals/get-partner/' + this.props.currentPartner._id)
            .then(response => {
                console.log(response)
                this.setState({deals: response.data})
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
        })
    }

    changeComponent = (comp) => {
        this.setState({comp: comp})
    }
    
    render() {       
        if (!this.props.loggedIn) {
            return <Redirect to='/partner/login' />
        }
        return(
            <div id="partner-dashboard">
                <div id="partner-dashboard-nav">
                    <a onClick={() => this.changeComponent("dashboard")}className="partner-dash-nav-link" style={{backgroundColor: this.state.comp == "dashboard" && "#444"}}><FontAwesomeIcon className="fa-icon" icon={faTachometerAlt} /> Dashboard <span id="nav-left-border"></span></a>
                    <a onClick={() => this.changeComponent("deals")}className="partner-dash-nav-link" style={{backgroundColor: this.state.comp == "deals" && "#444"}}><FontAwesomeIcon className="fa-icon" icon={faTicketAlt} /> Manage Deals <span id="nav-left-border"></span></a>
                    <a onClick={() => this.changeComponent("business")}className="partner-dash-nav-link" style={{backgroundColor: this.state.comp == "business" && "#444"}}><FontAwesomeIcon className="fa-icon" icon={faBuilding} /> Business Info<span id="nav-left-border"></span></a>
                    <a onClick={() => this.changeComponent("account")}className="partner-dash-nav-link" style={{backgroundColor: this.state.comp == "account" && "#444"}}><FontAwesomeIcon className="fa-icon" icon={faUser} /> Account Info<span id="nav-left-border"></span></a>
                </div>
                <div id="dash-sec">
                    <div id="partner-info" style={{display: this.state.comp == 'dashboard' ? 'block' : 'none'}}>
                        <section className="partner-sec" id="partner-info-head">
                            <h2>{this.props.currentPartner.storeName}</h2>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label>Today's Earnings</label><span id="earnings">$56.90</span>
                                </div>
                                <div className="col-sm-4">
                                    <label>Deals Redeemed Today</label><span id="deal-count">5</span>
                                </div>
                                <div className="col-sm-4">
                                    <label>Hottest Deal</label><span id="hottest-deal">ITEM 1</span>
                                </div>
                            </div>
                            <div id="earnings-graph">
                                {/*INSERT GRAPH LATER! SUPER DOPE*/}
                            </div>
                        </section>
                        <section className="partner-sec" id="partner-current-deals">
                            <h3>My Deals</h3>
                            <a onClick={() => this.changeComponent("deals")} className="main-button"> Manage Deals <FontAwesomeIcon className="fa-icon" icon={faArrowRight} /></a>
                            <hr/>
                            <div id="partner-deals-sec" className="partner-deals-row">
                                {
                                    this.state.deals ? 
                                    this.state.deals.map(deal => {
                                        return <Deal shown={deal.active} deal={deal}/>
                                    }) :
                                    <i>You have no deals currently! Click 'manage deals' to create and edit deals</i>
                                }
                            </div>
                        </section>
                    </div>
                    <PartnerDeals display={this.state.comp == 'deals'} currentPartner={this.props.currentPartner} loggedIn = {this.props.loggedIn} changeLoginStatus={this.props.changeLoginStatus} deals={this.state.deals} updateDeals={this.updateDeals}/>
                    <PartnerBusiness display={this.state.comp == 'business'} currentPartner={this.props.currentPartner} loggedIn = {this.props.loggedIn} changeLoginStatus={this.props.changeLoginStatus}/>
                    <PartnerAccount display={this.state.comp == 'account'} currentPartner={this.props.currentPartner} loggedIn = {this.props.loggedIn} changeLoginStatus={this.props.changeLoginStatus}/>
                </div>
            </div>
        )
    }
}