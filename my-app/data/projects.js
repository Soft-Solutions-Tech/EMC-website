import projectsJson from './projects.json';

export const ProjectType = projectsJson.ProjectType;
export const portfolioTitle = projectsJson.portfolioTitle;
export const sectionHeadings = projectsJson.sectionHeadings;
export const projects = projectsJson.projects;

/*
    "endDate": null,
    "status": "Active",
    "client": "EETC",
    "partners": [
      "TAIKAI"
    ],
    "value": "$1.2M",
    "location": "Imbaba, Egypt",
    "images": [
      "/projects/imbaba.png"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p3",
    "name": "East Port Said Extension",
    "type": "EPC",
    "description": "EPC installation of two core 220/22 kV transformer and replaced damaged GIB. Including control, protection and civil work. This project modernized the electrical infrastructure for the East Port Said industrial area.",
    "startDate": "2023-01-01",
    "endDate": "2025-12-31",
    "status": "Active",
    "client": "EETC",
    "partners": [
      "TAIKAI"
    ],
    "value": "$4.2M",
    "location": "East Port Said, Egypt",
    "images": [
      "/projects/east-port.png"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p4",
    "name": "Siwa & Habata & Bir Khamsa 17 MW",
    "type": "EPC",
    "description": "17 MW diesel power station with 2x8 MW + 1x1 MW generators. Services include engineering, BOP supply, installation & commissioning. Infrastructure includes civil works for powerhouse, workshop, housing, roads and fences.",
    "startDate": "2019-01-01",
    "endDate": "2020-12-31",
    "status": "Finished",
    "client": "Bahira Distribution Co.",
    "partners": [
      "MAN Energy Solutions"
    ],
    "value": "$24M",
    "location": "Siwa & Habata & Bir Khamsa, Egypt",
    "images": [
      "/projects/siwa.png",
      "/projects/siwa.png",
      "/projects/siwa.png"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p5",
    "name": "Farafra 16MW Diesel Station",
    "type": "EPC",
    "description": "16MW diesel power station with 4x4MW generators. Services include engineering, BOP supply, installation & commissioning. Infrastructure includes civil works for powerhouse, workshop, housing, roads and fences.",
    "startDate": "2015-01-01",
    "endDate": "2016-12-31",
    "status": "Finished",
    "client": "Egyptian Armaments Authority",
    "partners": [
      "MAN Energy Solutions"
    ],
    "value": "$18M",
    "location": "Farafra, Egypt",
    "images": [
      "/projects/farafra.png"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p6",
    "name": "Seychelles 8MW Diesel Station",
    "type": "EPC",
    "description": "8MW diesel power station with 4x2MW diesel oil fuel generators. Scope includes decommissioning and dismantling of old plant, design, supply, civil work, construction, commissioning and testing of new station.",
    "startDate": "2024-01-01",
    "endDate": null,
    "status": "Active",
    "client": "Public Utilities Corporation (in Praslin)",
    "partners": [
      "Engineering Consultants Group S.A."
    ],
    "value": "$14.6M",
    "location": "Seychelles",
    "images": [
      "/projects/sychells.png",
      "/projects/sychells.png",
      "/projects/sychells.png"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p7",
    "name": "AlGalala District Cooling Plant",
    "type": "EPC",
    "description": "4,000 TR (expandable to 8,000 TR) capacity district cooling system with cooling towers, pumps, and piping. Services include supply, installation, and commissioning. Infrastructure includes civil works for 1,500 m² DCP building.",
    "startDate": "2016-01-01",
    "endDate": "2017-12-31",
    "status": "Finished",
    "client": "Armed Forces Eng. Authority",
    "partners": [],
    "value": "$12M",
    "location": "AlGalala, Egypt",
    "images": [
      "/projects/algalala.png",
      "/projects/algalala.png",
      "/projects/algalala.png"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p8",
    "name": "AlKayan District Cooling Plant",
    "type": "EPC",
    "description": "10,000 TR capacity (5x1600 TR + 2x800 TR water-cooled chillers) district cooling system with 1km tunnel. Services include engineering, supply, installation, and commissioning. Infrastructure includes cooling towers, pumps, piping, fittings and valves.",
    "startDate": "2017-01-01",
    "endDate": "2018-12-31",
    "status": "Finished",
    "client": "Armed Forces Eng. Authority",
    "partners": [],
    "value": "$18M",
    "location": "AlKayan, Egypt",
    "images": [
      "/projects/alkayan.png"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p9",
    "name": "Assuit West CC Hydrogen Generation Unit",
    "type": "EPC",
    "description": "12 NM³/h H₂ generation unit with storage cylinders. Services include engineering, procurement, and construction. Infrastructure includes civil works and steel structure.",
    "startDate": "2018-01-01",
    "endDate": "2018-12-31",
    "status": "Finished",
    "client": "Upper Egypt Electricity Production Co.",
    "partners": [
      "SPIRARE Energy"
    ],
    "value": "EGP 70M",
    "location": "Assuit West, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p10",
    "name": "East PortSaid Substation Extension",
    "type": "EPC",
    "description": "Supply and installation of the main transformer and its components for the East Port Said substation extension, enhancing electrical infrastructure.",
    "startDate": "2023-01-01",
    "endDate": "2023-12-31",
    "status": "Finished",
    "client": "EETC",
    "partners": [
      "TAIKAI"
    ],
    "value": "$4.25M",
    "location": "East Port Said, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p11",
    "name": "NPC Creek Water Filters",
    "type": "EPC",
    "description": "Turnkey supply and installation of 10 self-cleaning filters for a firefighting water system, including mechanical, electrical, and civil installation works.",
    "startDate": "2023-01-01",
    "endDate": "2023-12-31",
    "status": "Finished",
    "client": "Nasr Petroleum Company",
    "partners": [
      "Alfa Water"
    ],
    "value": "€2.5M",
    "location": "Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p12",
    "name": "NPC Sea Water Filters",
    "type": "EPC",
    "description": "Turnkey supply and installation of 4 self-cleaning filters for a firefighting water system, including mechanical, electrical, and civil installation works.",
    "startDate": "2022-01-01",
    "endDate": "2022-12-31",
    "status": "Finished",
    "client": "Nasr Petroleum Company",
    "partners": [
      "Alfa Laval"
    ],
    "value": "€1.6M",
    "location": "Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p13",
    "name": "East PortSaid Substation Extension",
    "type": "EPC",
    "description": "Supply and installation of the main transformer and its components for the East Port Said substation extension, enhancing electrical infrastructure.",
    "startDate": "2021-01-01",
    "endDate": "2021-12-31",
    "status": "Finished",
    "client": "EETC",
    "partners": [
      "TAIKAI"
    ],
    "value": "$3M",
    "location": "East Port Said, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p14",
    "name": "Siwa, Habata and Bir Khamsa Power Stations",
    "type": "EPC",
    "description": "EPC contractor for three power stations (2x8 MW + 1x1 MW) in the Western Desert, including engineering, supply, and erection of diesel engines, auxiliaries, fuel storage, firefighting, HVAC, water well, water treatment, and civil works for powerhouse, workshop, housing, roads, and fences.",
    "startDate": "2020-01-01",
    "endDate": "2020-12-31",
    "status": "Finished",
    "client": "Egyptian Electricity Holding Company",
    "partners": [
      "MAN Energy Solutions"
    ],
    "value": "$24M",
    "location": "Siwa, Habata, Bir Khamsa, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p15",
    "name": "ElKayan District Cooling Plant",
    "type": "EPC",
    "description": "50% JV partner in a 10,000 TR district cooling plant, including supply and installation of balance of plant (BOP) and owner equipment.",
    "startDate": "2019-01-01",
    "endDate": "2019-12-31",
    "status": "Finished",
    "client": "Armed Forces Engineering Authority",
    "partners": [],
    "value": "$18M",
    "location": "El Kayan, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p16",
    "name": "El Galala District Cooling Plant",
    "type": "EPC",
    "description": "50% JV partner in a 4,000 TR (extendable to 8,000 TR) district cooling plant, including supply and installation of balance of plant (BOP), owner equipment, civil works for a 1,500 m² building (offices and control room), and operation and maintenance (O&M).",
    "startDate": "2018-01-01",
    "endDate": "2018-12-31",
    "status": "Finished",
    "client": "Armed Forces Engineering Authority",
    "partners": [],
    "value": "$12M",
    "location": "El Galala, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p17",
    "name": "Assuit West H2 Plant",
    "type": "EPC",
    "description": "Engineering, procurement, and construction of a 12 NM³/h hydrogen generation plant for Assuit Power Plant, including all related civil works.",
    "startDate": "2018-01-01",
    "endDate": "2018-12-31",
    "status": "Finished",
    "client": "Upper Egypt Electricity Production Co.",
    "partners": [
      "SPIRAR"
    ],
    "value": "$4.5M",
    "location": "Assuit West, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p18",
    "name": "Farafra 16 MW Diesel Power Station",
    "type": "EPC",
    "description": "Turnkey 4x4 MW diesel power station, including engineering, supply, installation, and commissioning of diesel engines, auxiliaries, and civil works for powerhouse, workshop, housing, roads, and fences.",
    "startDate": "2016-01-01",
    "endDate": "2016-12-31",
    "status": "Finished",
    "client": "Egyptian Electricity Holding Company",
    "partners": [
      "MAN Energy Solutions"
    ],
    "value": "$18M",
    "location": "Farafra, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p19",
    "name": "Abu Sultan Boiler Feed Pump Replacement",
    "type": "EPC",
    "description": "Supply and installation of 9 boiler feed pumps (165 Bar, 3 per year), including valves, pipe modifications, pipe stress analysis, control, lube, and DCS communication system modifications, replacing Byron Jackson 'Flowserve' pumps for Unit Two.",
    "startDate": "2013-01-01",
    "endDate": "2015-12-31",
    "status": "Finished",
    "client": "East Delta Electricity Production Co.",
    "partners": [
      "KSB"
    ],
    "value": "$6M",
    "location": "Abu Sultan, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p20",
    "name": "Siwa 4 MW Power Station",
    "type": "EPC",
    "description": "Extension of Siwa Power Station by a 1x4 MW diesel engine generator, including firefighting, HVAC, water treatment, MV & LV switchgear, control system, plant services, civil works, inland transport, and erection.",
    "startDate": "2013-01-01",
    "endDate": "2013-12-31",
    "status": "Finished",
    "client": "Egyptian Electricity Holding Company",
    "partners": [
      "MAN Energy Solutions"
    ],
    "value": "€2.4M + LE3.7M",
    "location": "Siwa, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p21",
    "name": "E-Styrenics 12 MW Gas Engine Project",
    "type": "EPC",
    "description": "Engineering, supply, and construction of a 2x4.3 MW + 1x3.3 MW gas engine power plant, including firefighting, HVAC, water treatment, MV & LV switchgear, control system, plant services, and civil works for powerhouse and offices.",
    "startDate": "2012-01-01",
    "endDate": "2012-12-31",
    "status": "Finished",
    "client": "E-Styrenics",
    "partners": [
      "MWM"
    ],
    "value": "€5.2M + LE12M",
    "location": "Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p22",
    "name": "Ataka Hydrogen Generation Plant",
    "type": "EPC",
    "description": "Engineering, supply, and construction of a 12 NM³/h hydrogen generation unit at 200 Bar, complete with compression and purification systems.",
    "startDate": "2012-01-01",
    "endDate": "2012-12-31",
    "status": "Finished",
    "client": "East Delta Electricity Production Co.",
    "partners": [
      "Sacre Davey"
    ],
    "value": "$2M",
    "location": "Ataka, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p23",
    "name": "East Owinat 3X4 MW Diesel Power Plant",
    "type": "EPC",
    "description": "EPC contract for engineering, supply, and construction of three 4 MW power stations, including fuel storage, firefighting, HVAC, water treatment, MV & LV switchgear, control system, plant services, and civil works for powerhouse, workshop, roads, and fences.",
    "startDate": "2012-01-01",
    "endDate": "2012-12-31",
    "status": "Finished",
    "client": "Egyptian Electricity Holding Company",
    "partners": [
      "MAN Energy Solutions"
    ],
    "value": "€7.3M + LE36M",
    "location": "East Owinat, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p24",
    "name": "Farafra Overhauls",
    "type": "EPC",
    "description": "Supply of spare parts and supervision of overhauls for two 2.5 MW MAN diesel engines, restoring output and heat rate to original values with performance guarantees.",
    "startDate": "2011-01-01",
    "endDate": "2011-12-31",
    "status": "Finished",
    "client": "Egyptian Electricity Holding Company",
    "partners": [
      "MAN Energy Solutions"
    ],
    "value": "$0.7M",
    "location": "Farafra, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p25",
    "name": "Abu Sultan Hydrogen Generation Plant",
    "type": "EPC",
    "description": "Engineering, supply, and construction of a 12 NM³/h hydrogen generation unit at 200 Bar, complete with compression and purification systems.",
    "startDate": "2011-01-01",
    "endDate": "2011-12-31",
    "status": "Finished",
    "client": "East Delta Electricity Production Co.",
    "partners": [
      "Sacre Davey"
    ],
    "value": "$2M",
    "location": "Abu Sultan, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p26",
    "name": "WAU Diesel Power Station South Sudan",
    "type": "EPC",
    "description": "EPC contract for a 2x1 MW power station in Wau, South Sudan, with EMC as the lead consortium leader (60% scope), including civil works, mechanical and electrical auxiliaries, fuel treatment, start-up, and commissioning.",
    "startDate": "2007-01-01",
    "endDate": "2007-12-31",
    "status": "Finished",
    "client": "South Sudan Electricity Corporation",
    "partners": [
      "MAN Energy Solutions"
    ],
    "value": "$4.2M",
    "location": "Wau, South Sudan",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p27",
    "name": "Tasluja",
    "type": "EPC",
    "description": "Supervision of the relocation of 2x5.5 MW diesel generator sets from Birko, Turkey to Tasluja, Kurdistan, including engineering, procurement of auxiliaries (HRB, fired boilers, pumps, valves, heat exchangers, MV switchgear), and supervision of installation, commissioning, and start-up.",
    "startDate": "2005-01-01",
    "endDate": "2005-12-31",
    "status": "Finished",
    "client": "Kurdistan Regional Government",
    "partners": [
      "MAN Energy Solutions"
    ],
    "value": "$0.2M",
    "location": "Tasluja, Kurdistan",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p28",
    "name": "Mout Unit 6",
    "type": "EPC",
    "description": "Supply, erection, commissioning, and civil works for a 4 MW 18V28/32H diesel generator extension, including HRB, fuel treatment equipment, lube oil separators, MV, LV, cables, and powerhouse extension.",
    "startDate": "2003-01-01",
    "endDate": "2003-12-31",
    "status": "Finished",
    "client": "Egyptian Electricity Holding Company",
    "partners": [
      "MAN Energy Solutions"
    ],
    "value": "$3.3M",
    "location": "Mout, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p29",
    "name": "El Tur and El Qusseir Power Stations Conversion to HFO",
    "type": "EPC",
    "description": "Supply, erection, commissioning, and civil works for converting a 4x2.5 MW power station to run on heavy fuel oil (HFO), including performance guarantees.",
    "startDate": "2002-01-01",
    "endDate": "2002-12-31",
    "status": "Finished",
    "client": "Egyptian Electricity Holding Company",
    "partners": [
      "MAN Energy Solutions"
    ],
    "value": "$1.4M",
    "location": "El Tur and El Qusseir, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p30",
    "name": "Mout Power Station Extension by 2.5 MW",
    "type": "EPC",
    "description": "Supply, erection, commissioning, and civil works for a 2.5 MW diesel generating set extension, including MV & LV switchgear and mechanical auxiliaries.",
    "startDate": "1999-01-01",
    "endDate": "1999-12-31",
    "status": "Finished",
    "client": "Egyptian Electricity Holding Company",
    "partners": [
      "MAN Energy Solutions"
    ],
    "value": "$1.6M",
    "location": "Mout, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our EPC projects"
  },
  {
    "id": "p31",
    "name": "NPC Saltwater Self Cleaning Filters",
    "type": "AFTERSALES",
    "description": "Supply, installation, commissioning, and start-up of 3 Alfa Laval Self-Cleaning Filters (ALF 50 R) and 1 Alfa Laval Self-Cleaning Filter (ALF 60 R) with auxiliaries. The system filters seawater for a 9,000 m³/h cooling water system.",
    "startDate": "2023-01-01",
    "endDate": "2024-12-31",
    "status": "Finished",
    "client": "Nasr petroleum company",
    "partners": [],
    "value": "€1.6M",
    "location": "Egypt",
    "images": [
      "/projects/npc-saltwater.png"
    ],
    "consultingCta": "Explore our After Sales projects"
  },
  {
    "id": "p32",
    "name": "NPC Creek Water Self Cleaning Filters",
    "type": "AFTERSALES",
    "description": "Supply, installation, and commissioning of 4 Alfawater Automatic Self-Cleaning Filters (50 μm) and 6 Alfawater Automatic Self-Cleaning Filters (10 μm) for a 700 m³/h fire-fighting water system, including manifolds and a 9.15m x 2.57m footprint.",
    "startDate": "2024-01-01",
    "endDate": null,
    "status": "Active",
    "client": "Nasr petroleum company",
    "partners": [],
    "value": "€430,000",
    "location": "Egypt",
    "images": [
      "/projects/npc-creek.png"
    ],
    "consultingCta": "Explore our After Sales projects"
  },
  {
    "id": "p33",
    "name": "Cairo North PP Fire Alarm & Firefighting",
    "type": "AFTERSALES",
    "description": "3 contracts for design, supply and installation of complete rehabilitation of the existing fire alarm systems adding new main control panels and workstations, new construction for firefighting systems with CO2, FM200, Aerosol & water sprinkler.",
    "startDate": "2019-01-01",
    "endDate": "2021-12-31",
    "status": "Finished",
    "client": "Cairo Electricity Production Co.-Cairo North PP",
    "partners": [],
    "value": "€2.3M",
    "location": "Cairo, Egypt",
    "images": [
      "/projects/cairo-north.jpg"
    ],
    "consultingCta": "Explore our After Sales projects"
  },
  {
    "id": "p34",
    "name": "Tebbin PP Fire Alarm & Firefighting",
    "type": "AFTERSALES",
    "description": "3 contracts for design, supply and installation of complete rehabilitation of the existing fire alarm systems adding new main control panel and workstation, new construction for firefighting systems with CO2, FM200, Aerosol & water sprinkler.",
    "startDate": "2019-01-01",
    "endDate": "2022-12-31",
    "status": "Finished",
    "client": "Cairo Electricity Production Co.-Cairo North PP",
    "partners": [],
    "value": "€1.9M",
    "location": "Tebbin, Egypt",
    "images": [
      "/projects/tebbin-water.jpg"
    ],
    "consultingCta": "Explore our After Sales projects"
  },
  {
    "id": "p35",
    "name": "Abu Sultan PP Boiler Feed Water Pumps Replacement",
    "type": "AFTERSALES",
    "description": "EMC, in collaboration with KSB, replaced 12 Flowserve boiler feed pumps with KSB units. The scope included supply of control valves, pipe supports, engineering, stress analysis, pipe and DCS modifications, and civil construction, including civil work.",
    "startDate": "2011-01-01",
    "endDate": "2018-12-31",
    "status": "Finished",
    "client": "East Delta Electricity Production Co.",
    "partners": [
      "KSB"
    ],
    "value": "€6M",
    "location": "Abu Sultan, Egypt",
    "images": [
      "/projects/abu-sultan-pp.png"
    ],
    "consultingCta": "Explore our After Sales projects"
  },
  {
    "id": "p36",
    "name": "New Abu Qir PP Boiler Feed Pumps Replacement",
    "type": "AFTERSALES",
    "description": "EMC, in collaboration with KSB, replaced 2 Sulzer boiler feed pumps with KSB units. The scope included dismantling old pumps, supplying and installing new pumps, piping and fittings, modifying balanced liquid lines, DCS, cooling, and lubrication systems, including all civil work.",
    "startDate": "2015-01-01",
    "endDate": "2015-12-31",
    "status": "Finished",
    "client": "West Delta Electricity Production Co.",
    "partners": [
      "KSB"
    ],
    "value": "€2.7M",
    "location": "New Abu Qir, Egypt",
    "images": [
      "/projects/new-abuqir.png"
    ],
    "consultingCta": "Explore our After Sales projects"
  },
  {
    "id": "p37",
    "name": "AMOC Cooling Towers Rehabilitation",
    "type": "AFTERSALES",
    "description": "Complete rehabilitation of 2 forced draft cooling towers each has 3 cells. Services include supply and installation. Parts include distribution pipes, sprayers, drift eliminators and fill packs.",
    "startDate": "2023-01-01",
    "endDate": "2023-12-31",
    "status": "Finished",
    "client": "AMOC",
    "partners": [
      "JC HAMON"
    ],
    "value": "$500K",
    "location": "Egypt",
    "images": [
      "/projects/amoc-cooling.jpg"
    ],
    "consultingCta": "Explore our After Sales projects"
  },
  {
    "id": "p38",
    "name": "Abu Zaabal Fertilizers Co. AZFC",
    "type": "AFTERSALES",
    "description": "Complete rehabilitation for Sulfuric Acid cooling tower (3 cells), Phosphoric Acid cooling tower (4 cells). Services include supply, installation and civil works. Parts include distribution pipes, sprayers, drift eliminators and splash fills.",
    "startDate": "2020-01-01",
    "endDate": "2024-12-31",
    "status": "Finished",
    "client": "Abu Zaabal Fertilizers Co.",
    "partners": [
      "JC HAMON"
    ],
    "value": "$1.2M",
    "location": "Abu Zaabal, Egypt",
    "images": [
      "/projects/azfc-cooling.png",
      "/projects/azfc-cooling2.png"
    ],
    "consultingCta": "Explore our After Sales projects"
  },
  {
    "id": "p39",
    "name": "Abu Sultan Hydrogen Generation Plant",
    "type": "AFTERSALES",
    "description": "12 NM³/h H₂ generation unit at 200 Bar. Services include engineering, supply, and construction. Auxiliaries include compression and purification systems.",
    "startDate": "2011-01-01",
    "endDate": "2011-12-31",
    "status": "Finished",
    "client": "East Delta Electricity Production Co.",
    "partners": [
      "Sacre Davey"
    ],
    "value": "$2M",
    "location": "Abu Sultan, Egypt",
    "images": [
      "/projects/abu-sultan-h2.jpg",
      "/projects/abu-sultan-h2-2.jpg"
    ],
    "consultingCta": "Explore our After Sales projects"
  },
  {
    "id": "p40",
    "name": "Cairo Regional Control Center",
    "type": "CONSULTING",
    "description": "Consulting services for a consortium with NARI, Hyundai, and El Sewedy Electric, providing SCADA and communications solutions for 200 substations at 220 and 66 KV.",
    "startDate": "2020-01-01",
    "endDate": "2020-12-31",
    "status": "Finished",
    "client": "EETC",
    "partners": [
      "NARI",
      "Hyundai",
      "El Sewedy Electric"
    ],
    "value": "$75M",
    "location": "Cairo, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p41",
    "name": "West Damietta 500 KV GIS Substation",
    "type": "CONSULTING",
    "description": "Consulting services for a consortium with El-Kharafi, including supply of 500/220 KV GIS equipment. EMC facilitated introductions and developed the consortium agreement with NHVS and Taikai.",
    "startDate": "2019-01-01",
    "endDate": "2019-12-31",
    "status": "Finished",
    "client": "EETC",
    "partners": [
      "NHVS",
      "Taikai",
      "El-Kharafi"
    ],
    "value": "$14M",
    "location": "West Damietta, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p42",
    "name": "Layyah 900 MW Combined Cycle Sharjah (Condenser)",
    "type": "CONSULTING",
    "description": "Consulting services for the supply of a condenser for MHPS steam turbine, arranged with PSP El Sewedy, MHPS’s consortium partner for the Layyah project in UAE.",
    "startDate": "2019-01-01",
    "endDate": "2019-12-31",
    "status": "Finished",
    "client": "Sharjah Electricity and Water Authority",
    "partners": [
      "Doosan",
      "PSP El Sewedy",
      "MHPS"
    ],
    "value": "$4M",
    "location": "Sharjah, UAE",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p43",
    "name": "Layyah 900 MW Combined Cycle Sharjah (Pumps)",
    "type": "CONSULTING",
    "description": "Consulting services for the supply of main cooling pumps for MHPS steam turbine, arranged with PSP El Sewedy, MHPS’s consortium partner for the Layyah project in UAE.",
    "startDate": "2019-01-01",
    "endDate": "2019-12-31",
    "status": "Finished",
    "client": "Sharjah Electricity and Water Authority",
    "partners": [
      "KSB",
      "PSP El Sewedy",
      "MHPS"
    ],
    "value": "$3.5M",
    "location": "Sharjah, UAE",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p44",
    "name": "Sohag 500/220 KV GIS Substation",
    "type": "CONSULTING",
    "description": "Consulting services for engineering, supply, and supervision of main pumps and drives for a 3x670 MW super critical power station.",
    "startDate": "2018-01-01",
    "endDate": "2018-12-31",
    "status": "Finished",
    "client": "EETC",
    "partners": [
      "NHVS",
      "Taikai"
    ],
    "value": "€50M",
    "location": "Sohag, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p45",
    "name": "Assuit & Cairo West Steam Turbines 2X650 MW",
    "type": "CONSULTING",
    "description": "Consulting services for the supply and installation of 2x650 MW super critical steam turbine generators, competing against Siemens, GE-Alstom, and MHI.",
    "startDate": "2017-01-01",
    "endDate": "2017-12-31",
    "status": "Finished",
    "client": "Egyptian Electricity Holding Company",
    "partners": [
      "Doosan"
    ],
    "value": "$150M",
    "location": "Assuit & Cairo West, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p46",
    "name": "Assuit & Cairo West Pumps & Drives 2X650 MW",
    "type": "CONSULTING",
    "description": "Consulting services for the supply and supervision of installation for a complete pump package, including steam turbine-driven boiler feed, cooling, and condensate pumps for 2x650 MW super critical power stations.",
    "startDate": "2017-01-01",
    "endDate": "2017-12-31",
    "status": "Finished",
    "client": "Egyptian Electricity Holding Company",
    "partners": [
      "KSB"
    ],
    "value": "€35M",
    "location": "Assuit & Cairo West, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p47",
    "name": "Pumps & Drives for Siemens Mega Project 3X4,800 MW",
    "type": "CONSULTING",
    "description": "Consulting services coordinating sales efforts between KSB and Siemens for pumps and drives in a 3x4,800 MW combined cycle project.",
    "startDate": "2017-01-01",
    "endDate": "2017-12-31",
    "status": "Finished",
    "client": "Siemens",
    "partners": [
      "KSB"
    ],
    "value": "€25M",
    "location": "Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p48",
    "name": "Hydrogen Plants for Siemens Mega Project 3X4,800 MW",
    "type": "CONSULTING",
    "description": "Consulting services for direct orders of hydrogen plants from Orascom and El Sewedy, as recommended by EEHC, for a 3x4,800 MW combined cycle project.",
    "startDate": "2017-01-01",
    "endDate": "2017-12-31",
    "status": "Finished",
    "client": "Egyptian Electricity Holding Company",
    "partners": [
      "Electrolzyer",
      "Orascom",
      "El Sewedy"
    ],
    "value": "€5.5M",
    "location": "Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p49",
    "name": "Helwan South Critical Piping & Valves",
    "type": "CONSULTING",
    "description": "Consulting services for the supply and supervision of critical piping and valves for a 3x670 MW super critical power station.",
    "startDate": "2016-01-01",
    "endDate": "2016-12-31",
    "status": "Finished",
    "client": "Upper Egypt Electricity Production Co.",
    "partners": [
      "Cimtas Pipe"
    ],
    "value": "$33M",
    "location": "Helwan South, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p50",
    "name": "Helwan South Pumps & Drives",
    "type": "CONSULTING",
    "description": "Consulting services for engineering, supply, and supervision of main pumps and drives for a 3x670 MW super critical power station.",
    "startDate": "2015-01-01",
    "endDate": "2015-12-31",
    "status": "Finished",
    "client": "Upper Egypt Electricity Production Co.",
    "partners": [
      "KSB"
    ],
    "value": "€50M",
    "location": "Helwan South, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p51",
    "name": "Helwan South Step-Up Transformers",
    "type": "CONSULTING",
    "description": "Consulting services for the supply of main step-up, auxiliary, IP, and generator circuit breakers for a 3x670 MW super critical power station.",
    "startDate": "2015-01-01",
    "endDate": "2015-12-31",
    "status": "Finished",
    "client": "Upper Egypt Electricity Production Co.",
    "partners": [
      "SPECO"
    ],
    "value": "$21M",
    "location": "Helwan South, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p52",
    "name": "Ethydco ZLD Water Treatment Plant",
    "type": "CONSULTING",
    "description": "Consulting services for engineering, supply, and supervision of installation of zero liquid discharge systems for an ethylene plant in Egypt.",
    "startDate": "2013-01-01",
    "endDate": "2013-12-31",
    "status": "Finished",
    "client": "Ethydco",
    "partners": [
      "AquaTech"
    ],
    "value": "$30M",
    "location": "Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p53",
    "name": "Ain El Sokhna 2X650 MW Super Critical Steam Turbines",
    "type": "CONSULTING",
    "description": "Consulting services for the supply and installation of steam turbine condensers and auxiliaries for a 2x650 MW super critical power station.",
    "startDate": "2009-01-01",
    "endDate": "2009-12-31",
    "status": "Finished",
    "client": "Upper Egypt Electricity Production Co.",
    "partners": [
      "Hitachi"
    ],
    "value": "$275M",
    "location": "Ain El Sokhna, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p54",
    "name": "El Tibbin 2X350 MW Major Pumps & Drives",
    "type": "CONSULTING",
    "description": "Consulting services for the supply and supervision of installation of boiler feed, booster, and condensate pumps for a 2x350 MW power station.",
    "startDate": "2008-01-01",
    "endDate": "2008-12-31",
    "status": "Finished",
    "client": "Cairo Electricity Production Co.",
    "partners": [
      "KSB"
    ],
    "value": "€12M",
    "location": "El Tibbin, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p55",
    "name": "Abu Qir Desalination 2X5000 M3 MED",
    "type": "CONSULTING",
    "description": "Consulting services for the supply, installation, and supervision of a desalination plant with a capacity of 2x5000 m³ MED.",
    "startDate": "2009-01-01",
    "endDate": "2009-12-31",
    "status": "Finished",
    "client": "West Delta Electricity Production Co.",
    "partners": [
      "AquaTech"
    ],
    "value": "$24M",
    "location": "Abu Qir, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p56",
    "name": "Sidi Krir & El-Atf 2X750 MW Combined Cycle Piping",
    "type": "CONSULTING",
    "description": "Consulting services for the supply of critical piping and valves for a 2x750 MW combined cycle power plant.",
    "startDate": "2008-01-01",
    "endDate": "2008-12-31",
    "status": "Finished",
    "client": "Egyptian Electricity Holding Company",
    "partners": [
      "Cimtas Pipe"
    ],
    "value": "$25M",
    "location": "Sidi Krir & El-Atf, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p57",
    "name": "ASEC – Al-Takamol Cement Co.",
    "type": "CONSULTING",
    "description": "Consulting services for the supply of 5x8 MW diesel engines for a cement plant in Berber, North Sudan.",
    "startDate": "2008-01-01",
    "endDate": "2008-12-31",
    "status": "Finished",
    "client": "ASEC – Al-Takamol Cement Co.",
    "partners": [
      "MAN B&W"
    ],
    "value": "$60M",
    "location": "Berber, North Sudan",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p58",
    "name": "Cairo West 2X350 MW Thermal Power Plant Piping",
    "type": "CONSULTING",
    "description": "Consulting services for the supply of critical piping and valves for a 2x350 MW thermal power plant.",
    "startDate": "2008-01-01",
    "endDate": "2008-12-31",
    "status": "Finished",
    "client": "Cairo Electricity Production Co.",
    "partners": [
      "Cimtas Pipe"
    ],
    "value": "$24M",
    "location": "Cairo West, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p59",
    "name": "Cairo West 2X350 MW Power Station Boilers",
    "type": "CONSULTING",
    "description": "Consulting services for the supply and installation of boilers and balance of plant (BOP) for a 2x350 MW power station.",
    "startDate": "2007-01-01",
    "endDate": "2007-12-31",
    "status": "Finished",
    "client": "Cairo Electricity Production Co.",
    "partners": [
      "Hitachi Ltd."
    ],
    "value": "$170M",
    "location": "Cairo West, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p60",
    "name": "El Kuriemat III 750 MW Combined Cycle HRSG",
    "type": "CONSULTING",
    "description": "Consulting services for the supply and installation of heat recovery steam generators (HRSG) and balance of plant (BOP) for a 750 MW combined cycle power plant.",
    "startDate": "2007-01-01",
    "endDate": "2007-12-31",
    "status": "Finished",
    "client": "Egyptian Electricity Holding Company",
    "partners": [
      "CMI"
    ],
    "value": "$60M",
    "location": "El Kuriemat, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p61",
    "name": "El Kuriemat Combined Cycle Steam Turbine 750 MW",
    "type": "CONSULTING",
    "description": "Consulting services for Sumitomo/Hitachi, evaluated as the lowest bidder for a 750 MW combined cycle steam turbine project, financed by the European International Bank.",
    "startDate": "2006-01-01",
    "endDate": "2006-12-31",
    "status": "Finished",
    "client": "Egyptian Electricity Holding Company",
    "partners": [
      "Sumitomo",
      "Hitachi"
    ],
    "value": "$50M",
    "location": "El Kuriemat, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p62",
    "name": "Sidi Krir/Cairo 500 KV Transmission Line",
    "type": "CONSULTING",
    "description": "Consulting services for a new 500 KV transmission line from Sidi Krir to Nubaria to C500, financed by JIBIC, in the final approval stage by EETC and JIBIC.",
    "startDate": "2005-01-01",
    "endDate": "2005-12-31",
    "status": "Finished",
    "client": "EETC",
    "partners": [
      "Sumitomo",
      "Fujikura"
    ],
    "value": "$50M",
    "location": "Sidi Krir to Cairo, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  },
  {
    "id": "p63",
    "name": "El Nubaria 500 KV Switchyard",
    "type": "CONSULTING",
    "description": "Consulting services for a turnkey 500 KV switchyard, including 220/500 KV transformers.",
    "startDate": "2004-01-01",
    "endDate": "2004-12-31",
    "status": "Finished",
    "client": "EETC",
    "partners": [
      "Hitachi Ltd."
    ],
    "value": "$55M",
    "location": "El Nubaria, Egypt",
    "images": [
      "/projects/assuit.jpg",
      "/projects/assuit2.jpg"
    ],
    "consultingCta": "Explore our Consulting projects"
  }
];
*/
