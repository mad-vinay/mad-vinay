import React from 'react';
import { connect } from "react-redux";
import RequestOTP from './RequestOTP';
import EnterOTP from './EnterOTP';
import SplashScreen from './SplashScreen';
import Login from './Login';
import MainMenu from './MainMenu';

class MainPage extends React.Component {
    render() {
        if(this.props.auth.status === 'REQUEST_OTP') {
           return  <RequestOTP />
        }
        if(this.props.auth.status === 'REQUESTED_OTP') {
            return  <EnterOTP/>
        }
        if(this.props.auth.status === 'LOGIN_READY') {
            return  <Login/>
        }
        if(this.props.auth.status === 'LOGGED_IN') {
            return  <MainMenu/>
        }
        // if(this.props.auth.status === 'PENDING') {
        //     return  <SplashScreen />
        //  }
        return <SplashScreen />
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(
    mapStateToProps,
    () => {}
)(MainPage);