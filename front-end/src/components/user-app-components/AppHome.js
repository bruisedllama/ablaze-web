import React from 'react'

export default class AppHome extends React.Component {
    render() {
        return(
            <div id="main-app-div">
                <section id="app-div1">
                    <h1>What are you looking for?</h1>
                    <i>Try "Restaurants", "Music Stores", "Gas Stations", etc</i>
                    <div className="row" id="quicklinks">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-2">
                            <p>Quick Links:</p>
                        </div>
                        <div className="col-sm-2">
                            <a>Deal of the Day</a>
                        </div>
                        <div className="col-sm-2">
                            <a>My Deals</a>
                        </div>
                        <div className="col-sm-2">
                            <a>My Account</a>
                        </div>
                        <div className="col-sm-2">
                            <a>Tutorial</a>
                        </div>
                        <div className="col-sm-1"></div>
                    </div>
                </section>
            </div>
        )
    }
}