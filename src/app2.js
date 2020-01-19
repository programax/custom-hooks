import React, { useEffect } from 'react';
import useForm from './useForm';

const initialValues = {
    email: 'hello@gmail.com',
    password: '123',
    isOk: false,
    gender: 'female',
    car: 'ford',
};

function App() {
    const form = useForm({ initialValues });
    useEffect(() => {
        if (form.fields.gender === 'male') {
            form.addField('extra', '');
        } else {
            form.removeField('extra');
        }
    }, [form.fields.gender]);

    const handleSubmit = (event) => {
        // form.fields.password === '123'
        // TODO...
        event.preventDefault();
        console.log(form.fields);
    };

    console.log(form);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <span>Email</span>
                <br />
                <input type="email" {...form.getInput('email')} />
                <br />
                <span>Password</span>
                <br />
                <input type="password" {...form.getInput('password')} />
                <br />
                <input type="checkbox" {...form.getCheckbox('isOk')} />
                <span>Is Ok?</span>
                <br />
                <input type="radio" {...form.getRadio('gender', 'male')} />
                <span>Male</span>
                <br />
                <input type="radio" {...form.getRadio('gender', 'female')} />
                <span>Female</span>
                <br />
                <select {...form.getSelect('car')}>
                    <option value="audi">audi</option>
                    <option value="ford">ford</option>
                    <option value="mercedes">mercedes</option>
                </select>
                <br />

                {form.fields.gender === 'male' && (
                    <input type="text" {...form.getInput('extra')} />
                )}

                <button>Submit</button>
            </form>
        </div>
    );
}

export default App;
