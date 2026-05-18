export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'Power & Charging' | 'Cables' | 'Hubs & Docks' | 'Audio' | 'Mounts & Stands' | 'Storage' | 'Smart Accessories' | 'Travel Tech';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: 'Best Seller' | 'New' | 'Limited' | 'Featured Spotlight';
  shortDescription: string;
  images: string[];
  specs: {
    ports?: string[];
    powerDelivery?: string;
    standards?: string[];
    materials?: string | string[];
    inTheBox?: string[];
    careNotes?: string;
  };
  compatibility: {
    devices?: string[];
    ports?: string[];
    os?: string[];
    notes?: string;
  };
  longDescription: {
    whatItSolves: string;
    bestUseCases: string[];
  };
  bundleIds?: string[];
  setupModes: ('Desk' | 'Travel' | 'Gaming')[];
  specBadges: string[];
}

export const products: Product[] = [
  {
    id: 'product-1',
    name: 'Mini HD Portable Projector',
    slug: 'mini-hd-portable-projector',
    category: 'Smart Accessories',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.5,
    reviewCount: 234,
    badge: 'Best Seller',
    shortDescription: 'Compact HD projector perfect for home entertainment, presentations, and outdoor movie nights.',
    images: [
      '/products/1.1.png',
      '/products/1.2.png',
      '/products/1.3.png',
      '/products/1.4.png',
    ],
    specs: {
      ports: ['HDMI', 'USB', 'AV', 'TF Card'],
      powerDelivery: 'DC 19V/2A',
      standards: ['1080P Support', 'LED Lamp'],
      materials: 'ABS Plastic',
      inTheBox: ['Mini Projector', 'Power Adapter', 'Remote Control', 'User Manual'],
      careNotes: 'Keep lens clean with soft cloth. Avoid extreme temperatures. Allow ventilation during use.',
    },
    compatibility: {
      devices: ['Laptops', 'Phones', 'Tablets', 'Gaming Consoles', 'TV Sticks'],
      ports: ['HDMI', 'USB-A'],
      os: ['All devices with HDMI output'],
      notes: 'Best performance in dark rooms. Native resolution 800x480, supports 1080P input.',
    },
    longDescription: {
      whatItSolves: 'Turn any wall into a cinema. Perfect for movie nights, presentations, and gaming on a big screen.',
      bestUseCases: ['Home: Movie nights and gaming', 'Work: Presentations in small rooms', 'Travel: Portable entertainment'],
    },
    bundleIds: [],
    setupModes: ['Desk', 'Travel'],
    specBadges: ['HD', 'Portable', 'LED', 'HDMI'],
  },
  {
    id: 'product-2',
    name: 'Magnetic Wireless Fast Charging Power Bank',
    slug: 'magnetic-wireless-power-bank',
    category: 'Power & Charging',
    price: 54.99,
    originalPrice: 69.99,
    rating: 4.6,
    reviewCount: 189,
    badge: 'New',
    shortDescription: 'Magnetic wireless power bank with 10000mAh capacity for fast charging on the go.',
    images: [
      '/products/2.1.jpg',
      '/products/2.2.jpg',
      '/products/2.3.jpg',
      '/products/2.4.jpg',
    ],
    specs: {
      ports: ['1x USB-C PD', '1x USB-A QC 3.0'],
      powerDelivery: '15W Wireless, 22.5W Wired',
      standards: ['Qi2 Compatible', 'PD 3.0', 'QC 3.0'],
      materials: 'Aluminum alloy, tempered glass',
      inTheBox: ['Power Bank', 'USB-C Cable', 'User Manual'],
      careNotes: 'Avoid extreme temperatures. Keep charging surface clean. Store in cool dry place.',
    },
    compatibility: {
      devices: ['iPhone 12+', 'Samsung Galaxy S21+', 'AirPods Pro', 'Android with Qi'],
      ports: ['USB-C', 'USB-A'],
      os: ['N/A — hardware'],
      notes: 'Magnetic alignment for iPhone 12+. Works with any Qi-enabled device.',
    },
    longDescription: {
      whatItSolves: 'Never run out of battery. Snap it to your phone and charge wirelessly while on the move.',
      bestUseCases: ['Travel: Portable backup power', 'Work: All-day connectivity', 'Gaming: Extended playtime'],
    },
    bundleIds: [],
    setupModes: ['Travel', 'Gaming'],
    specBadges: ['Magnetic', 'Wireless', '10000mAh', 'PD 22.5W'],
  },
  {
    id: 'product-3',
    name: 'WiFi Smart Fingerprint Door Lock',
    slug: 'wifi-smart-fingerprint-lock',
    category: 'Smart Accessories',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviewCount: 156,
    badge: 'Best Seller',
    shortDescription: 'Smart door lock with fingerprint, WiFi, and app control for keyless entry.',
    images: [
      '/products/3.1.jpg',
      '/products/3.2.jpg',
      '/products/3.3.jpg',
      '/products/3.4.jpg',
    ],
    specs: {
      ports: [],
      powerDelivery: '4x AA Batteries (included)',
      standards: ['WiFi 2.4GHz', 'Biometric Fingerprint', 'Tuya Smart App'],
      materials: 'Zinc Alloy, Tempered Glass',
      inTheBox: ['Smart Lock', 'Deadbolt Assembly', 'Keys (2)', 'Batteries (4)', 'Mounting Hardware', 'User Manual'],
      careNotes: 'Replace batteries every 6-8 months. Keep fingerprint sensor clean and dry. Wipe with soft cloth.',
    },
    compatibility: {
      devices: ['iOS App', 'Android App'],
      ports: [],
      os: ['iOS 12+', 'Android 6.0+'],
      notes: 'Works with standard US deadbolt. Auto-lock after 30 seconds. Stores up to 100 fingerprints.',
    },
    longDescription: {
      whatItSolves: 'Never worry about lost keys again. Multiple ways to unlock: fingerprint, app, or backup key.',
      bestUseCases: ['Home: Secure keyless entry', 'Office: Access control', 'Rental: Remote access for guests'],
    },
    bundleIds: [],
    setupModes: ['Desk'],
    specBadges: ['Fingerprint', 'WiFi', 'App Control', 'Auto-Lock'],
  },
  {
    id: 'product-4',
    name: 'Smart Wrist Blood Pressure Monitor',
    slug: 'smart-wrist-blood-pressure-monitor',
    category: 'Smart Accessories',
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.4,
    reviewCount: 298,
    badge: 'New',
    shortDescription: 'Digital wrist blood pressure monitor with large LCD display and memory function.',
    images: [
      '/products/4.1.png',
      '/products/4.2.jpg',
      '/products/4.3.jpg',
      '/products/4.4.png',
    ],
    specs: {
      ports: [],
      powerDelivery: '2x AAA Batteries',
      standards: ['WHO Classification', 'FDA Approved'],
      materials: ['ABS Plastic', 'Soft Nylon Cuff'],
      inTheBox: ['Blood Pressure Monitor', 'Wrist Cuff', 'Batteries (2)', 'Storage Box', 'User Manual'],
      careNotes: 'Clean cuff with damp cloth. Avoid extreme temperatures. Calibrate annually.',
    },
    compatibility: {
      devices: [],
      ports: [],
      os: ['N/A — standalone device'],
      notes: 'Measures systolic, diastolic, and pulse rate. Memory for 60 readings. Auto power off.',
    },
    longDescription: {
      whatItSolves: 'Monitor your health at home. Track blood pressure trends over time with built-in memory.',
      bestUseCases: ['Home: Daily health monitoring', 'Travel: Portable health tracking', 'Elderly: Easy-to-use design'],
    },
    bundleIds: [],
    setupModes: ['Travel'],
    specBadges: ['Blood Pressure', 'Heart Rate', 'Memory', 'FDA'],
  },
  {
    id: 'product-5',
    name: 'Bladeless Portable Air Purifier Fan',
    slug: 'bladeless-air-purifier-fan',
    category: 'Smart Accessories',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.3,
    reviewCount: 167,
    badge: 'New',
    shortDescription: 'Air purifier with bladeless fan design, HEPA filter, and touch controls.',
    images: [
      '/products/5.1.jpg',
      '/products/5.2.jpg',
      '/products/5.3.jpg',
      '/products/5.4.jpg',
    ],
    specs: {
      ports: ['DC Power Input'],
      powerDelivery: '24W',
      standards: ['HEPA H13', 'CADR 200m³/h'],
      materials: ['ABS Plastic', 'HEPA Filter'],
      inTheBox: ['Air Purifier', 'HEPA Filter (pre-installed)', 'Power Adapter', 'User Manual'],
      careNotes: 'Replace filter every 3-6 months. Clean exterior with soft cloth. Keep vents clear.',
    },
    compatibility: {
      devices: [],
      ports: ['AC Power'],
      os: ['N/A — standalone'],
      notes: 'Covers rooms up to 215 sq ft. 3 speed settings. Quiet operation at 25dB.',
    },
    longDescription: {
      whatItSolves: 'Breathe cleaner air at home or office. Removes 99.97% of particles down to 0.3 microns.',
      bestUseCases: ['Home: Bedroom or living room', 'Office: Personal workspace', 'Travel: Hotel room air quality'],
    },
    bundleIds: [],
    setupModes: ['Desk'],
    specBadges: ['HEPA', 'Bladeless', 'Quiet', '3 Speeds'],
  },
  {
    id: 'product-6',
    name: 'Wireless Charging Bluetooth Alarm Speaker',
    slug: 'wireless-charging-alarm-speaker',
    category: 'Audio',
    price: 49.99,
    rating: 4.5,
    reviewCount: 234,
    badge: 'Best Seller',
    shortDescription: 'Bluetooth speaker with wireless charging pad and alarm clock functionality.',
    images: [
      '/products/6.1.jpg',
      '/products/6.2.png',
      '/products/6.3.png',
      '/products/6.4.png',
    ],
    specs: {
      ports: ['USB-C', '3.5mm Audio'],
      powerDelivery: '15W Wireless Charging',
      standards: ['Bluetooth 5.0', 'Qi Wireless', 'FM Radio'],
      materials: ['Fabric Mesh', 'ABS Plastic'],
      inTheBox: ['Alarm Speaker', 'USB-C Cable', 'User Manual'],
      careNotes: 'Keep speaker away from water. Clean mesh with soft brush. Avoid dropping.',
    },
    compatibility: {
      devices: ['All Bluetooth devices', 'Qi-enabled phones'],
      ports: ['USB-C', '3.5mm'],
      os: ['All Bluetooth devices'],
      notes: 'Dual alarm with snooze. FM radio with 20 station memory. LED display with dimmer.',
    },
    longDescription: {
      whatItSolves: 'Wake up to your favorite music and charge your phone overnight. All-in-one bedside companion.',
      bestUseCases: ['Home: Bedside alarm and charger', 'Office: Desk speaker with charging', 'Travel: Compact audio solution'],
    },
    bundleIds: [],
    setupModes: ['Desk'],
    specBadges: ['Bluetooth 5.0', 'Wireless Charging', 'Alarm Clock', 'FM Radio'],
  },
  {
    id: 'product-7',
    name: 'Compact USB GPS Tracking Device',
    slug: 'compact-usb-gps-tracker',
    category: 'Smart Accessories',
    price: 29.99,
    rating: 4.2,
    reviewCount: 156,
    badge: 'New',
    shortDescription: 'Mini GPS tracker with USB charging and real-time location tracking.',
    images: [
      '/products/7.1.jpg',
      '/products/7.2.png',
      '/products/7.3.png',
      '/products/7.4.png',
    ],
    specs: {
      ports: ['USB-C'],
      powerDelivery: 'Rechargeable 500mAh',
      standards: ['GPS + LBS', '4G Network'],
      materials: ['ABS Plastic', 'Silicone strap'],
      inTheBox: ['GPS Tracker', 'USB Cable', 'Lanyard', 'User Manual'],
      careNotes: 'Keep dry. Avoid extreme temperatures. Charge monthly when not in use.',
    },
    compatibility: {
      devices: ['iOS App', 'Android App'],
      ports: ['USB-C'],
      os: ['iOS 12+', 'Android 6.0+'],
      notes: 'Real-time tracking with 7-day history. Geofencing alerts. Waterproof IP65.',
    },
    longDescription: {
      whatItSolves: 'Track vehicles, pets, or luggage in real-time. Never lose track of what matters most.',
      bestUseCases: ['Home: Pet and vehicle tracking', 'Travel: Luggage security', 'Elderly: Personal safety'],
    },
    bundleIds: [],
    setupModes: ['Travel'],
    specBadges: ['GPS', 'Real-time', '4G', 'Waterproof'],
  },
  {
    id: 'product-8',
    name: 'Dual USB Car Bluetooth FM Transmitter',
    slug: 'dual-usb-car-bluetooth-fm',
    category: 'Smart Accessories',
    price: 19.99,
    rating: 4.1,
    reviewCount: 423,
    badge: 'Best Seller',
    shortDescription: 'Bluetooth FM transmitter with dual USB ports for hands-free calling and music.',
    images: [
      '/products/8.1.jpg',
      '/products/8.2.jpg',
      '/products/8.3.jpg',
      '/products/8.4.jpg',
    ],
    specs: {
      ports: ['2x USB-A', '3.5mm Audio'],
      powerDelivery: 'QC 3.0 (18W)',
      standards: ['Bluetooth 5.0', 'FM 87.5-108MHz'],
      materials: ['ABS Plastic'],
      inTheBox: ['FM Transmitter', 'User Manual'],
      careNotes: 'Keep away from liquids. Clean contacts periodically. Avoid extreme heat in car.',
    },
    compatibility: {
      devices: ['All Bluetooth devices', 'iPhone', 'Android'],
      ports: ['USB-A', 'Car cigarette lighter'],
      os: ['All Bluetooth devices'],
      notes: 'Hands-free calling with noise cancellation. Supports USB flash drive playback. LED voltage display.',
    },
    longDescription: {
      whatItSolves: 'Upgrade any car with Bluetooth. Stream music and take calls without touching your phone.',
      bestUseCases: ['Travel: Road trip music', 'Commute: Hands-free calling', 'Home: Use as home FM transmitter'],
    },
    bundleIds: [],
    setupModes: ['Travel'],
    specBadges: ['Bluetooth 5.0', 'Hands-free', 'QC 3.0', 'LED Display'],
  },
  {
    id: 'product-9',
    name: 'LED Bluetooth Car Charger Adapter',
    slug: 'led-bluetooth-car-charger',
    category: 'Smart Accessories',
    price: 24.99,
    rating: 4.3,
    reviewCount: 567,
    badge: 'Best Seller',
    shortDescription: 'Car charger with LED display and Bluetooth connectivity for music and calls.',
    images: [
      '/products/9.1.png',
      '/products/9.2.jpg',
      '/products/9.3.png',
      '/products/9.4.jpg',
    ],
    specs: {
      ports: ['2x USB-A', '1x USB-C PD'],
      powerDelivery: 'QC 3.0 + PD 20W',
      standards: ['Bluetooth 5.0', 'LED Display'],
      materials: ['ABS Plastic', 'Aluminum alloy'],
      inTheBox: ['Car Charger', 'User Manual'],
      careNotes: 'Keep contacts clean. Avoid extreme temperatures in car. Dry hands before handling.',
    },
    compatibility: {
      devices: ['iPhone', 'Android', 'Tablets', 'GPS Devices'],
      ports: ['Car cigarette lighter 12V/24V'],
      os: ['All devices'],
      notes: 'LED voltage display shows car battery status. Quick charge 3.0 on USB-A. PD on USB-C.',
    },
    longDescription: {
      whatItSolves: 'Charge multiple devices while driving. LED shows your car battery health in real-time.',
      bestUseCases: ['Travel: Multi-device charging', 'Commute: Keep devices powered', 'Road trip: Everyone stays charged'],
    },
    bundleIds: [],
    setupModes: ['Travel'],
    specBadges: ['LED Display', 'QC 3.0', 'PD 20W', 'Voltage Monitor'],
  },
  {
    id: 'product-10',
    name: 'Multi-Port Car Cigarette Lighter Splitter',
    slug: 'multi-port-car-lighter-splitter',
    category: 'Smart Accessories',
    price: 19.99,
    rating: 4.4,
    reviewCount: 234,
    badge: 'New',
    shortDescription: 'Expand your car cigarette lighter into multiple outlets and USB ports.',
    images: [
      '/products/10.1.jpg',
      '/products/10.2.jpg',
      '/products/10.3.jpg',
      '/products/10.4.jpg',
    ],
    specs: {
      ports: ['3x AC Outlets', '2x USB-A', '1x USB-C PD'],
      powerDelivery: '120W Total, PD 18W',
      standards: ['Surge Protection', 'Overload Protection'],
      materials: ['ABS Plastic', 'Copper contacts'],
      inTheBox: ['Lighter Splitter', 'User Manual'],
      careNotes: 'Do not exceed 120W total. Unplug when not in use. Keep vents clear.',
    },
    compatibility: {
      devices: ['Car vacuums', 'Dash cams', 'GPS', 'Phone chargers', 'Portable fans'],
      ports: ['Car cigarette lighter 12V/24V'],
      os: ['N/A — hardware'],
      notes: 'Works with 12V and 24V vehicles. On/off switch for each outlet. LED power indicator.',
    },
    longDescription: {
      whatItSolves: 'One cigarette lighter becomes a power hub. Run multiple devices simultaneously on road trips.',
      bestUseCases: ['Travel: Road trip power hub', 'Work: Mobile office power', 'Family: Keep everyone charged'],
    },
    bundleIds: [],
    setupModes: ['Travel'],
    specBadges: ['3 AC Outlets', '3 USB', 'Surge Protection', '120W'],
  },
  {
    id: 'product-11',
    name: 'Bluetooth Car FM Transmitter Player',
    slug: 'bluetooth-car-fm-transmitter',
    category: 'Smart Accessories',
    price: 15.99,
    rating: 4.0,
    reviewCount: 678,
    badge: 'Best Seller',
    shortDescription: 'Wireless FM transmitter with music player and hands-free calling.',
    images: [
      '/products/11.1.jpg',
      '/products/11.2.png',
      '/products/11.3.png',
      '/products/11.4.png',
    ],
    specs: {
      ports: ['USB-A (2)', 'TF Card', 'USB Flash Drive'],
      powerDelivery: 'QC 3.0',
      standards: ['Bluetooth 5.0', 'FM 87.5-108MHz'],
      materials: ['ABS Plastic'],
      inTheBox: ['FM Transmitter', 'User Manual'],
      careNotes: 'Avoid liquids. Keep frequency clear of local stations. Clean USB contacts.',
    },
    compatibility: {
      devices: ['iPhone', 'Android', 'MP3 Players', 'USB Flash Drives'],
      ports: ['Car cigarette lighter'],
      os: ['All Bluetooth devices'],
      notes: 'Supports TF card up to 32GB. CVC noise cancellation for calls. 5 EQ modes.',
    },
    longDescription: {
      whatItSolves: 'Play your music through any car stereo. No Bluetooth? No problem — use USB or TF card.',
      bestUseCases: ['Travel: Road trip playlists', 'Commute: Morning podcasts', 'Older cars: Add modern connectivity'],
    },
    bundleIds: [],
    setupModes: ['Travel'],
    specBadges: ['Bluetooth 5.0', 'TF Card', 'QC 3.0', 'Hands-free'],
  },
  {
    id: 'product-12',
    name: '200W Multi-Port Fast Charging Station',
    slug: '200w-multi-port-charging-station',
    category: 'Power & Charging',
    price: 59.99,
    rating: 4.7,
    reviewCount: 189,
    badge: 'Best Seller',
    shortDescription: 'Desktop charging station with 6 ports and 200W total power output.',
    images: [
      '/products/12.1.png',
      '/products/12.2.png',
      '/products/12.3.png',
      '/products/12.4.jpg',
    ],
    specs: {
      ports: ['4x USB-A', '2x USB-C PD'],
      powerDelivery: '100W (USB-C1), 65W (USB-C2), 24W per USB-A',
      standards: ['PD 3.0', 'QC 4.0', 'PPS'],
      materials: ['ABS + PC Fireproof', 'Aluminum base'],
      inTheBox: ['Charging Station', 'Power Cord', 'User Manual'],
      careNotes: 'Place on flat stable surface. Keep vents clear. Avoid stacking on top of devices.',
    },
    compatibility: {
      devices: ['Laptops', 'Tablets', 'Phones', 'Smartwatches', 'Earbuds'],
      ports: ['USB-C', 'USB-A'],
      os: ['All devices'],
      notes: 'Charge 6 devices simultaneously. Smart power distribution. Surge and overheat protection.',
    },
    longDescription: {
      whatItSolves: 'One charger for all your devices. Keep your desk tidy while powering everything at full speed.',
      bestUseCases: ['Work: Desktop charging hub', 'Home: Family charging station', 'Office: Conference room charging'],
    },
    bundleIds: [],
    setupModes: ['Desk'],
    specBadges: ['200W Total', '6 Ports', 'PD 100W', 'Smart Distribution'],
  },
  {
    id: 'product-13',
    name: 'Foldable Magnetic Wireless Charging Stand',
    slug: 'foldable-magnetic-wireless-charger',
    category: 'Power & Charging',
    price: 34.99,
    rating: 4.5,
    reviewCount: 298,
    badge: 'New',
    shortDescription: 'Foldable wireless charging stand with magnetic alignment for iPhone.',
    images: [
      '/products/13.1.png',
      '/products/13.2.jpg',
      '/products/13.3.jpg',
      '/products/13.4.jpg',
    ],
    specs: {
      ports: ['USB-C'],
      powerDelivery: '15W MagSafe, 10W Qi, 7.5W Apple',
      standards: ['Qi2', 'MagSafe Compatible'],
      materials: ['Aluminum Alloy', 'Silicone'],
      inTheBox: ['Wireless Charger', 'USB-C Cable', 'User Manual'],
      careNotes: 'Remove metal cases. Keep charging surface clean. Avoid magnetic cards near charger.',
    },
    compatibility: {
      devices: ['iPhone 12+', 'AirPods Pro', 'Samsung Galaxy S21+', 'All Qi devices'],
      ports: ['USB-C'],
      os: ['All devices'],
      notes: 'Magnetic snap for perfect alignment. Adjustable viewing angle. Works with thin cases.',
    },
    longDescription: {
      whatItSolves: 'Charge while you watch. Magnetic alignment means perfect positioning every time.',
      bestUseCases: ['Home: Bedside charging', 'Office: Desk charging', 'Travel: Foldable for packing'],
    },
    bundleIds: [],
    setupModes: ['Desk'],
    specBadges: ['Magnetic', 'Foldable', '15W Fast', 'Adjustable'],
  },
  {
    id: 'product-14',
    name: 'Smart LED Ambient Bluetooth Speaker Lamp',
    slug: 'smart-led-bluetooth-speaker-lamp',
    category: 'Audio',
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviewCount: 178,
    badge: 'Best Seller',
    shortDescription: 'LED mood lamp with built-in Bluetooth speaker for ambient lighting and music.',
    images: [
      '/products/14.1.jpg',
      '/products/14.2.jpg',
      '/products/14.3.jpg',
      '/products/14.4.jpg',
    ],
    specs: {
      ports: ['USB-C'],
      powerDelivery: '10W LED, 5W Speaker',
      standards: ['Bluetooth 5.0', 'RGB LED'],
      materials: ['ABS Plastic', 'Acrylic shade'],
      inTheBox: ['LED Speaker Lamp', 'USB-C Cable', 'Remote Control', 'User Manual'],
      careNotes: 'Keep away from water. Clean with soft dry cloth. Avoid dropping.',
    },
    compatibility: {
      devices: ['All Bluetooth devices', 'iPhone', 'Android'],
      ports: ['USB-C'],
      os: ['All Bluetooth devices'],
      notes: '16 million colors. 256 brightness levels. Timer function with sleep mode.',
    },
    longDescription: {
      whatItSolves: 'Set the mood with lights and music in one device. Perfect for bedrooms, offices, or parties.',
      bestUseCases: ['Home: Ambient bedroom lighting', 'Office: Desk mood light', 'Gaming: RGB gaming setup'],
    },
    bundleIds: [],
    setupModes: ['Desk'],
    specBadges: ['RGB LED', 'Bluetooth 5.0', '16M Colors', 'Touch Control'],
  },
  {
    id: 'product-15',
    name: 'Rechargeable Silent Wireless Mouse',
    slug: 'rechargeable-silent-wireless-mouse',
    category: 'Smart Accessories',
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.5,
    reviewCount: 423,
    badge: 'Best Seller',
    shortDescription: 'Ergonomic wireless mouse with silent click and rechargeable battery.',
    images: [
      '/products/15.1.jpg',
      '/products/15.2.jpeg',
      '/products/15.3.jpeg',
      '/products/15.4.jpeg',
    ],
    specs: {
      ports: ['USB-C'],
      powerDelivery: 'Rechargeable 500mAh',
      standards: ['2.4GHz Wireless', 'Silent Click'],
      materials: ['ABS Plastic', 'Ergonomic design'],
      inTheBox: ['Wireless Mouse', 'USB Receiver', 'USB-C Cable', 'User Manual'],
      careNotes: 'Clean sensor with dry cloth. Store receiver in battery compartment when not in use.',
    },
    compatibility: {
      devices: ['Windows PC', 'Mac', 'Laptops'],
      ports: ['USB-A (receiver)'],
      os: ['Windows 7+', 'macOS 10.12+'],
      notes: 'Up to 1200 DPI. Silent clicks. Auto sleep after 10 minutes of inactivity.',
    },
    longDescription: {
      whatItSolves: 'Silent clicks for quiet environments. Rechargeable means no more batteries.',
      bestUseCases: ['Work: Office and meetings', 'Home: Quiet computing', 'Travel: Compact portable mouse'],
    },
    bundleIds: [],
    setupModes: ['Desk', 'Travel'],
    specBadges: ['Silent Click', 'Rechargeable', '1200 DPI', '2.4GHz'],
  },
  {
    id: 'product-16',
    name: 'Kids Educational Android Robot Tablet',
    slug: 'kids-educational-android-robot-tablet',
    category: 'Smart Accessories',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviewCount: 156,
    badge: 'Best Seller',
    shortDescription: 'Educational tablet robot for kids with interactive learning apps and games.',
    images: [
      '/products/17.1.jpg',
      '/products/17.2.jpg',
      '/products/17.3.jpg',
      '/products/17.4.jpg',
    ],
    specs: {
      ports: ['USB-C', '3.5mm Audio', 'TF Card'],
      powerDelivery: 'Rechargeable 5000mAh',
      standards: ['Android 12', 'WiFi', 'Bluetooth 5.0'],
      materials: ['ABS Plastic', 'Child-safe materials'],
      inTheBox: ['Kids Robot Tablet', 'USB-C Cable', 'Protective Case', 'Educational Apps Guide', 'User Manual'],
      careNotes: 'Use with protective case. Clean screen with soft cloth. Adult supervision recommended.',
    },
    compatibility: {
      devices: [],
      ports: ['USB-C', 'WiFi'],
      os: ['Android 12'],
      notes: 'Parental control app included. Age-appropriate content. Durable child-proof case.',
    },
    longDescription: {
      whatItSolves: 'Screen time that teaches instead of wastes. Your kids learn while they play with this interactive robot tablet.',
      bestUseCases: ['Home: Educational entertainment', 'Travel: Keep kids engaged', 'Gaming: Educational games'],
    },
    bundleIds: [],
    setupModes: ['Travel'],
    specBadges: ['Android', 'Educational', 'Kid-Safe', 'Interactive'],
  },
  {
    id: 'product-17',
    name: 'Portable Smart Touchscreen Display Stand',
    slug: 'portable-smart-touchscreen-display',
    category: 'Smart Accessories',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.3,
    reviewCount: 89,
    badge: 'New',
    shortDescription: 'Portable 10-inch touchscreen display with built-in stand for extended screen setup.',
    images: [
      '/products/16.1.jpg',
      '/products/16.2.jpg',
      '/products/16.3.jpg',
      '/products/16.4.jpg',
    ],
    specs: {
      ports: ['USB-C', 'Mini HDMI'],
      powerDelivery: 'USB-C PD 15W',
      standards: ['IPS Panel', '1920x1200'],
      materials: ['Aluminum Alloy', 'Tempered Glass'],
      inTheBox: ['Touchscreen Display', 'USB-C Cable', 'Mini HDMI Cable', 'Protective Cover', 'User Manual'],
      careNotes: 'Use protective cover when traveling. Clean screen with microfiber cloth. Avoid sharp objects.',
    },
    compatibility: {
      devices: ['Laptops', 'Nintendo Switch', 'PS4/PS5', 'Xbox', 'Phones with USB-C DisplayOut'],
      ports: ['USB-C', 'Mini HDMI'],
      os: ['Windows', 'macOS', 'Android', 'Nintendo Switch'],
      notes: '10-point touch. Built-in speakers. Adjustable brightness. 178-degree viewing angle.',
    },
    longDescription: {
      whatItSolves: 'Add a second screen anywhere. Perfect for portable workstations and gaming on the go.',
      bestUseCases: ['Work: Portable second monitor', 'Gaming: Switch to big screen', 'Travel: Extended display setup'],
    },
    bundleIds: [],
    setupModes: ['Desk', 'Travel', 'Gaming'],
    specBadges: ['10-inch Touch', '1920x1200', 'USB-C', 'Portable'],
  },
  {
    id: 'product-18',
    name: 'Smart Body Composition Digital Scale',
    slug: 'smart-body-composition-scale',
    category: 'Smart Accessories',
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviewCount: 267,
    badge: 'Best Seller',
    shortDescription: 'Smart digital scale with body composition analysis for weight, BMI, muscle mass, and more.',
    images: [
      '/products/18.1.png',
      '/products/18.2.jpg',
      '/products/18.3.jpg',
      '/products/18.4.jpg',
    ],
    specs: {
      ports: [],
      powerDelivery: '3x AAA Batteries',
      standards: [' BIA Technology', 'Bluetooth 5.0'],
      materials: ['Tempered Glass', 'ABS Plastic'],
      inTheBox: ['Smart Scale', 'Batteries (3)', 'User Manual'],
      careNotes: 'Place on flat hard surface. Clean with damp cloth. Avoid liquids on scale surface.',
    },
    compatibility: {
      devices: ['iOS App', 'Android App'],
      ports: [],
      os: ['iOS 12+', 'Android 6.0+'],
      notes: 'Measures 16 body metrics. Syncs with Apple Health and Google Fit. Supports unlimited users.',
    },
    longDescription: {
      whatItSolves: 'Track your health journey with precision. See beyond just weight to understand your body composition.',
      bestUseCases: ['Home: Daily health tracking', 'Work: Office wellness programs', 'Gaming: Fitness tracking'],
    },
    bundleIds: [],
    setupModes: ['Desk'],
    specBadges: ['BMI', 'Bluetooth', '16 Metrics', 'App Sync'],
  },
];

