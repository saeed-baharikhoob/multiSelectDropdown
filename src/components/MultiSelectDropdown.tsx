import React, { useState, useRef } from 'react';
import styles from './multiSelectDropdown.module.scss'
import useOutsideAlerter from "../utils/customHooks/useOutsideAlerter.ts";
import arrow from '../assets/images/arrow.svg'

type Option = {
    value: string;
    label: string;
    icon:string;
};

interface Props {
    initialOptions: Option[];
    placeholder?: string;
}

const MultiSelectDropdown: React.FC<Props> = ({ initialOptions, placeholder = 'Type ...' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<Option[]>(initialOptions);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [inputValue, setInputValue] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useOutsideAlerter(dropdownRef, () => {
        if (isOpen) {
            setIsOpen(false);
        }
    });
    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            const newOption = {  label: inputValue.trim(),value: inputValue.trim() , icon : '' };
            setOptions(prevOptions => [...prevOptions, newOption]);
            setInputValue('');
            e.preventDefault();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSelect = (option: Option) => {
        const alreadySelected = selectedOptions.some(selected => selected.value === option.value);
        if (alreadySelected) {
            setSelectedOptions(selectedOptions.filter(selected => selected.value !== option.value));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const isSelected = (option: Option) => {
        return selectedOptions.some(selectedOption => selectedOption.value === option.value);
    };
    return (
        <div className={`${styles['dropdown']} ${isOpen && styles['dropdown--focus']}`} ref={dropdownRef}>
            <div className={styles['dropdown__header']} onClick={toggleDropdown}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    placeholder={placeholder}
                    className={styles['dropdown__header__input']}
                />
                <div className={`${isOpen && styles['dropdown__header__imageBox--rotate'] }`}>
                <img width={10} height={10} src={arrow} onClick={() => setIsOpen(!isOpen)}  alt={'arrow'}/>
                </div>
            </div>
            {isOpen && (
                <ul className={styles['dropdown__list']}>
                    {options.map(option => (
                        <li
                            key={option.value}
                            className={`${styles['dropdown__list__option']} ${isSelected(option) && styles['dropdown__list__option--selected']}`}
                            onClick={() => handleSelect(option)}
                        >
                            <div className={styles['dropdown__list__option__label']}>
                                {option.label}
                                {option.icon && <img src={option.icon} width={15} height={15} alt={option.label}/>}
                            </div>
                            {isSelected(option) && <span className={styles['dropdown__list__option__tick']}>&#10004;</span>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MultiSelectDropdown;