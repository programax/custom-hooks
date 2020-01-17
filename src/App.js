import React from 'react';
import App1 from './app1';
import App2 from './app2';

const apps = {
    app1: App1,
    app2: App2,
};

const App = ({ name }) => {
    const CurrentApp = apps[name];

    return <CurrentApp />;
};

export default App;
