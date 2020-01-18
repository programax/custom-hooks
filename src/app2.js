import React from 'react';
import useForm from './useForm';

const init = () => ({
    email: 'hey@gmail.com',
    password: '123',
    isOk: true,
    gender: 'male',
    car: 'saab',
});

function App() {
    const form = useForm({ init });

    console.log(form);

    return (
        <div>
            <h1>Data</h1>

            <form>
                <input type="email" {...form.getInput('email')} />
                <br />
                <input type="password" {...form.getInput('password')} />
                <br />
                <input type="checkbox" {...form.getCheckbox('isOk')} />
                <br />
                <input type="radio" {...form.getRadio('gender', 'male')} />
                <br />
                <input type="radio" {...form.getRadio('gender', 'female')} />
                <br />
                <select {...form.getSelect('car')}>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
            </form>
        </div>
    );
}

export default App;
