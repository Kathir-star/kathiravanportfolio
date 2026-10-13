export interface ProjectItem {
  id: string;
  badgeNumber: string;
  typeTag: string;
  title: string;
  shortDesc: string; // One-line summary
  problem: string;
  solution: string;
  keyFeatures: string[];
  myContribution: string;
  technology: string[];
  result: string;
  liveUrl?: string;
  githubUrl?: string;
  relatedCertId?: string;
  accentColor: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'healthnav-medora',
    badgeNumber: '01',
    typeTag: 'HEALTHCARE & AI',
    title: 'Medora / HealthNav',
    shortDesc: 'Intelligent clinical continuity platform organizing longitudinal patient history and allergy timelines.',
    problem: 'Healthcare data is fragmented across clinics, leaving physicians without crucial longitudinal patient context.',
    solution: 'Engineered a clinical continuity portal structuring prescription history, allergy alerts, and AI diagnostic context.',
    keyFeatures: [
      'Longitudinal patient health timeline',
      'Encrypted diagnostic history database',
      'AI-assisted clinical workflow support',
      'Responsive doctor/patient portal'
    ],
    myContribution: 'Full Stack & AI Engineer — designed Supabase schema, built responsive React frontend, and connected AI context orchestrators.',
    technology: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vite'],
    result: 'Delivers a unified patient continuity memory layer, streamlining medical record lookup.',
    liveUrl: 'https://medora-healthnav.vercel.app/',
    githubUrl: 'https://github.com/Kathir-star',
    relatedCertId: 'guvi-google-ai-studio',
    accentColor: '#06b6d4'
  },
  {
    id: 'rydex-smart-helmet',
    badgeNumber: '02',
    typeTag: 'EMBEDDED HARDWARE & IOT',
    title: 'RYDEX IoT Smart Helmet System',
    shortDesc: 'Rider safety helmet with MQ-3 alcohol ignition lockout, MPU6050 crash detection, and GPS/GSM alerts.',
    problem: 'High motorcycle accident fatalities caused by delayed emergency medical response and alcohol impairment.',
    solution: 'Engineered an integrated smart helmet that requires alcohol-free breath testing before unlocking bike ignition, with automated crash SMS alerts.',
    keyFeatures: [
      'MQ-3 alcohol sensor ignition lockout',
      'MPU6050 accelerometer impact/tilt detection',
      'NEO-6M GPS real-time coordinate logging',
      'SIM800L automated emergency SMS dispatch'
    ],
    myContribution: 'Lead Hardware Innovator — designed schematics, wired sensor buses, and programmed ESP32 firmware.',
    technology: ['ESP32', 'MQ-3 Sensor', 'MPU6050', 'NEO-6M GPS', 'SIM800L GSM', 'Embedded C++'],
    result: 'Won 1st Place Appreciation Award at PECTEAM 2K26 International Conference.',
    githubUrl: 'https://github.com/Kathir-star',
    relatedCertId: 'pecteam-smart-helmet-award',
    accentColor: '#7c3aed'
  },
  {
    id: 'stack-sage',
    badgeNumber: '03',
    typeTag: 'DEVELOPER UTILITY',
    title: 'Stack Sage',
    shortDesc: 'Interactive developer tool providing architectural recommendations and tech stack configurations.',
    problem: 'Junior developers struggle with architecture decision paralysis and suboptimal stack selections.',
    solution: 'Built an interactive utility analyzing project constraints to recommend modular architectures and starter setups.',
    keyFeatures: [
      'Automated stack evaluator',
      'Dependency compatibility matrix',
      'Interactive blueprint visualizer'
    ],
    myContribution: 'Creator & Developer — designed interactive React UI, rule evaluation logic, and dataset.',
    technology: ['TypeScript', 'React', 'Tailwind CSS', 'Vite', 'REST API'],
    result: 'Streamlines engineering setup workflows for student builders and developers.',
    liveUrl: 'https://stacksage.vercel.app/',
    githubUrl: 'https://github.com/Kathir-star',
    relatedCertId: 'hackerrank-python-basic',
    accentColor: '#10b981'
  },
  {
    id: 'artlane-diaries',
    badgeNumber: '04',
    typeTag: 'CREATIVE COMMERCE',
    title: 'Artlane Diaries',
    shortDesc: 'Online creative showroom and digital brand for personalized custom artwork and emotional gifts.',
    problem: 'Independent custom artists lack polished digital showrooms conveying artisanal craftsmanship.',
    solution: 'Founded and developed an online creative showroom connecting custom portraits and gifts to clients nationwide.',
    keyFeatures: [
      'Interactive artwork showcase with high-res zoom',
      'Custom commission calculator',
      'Instant direct inquiry checkout workflow'
    ],
    myContribution: 'Founder & Full Stack Developer — built brand visual identity and web showroom.',
    technology: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'UI/UX'],
    result: 'Thriving creative venture with active digital storefront driving direct commissions.',
    liveUrl: 'https://artlanediaries.vercel.app/',
    githubUrl: 'https://github.com/Kathir-star',
    accentColor: '#f59e0b'
  },
  {
    id: 'panimalar-smart-bus',
    badgeNumber: '05',
    typeTag: 'TRANSIT TELEMETRY',
    title: 'Panimalar Smart Bus Transport',
    shortDesc: 'College bus tracking web app delivering live map geolocation updates and transit schedules.',
    problem: 'Campus transit lacks real-time location visibility, causing unpredictable student waiting times.',
    solution: 'Developed a college bus tracking platform providing live geolocation updates and route efficiency metrics.',
    keyFeatures: [
      'Leaflet interactive live vehicle telemetry map',
      'Driver & student workflow dashboards',
      'Real-time Supabase record sync'
    ],
    myContribution: 'Co-Developer (built with teammate Jaffer) — engineered frontend map integrations and live coordinate ingestion.',
    technology: ['ESP32 Telemetry', 'Leaflet Maps', 'Supabase', 'TypeScript', 'React'],
    result: 'Empowers campus commuters with live map updates and predictable transit arrival timings.',
    liveUrl: 'https://pbtspanimalar.vercel.app/',
    githubUrl: 'https://github.com/Kathir-star',
    relatedCertId: 'simplilearn-intro-iot',
    accentColor: '#06b6d4'
  },
  {
    id: 'replenova-supply-chain',
    badgeNumber: '06',
    typeTag: 'DATA & RISK SIMULATION',
    title: 'Replenova',
    shortDesc: 'Supply-chain disruption and AI inventory replenishment recommendation dashboard.',
    problem: 'Severe weather and port disruptions cause sudden inventory stockouts and logistics delays.',
    solution: 'Built an interactive dashboard linking port disruption telemetry to stockout risk matrices and replenishment plans.',
    keyFeatures: [
      'Disruption risk simulation matrix',
      'Supplier delay telemetry graphs',
      'Automated replenishment recommendations'
    ],
    myContribution: 'Frontend & Data Developer — built React/TypeScript interface and risk calculation models.',
    technology: ['React', 'TypeScript', 'Tailwind CSS', 'Data Analytics', 'Supabase'],
    result: 'Demonstrated practical data-driven operational decision-making in supply chain management.',
    githubUrl: 'https://github.com/Kathir-star',
    accentColor: '#7c3aed'
  }
];