export const categories = [
  { name: 'Power & Charging', icon: 'Zap', count: 3 },
  { name: 'Audio', icon: 'Headphones', count: 2 },
  { name: 'Smart Accessories', icon: 'Smartphone', count: 13 },
] as const;

export const bundles = [
  {
    id: 'bundle-smart-home',
    name: 'Smart Home Bundle',
    description: 'Door Lock + Scale + Tracker — complete smart home setup',
    productIds: ['product-3', 'product-18', 'product-7'],
    savings: 15,
  },
  {
    id: 'bundle-travel',
    name: 'Travel Tech Bundle',
    description: 'GPS Tracker + Car Charger + FM Transmitter — road trip essentials',
    productIds: ['product-7', 'product-9', 'product-11'],
    savings: 10,
  },
  {
    id: 'bundle-gaming',
    name: 'Gaming Setup Bundle',
    description: 'Portable Display + Speaker Lamp + Mouse — complete gaming setup',
    productIds: ['product-17', 'product-14', 'product-15'],
    savings: 20,
  },
];

export const setupGuides = [
  {
    title: 'USB-C Explained',
    description: 'Understand USB-C standards, Power Delivery, and Thunderbolt differences.',
    icon: 'Usb',
  },
  {
    title: 'Desk Cable Management',
    description: 'Tame your desk with smart routing, stands, and hub placement tips.',
    icon: 'Cable',
  },
  {
    title: 'Travel Kit Checklist',
    description: 'The essential tech accessories for any trip — from adapters to organizers.',
    icon: 'Plane',
  },
  {
    title: 'Gaming Setup Essentials',
    description: 'Build the perfect gaming station with the right audio, power, and storage.',
    icon: 'Gamepad2',
  },
];

