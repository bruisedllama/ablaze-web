import React from 'react'
import { Link } from "react-router-dom";
import { TextInput, Button, Search } from 'carbon-components-react'
import Select from "react-select";

export default class AppHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
            focused: false,
            filterType: '',
            filterDistance: 100000,
        }
    }

    onChange = (opt, name) => {
        this.setState({ [name]: opt.value });
    }

    onType = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        }, () => {
            this.search()
        })
    }


    search() {
        console.log(this.state.searchText)
        //logic for search function
        //this is going to be a pretty complicated function...
    }
    
    render() {
        const typeOptions = [
            { value: '', label: 'Filter by Business Type' },
            { value: 'restaurant', label: 'Restaurant' },
            { value: 'general_store', label: 'General Store' },
            { value: 'specialty_store', label: 'Specialty Store' },
            { value: 'education', label: 'Education' },
            { value: 'entertainment', label: 'Entertainment' },
            { value: 'service', label: 'Service' },
        ]

        const distanceOptions = [
            { value: 100000, label: 'Filter by Distance' },
            { value: 100, label: '<100 miles' },
            { value: 50, label: '<50 miles' },
            { value: 15, label: '<15 miles' },
            { value: 5, label: '<5 miles' },
        ]

        const selectStyles = {
            option: (provided) => ({
              ...provided,
              fontSize: "12px"
            }),
            input: (provided) => ({
                ...provided,
                fontSize: "15px",
            }),
            placeholder: (provided) => ({
                ...provided,
                fontSize: "15px",
            }),
            valueContainer: (provided) => ({
                ...provided,
                fontSize: "15px",
                marginLeft: "7px",
                padding: '8px 0px'
            }),
            singleValue: (provided) => ({
                ...provided,
                fontSize: "15x",
            })
          }
        
        return(
            <div id="main-app-div">
                <section id="app-div-1">
                    <h2>What are you looking for?</h2>
                    <div id="search-sec">  
                        <div id="searchInput"><Search
                            onChange = {this.onType}
                            light={true}
                            defaultValue=""
                            name="searchText"
                            value={this.state.searchText}
                            labelText="Search"
                            closeButtonLabelText=""
                            placeHolderText="Try 'restaurants', 'hair salons', 'chinese food', 'music stores', etc..."
                        /></div>
                        <Select
                            defaultValue={typeOptions[0]}
                            name = 'filterType'
                            className="filter"
                            onChange={(opt) => this.onChange(opt, 'filterType')}
                            id = 'filterType'  
                            options={typeOptions}
                            theme={theme => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                ...theme.colors,
                                    primary: '#0062ff',
                                },
                            })}
                            styles={selectStyles}
                        />
                        <Select
                            defaultValue={distanceOptions[0]}
                            name = 'filterDistance'
                            className="filter"
                            onChange={(opt) => this.onChange(opt, 'filterDistance')}
                            id = 'filterDistance'  
                            options={distanceOptions}
                            theme={theme => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                    ...theme.colors,
                                    primary: '#0062ff',
                                },
                            })}
                            styles={selectStyles}
                        />
                    </div>
                    <div id="search-results">
                    </div>
                    <br /><br />
                    <div className="row" id="quicklinks">
                        <div className="col-md-1"></div>
                        <div className="col-md-2">
                            <p>Quick Links:</p>
                        </div>
                        <div className="col-md-2">
                            <a href="">Deal of the Day</a>
                        </div>
                        <div className="col-md-2">
                            <Link to="/app/deals">My Deals</Link>
                        </div>
                        <div className="col-md-2">
                            <Link to="/app/account">My Account</Link>
                        </div>
                        <div className="col-md-2">
                            <a href="">Tutorial</a>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </section>
            </div>
        )
    }
}