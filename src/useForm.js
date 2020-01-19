import { useState } from "react";

const useForm = ({ initialValues }) => {
    const [fields, setFields] = useState(initialValues);

    const onChange = (event) => {
        const { value, name, type, checked } = event.target;

        setFields({ ...fields, [name]: type === 'checkbox' ? checked : value });
    };

    const addField = (name, value) => {
        setFields({ ...fields, [name]: value });
    };

    const removeField = (name) => {
        const newFields = { ...fields };
        delete newFields[name];
        setFields(newFields);
    };

    return {
        fields,
        addField,
        removeField,
        getInput: (name) => ({
            name,
            value: fields[name],
            onChange,
        }),
        getCheckbox: (name) => ({
            name,
            checked: fields[name],
            onChange,
        }),
        getRadio: (name, value) => ({
            name,
            value,
            checked: value === fields[name],
            onChange,
        }),
        getSelect: (name) => ({
            name,
            value: fields[name],
            onChange,
        }),
    };
};

export default useForm;
