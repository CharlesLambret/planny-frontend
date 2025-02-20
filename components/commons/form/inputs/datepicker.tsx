import React from 'react';

interface DatePickerProps {
  startDate: Date;
  endDate: Date;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ startDate, endDate, handleChange }) => {
  const formattedStartDate = startDate.toISOString().split('T')[0];
  const formattedEndDate = endDate.toISOString().split('T')[0];

  return (
    <div id="date-range-picker" className="flex items-center">
      <div>
        <input
          id="datepicker-range-start"
          name="start_date"
          type="date"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Select date start"
          value={formattedStartDate}
          onChange={handleChange}
        />
      </div>
      <span className="mx-4 text-gray-500">to</span>
      <div>
        <input
          id="datepicker-range-end"
          name="end_date"
          type="date"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Select date end"
          value={formattedEndDate}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default DatePicker;