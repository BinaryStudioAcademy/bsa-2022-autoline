declare type TopCars = {
  id: string;
  name: string;
  photoUrls: string[] | [];
  brand: {
    name: string;
    logoUrl: string;
  };
  price: number;
  complectationName?: string;
  speedometr: number;
  transmission: string;
  location: string;
  fuel: string;
};

const BMWM3: TopCars = {
  id: '1111',
  name: 'M3',
  photoUrls: [
    'https://nextcar.ua/images/blog/513/2023-BMW-M3-Touring-49_1.jpg',
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

const BMWMI4: TopCars = {
  id: '2222',
  name: 'i4',
  photoUrls: [
    'https://newcars.com.ua/upload/img_catalog/i4/bmw_i4_2021_01.jpg',
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

const MazdaMX5: TopCars = {
  id: '3333',
  name: 'MX-5',
  photoUrls: [
    'https://mazda.ua/images/doc/8/f/8f4b5fd-2019mx-5-rf-machine-grey-19-fn-1200-800.jpg',
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

const Mazda6: TopCars = {
  id: '4444',
  name: '6',
  photoUrls: [
    'https://topgir.com.ua/wp-content/uploads/2019/11/img-1360163241-1554498653476.jpg',
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

const HondaHRV: TopCars = {
  id: '5555',
  name: 'HR-V',
  photoUrls: [
    'https://honda.ua/wp-content/uploads/2021/06/340061_HR-V_S_e_HEV_TECHNOLOGY_DELIVERS_OPTIMAL_BLEND_OF_EFFICIENCY_AND-1900x1268.jpg',
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

const HondaCRV: TopCars = {
  id: '6666',
  name: 'CR-V',
  photoUrls: [
    'https://honda.ua/wp-content/uploads/2020/01/159173_2019_Honda_CR-V_Hybrid-1900x1267.jpg',
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

const VolvoV60: TopCars = {
  id: '7777',
  name: 'V60 Recharge',
  photoUrls: [
    'https://media.ed.edmunds-media.com/volvo/v60/2021/oem/2021_volvo_v60_wagon_t8-polestar-engineered_fq_oem_1_1600.jpg',
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

const VolvoXC40: TopCars = {
  id: '8888',
  name: 'XC40 Recharge',
  photoUrls: ['https://i.infocar.ua/i/12/6092/1400x936.jpg'],
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

const BMW2: TopCars = {
  id: '9999',
  name: '2',
  photoUrls: ['https://i.infocar.ua/i/12/3233/1400x936.jpg'],
  brand: {
    name: 'BMW',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
  },
  price: 35422,
  complectationName: '',
  speedometr: 120200,
  transmission: 'Mechanical',
  location: 'Lutsk',
  fuel: 'Disel',
};

const VolvoS90: TopCars = {
  id: '11111',
  name: 'S90 Recharge',
  photoUrls: [
    'https://images.thestar.com/1NT-_spTnMI1yoRyZ6ejfAID2KU=/1200x800/smart/filters:cb(1613624040778):format(webp)/https://www.thepeterboroughexaminer.com/content/dam/thestar/autos/review/2021/02/17/2021-volvo-s90-recharge-not-just-high-tech-its-a-fun-drive-too/_1_2021_volvo_s90_recharge_front_three_quarter.jpg',
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
  VolvoS90,
  HondaHRV,
  VolvoV60,
  BMW2,
];

export { type TopCars, topCars };
