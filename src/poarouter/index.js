import React from "react";
import {
    Route,
    withRouter,
    Switch,
    Redirect
} from "react-router-dom";
import Styled from './styled';
import { poaRouteconfig } from '../config/poaRoutes';
import { posRouteconfig } from '../config/posRoutes';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import PrivateRoute from "../components/components/PrivateRoute"

class AppRouter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            poaRoutes: poaRouteconfig,
            posRoutes: posRouteconfig
        }
    }

    renderRoutes = () => {
        // debugger;
        if (this.props.country === "gt") {
            let routes = this.state.posRoutes.gt.map((item, key) => {
                return <Route key={key} path={item.path} component={item.component} />
                // return <PrivateRoute exact key={key} path={item.path} component={item.component} authed={this.props.auth.status} />
            })
            return routes
        }
        else {
            let routes = this.state.poaRoutes.py.map((item, key) => {
                return <Route key={key} exact path={item.path} component={item.component} />
            })
            return routes
        }
    }

    render() {
        return (
            <Styled.AppContainer>
                <Switch>
                    {this.renderRoutes()}
                </Switch>
            </Styled.AppContainer>
        );
    }
}

function matchDispatchToProps(dispatch) {
    // console.log('matchDispatchToProps', dispatch)
    return bindActionCreators({

    }, dispatch);
};

function mapStateToProps(state) {
    // debugger
    return {
        auth: state.auth
    }
};

export default connect(mapStateToProps, matchDispatchToProps)(AppRouter);

