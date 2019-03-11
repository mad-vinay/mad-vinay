import React, { Component } from "react";
import PageTitle from "../components/PageTitle";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { connect } from "react-redux";


import {
    requestOtpAction
} from "../../actionCreators/auth.js";


const StartScreenWrapper = styled.div`
background: #00377B;
height: 100vh;
padding: 15px;
.contents {
    display: flex;
    flex-direction: column;
    justify-content: center;function mapStateToProps(state) {
        // debugger
        return {
            auth: state.auth
        }
    }
    align-items: center;
    height: 100%;
    position: relative
}
.subHeading {
    font-size: 20px;
    font-weight: 100;
    text-align: center;
}
.logo {
    padding: 5px;
}
.footerText, .footerTextIos {
    color: #fff;
    padding: 5px;
    font-size: 11px;
    text-align: center;
    flex: 1;
    align-self: flex-end;
}
.footerTextIos {
    color: #000;
}
.shortcutBanner {
    width: 100%;
    background: #5b8cb3;
    position: fixed;
    bottom: 0;
    cursor: pointer;
    display: none;
    padding: 5px;
    
}
.shortcutBannerIos{
    width: 100%;
    background: #5b8cb3;
    position: fixed;
    bottom: 0;
    cursor: pointer;
    display: flex;
    padding: 5px;
}
.shortcutBannerIos {
    background: #fff;
    color: #000;
}
.tigoIcon {
    background: url("/mi_pos.png");
    background-repeat: no-repeat;
    width: 55px;
    height: 70px;
    background-position: center;
    background-size: contain;
}
.shortcutAvailable {
    display: flex;
    justify-content: center;
    align-items: center;
}
.closeBtn {
    position: absolute;
    right: 8px;
    font-size: 18px;
    color: #1b1a1ae0;
}
.shareIcon {
    width: 18px;
    vertical-align: middle;
}
`;
const getCook = (cookiename) => {
    var cookiestring = RegExp("" + cookiename + "[^;]+").exec(document.cookie);
    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
}

var userAgent = window.navigator.userAgent;
var iOS = !!userAgent.match(/iPad/i) || !!userAgent.match(/iPhone/i);
var webkit = !!userAgent.match(/WebKit/i);
var iOSSafari = iOS && webkit && !userAgent.match(/CriOS/i);

class StartScreen extends Component {
    state = {
        bannerShow: false
    }

    componentDidMount() {
        if (!!iOSSafari) {
            if ((getCook("showBanner=") !== "false" || getCook("showBanner=") == "") && !window.matchMedia('(display-mode: standalone)').matches) {
                this.setState({
                    bannerShow: true
                })
            }
        }
    }

    closeBanner = () => {
        this.setState({
            bannerShow: false
        }, () => document.cookie = "showBanner=false")

    }

    render() {
        let { bannerShow } = this.state;
        // console.log('aaa', this.props.auth.status)
        
        // if(this.props.auth.status === 'REQUEST_OTP') {
        //    return  <RequestOTP />
        // }
        // if(this.props.auth.status === 'REQUESTED_OTP') {
        //     return  <EnterOTP/>
        // }
        // if(this.props.auth.status === 'LOGIN_READY') {
        //     return  <Login/>
        // }

        return (
            <StartScreenWrapper>
                <div className="contents">
                    <div className="logo">
                        <img src="/images/mi-tienda.png" alt="Mi Tienda" />
                    </div>
                    <div className="flex-items">
                        <p className="text-white text-align subHeading">Bienvenido a Mi Tienda Recomendamos conectarse a la red móvil de
                        Tigo PY para que el proceso de acceso sea más seguro y veloz</p>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                // debugger
                                this.props.navigateToRequestOtp();
                                // this.props.history.push("/RequestOTP");
                            }}
                        >Iniciar</Button>
                    </div>
                    {bannerShow && <div className="shortcutBannerIos" id="installerIos">
                        <div className="tigoIcon"></div>
                        <p className="footerTextIos">Para añadir Mi Tienda a tu pantalla de incio haz click en <img src="../images/icn-inicio@2x.png" className="shareIcon" /> y selecciona "agregar a inicio"</p>
                        <span className="closeBtn" onClick={this.closeBanner}>&times;</span>
                    </div>}

                </div>
            </StartScreenWrapper>
        )
    }
}

function mapStateToProps(state) {
    // debugger
    return {
        auth: state.auth
    }
}

export default connect(
    mapStateToProps,
    dispatch => {
        return {
            navigateToRequestOtp: () => {
                return dispatch(requestOtpAction());
            }
        };
    }
)(StartScreen);