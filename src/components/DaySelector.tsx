import { DaySelectorProps } from "../types";

const DaySelector = ({ days, selectedDay, onDaySelect }: DaySelectorProps) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      {days.map((day, index) => (
        <button
          key={day}
          onClick={() => onDaySelect(index)}
          style={{
            margin: '0 5px',
            backgroundColor: selectedDay === index ? '#007bff' : '#ffffff',
            color: selectedDay === index ? '#ffffff' : '#000000',
            padding: '5px 10px',
            border: '1px solid #007bff',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {new Date(day).toLocaleDateString()}
        </button>
      ))}
    </div>
  );
};

export default DaySelector; 