import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

function valueText(value) {
  return `${value}°C`;
}

const marks = [
  {
    value: 0,
    label: '0°C'
  },
  {
    value: 20,
    label: '20°C'
  },
  {
    value: 37,
    label: '37°C'
  },
  {
    value: 100,
    label: '100°C'
  }
];

export default function VerticalSlider() {
  return (
    <Stack sx={{ height: 300 }} spacing={1} direction="row">
      <Slider aria-label="Temperature" orientation="vertical" getAriaValueText={valueText} defaultValue={30} />
      <Slider aria-label="Temperature" orientation="vertical" defaultValue={30} disabled />
      <Slider
        getAriaLabel={() => 'Temperature'}
        orientation="vertical"
        getAriaValueText={valueText}
        defaultValue={[20, 37]}
        marks={marks}
      />
    </Stack>
  );
}