export const reviews = [
  { name: 'Alex M.', rating: 5, text: 'The Mini Projector is amazing for movie nights. Easy setup and great picture quality!', product: 'Mini HD Portable Projector' },
  { name: 'Sarah K.', rating: 5, text: 'Magnetic power bank is so convenient. Snaps right to my phone and charges instantly.', product: 'Magnetic Wireless Power Bank' },
  { name: 'James R.', rating: 4, text: 'Smart door lock gives me peace of mind. App control works perfectly.', product: 'WiFi Smart Fingerprint Door Lock' },
  { name: 'Priya L.', rating: 5, text: 'Blood pressure monitor is accurate and easy to use. Great for daily tracking.', product: 'Smart Wrist Blood Pressure Monitor' },
  { name: 'Marcus T.', rating: 5, text: 'Air purifier works silently and makes a real difference in my bedroom air quality.', product: 'Bladeless Portable Air Purifier Fan' },
  { name: 'Elena V.', rating: 4, text: 'LED speaker lamp is beautiful and sounds great. Perfect for my desk setup.', product: 'Smart LED Ambient Bluetooth Speaker Lamp' },
];

export const faqData = [
  {
    category: 'Orders & Cart',
    items: [
      { q: 'How do I add items to my cart?', a: 'Click the "Add to Cart" button on any product card or product detail page. Your cart will update in the mini-cart drawer accessible from the header.' },
      { q: 'Can I change quantities in my cart?', a: 'Yes! Open the cart drawer and use the +/- buttons to adjust quantities. You can also remove items entirely.' },
      { q: 'Is my cart saved if I leave the site?', a: 'Your cart is saved in your current browser session. Items will persist as long as you keep the browser tab open.' },
      { q: 'How do I finalize my order?', a: 'Currently, checkout is handled through our support team. Click "Checkout" in your cart, then "Contact Support" to finalize your order with our team.' },
    ],
  },
  {
    category: 'Compatibility',
    items: [
      { q: 'How do I know if a product works with my device?', a: 'Each product page includes a detailed compatibility panel listing supported devices, ports, and operating systems. You can also use our Setup Mode toggle to see recommended products for your use case.' },
      { q: 'Do your USB-C hubs work with Thunderbolt ports?', a: 'Yes! All our USB-C hubs are compatible with Thunderbolt 3/4 ports. However, they operate at USB-C speeds, not full Thunderbolt bandwidth.' },
      { q: 'Can I use the travel adapter with high-wattage appliances?', a: 'The GlobePlug adapter supports devices up to 650W total. It is not designed for hair dryers, irons, or other high-wattage appliances. Check your device wattage before plugging in.' },
    ],
  },
  {
    category: 'Shipping & Returns',
    items: [
      { q: 'Do you ship internationally?', a: 'We currently ship within the United States. International shipping options are being explored — contact us for special arrangements.' },
      { q: 'What is your return policy?', a: 'We accept returns within 30 days of purchase for items in original condition. Contact our support team to initiate a return.' },
      { q: 'How long does shipping take?', a: 'Standard shipping typically takes 5-7 business days. Expedited options may be available — contact us for details.' },
    ],
  },
  {
    category: 'Warranty & Quality',
    items: [
      { q: 'Do products come with a warranty?', a: 'Most products include a manufacturer warranty. Check the product page or contact us for specific warranty information on any item.' },
      { q: 'What if my product arrives damaged?', a: 'Contact us immediately with photos of the damage. We will arrange a replacement or refund as quickly as possible.' },
      { q: 'Are your products authentic?', a: 'Yes. We source all products directly from manufacturers and authorized distributors. Every item is genuine and comes with full manufacturer support.' },
    ],
  },
  {
    category: 'Setup & Troubleshooting',
    items: [
      { q: 'My USB-C hub is not being detected.', a: 'Try a different USB-C port on your device. Some ports are data-only and do not support display output. Check our compatibility guide on the product page.' },
      { q: 'My charger is not reaching full wattage.', a: 'Ensure you are using a cable rated for the wattage you need. Our FlexiCore USB-C cables support up to 100W with the e-marker chip. Some third-party cables may limit charging speed.' },
      { q: 'How do I set up the NexTag smart trackers?', a: 'Download the companion app, create an account, and follow the in-app pairing instructions. Each tracker pairs in under 30 seconds.' },
    ],
  },
  {
    category: 'Contact & Support',
    items: [
      { q: 'How can I reach support?', a: 'Use our Contact page to send a message, or email us directly at soodtwyla676@gmail.com. You can also call us at +1 7187158758.' },
      { q: 'What are your support hours?', a: 'Our support team is available Monday through Friday, 9 AM to 6 PM EST. We aim to respond to all inquiries within 24 hours.' },
      { q: 'Can I get compatibility help before buying?', a: 'Absolutely! Use our Contact page and select "Compatibility help" as the inquiry type. Include your device model and the product you are considering.' },
    ],
  },
];

