import React from 'react';

interface SliderProps {
  value: number; // Changed to a single number
  onValueChange: (value: number) => void; // Changed to a single number
  min?: number;
  max?: number;
  step?: number;
}

const Slider: React.FC<SliderProps> = ({ value, onValueChange, min = 0, max = 5, step = 1 }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(Number(event.target.value));
  };

  return (
    <div className="flex items-center">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="slider"
      />
      <span className="ml-2">{value}</span>
    </div>
  );
};

export default Slider;
