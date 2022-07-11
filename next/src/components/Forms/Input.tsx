import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState } from "react";

interface IProps {
    type: string;
    icon?: IconDefinition;
    name: string;
    value?: string;
    label: string;
    defaultValue?: string;
    minimumValue?: number;
    maximumValue?: number;
    options?: { label: string, value: string }[];
    regex?: {
        pattern: string;
        message: string;
    };
    required?: boolean;
    onChange: (event: string) => void;

    className?: string;
}

const Input = (props: IProps) => {
    const { className, type, name, label, value, defaultValue, minimumValue, maximumValue, options, regex, required, onChange } = props;

    const [ error, setError ] = useState<string>('');

    const handleUpdate = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        onChange(e.target.value);
    }

    const handleOnBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (e.target.value) {
            if (regex && !(new RegExp(regex.pattern).test(e.target.value))) 
                setError(regex?.message! || 'Invalid value, please try again.');
            else if (minimumValue && maximumValue && (e.target.value.length < minimumValue || e.target.value.length > maximumValue))
                setError(`Must be between ${minimumValue} and ${maximumValue} characters.`);
            else 
                setError('');
        } else {
            if (required && !e.target.value)
                setError('Required.');
            else 
                setError('');
        }
    }

    return (
        <div className={`${className} relative`}>
            <div className={`_formField ${error ? 'is-invalid' : 'is-valid'}`}>
                {props.icon && (
                    <div>
                        <FontAwesomeIcon icon={props.icon} size="sm" />
                    </div>
                )}
                {['text', 'password', 'email', 'tel'].includes(type) && 
                    <input 
                        type={type} 
                        name={name} 
                        value={value || ''} 
                        minLength={minimumValue} 
                        maxLength={maximumValue} 
                        placeholder={label} 
                        onChange={handleUpdate} 
                        onBlur={handleOnBlur} 
                    />
                }
                {type === 'textarea' && 
                    <textarea 
                        name={name} 
                        value={value || ''} 
                        minLength={minimumValue} 
                        maxLength={maximumValue} 
                        placeholder={label} 
                        onChange={handleUpdate} 
                        onBlur={handleOnBlur} 
                    />
                }
                {type === 'select' && (
                    <select 
                        name={name} 
                        value={value} 
                        onChange={handleUpdate}
                    >
                        {options && options.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                )}
            </div>
            {error && <div className="text-sm text-red-500">{error}</div>}
        </div>
    )
}

export default Input;