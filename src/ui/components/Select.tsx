import React, { FC, useEffect, useRef, useState } from 'react';
import { WhpptIconCarrot } from '../../icons/Carrot';

type WhpptSelectProps = {
  dense?: boolean;
  id: string;
  label: string;
  info?: string;
  error?: string | string[];
  placeholder?: string;
  onChange: (val) => void;
  direction?: string;
  items: object[] | string[];
  value: string | number;
  textProp?: string;
  name?: string;
};

export const WhpptSelect: FC<WhpptSelectProps> = ({
  dense,
  name,
  textProp,
  id,
  label,
  placeholder,
  onChange,
  direction,
  items,
  info,
  error,
  value,
}) => {
  const [showSelectItems, setSelectItems] = useState(false);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setSelectItems(false);
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const handleKeyPress = event => {
    event.preventDefault();
    // if (event.key === 'Enter') {
    //   console.log('enter press here! ');
    // }
    // if (event.key === 'Down') {
    //   console.log('Down press here! ');
    // }
    // if (event.key === 'Up') {
    //   console.log('Up press here! ');
    // }
    // if (event.key === 'Tab') {
    //   console.log('Up press here! ');
    // }
    //TODO make arrows work
  };
  const textVal = item => {
    return item[textProp || 'text'] || item;
  };
  const setTextProp = item => {
    return <div>{textVal(item)}</div>;
  };

  return (
    <div ref={wrapperRef} className={`${dense ? 'whppt-select whppt-select--dense' : 'whppt-select'}`}>
      {label && (
        <div className="whppt-label">
          <label htmlFor={id}>{label}</label>
        </div>
      )}
      <div className="whppt-select__input whppt-input">
        <input
          id={id}
          name={name}
          placeholder={placeholder}
          onClick={() => setSelectItems(true)}
          onFocus={() => setSelectItems(true)}
          onKeyPress={handleKeyPress}
          value={value}
          readOnly
        />
        <div className="whppt-select__icon">
          <WhpptIconCarrot />
        </div>
        {showSelectItems && (
          <div className={`whppt-select__menu whppt-select__menu--${direction}`}>
            <ul role="listbox">
              {items.map((item, index) => (
                <li
                  key={index}
                  // name={textVal(item)}
                  // name={name}
                  role="option"
                  className="whppt-select__menu-item"
                  onClick={() => {
                    setSelectItems(false);
                    onChange(item);
                  }}>
                  {setTextProp(item)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {info && <p className="whppt-input-info">{info}</p>}
      {error && typeof error === 'string' && <span className="whppt-input-error">{error}</span>}
      {error && Array.isArray(error) && (
        <div>
          {error.map((err, index) => (
            <span key={index} className="whppt-input-error">
              {err} {index + 1 < error.length && <span>, </span>}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
