import { TopCarsMockData } from '@common/types/types';

const BMWM3: TopCarsMockData = {
  id: '1111',
  name: 'M3',
  photoUrls: [
    'https://autoline-images.s3.eu-west-1.amazonaws.com/cars/f9760ce5eaf715e0a597c776397338e2.jpg',
  ],
  brand: {
    name: 'BMW',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
  },
  price: 48700,
  complectationName: '',
  speedometr: 47500,
  transmission: 'Mechanical',
  location: 'Lutsk',
  fuel: 'Gasoline',
};

const BMWMI4: TopCarsMockData = {
  id: '2222',
  name: 'i4',
  photoUrls: [
    'https://autoline-images.s3.eu-west-1.amazonaws.com/cars/fd64ce2ce84cf7926127745757eda9df.jpg',
  ],
  brand: {
    name: 'BMW',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
  },
  price: 67700,
  complectationName: '',
  speedometr: 100,
  transmission: 'Automatic',
  location: 'Kyiv',
  fuel: 'Electro',
};

const MazdaMX5: TopCarsMockData = {
  id: '3333',
  name: 'MX-5',
  photoUrls: [
    'https://autoline-images.s3.eu-west-1.amazonaws.com/cars/56892b0c35f94739da735d0bf442b064.jpg',
  ],
  brand: {
    name: 'Mazda',
    logoUrl: 'https://www.pngall.com/wp-content/uploads/2/Mazda-PNG-Pic.png',
  },
  price: 82000,
  complectationName: '',
  speedometr: 12300,
  transmission: 'Automatic',
  location: 'Lviv',
  fuel: 'Gasoline',
};

const Mazda6: TopCarsMockData = {
  id: '4444',
  name: '6',
  photoUrls: [
    'https://autoline-images.s3.eu-west-1.amazonaws.com/cars/7cfb79d83591fd91702ea0258be73c82.jpg',
  ],
  brand: {
    name: 'Mazda',
    logoUrl: 'https://www.pngall.com/wp-content/uploads/2/Mazda-PNG-Pic.png',
  },
  price: 37500,
  complectationName: '',
  speedometr: 34200,
  transmission: 'Automatic',
  location: 'Odesa',
  fuel: 'Gasoline',
};

const HondaHRV: TopCarsMockData = {
  id: '5555',
  name: 'HR-V',
  photoUrls: [
    'https://autoline-images.s3.eu-west-1.amazonaws.com/cars/df9c207b4bbbf0e0c110426a2ddf7104.jpg',
  ],
  brand: {
    name: 'Honda',
    logoUrl: 'https://www.downloadclipart.net/large/honda-logo-png.png',
  },
  price: 49500,
  complectationName: '',
  speedometr: 17100,
  transmission: 'Automatic',
  location: 'Mykolayiv',
  fuel: 'Hybrid',
};

const HondaCRV: TopCarsMockData = {
  id: '6666',
  name: 'CR-V',
  photoUrls: [
    'https://autoline-images.s3.eu-west-1.amazonaws.com/cars/72f56171a63f0d6caa9776d462772260.jpg',
  ],
  brand: {
    name: 'Honda',
    logoUrl: 'https://www.downloadclipart.net/large/honda-logo-png.png',
  },
  price: 51600,
  complectationName: '',
  speedometr: 22500,
  transmission: 'Automatic',
  location: 'Dnipro',
  fuel: 'Hybrid',
};

const VolvoV60: TopCarsMockData = {
  id: '7777',
  name: 'V60 Recharge',
  photoUrls: [
    'https://autoline-images.s3.eu-west-1.amazonaws.com/cars/26b76498ce94533d3f17a4bc655a51b7.jpg',
  ],
  brand: {
    name: 'Volvo',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/ru/thumb/7/74/Volvo_Logo.svg/120px-Volvo_Logo.svg.png?20080211173050',
  },
  price: 61400,
  complectationName: '',
  speedometr: 15200,
  transmission: 'Automatic',
  location: 'Dnipro',
  fuel: 'Hybrid',
};

const VolvoXC40: TopCarsMockData = {
  id: '8888',
  name: 'XC40 Recharge',
  photoUrls: [
    'https://autoline-images.s3.eu-west-1.amazonaws.com/cars/b0ecf1e198c0c8cae91d6de4b2643c6a.jpg',
  ],
  brand: {
    name: 'Volvo',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/ru/thumb/7/74/Volvo_Logo.svg/120px-Volvo_Logo.svg.png?20080211173050',
  },
  price: 48500,
  complectationName: '',
  speedometr: 23200,
  transmission: 'Automatic',
  location: 'Chernivtsi',
  fuel: 'Electro',
};

const topCars = [
  Mazda6,
  VolvoXC40,
  BMWM3,
  HondaCRV,
  MazdaMX5,
  BMWMI4,
  HondaHRV,
  VolvoV60,
];

export { topCars };
