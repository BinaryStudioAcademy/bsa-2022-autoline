import { CharacteristicsListInfoProps } from '@common/types/characteristics-list/characteristics-list';

export const mockCarInfo: CharacteristicsListInfoProps = {
  modelName: 'BMW X5 M PACKET 40D 2015',
  importantFeatures: [
    'Leather Interior',
    'LED Headlight',
    'Crossover',
    'LCD screen',
    'ABS',
    'BAS / EBD',
    'VSM',
    'Recognition of road signs',
    'Leather Interior',
    'BAS / EBD',
  ],
  optionGroups: [
    {
      name: 'General Inform',
      options: [
        {
          name: 'Color',
          value: 'Black Metallic',
          color: '#070A0C',
        },
        {
          name: 'Race',
          value: 'to 198 000 km',
        },
        {
          name: 'Motor',
          value: 'Diesel, 3 l. ',
        },
        {
          name: 'Transmission',
          value: 'Automatic',
        },
        {
          name: 'Wheel Drive',
          value: 'All',
        },
        {
          name: 'Interior Color and Materials',
          value: 'Brown skin',
          color: '#924F12',
        },
        {
          name: 'Electric Windows',
          value: 'Front and rear',
        },
        {
          name: 'Air Conditioning',
          value: 'Multi-Zone Climate Control',
        },
        {
          name: 'Steering Wheel Adjustment',
          value: 'By Height and Departure',
        },
        {
          name: 'Spare Wheel',
          value: 'Touch the Wheel',
        },
      ],
    },
    {
      name: 'Seat',
      options: [
        { value: 'Electrical Adjustment of the Front Seats' },
        { value: 'Ventilation of the Front Seats' },
        { value: 'Memory of the Position of the Front Seats' },
      ],
    },
    {
      name: 'Security',
      options: [
        { value: 'Central Locking' },
        { value: 'Anti-Lock Braking System (ABS)' },
        { value: 'Alarm' },
        { value: 'Immobilizer' },
        { value: 'Cruise Control' },
        { value: 'Anti-Skid System (ASR)' },
        { value: 'Stabilization of Steering Control (VSM)' },
        { value: 'Brake Force Distribution (BAS / EBD)' },
      ],
    },
    {
      name: 'Comfort',
      options: [
        { value: 'On-Board Computer' },
        { value: 'Heated Mirrors' },
        { value: 'Heated Steering Wheel' },
        { value: 'Keyless Access System' },
        { value: 'Start-Stop System' },
        { value: 'Projection Display' },
        { value: 'Electric Steering Wheel Adjustment' },
        { value: 'Steering Wheel with Position Memory' },
        { value: 'Multifunctional Steering Wheel' },
        { value: 'Steering Wheel Gear Shift Paddles' },
        { value: 'Trunk Opening without Assistance Hands' },
        { value: 'Adaptive Cruise' },
        { value: 'Remote Engine Start' },
      ],
    },
    {
      name: 'Multimedia',
      options: [
        { value: 'Acoustics' },
        { value: 'Navigation System' },
        { value: 'Audio Preparation' },
        { value: 'Bluetooth' },
        { value: 'Multimedia System for Rear Passengers' },
      ],
    },
    {
      name: 'Optics',
      options: [
        { value: 'Rain and Light Sensor' },
        { value: 'Headlight Washer' },
        { value: 'Daytime Running Lights' },
        { value: 'Adaptive Lighting System' },
        { value: 'High Beam Control System' },
      ],
    },
  ],
};
