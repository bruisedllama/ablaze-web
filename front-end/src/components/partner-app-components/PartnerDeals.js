import React from 'react'
import { Link, Redirect } from "react-router-dom";
import { TextInput, Button, Search } from 'carbon-components-react'
import axios from 'axios'
import CreatableSelect from 'react-select/creatable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Deal from './Deal'

export default class PartnerDeals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            item: '',
            details: '',
            deal_type: '',
            orig_price: '',
            step: 0,
            errors: '',
            done: false,
            activeleft: 40,
            deactiveleft: 40,
        }
    }

    toggleCreate = () => {
        this.setState({modalOpen: !this.state.modalOpen, step: 0})
    }

    componentDidMount() {
        
    }

    activeScrollLeft = () => {
        if(this.state.activeleft<40)
            this.setState({activeleft: this.state.activeleft+70})
    }

    activeScrollRight = width => {
        if(this.state.activeleft>width - window.innerWidth)
            this.setState({activeleft: this.state.activeleft-70})
    }
    deactiveScrollLeft = () => {
        if(this.state.deactiveleft<40)
            this.setState({deactiveleft: this.state.deactiveleft+70})
    }
    deactiveScrollRight = width => {
        if(this.state.deactiveleft>width - window.innerWidth)
            this.setState({deactiveleft: this.state.deactiveleft-70})
    }

    onChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    handleChange = (newValue: any, actionMeta: any) => {
        this.setState({deal_type: newValue.value})
    }

    checkDeal = () => { //verify deal info
        let input = this.state
        let price = input.orig_price
        if(price.indexOf('$')!=-1)
            price = price.substr(1)
        let missing = []
        if(input.item == '')
            missing.push('Deal Item')
        if(input.deal_type == '')
            missing.push('Deal')
        if(price == '' || isNaN(parseFloat(price)))
            missing.push("Original Value (please enter either a numeric value or a numeric value preceded by '$')")
        if(missing.length > 0)
            this.setState({errors: missing.join(', ')})
        else
            this.setState({step: 1, errors: ''})
    }

    deactivate = id => {
        const data = {active: false}
        axios.post('http://localhost:5000' + '/api/deals/update/' + id, data)
            .then(response => {
                console.log(response)
                this.props.updateDeals()
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

    createDeal = () => {
        let price = this.state.orig_price
        if(price.indexOf('$')!=-1)
            price = price.substr(1)
        const deal = {
            issuer: this.props.currentPartner._id,
            item: this.state.item,
            deal: this.state.deal_type,
            origPrice: price,
            details: this.state.details
        }
        axios.post('http://localhost:5000' + '/api/deals/createnew', deal)
            .then(response => {
                console.log(response)
                this.props.updateDeals()
                this.setState({done: true}, () => setTimeout(() => this.setState({done:false, modalOpen: false, orig_price: '', item: '', step: 0, details: '', deal_type: '', }), 1800))
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
    
    render() { 
        const options = [
            { value: '5% off', label: '5% off' },
            { value: '10% off', label: '10% off' },
            { value: '30% off', label: '30% off' },
            { value: '50% off', label: '50% off' },
            { value: '70% off', label: '70% off' },
            { value: 'BOGO', label: 'Buy One Get One Free' },
            { value: 'Free Trial', label: 'Free Trial' },
        ]
        const dealwidth = 300
        let activewidth = 0, deactivewidth = 0
        this.props.deals.map(deal => {
            deal.active ? activewidth+=dealwidth : deactivewidth+=dealwidth
        })

        const customStyles = {
            option: (provided) => ({
              ...provided,
              fontSize: "14px"}),
            input: (provided) => ({
                ...provided,
                fontSize: "14px"}),
            placeholder: (provided) => ({
                ...provided,
                fontSize: "14px",}),
            valueContainer: (provided) => ({
                ...provided,
                fontSize: "14px",
                marginLeft: "7px"}),
            singleValue: (provided) => ({
                ...provided,
                fontSize: "14px",})
          }      
        return(
            <div id="partner-deals" style={{display: this.props.display ? 'block' : 'none'}}>
                <div id="partner-manage-deals-sec">
                    <h2>Manage Deals</h2>
                    <button id="create-deal" className="main-button" onClick={this.toggleCreate}>
                         +
                    </button>
                    <hr />
                    <h4>Active Deals</h4>
                    <div id="partner-active-deals" class="partner-deals-row">
                        <button id="left-button" style={{display: activewidth>900 ? 'block': 'none'}} onClick={this.activeScrollLeft}><FontAwesomeIcon icon={faChevronLeft} /></button>
                        <button id="right-button" style={{display: activewidth>900 ? 'block': 'none'}} onClick={() => this.activeScrollRight(activewidth)}><FontAwesomeIcon icon={faChevronRight} /></button>
                        <div className="partner-deal-sec-row" style={{width: activewidth == 0 ? '100%' : activewidth, position: 'absolute', left: this.state.activeleft, transitionDuration: '0.2s'}}>
                        {
                            this.props.deals.map(deal => {
                                return <Deal active={true} deal={deal} deactivate={this.deactivate}/>
                            })
                        }
                        </div>
                    </div>
                    <h4>Inactive Deals</h4>
                    <div id="partner-inactive-deals" className="partner-deals-row">
                        <button id="left-button" style={{display: deactivewidth>900 ? 'block': 'none'}} onClick={this.deactiveScrollLeft}><FontAwesomeIcon icon={faChevronLeft} /></button>
                        <button id="right-button" style={{display: deactivewidth>900 ? 'block': 'none'}} onClick={() => this.deactiveScrollRight(deactivewidth)}><FontAwesomeIcon icon={faChevronRight} /></button>
                        <div className="partner-deal-sec-row" style={{width: deactivewidth == 0 ? '100%' : deactivewidth, position: 'absolute', left: this.state.deactiveleft, transitionDuration: '0.2s'}}>
                            {
                                this.props.deals.map(deal => {
                                    return <Deal active={false} deal={deal}/>
                                })
                            }
                        </div>
                    </div>
                </div>



                <div id="create-deal-modal" 
                style={{
                    position: 'fixed',
                    boxShadow: this.state.modalOpen ? '0px 0px 300px #333' : '0px 0px 0px #aaa',
                    width: '90%',
                    height: '90vh',
                    left: '5%',
                    top: this.state.modalOpen ? '5vh' : '-150vh',
                    backgroundColor: 'white',
                    padding: '8vh 8%',
                    zIndex: '99999',
                    transitionDuration: '0.3s',
                    borderRadius: '5px',
                    overflowX: 'hidden'
                }}>
                <button id="cancel-create" onClick={this.toggleCreate}>✕</button>
                    <div id="create-deal-box">
                        <div id="create-step-1" className="create-slide" style={{left: (this.state.step*(-120)) + '%'}}>
                            <h2>Create Deal</h2>
                            <hr/>
                            <label>Deal Item</label>
                            <TextInput 
                                    name = 'item'
                                    className='text_input'
                                    value = {this.state.item}
                                    onChange = {this.onChange}
                                    light="true" 
                                    placeholder="What item does the deal apply to? (eg. 1 chicken fried rice, 1 drawing lesson, 1 pack of strings, etc.) "
                                />
                            <label>Deal</label>
                            <CreatableSelect
                                    name = 'deal_type'
                                    onChange={this.handleChange}
                                    id = 'deal_type'  
                                    options={options}
                                    placeholder='select a deal from the options or type your own custom deal...'
                                    theme={theme => ({
                                        ...theme, borderRadius: 0,
                                        colors: {
                                            ...theme.colors, primary: '#0062ff'},
                                    })}
                                    styles={customStyles}
                                >
                            </CreatableSelect>
                            <label>Original Value</label>
                            <TextInput 
                                    name = 'orig_price'
                                    className='text_input'
                                    value = {this.state.orig_price}
                                    onChange = {this.onChange}
                                    light="true" 
                                    placeholder="Please specify the original price of the item... (e.g. $5.99, $14.55, $100 etc.)"
                                />
                        
                            <label>Any Other Details?</label>
                            <TextInput 
                                    name = 'details'
                                    className='text_input'
                                    value = {this.state.details}
                                    onChange = {this.onChange}
                                    light="true" 
                                    placeholder="Provide any extra information about the deal (e.g. 'only redeemable at locations X, P, O')"
                                />
                            <br/>
                            <div className="alert alert-danger" id="error-message" role="alert" style={{display: this.state.errors ? 'block' : 'none'}}>
                                Errors: {this.state.errors}
                            </div>
                            <button id="preview-deal" className="main-button" onClick={this.checkDeal}>
                                Preview Deal  <FontAwesomeIcon className="fa-icon" icon={faChevronRight}/>
                            </button> 
                        </div>
                        <div id="create-step-2" className="create-slide" style={{left: (this.state.step*(-120)+120) + '%'}}>
                            <h2>Is The Deal Info Correct?</h2>
                            <h4>You won't be able to make changes to your deal once it's live; you can only de-activate it.</h4>
                            <hr/>
                            <p>Deal Item: <strong>{this.state.item}</strong></p>
                            <p>Deal: <strong>{this.state.deal_type}</strong></p>
                            <p>Original Price: <strong>{this.state.orig_price}</strong></p>
                            <p style={{display: this.state.details ? 'block': 'none'}}>Details: <strong>{this.state.details}</strong></p>
                            <button id="create-deal" className="main-button" onClick={this.createDeal}>
                                Create Deal <FontAwesomeIcon className="fa-icon" icon={faChevronRight}/>
                            </button> 
                            <div className="alert alert-success" id="error-message" role="alert" style={{display: this.state.done ? 'block' : 'none', marginTop: '20px'}}>
                                Deal Created Successfully!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}