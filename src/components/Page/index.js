import React, {
    Fragment
} from "react";
import { PropTypes } from "prop-types";

import AppBar from '@material-ui/core/AppBar';
import ArrowBack from "@material-ui/icons/ArrowBack";
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Styled from "./style";

const appBarStyle = {
    padding: 0
}
const logo = {
    maxWidth: "125px"
}

const Page = ({
    pageTitle,
    children,
    backBtnPresent,
    logoPresent,
    handleBackButton
}) => {

    return (
        <Fragment>
            <AppBar position="static" style={appBarStyle}>
                <Toolbar>
                    { backBtnPresent && 
                        <IconButton  onClick={handleBackButton} color="inherit">
                            <ArrowBack color="secondary"/>
                        </IconButton>
                    }
                    <Typography variant="h6" color="inherit">
                        { logoPresent &&
                            <img src="/images/logo-header@3x.png" alt="Mi Tienda"  style={logo}/>
                        }
                        {!logoPresent && pageTitle}
                    </Typography>
                    {logoPresent && <Styled.Logo />}
                </Toolbar>
            </AppBar>
            {children}
        </Fragment>
    );
}

Page.prototype = {
    pageTitle: PropTypes.string,
    children: PropTypes.node,
    backBtnPresent: PropTypes.bool,
    logoPresent: PropTypes.bool
}

export default Page;
