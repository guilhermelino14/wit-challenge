import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { DaySelectorProps } from '../types';

const DaySelector = ({ days, selectedDay, onDaySelect, temperatures }: DaySelectorProps) => {
  const getMinMaxTemp = (temps: Array<{ hour: string; temp: number }>) => {
    const allTemps = temps.map(t => t.temp);
    return {
      max: Math.max(...allTemps).toFixed(1),
      min: Math.min(...allTemps).toFixed(1)
    };
  };

  const formatDay = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, "EEE, MMM d", { locale: enUS });
  };

  return (
    <Box sx={{ height: '100%' }}>
      <ToggleButtonGroup
        orientation="vertical"
        value={selectedDay}
        exclusive
        onChange={(_, value) => value !== null && onDaySelect(value)}
        sx={{
          height: '100%',
          display: 'flex',
          '& .MuiToggleButton-root': {
            py: 2,
            justifyContent: 'space-between',
            borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: '4px !important',
            mb: 1,
            flex: 1
          }
        }}
      >
        {days.map((day, index) => {
          const { max, min } = getMinMaxTemp(temperatures[day]);
          return (
            <ToggleButton 
              key={day} 
              value={index}
              sx={{
                textTransform: 'none',
                width: '100%'
              }}
            >
              <Typography sx={{ flex: 1, textAlign: 'left' }}>
                {formatDay(day)}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {max}°/{min}°
              </Typography>
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </Box>
  );
};

export default DaySelector; 