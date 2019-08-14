import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { TextInput, Button } from 'carbon-components-react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import axios from 'axios'

class LogIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this)
        this.logIn = this.logIn.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/app"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }   
    onChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    logIn(e) {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData);
    }
    
    render() {
        const errors = this.state.errors
        if (this.props.loggedIn === true) {
            return <Redirect to='/app' />
        }
        return(
            <div id="login_div">
                <h2>Log In</h2>
                <label>Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
                <TextInput 
                    name = 'email'
                    className={classnames("text_input", {
                        invalid: errors.email || errors.emailnotfound
                    })}
                    value = {this.state.email}
                    onChange = {this.onChange}
                    id = 'login_email'  
                    light="true" 
                    placeholder="enter your email..."
                />
                <label>Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
                <TextInput
                    type="password"
                    className={classnames("text_input", {
                        invalid: errors.password || errors.passwordincorrect
                    })}
                    name = 'password'
                    value = {this.state.password}
                    onChange = {this.onChange}
                    id = 'login_password'  
                    light="true" 
                    placeholder="enter your password..."
                />
                <Button 
                    onClick={this.logIn}
                    id="login_login"
                    className="main-button"
                    style={{marginBottom: "20px"}}
                >
                    Log In
                </Button>
                <br />
                <Link className="main-link" to="/register">Don't have an account? Register Today</Link>
            </div>
        )
    }
}
LogIn.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { loginUser }
)(LogIn);
