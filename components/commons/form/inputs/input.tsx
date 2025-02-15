import React from 'react';
import { InputComponentProps } from './props';


const InputComponent: React.FC<InputComponentProps> = ({

  inputLabel,
  inputName,
  inputType,
  inputValue,
  inputOptions,
  handleChange,
  divClassName,
  inputClassName,
  inputPrefix,
  inputPlaceholder

  }) => {
    if (inputType === 'select' && inputOptions) {
      return (
        <div className={`${divClassName}`}>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={inputName}>
            {inputLabel}
          </label>
          <select
            id={inputName}
            name={inputName}
            value={Array.isArray(inputValue) ? inputValue : [inputValue]} // Ensure inputValue is an array
            onChange={handleChange}
            className={`${inputClassName} w-full p-2 border rounded`}
          >
            {inputOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    }

  return (
    <div className={`${divClassName} `}>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={inputName}>
        {inputLabel}
      </label>
      <div className="relative">
        {inputPrefix && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {inputPrefix}
          </span>
        )}
        <input
          id={inputName}
          name={inputName}
          placeholder={inputPlaceholder}
          type={inputType}
          value={Array.isArray(inputValue) ? inputValue.join(', ') : inputValue} // Ensure inputValue is a string
          onChange={handleChange}
          className={`${inputClassName} w-full p-2 border rounded`}
          step={inputType === 'number' ? '0.01' : undefined} // Ajout de l'attribut step pour les inputs de inputType number

          />
    </div>
    </div>
  );
};

export default InputComponent;