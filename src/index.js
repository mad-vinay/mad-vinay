import React from 'react';
import ReactDOM from 'react-dom';

import { getCountry } from './utils/utils';

import POAApp from './poa';
import POSApp from './pos';
import registerServiceWorker from './registerServiceWorker';

const country = getCountry();

const App = () => {
    switch (country) {
        // case 'py': return <POAApp country={country} />;
        // case 'gt': return <POSApp country={country} />;
        default: return <POAApp country={"gt"} />;
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root'));

registerServiceWorker();
