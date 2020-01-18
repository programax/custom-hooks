import { useState } from "react";

const defaultValidation = () => {};

const getFieldValue = ({ target }, defaultValue) => {
    if (!target) {
        return defaultValue;
    }

    if (target.type === 'checkbox') {
        return target.checked;
    }

    return target.value;
};

const getFieldName = (event) => {
    return event.target ? event.target.name : event;
};

const getFieldError = (name, value, validations, validate) => {
    return validations[name](value) || validate(value);
};

const useForm = ({ init, validate = defaultValidation }) => {
    const [isReady, setIsReady] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [validations, setValidations] = useState({});

    const addField = (name, value, validate = defaultValidation) => {
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: null });
        setTouched({ ...touched, [name]: false });
        setValidations({ ...validations, [name]: validate });
    };

    const removeField = (name) => {
        const newValues = { ...values };
        const newErrors = { ...errors };
        const newTouched = { ...touched };
        const newValidations = { ...validations };
        delete newValues[name];
        delete newErrors[name];
        delete newTouched[name];
        delete newValidations[name];
        setValues(newValues);
        setErrors(newErrors);
        setTouched(newTouched);
        setValidations(newValidations);
    };

    const initializeForm = (initialFields) => {
        const result = Object.keys(initialFields).reduce((map, key) => {
            const field = initialFields[key];
            const isFullField = typeof field !== 'string' && Object.keys(field).length > 0;

            if (isFullField) {
                map.values[key] = field.value || '';
                map.errors[key] = field.error || null;
                map.touched[key] = field.touched || false;
                map.validations[key] = field.validation || defaultValidation;
            } else {
                map.values[key] = field || '';
                map.errors[key] = null;
                map.touched[key] = false;
                map.validations[key] = defaultValidation;
            }

            return map;
        }, { values: {}, errors: {}, touched: {}, validations: {} });

        setValues(result.values);
        setErrors(result.errors);
        setTouched(result.touched);
        setValidations(result.validations);
    };

    const onChange = (event, val) => {
        const name = getFieldName(event);
        const value = getFieldValue(event, val);
        const error = getFieldError(name, value, validations, validate);

        if (error && error !== errors[name]) {
            setErrors({ ...errors, [name]: error });
            setIsValid(false);
        } else if (!error && errors[name]) {
            setErrors({ ...errors, [name]: null });

            // if there is only one error then it is the error we dismissed above so the form is now valid
            if (Object.keys(errors).length === 1) {
                setIsValid(true);
            }
        }

        setValues({ ...values, [name]: value });
    };

    const onBlur = (event) => {
        const name = getFieldName(event);
        setTouched({ ...touched, [name]: false });
    };

    const onFocus = (event) => {
        const name = getFieldName(event);
        setTouched({ ...touched, [name]: true });
    };

    if (!isReady) {
        if (init) {
            const initialFields = init();

            if (initialFields) {
                initializeForm(initialFields);
                setIsReady(true);
            }
        } else {
            setIsReady(false);
        }
    }

    return {
        isReady,
        isValid,
        values,
        errors,
        touched,
        addField,
        removeField,
        onChange,
        onBlur,
        onFocus,
        getInput: (name) => ({
            name,
            value: values[name],
            onChange,
            onBlur,
            onFocus,
        }),
        getCheckbox: (name) => ({
            name,
            checked: values[name],
            onChange,
            onBlur,
            onFocus,
        }),
        getRadio: (name, value) => ({
            name,
            value,
            checked: values[name] === value,
            onChange,
            onBlur,
            onFocus,
        }),
        getSelect: (name) => ({
            name,
            value: values[name],
            onChange,
            onBlur,
            onFocus,
        }),
    };
};

export default useForm;