export const policies = {
  privacy: `PRIVACY POLICY

Last Updated: January 2025

1. INFORMATION WE COLLECT
We collect information you provide directly, such as your name, email address, and any messages you send through our contact form. We do not collect payment information as our checkout is handled through our support team.

2. HOW WE USE YOUR INFORMATION
We use your information to respond to your inquiries, provide compatibility guidance, and communicate about your orders. We do not sell or share your personal information with third parties for marketing purposes.

3. COOKIES
We use essential cookies to maintain your cart session and site preferences (such as dark mode and setup mode). We also use analytics cookies to understand how visitors interact with our site. You can manage your cookie preferences at any time through our cookie consent banner.

4. DATA SECURITY
We implement reasonable security measures to protect your personal information. However, no method of electronic transmission or storage is 100% secure. We encourage you to use strong, unique passwords and to contact us if you suspect any unauthorized access.

5. YOUR RIGHTS
You have the right to request access to, correction of, or deletion of your personal information. To exercise these rights, contact us at soodtwyla676@gmail.com.

6. THIRD-PARTY LINKS
Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.

7. CHANGES TO THIS POLICY
We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page with an updated date.

8. CONTACT US
If you have questions about this privacy policy, please contact us at:
SHORALLE LENISSE FRANKLIN
soodtwyla676@gmail.com
Blount Street 500 Longview Texas 75602 United States of America
+1 7187158758`,

  terms: `TERMS OF SERVICE

Last Updated: January 2025

1. ACCEPTANCE OF TERMS
By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use our website.

2. USE OF WEBSITE
This website is provided for browsing and purchasing technology accessories. You agree to use the website only for lawful purposes and in a way that does not infringe the rights of others.

3. PRODUCTS AND PRICING
All product information, including prices and specifications, is subject to change without notice. We make every effort to ensure accuracy, but we do not guarantee that product descriptions or other content is error-free. If a product is listed at an incorrect price, we reserve the right to cancel any orders placed for that product.

4. ORDERS
Currently, orders are finalized through our support team. Adding items to your cart does not constitute a binding order. A binding agreement is formed only when your order is confirmed by our support team.

5. INTELLECTUAL PROPERTY
All content on this website, including text, graphics, logos, and images, is the property of the website owner and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.

6. LIMITATION OF LIABILITY
To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website or any products purchased through it.

7. DISCLAIMER
This website and all products are provided "as is" without warranties of any kind, either express or implied. We do not make any warranties regarding the completeness, reliability, or accuracy of the content on this website.

8. GOVERNING LAW
These terms shall be governed by and construed in accordance with the laws of the United States of America.

9. CONTACT
For questions about these terms, contact:
SHORALLE LENISSE FRANKLIN
soodtwyla676@gmail.com
Blount Street 500 Longview Texas 75602 United States of America
+1 7187158758`,

  disclaimer: `DISCLAIMER

Last Updated: January 2025

1. GENERAL DISCLAIMER
The information provided on this website is for general informational purposes only. While we strive to keep information up to date and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information, products, or services.

2. PRODUCT INFORMATION
Product specifications, compatibility information, and descriptions are based on manufacturer data and our own testing. Actual performance may vary depending on your specific devices, cables, and environmental conditions. Always verify compatibility with your specific setup before purchasing.

3. NO FALSE CLAIMS
We do not make false claims about product capabilities, certifications, or performance. Any badges, ratings, or labels on our products are based on manufacturer specifications and verified customer feedback. We do not claim any official certifications unless explicitly stated.

4. PRICING
Prices are subject to change without notice. Sale prices and discounts are offered at our discretion and may be withdrawn at any time. We are not responsible for pricing errors and reserve the right to cancel orders placed at incorrect prices.

5. EXTERNAL LINKS
Our website may contain links to external websites. We have no control over the content and nature of these sites and are not responsible for their content or privacy practices.

6. PROFESSIONAL ADVICE
The content on this website does not constitute professional advice. For specific technical, compatibility, or product guidance, please contact our support team directly.

7. CONTACT
For questions about this disclaimer, contact:
SHORALLE LENISSE FRANKLIN
soodtwyla676@gmail.com
Blount Street 500 Longview Texas 75602 United States of America
+1 7187158758`,
};
