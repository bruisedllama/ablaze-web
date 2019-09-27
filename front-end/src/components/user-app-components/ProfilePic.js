import React from 'react'
import { Link } from "react-router-dom";
import { TextInput, Button } from 'carbon-components-react'
import defaultImg from './../../images/default-user.png'

export default class ProfilePic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: this.props.imageUrl != ''
        }
    }

    componentDidMount() {

    }

    addProfilePic = () => {
        alert('hello')
    }
    render() {
        return(
            <div id="profile-pic">
                {
                    this.state.image ?
                    <img src={this.props.imageUrl} />
                    : <div id="default-img">
                        <img src={defaultImg}/>
                        <button id="add-pic" onClick={this.addProfilePic}>+</button>
                    </div>
                }
            </div>
        )
    }
}