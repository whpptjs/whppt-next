import React, { FC, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { WhpptIcon } from './Icon';
import { WhpptInput } from './Input';

export type WhpptDayInputProps = {
  date: Date;
  onChange: (value: any) => void;
};

export const WhpptDayInput: FC<WhpptDayInputProps> = ({ date, onChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="whppt-gallery__day-picker__container">
      <button className="whppt-image-editor-panel__date-picker-input" onClick={() => setShowCalendar(!showCalendar)}>
        <WhpptInput
          id="date"
          label="Date"
          info=""
          error=""
          type="text"
          disabled={true}
          value={date ? new Date(date).toLocaleDateString() : new Date().toLocaleDateString()}
        />

        <div className={`whppt-image-editor-panel__date-picker-icon ${showCalendar ? 'up' : 'down'}`}>
          <WhpptIcon is="down" />
        </div>
      </button>

      {showCalendar ? (
        <DayPicker
          className="whppt-gallery__day-picker__calendar"
          fixedWeeks={true}
          onDayClick={date => {
            onChange(date);
            setShowCalendar(false);
          }}
        />
      ) : null}
    </div>
  );
};
