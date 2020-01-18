import React, { useState, useEffect } from 'react';
import useForm from './useForm';

let isReady = false;

const init = () => {
    console.log('init...');
    if (!isReady) {
        return;
    }

    return {
        email: 'hey@gmail.com',
        password: {
            value: '',
            validation: (value) => {
                if (value.length < 5) {
                    return `${5 - value.length} more characters`;
                }
            },
        },
        isOk: false,
        gender: 'male',
        car: 'saab',
    };
};

const validate = (values) => {
    console.log({values});
    if (values.password.length > 7) {
        return {
            password: 'my man'
        };
    }

    return {};
};

function App() {
    const [counter, setCounter] = useState(1);
    const form = useForm({ init, validate });
    useEffect(() => {
        setTimeout(() => {
            isReady = true;
            setCounter(counter + 1);
        }, 2000);
    }, []);
    const { email, password, isOk, gender, car, ...fields } = form.fields;

    const onAddField = () => {
        form.addField(Math.random(), '111');
    };

    console.log(form);

    return (
        <div>
            <h1>Data</h1>

            {form.isReady ?
                <form>
                    <input type="email" {...form.getInput('email')} />
                    <br />
                    <input
                        type="password"
                        value={password.value}
                        onChange={(e) => form.onFieldChange('password', e.target.value)}
                    />
                    {/* <input type="password" {...form.getInput('password')} /> */}
                    {form.fields.password.error && <span style={{}}>{form.fields.password.error}</span>}
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
                    <br />

                    {Object.keys(fields).map((key) => (
                        <React.Fragment key={key}>
                            <input type="text" {...form.getInput(key)} />
                            <br />
                        </React.Fragment>
                    ))}

                    <button type="button" onClick={onAddField}>Add field</button>
                </form>
                :
                <h1>Loading...</h1>
            }
        </div>
    );
}

export default App;
