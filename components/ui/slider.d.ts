declare module 'components/ui/slider' {
  import React from 'react';

  interface SliderProps {
    value: number[];
    onValueChange: (value: number[]) => void;
    min?: number;
    max?: number;
    step?: number;
  }

  const Slider: React.FC<SliderProps>;
  export default Slider;
}
