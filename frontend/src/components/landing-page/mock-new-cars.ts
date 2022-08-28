import type { ModelResponseDto } from '@autoline/shared/common/types/types';

const hondaCivic: ModelResponseDto = {
  id: '1111',
  wishlistId: null,
  createdAt: new Date(),
  name: 'CR-V',
  yearStart: 2018,
  yearEnd: 2021,
  photoUrls: [
    'https://honda.ua/wp-content/uploads/2019/04/134726_2018_Honda_CR-V_VTEC_TURBO_Petrol-1900x1267.jpg',
  ],
  brand: {
    name: 'Honda',
    logoUrl: 'https://www.downloadclipart.net/large/honda-logo-png.png',
  },
  bodyType: 'Minivan',
  manufactureCountry: 'Japan',
  pricesRanges: [
    { price_start: 15000, price_end: 17300 },
    { price_start: 19700, price_end: 24500 },
    { price_start: 22300, price_end: 25750 },
  ],
  description:
    "This Honda CR-V 1.5 VTEC Turbo AWD was produced from 2018 to 2021. It replaced the . It's an all-wheel drive front-engined 5-door medium SUV with 5-7 seats. With 170 BHP, the turbocharged 1.5 Litre 16v Inline 4 petrol engine (Honda L-series L15BE) accelerates this CR-V 1.5 VTEC Turbo AWD to 62 mph in 9.3 seconds and on to a maximum speed of 129 mph. Having a kerb weight of 1573 kg, it achieves 42.8 mpg on average and can travel 536 miles before requiring a refill of its 57 litre capacity fuel tank. It comes with a 6 speed manual gearbox. Luggage space is 561 litres, but can be expanded to 1756 litres for larger loads, with a maximum payload capacity of 777 kg. Find out more about the new  at the Honda UK website.",
  complectationName: 'TURBO',
};

const BMWiX3: ModelResponseDto = {
  id: '2222',
  wishlistId: null,
  createdAt: new Date(),
  name: 'iX3',
  yearStart: 2018,
  yearEnd: null,
  photoUrls: [
    'https://motor.ru/imgs/2022/03/20/12/5313126/62c12b1ca772092990d810337f5897ac99e44c7b.jpg',
  ],
  brand: {
    name: 'BMW',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
  },
  bodyType: 'SUV / Crossover',
  manufactureCountry: 'Germany',
  pricesRanges: [
    { price_start: 37000, price_end: 38200 },
    { price_start: 40100, price_end: 42100 },
    { price_start: 41150, price_end: 43570 },
  ],
  description:
    'The BMW iX3 is a battery electric compact luxury crossover SUV manufactured by BMW. It was presented at the 2018 Beijing Motor Show in April as the battery electric version of the BMW X3 (G01). Built on the same platform as the conventional X3 with only subtle changes, it is the third car of the electric-focused BMW i family and the first battery electric BMW SUV.',
  complectationName: 'ELECTRIC',
};

const Mazda3: ModelResponseDto = {
  id: '3333',
  wishlistId: null,
  createdAt: new Date(),
  name: '3',
  yearStart: 2003,
  yearEnd: null,
  photoUrls: [
    'https://www.allcarz.ru/wp-content/uploads/2018/11/foto-mazda-3-iv_12.jpg',
  ],
  brand: {
    name: 'Mazda',
    logoUrl: 'https://www.pngall.com/wp-content/uploads/2/Mazda-PNG-Pic.png',
  },
  bodyType: 'Sedan',
  manufactureCountry: 'Japan',
  pricesRanges: [
    { price_start: 27200, price_end: 31500 },
    { price_start: 29500, price_end: 30150 },
    { price_start: 30450, price_end: 33570 },
  ],
  description:
    'The Mazda3 (known as the Mazda Axela in Japan (first three generations), a combination of "accelerate" and "excellent") is a compact car manufactured by Mazda. It was first introduced in 2003 as a 2004 model, replacing the Familia/323/Protegé in the C-segment.',
  complectationName: 'EXCLUSIVE',
};

const Volvo: ModelResponseDto = {
  id: '4444',
  wishlistId: null,
  createdAt: new Date(),
  name: 'XC60 Recharge',
  yearStart: 2003,
  yearEnd: null,
  photoUrls: [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV1tOQoS-A3vemOw8VSAcNOcJ7cI-QfTUtw-XYXPbNqM_IiB9NMpSty6-27NQXJqZKaI8&usqp=CAU',
  ],
  brand: {
    name: 'Volvo',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/ru/thumb/7/74/Volvo_Logo.svg/120px-Volvo_Logo.svg.png?20080211173050',
  },
  bodyType: 'Sedan',
  manufactureCountry: 'Sweden',
  pricesRanges: [
    { price_start: 55200, price_end: 58500 },
    { price_start: 63500, price_end: 67150 },
    { price_start: 74450, price_end: 77240 },
  ],
  description:
    "The XC60 is part of Volvo's 60 Series of automobiles, along with the S60, S60 Cross Country, V60, and V60 Cross Country. The first generation model introduced a new style for the 60 Series models. Along with the rest of the lineup, the first-generation XC60 was refreshed in 2013. Similarly, the second-generation model, released in 2017, is the first in the series. The car was named Car of the Year Japan for 2017–2018.",
  complectationName: '',
};

const newCars = [hondaCivic, BMWiX3, Mazda3, Volvo];
export { newCars };
