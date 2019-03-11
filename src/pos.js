import React from "react";
import "./index.css";
import "basscss/css/basscss.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { startRouter } from "./router";
import routeResponders from "./routeResponders";
import tigoBaseTheme from "./tigoBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";



class POSApp extends React.Component {
  constructor(props) {
    super(props);
    if (props.country === 'gt') {
      startRouter(store, [[":page", { page: "Start_Screen" }]], routeResponders);
      console.log(store, '#########################')
    }
  }




render() {
  return (
    this.props.country === 'gt' ? <MuiThemeProvider muiTheme={getMuiTheme(tigoBaseTheme)}>
      <Provider store={store}>
        <App country={this.props.country} />
      </Provider>
    </MuiThemeProvider> : null
  );
}
}

// const POSApp = ({country}) => (
//   <MuiThemeProvider muiTheme={getMuiTheme(tigoBaseTheme)}>
//     <Provider store={store}>
//       <App country={country}/>
//     </Provider>
//   </MuiThemeProvider>
// );

export default POSApp;

