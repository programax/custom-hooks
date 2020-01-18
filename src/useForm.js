import { useState } from "react";

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

const getFieldValues = (fields) => {
    return Object.keys(fields).reduce((values, key) => {
        values[key] = fields[key].value;

        return values;
    }, {});
};

const getFieldError = (name, value, fields) => {
    return fields[name].validation ? fields[name].validation(value, getFieldValues(fields)) : null;
};

const getFormErrors = (validate, fields) => {
    return validate ? validate(getFieldValues(fields)) : {};
};

const getInitialFields = (originalFields) => {
    const newFields = Object.keys(originalFields).reduce((fields, key) => {
        const field = originalFields[key];
        const isFullField = typeof field !== 'string' && Object.keys(field).length > 0;

        if (isFullField) {
            fields[key] = {
                value: field.value,
                error: field.error,
                validation: field.validation,
            };
        } else {
            fields[key] = {
                value: field,
                error: null,
                validation: null,
            };
        }

        return fields;
    }, {});

    return newFields;
};

const getValidatedForm = (name, value, fields, validate) => {
    let newFields = { ...fields };
    const error = getFieldError(name, value, newFields);

    if (error && error !== fields[name].error) {
        newFields = {
            ...newFields,
            [name]: {
                ...fields[name],
                error,
            },
        };
    } else if (!error && fields[name].error) {
        newFields = {
            ...newFields,
            [name]: {
                ...fields[name],
                error: null,
            },
        };
    }

    const updatedFields = {
        ...newFields,
        [name]: { ...newFields[name], value },
    };
    const errors = getFormErrors(validate, updatedFields);
    const errorKeys = Object.keys(errors);
    const hasErrors = Boolean(error || errorKeys.length);

    for(const key of errorKeys) {
        newFields[key] = {
            ...newFields[key],
            error: errors[key],
        };
    }

    return {
        hasErrors,
        newFields,
    };
};

const useForm = ({ init, validate }) => {
    const [isReady, setIsReady] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [fields, setFields] = useState({});

    const addField = (name, value, validation) => {
        setFields({
            ...fields,
            [name]: {
                value,
                error: null,
                validation,
            },
        });
    };

    const removeField = (name) => {
        const newFields = { ...fields };
        delete newFields[name];
        setFields(newFields);
    };

    const onFieldChange = (event, defaultValue) => {
        const name = getFieldName(event);
        const value = getFieldValue(event, defaultValue);
        const { hasErrors, newFields } = getValidatedForm(name, value, fields, validate);

        if (hasErrors && isValid) {
            setIsValid(false);
        } else if (!hasErrors && !isValid) {
            setIsValid(true);
        }

        setFields({ ...newFields, [name]: { ...newFields[name], value } });
    };

    if (!isReady) {
        if (init) {
            const fields = init();

            if (fields) {
                const initialFields = getInitialFields(fields);
                setFields(initialFields);
                setIsReady(true);
            }
        } else {
            setIsReady(false);
        }
    }

    return {
        isReady,
        isValid,
        addField,
        removeField,
        fields,
        onFieldChange,
        getInput: (name) => ({
            name,
            value: fields[name] ? fields[name].value : null,
            onChange: onFieldChange,
        }),
        getCheckbox: (name) => ({
            name,
            checked: fields[name] ? fields[name].value : null,
            onChange: onFieldChange,
        }),
        getRadio: (name, value) => ({
            name,
            value,
            checked: fields[name] ? fields[name].value === value : null,
            onChange: onFieldChange,
        }),
        getSelect: (name) => ({
            name,
            value: fields[name] ? fields[name].value : null,
            onChange: onFieldChange,
        }),
    };
};

export default useForm;
