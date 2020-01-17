import React from 'react';
import useApi from './useApi';

function App() {
    const { response, error, isLoading, refetch } = useApi('http://localhost:4444/orders');
    console.log({ response, error, isLoading });

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    const onRefresh = () => {
        refetch();
    };

    return (
        <div>
            {error && (
                <>
                    <h1>Error</h1>
                    <p>{error}</p>
                </>
            )}
            <h1>Data</h1>

            <ul>
                {response.map((order) => (
                    <li key={order.id}>{order.name}</li>
                ))}
            </ul>

            <button onClick={onRefresh}>Refresh</button>
        </div>
    );
}

export default App;
