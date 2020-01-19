import React from 'react';

function App() {
    return (
        <div>
            <h1>Data</h1>
            <form>
                <span>Email</span>
                <input type="email" />
                <br />
                <span>Password</span>
                <input type="password" />
                <br />
                <span>Is Ok?</span>
                <input type="checkbox" />
                <br />
                <span>Male</span>
                <input type="radio" />
                <br />
                <span>Female</span>
                <input type="radio" />
                <br />
            </form>
        </div>
    );
}

export default App;
