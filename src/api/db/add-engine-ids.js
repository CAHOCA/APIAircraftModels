/**
 * Script para agregar Engine_ID a todas las aeronaves en AircraftModels.json
 * Mapea motores basándose en el modelo de aeronave
 */

const fs = require('fs');
const path = require('path');

// Leer archivos
const aircraftPath = path.join(__dirname, 'AircraftModels.json');
const aircraft = JSON.parse(fs.readFileSync(aircraftPath, 'utf8'));

// Mapeo de modelos de aeronaves a motores (Engine_ID)
const engineMapping = {
    // Airbus A220 (Bombardier C Series) - PW1500G
    'A220': 'ENG001',
    
    // Embraer E2 - PW1500G  
    'Embraer 190-E2': 'ENG001',
    'Embraer 195-E2': 'ENG001',
    
    // Airbus A320 Family NEO - LEAP-1A o PW1100G
    'A319neo': 'ENG017',
    'A320neo': 'ENG002',
    'A321neo': 'ENG002',
    
    // Airbus A320 Family CEO - CFM56-5B
    'A318': 'ENG003',
    'A319': 'ENG003',
    'A320': 'ENG003',
    'A321': 'ENG003',
    
    // Airbus A330 CEO - CF6-80 o Trent 700
    'A330-200': 'ENG023',
    'A330-300': 'ENG023',
    
    // Airbus A330 NEO - Trent 7000
    'A330-800': 'ENG004',
    'A330-900': 'ENG004',
    
    // Airbus A340 - Trent 500 o CFM56
    'A340': 'ENG023',
    
    // Airbus A350 - Trent XWB
    'A350-900': 'ENG013',
    'A350-1000': 'ENG013',
    
    // Airbus A380 - Trent 900
    'A380': 'ENG005',
    
    // Airbus A310 - CF6-80C2 o JT9D
    'A310': 'ENG014',
    
    // Airbus A400M - TP400
    'A400M': 'ENG019',
    
    // Boeing 737 Classic - CFM56-3
    '737-200': 'ENG009',
    '737-300': 'ENG011',
    '737-400': 'ENG011',
    '737-500': 'ENG011',
    
    // Boeing 737 NG - CFM56-7B
    '737-600': 'ENG011',
    '737-700': 'ENG011',
    '737-800': 'ENG011',
    '737-900': 'ENG011',
    
    // Boeing 737 MAX - LEAP-1B
    '737 MAX': 'ENG012',
    '737-7': 'ENG012',
    '737-8': 'ENG012',
    '737-9': 'ENG012',
    '737-10': 'ENG012',
    
    // Boeing 747 - JT9D o PW4000
    '747': 'ENG010',
    
    // Boeing 757 - PW2000 o RB211
    '757': 'ENG024',
    
    // Boeing 767 - CF6-80 o JT9D o PW4000
    '767': 'ENG014',
    
    // Boeing 777 Classic - GE90
    '777-200': 'ENG006',
    '777-300': 'ENG006',
    
    // Boeing 777X - GE9X
    '777-8': 'ENG016',
    '777-9': 'ENG016',
    
    // Boeing KC-135 Stratotanker
    'Boeing KC-135': 'ENG145',        // Pratt & Whitney J57
    'KC-135': 'ENG145',
    'KC-135 Stratotanker': 'ENG145',
    'KC-135R': 'ENG011',              // Re-engined with CFM56
    'KC-135T': 'ENG145',
    
    // Boeing 787 - GEnx o Trent 1000
    '787': 'ENG007',
    
    // Boeing 717 - ALF 502R-5
    '717': 'ENG022',
    
    // Boeing 727 - JT8D
    '727': 'ENG009',
    
    // Boeing 707 - JT3D (similar a JT9D)
    '707': 'ENG010',
    
    // Comac C919 - CJ1000A
    'C919': 'ENG021',
    
    // Embraer E-Jets E1 - CF34-8E
    'Embraer 170': 'ENG020',
    'Embraer 175': 'ENG020',
    'Embraer 190': 'ENG020',
    'Embraer 195': 'ENG020',
    
    // Embraer Regional Jets - CF34-3 o CF34-10
    'Embraer 135': 'ENG043',
    'Embraer 140': 'ENG043',
    'Embraer 145': 'ENG043',
    
    // Fokker 100 - Tay (similar a CF34)
    'Fokker 100': 'ENG020',
    
    // BAe 146 / Avro RJ - ALF 502
    'Bae 146': 'ENG022',
    'Avro RJ': 'ENG022',
    
    // Bombardier CRJ - CF34 series
    'CRJ': 'ENG043',
    'CRJ-200': 'ENG043',
    'CRJ-700': 'ENG020',
    'CRJ-900': 'ENG020',
    'CRJ-1000': 'ENG020',
    
    // ATR - PW100 series
    'ATR 42': 'ENG027',
    'ATR 72': 'ENG027',
    
    // De Havilland Dash 8 / Q400 - PW100 / PW150
    'Dash 8': 'ENG027',
    'DHC-8': 'ENG027',
    'Q400': 'ENG028',
    
    // Saab 340 - CT7
    'SAAB SF340': 'ENG029',
    'SAAB 2000': 'ENG030',
    
    // Beechcraft King Air - PT6A
    'King Air': 'ENG025',
    'Beechcraft 1900': 'ENG025',
    'Beechcraft Model 99': 'ENG149',   // PT6A-27
    'Beechcraft 99': 'ENG149',
    'Model 99': 'ENG149',
    
    // Pilatus PC-12 - PT6A
    'PC-12': 'ENG026',
    
    // Cessna Caravan - PT6A
    'Caravan': 'ENG025',
    'Grand Caravan': 'ENG025',
    
    // Piper - Lycoming engines
    'Piper': 'ENG033',
    'PA-28': 'ENG034',
    'PA-32': 'ENG033',
    'PA-34': 'ENG034',
    'PA-44': 'ENG034',
    
    // Cessna pistons - Continental/Lycoming
    'Cessna 172': 'ENG034',
    'Cessna 152': 'ENG037',
    'Cessna 182': 'ENG032',
    'Cessna 206': 'ENG032',
    'Cessna 210': 'ENG032',
    
    // Beechcraft pistons - Continental/Lycoming
    'Beechcraft Bonanza': 'ENG032',
    'Beechcraft Baron': 'ENG032',
    
    // Diamond Aircraft - Rotax or Lycoming
    'Diamond DA40': 'ENG034',
    'Diamond DA42': 'ENG038',
    'Diamond DA62': 'ENG038',
    
    // Cirrus - Continental
    'Cirrus SR20': 'ENG037',
    'Cirrus SR22': 'ENG032',
    
    // Vintage warbirds - radial engines
    'DC-3': 'ENG040',
    'DC-4': 'ENG040',
    'C-47': 'ENG040',
    'B-17': 'ENG041',
    
    // Business jets - various turbofans
    'Citation': 'ENG031',
    'Learjet': 'ENG031',
    'Phenom': 'ENG031',
    'Gulfstream': 'ENG047',
    'Global': 'ENG047',
    
    // Russian aircraft - Soloviev engines
    'Tupolev Tu-154': 'ENG048',
    'Il-62': 'ENG048',
    'An-72': 'ENG046',
    'An-74': 'ENG046',
    
    // McDonnell Douglas DC-10 - CF6-50C2
    'DC-10': 'ENG049',
    
    // Bombardier CRJ family (motores específicos por variante)
    'CRJ100': 'ENG051',
    'Canadair Regional Jet 200': 'ENG051',
    'CRJ-200': 'ENG051',
    'Canadair Regional Jet 700': 'ENG052',
    'CRJ-700': 'ENG052',
    'Canadair Regional Jet 900': 'ENG053',
    'CRJ-900': 'ENG053',
    'Canadair Regional Jet 1000': 'ENG053',
    'CRJ-1000': 'ENG053',
    
    // ATR family (motores específicos por variante)
    'Alenia ATR-42-300': 'ENG056',
    'Alenia ATR-42-320': 'ENG057',
    'Alenia ATR-42-400': 'ENG057',   // PW124B
    'Alenia ATR-42-500': 'ENG057',
    'Alenia ATR-42-600': 'ENG057',
    'ATR-42-400': 'ENG057',
    'ATR 42-400': 'ENG057',
    'ATR 42': 'ENG056',
    'Alenia ATR-72-200': 'ENG054',
    'Alenia ATR-72-500': 'ENG054',
    'Alenia ATR-72-600': 'ENG055',
    'ATR 72': 'ENG054',
    
    // British Aerospace (BAe) family - Honeywell LF507
    'BAe 146-100': 'ENG058',
    'BAe 146-200': 'ENG058',
    'BAe 146-300': 'ENG058',
    'Bae 146': 'ENG058',
    'Avro RJ70': 'ENG058',
    'Avro RJ85': 'ENG058',
    'Avro RJ100': 'ENG058',
    'Avro RJ': 'ENG058',
    'British Aerospace ATP': 'ENG028',
    'Jetstream 31': 'ENG063',
    'Jetstream 41': 'ENG060',
    
    // Fokker with Rolls-Royce Tay engines
    'Fokker 70': 'ENG059',
    'Fokker 100': 'ENG059',
    
    // Fokker 50 (ya existía)
    'Fokker 50': 'ENG122',            // PW125B
    'Fokker F50': 'ENG122',           // PW125B
    
    // Fokker F27 Friendship
    'Fokker F27': 'ENG146',           // Rolls-Royce Dart RDa.7
    'Fokker F27 Friendship': 'ENG146',
    'F27': 'ENG146',
    'F-27': 'ENG146',
    
    // Fokker F28 Fellowship
    'Fokker F28': 'ENG147',           // Rolls-Royce Spey 555-15H
    'Fokker F28 Fellowship': 'ENG147',
    'F28': 'ENG147',
    'F-28': 'ENG147',
    
    // Cessna turboprop family - PT6A series
    'Cessna 208': 'ENG062',
    'Cessna 441': 'ENG064',
    'Cessna 425': 'ENG063',
    
    // Business jets with specific TFE731/JT15D engines
    'Learjet 35': 'ENG066',
    'Learjet 55': 'ENG066',
    'Learjet 60': 'ENG067',
    'Citation II': 'ENG068',
    'Citation III': 'ENG066',
    'Citation V': 'ENG068',
    
    // McDonnell Douglas MD-80 series - JT8D-200
    'MD-80': 'ENG050',
    'MD-81': 'ENG050',
    'MD-82': 'ENG050',
    'MD-83': 'ENG050',
    'MD-87': 'ENG050',
    'MD-88': 'ENG050',
    
    // Let aircraft - Walter M601
    'LET 410': 'ENG065',
    
    // Aeronaves soviéticas/rusas - Motores Kuznetsov, Ivchenko, Aviadvigatel
    'Il-18': 'ENG071',           // Ivchenko AI-20
    'An-10': 'ENG071',           // Ivchenko AI-20
    'An-12': 'ENG071',           // Ivchenko AI-20
    'An-22': 'ENG070',           // Kuznetsov NK-12 (el turboprop más potente)
    'Tu-95': 'ENG070',           // Kuznetsov NK-12
    'Tu-114': 'ENG070',          // Kuznetsov NK-12
    'Tu-142': 'ENG070',          // Kuznetsov NK-12
    'Il-86': 'ENG069',           // Kuznetsov NK-8
    'Tu-204': 'ENG074',          // Aviadvigatel PS-90A
    'Tu-214': 'ENG074',          // Aviadvigatel PS-90A
    'Il-96': 'ENG074',           // Aviadvigatel PS-90A
    'Il-114': 'ENG092',          // Klimov TV7-117
    'An-140': 'ENG092',          // Klimov TV7-117
    'Yak-40': 'ENG093',          // Ivchenko AI-25
    'Yak-42': 'ENG048',          // Soloviev D-30
    'An-24': 'ENG072',           // Ivchenko AI-24
    'An-26': 'ENG072',           // Ivchenko AI-24
    'An-30': 'ENG072',           // Ivchenko AI-24
    'An-32': 'ENG072',           // Ivchenko AI-24
    'An-148': 'ENG073',          // Progress D-436
    'An-158': 'ENG073',          // Progress D-436
    'Be-200': 'ENG073',          // Progress D-436
    
    // Aeronaves chinas - Motores ACAE
    'ARJ21': 'ENG077',           // ACAE CJ-500
    'C919': 'ENG021',            // Actualmente LEAP-1C, pero CJ-1000A planeado
    'Comac C919': 'ENG021',      // LEAP-1C (ENG076 para versión china futura)
    'MA700': 'ENG028',           // PW150A
    'Y-20': 'ENG048',            // Soloviev D-30KP-2
    
    // Fairchild - Motores Garrett TPE331
    'Fairchild Swearingen Metroliner': 'ENG064',      // TPE331-10
    'Fairchild Metro II': 'ENG078',   // TPE331-5
    'Fairchild Metro III': 'ENG064',  // TPE331-10
    'Fairchild Merlin': 'ENG063',     // PT6A
    'Fairchild 340': 'ENG078',        // TPE331-5
    'Fairchild SA226/227': 'ENG037',     // Dart (motor de pistón)
    'Fairchild SA26/226': 'ENG037',     // Dart (motor de pistón)
    
    // Embraer - Motores específicos por familia
    'Embraer 110': 'ENG062',         // PT6A-135A Bandeirante
    'Embraer 120': 'ENG081',         // PW120 Brasilia
    'Embraer 121': 'ENG063',         // PT6A
    'Embraer 135': 'ENG043',         // CF34-8E (ya existía)
    'Embraer 140': 'ENG043',         // CF34-8E
    'Embraer RJ140': 'ENG043',       // CF34-8E
    'ERJ-140': 'ENG043',             // CF34-8E
    'RJ140': 'ENG043',               // CF34-8E
    'Embraer 145': 'ENG043',         // CF34-8E
    'Embraer 170': 'ENG079',            // CF34-10E
    'Embraer 175': 'ENG079',            // CF34-10E
    'Embraer 190': 'ENG079',            // CF34-10E
    'Embraer 195': 'ENG079',            // CF34-10E
    'Embraer 190-E2': 'ENG015',         // PW1900G (ya existía)
    'Embraer 195-E2': 'ENG015',         // PW1900G
    'Embraer Phenom 100': 'ENG091',   // Williams FJ44
    'Embraer Phenom 300': 'ENG086',   // PW305
    'Embraer Legacy 450': 'ENG089',   // Honeywell HTF7000
    'Embraer Legacy 500': 'ENG089',   // Honeywell HTF7000
    'Embraer Lineage 1000': 'ENG079', // CF34-10E
    'Praetor 500': 'ENG089',     // Honeywell HTF7000
    'Praetor 600': 'ENG089',     // Honeywell HTF7000
    
    // De Havilland Canada / Bombardier Dash - Motores PW100 series
    'DHC-2': 'ENG039',           // Pratt & Whitney R-985 (pistón)
    'DHC-3': 'ENG039',           // P&W R-985
    'DHC-6': 'ENG062',           // PT6A Twin Otter
    'DHC-7': 'ENG063',           // PT6A Dash 7
    'DHC-8-100': 'ENG081',       // PW120 Dash 8 Q100
    'DHC-8-200': 'ENG082',       // PW123 Dash 8 Q200
    'DHC-8-300': 'ENG082',       // PW123 Dash 8 Q300
    'DHC-8-400': 'ENG028',       // PW150A Dash 8 Q400
    'Dash 8-100': 'ENG081',      // PW120
    'Dash 8-200': 'ENG082',      // PW123
    'Dash 8-300': 'ENG082',      // PW123
    'Dash 8-400': 'ENG028',      // PW150A
    'Q100': 'ENG081',            // PW120
    'Q200': 'ENG082',            // PW123
    'Q300': 'ENG082',            // PW123
    'Q400': 'ENG028',            // PW150A
    
    // Dassault Aviation - Motores específicos por familia
    'Falcon 10': 'ENG066',       // TFE731-2
    'Falcon 20': 'ENG090',       // GE CF700
    'Falcon 50': 'ENG066',       // TFE731-3
    'Falcon 900': 'ENG085',      // TFE731-60
    'Falcon 2000': 'ENG086',     // PW305/PW307
    'Falcon 2000EX': 'ENG087',   // PW307A
    'Falcon 7X': 'ENG087',       // PW307A
    'Falcon 8X': 'ENG087',       // PW307D
    'Rafale': 'ENG083',          // SNECMA M88 (caza militar)
    
    // Más business jets específicos
    'Gulfstream G150': 'ENG089',      // HTF7000
    'Gulfstream G280': 'ENG089',      // HTF7000
    'Gulfstream G450': 'ENG088',      // Rolls-Royce BR710
    'Gulfstream G550': 'ENG088',      // Rolls-Royce BR710
    'Bombardier Global 5000': 'ENG088', // BR710
    'Bombardier Global 6000': 'ENG088', // BR710
    'Citation Mustang': 'ENG091',     // Williams FJ44
    'Citation M2': 'ENG091',          // Williams FJ44
    'Citation CJ3': 'ENG091',         // Williams FJ44
    'Citation CJ4': 'ENG091',         // Williams FJ44
    
    // Hawker (British Aerospace business jets)
    'Hawker 400': 'ENG100',           // Pratt & Whitney JT12
    'Hawker 800': 'ENG094',           // TFE731-20
    'Hawker 850': 'ENG094',           // TFE731-20
    'Hawker 900': 'ENG095',           // TFE731-50
    'Hawker 1000': 'ENG095',          // TFE731-50
    'Hawker 4000': 'ENG087',          // PW307
    'Hawker Siddeley 125': 'ENG097',  // Rolls-Royce Viper
    'BAe 125': 'ENG094',              // TFE731
    
    // Canadair Challenger
    'Canadair CL-600 Challenger': 'ENG058',  // Honeywell LF507 (originales)
    'Canadair Challenger 600': 'ENG058',     // LF507
    'Canadair Challenger 601': 'ENG096',     // CF34-3A1
    'Canadair Challenger 604': 'ENG096',     // CF34-3A1
    'Canadair Challenger 605': 'ENG096',     // CF34-3A1
    'Bombardier Challenger 300': 'ENG089',   // HTF7000
    'Bombardier Challenger 350': 'ENG089',   // HTF7000
    'Bombardier Challenger 650': 'ENG096',   // CF34-3A1
    'CL-600': 'ENG058',
    'CL-601': 'ENG096',
    'CL-604': 'ENG096',
    
    // Eclipse (Very Light Jets)
    'Eclipse EA500': 'ENG099',          // PW610F (el motor más pequeño)
    'Eclipse EA550': 'ENG099',          // PW610F
    
    // Mitsubishi (regional y business jets)
    'Mitsubishi MU-2': 'ENG064',      // TPE331-10
    'Mitsubishi MU-300': 'ENG100',    // JT12 / JT15D
    'Mitsubishi Regional Jet': 'ENG015',  // PW1200G (MRJ/SpaceJet)
    'MRJ70': 'ENG015',                // PW1200G
    'MRJ90': 'ENG015',                // PW1200G
    'SpaceJet M90': 'ENG015',         // PW1217G
    'SpaceJet M100': 'ENG015',        // PW1217G
    
    // Piaggio (turboprops italianos)
    'Piaggio P.180 Avanti': 'ENG103', // PT6A-67 (pusher configuration)
    'Piaggio P180': 'ENG103',        // PT6A-67
    'Piaggio Avanti': 'ENG103',       // PT6A-67
    
    // SAAB (aviones suecos)
    'SAAB 340': 'ENG102',             // GE CT7-9
    'SAAB 2000': 'ENG043',            // Allison AE2100
    'SAAB 39 Gripen': 'ENG110',       // Volvo RM12 (based on F404)
    'JAS 39 Gripen': 'ENG110',        // Volvo RM12
    
    // Sikorsky (helicópteros - turboshaft engines)
    'Sikorsky S-76': 'ENG106',        // Allison 250-B17
    'Sikorsky UH-60 Black Hawk': 'ENG107',  // GE T700
    'Sikorsky S-70': 'ENG107',        // GE T700
    'Sikorsky CH-53': 'ENG108',       // GE T64
    'Sikorsky S-92': 'ENG102',        // CT7-8 (variant)
    
    // Shorts (British regional aircraft)
    'Shorts SD.330': 'ENG062',           // PT6A-45
    'Shorts SD.360': 'ENG062',           // PT6A-65
    'Shorts SD3-30': 'ENG062',        // PT6A
    'Shorts SD3-60': 'ENG062',        // PT6A
    
    // SOCATA (French general aviation)
    'SOCATA TBM700': 'ENG062',       // PT6A-64
    'SOCATA TBM850': 'ENG104',       // PT6A-66D
    'SOCATA TBM900': 'ENG104',       // PT6A-66D
    'SOCATA TBM910': 'ENG104',       // PT6A-66D
    'SOCATA TBM930': 'ENG104',       // PT6A-66D
    'SOCATA TBM960': 'ENG104',       // PT6A-66D
    'TBM 700': 'ENG062',
    'TBM 850': 'ENG104',
    'TBM 900': 'ENG104',
    'TBM 910': 'ENG104',
    'TBM 930': 'ENG104',
    'TBM 960': 'ENG104',
    
    // IAI (Israel Aerospace Industries)
    'IAI Westwind': 'ENG066',         // TFE731-3
    'IAI Astra': 'ENG066',            // TFE731-3
    'IAI Galaxy': 'ENG109',           // PW535
    'IAI Gulfstream G100': 'ENG089',  // HTF7000
    'IAI Gulfstream G200': 'ENG087',  // PW306
    'Gulfstream G100': 'ENG089',      // HTF7000 (IAI made)
    'Gulfstream G200': 'ENG087',      // PW306 (IAI made)
    'IAI Lavi': 'ENG112',             // PW1120
    
    // NAMC (Japanese Aircraft Manufacturing)
    'NAMC YS-11': 'ENG113',           // Rolls-Royce Dart 542-10K
    'YS-11': 'ENG113',                // Rolls-Royce Dart
    
    // Más business jets específicos
    'Citation XLS': 'ENG114',         // PW545
    'Citation Excel': 'ENG114',       // PW545
    'Citation Latitude': 'ENG118',    // PW308
    'Citation Longitude': 'ENG089',   // HTF7000
    'Citation Sovereign': 'ENG087',   // PW307
    'HondaJet': 'ENG111',             // GE Honda HF120 (similar a F404)
    'Pilatus PC-12': 'ENG103',        // PT6A-67
    'Pilatus PC-24': 'ENG091',        // Williams FJ44
    'Cirrus Vision SF50': 'ENG115',   // Williams FJ33
    'Daher TBM': 'ENG104',            // PT6A-66D
    'Beechcraft King Air 350': 'ENG103',  // PT6A-60A
    'Beechcraft Premier': 'ENG091',   // Williams FJ44
    
    // Agusta (helicópteros italianos)
    'Agusta A109': 'ENG119',          // Turbomeca Arriel
    'Agusta A119': 'ENG119',          // Turbomeca Arriel
    'Agusta A129': 'ENG137',          // Rolls-Royce Gem / similar engines
    'AgustaWestland AW109': 'ENG119', // Turbomeca Arriel
    'AgustaWestland AW119': 'ENG119', // Turbomeca Arriel
    'AgustaWestland AW139': 'ENG116', // PT6C-67
    'AgustaWestland AW101': 'ENG107', // GE T700 / similar
    'AgustaWestland AW149': 'ENG142', // MTR390
    'AgustaWestland AW169': 'ENG119', // Arriel variant
    'AW109': 'ENG119',
    'AW119': 'ENG119',
    'AW139': 'ENG116',
    'AW101': 'ENG107',
    'AW149': 'ENG142',
    'AW169': 'ENG119',
    
    // Eurocopter (ahora Airbus Helicopters)
    'Eurocopter EC120': 'ENG121',     // Turbomeca Arrius
    'Eurocopter EC130': 'ENG119',     // Turbomeca Arriel
    'Eurocopter EC135': 'ENG121',     // Turbomeca Arrius
    'Eurocopter EC145': 'ENG119',     // Turbomeca Arriel
    'Eurocopter EC155': 'ENG119',     // Turbomeca Arriel
    'Eurocopter AS332': 'ENG120',     // Turbomeca Makila
    'Eurocopter AS350': 'ENG119',     // Turbomeca Arriel
    'Eurocopter AS355': 'ENG119',     // Turbomeca Arriel
    'Eurocopter AS365': 'ENG119',     // Turbomeca Arriel
    'Eurocopter EC225': 'ENG120',     // Turbomeca Makila
    'Eurocopter Tiger': 'ENG142',     // MTR390
    'Airbus H120': 'ENG121',
    'Airbus H125': 'ENG119',
    'Airbus H130': 'ENG119',
    'Airbus H135': 'ENG121',
    'Airbus H145': 'ENG119',
    'Airbus H155': 'ENG119',
    'Airbus H225': 'ENG120',
    
    // Fokker 50
    'Fokker 50': 'ENG122',            // PW125B
    'Fokker F50': 'ENG122',           // PW125B
    
    // Lockheed (militares y civiles)
    'Lockheed C-130 Hercules': 'ENG123',  // Allison T56
    'Lockheed C-130': 'ENG123',       // Allison T56
    'C-130': 'ENG123',
    'Lockheed P-3 Orion': 'ENG123',   // Allison T56
    'P-3 Orion': 'ENG123',
    'Lockheed L-188 Electra': 'ENG124',  // Allison 501-D13
    'L-188 Electra': 'ENG124',
    'Lockheed L-1011 TriStar': 'ENG138',  // RB211-524
    'L-1011': 'ENG138',
    'TriStar': 'ENG138',
    
    // LET (Czech aircraft)
    'LET L-410': 'ENG065',            // Walter M601 (ya existía)
    'LET L-610': 'ENG126',            // Walter M601E
    'L-410': 'ENG065',
    'L-610': 'ENG126',
    
    // McDonnell Douglas adicionales
    'McDonnell Douglas DC-8': 'ENG134',    // JT3D
    'DC-8': 'ENG134',
    'McDonnell Douglas DC-9': 'ENG127',    // JT8D-9
    'DC-9': 'ENG127',
    'McDonnell Douglas MD-11': 'ENG135',   // CF6-80C2
    'MD-11': 'ENG135',
    'MD-11F': 'ENG135',               // Freighter variant
    
    // Aerospatiale (French aircraft)
    'Aerospatiale Concorde': 'ENG128',     // Snecma Atar (modified to Olympus)
    'Concorde': 'ENG128',
    'Aerospatiale ATR': 'ENG054',     // PW127 (ya mapeado)
    'Aerospatiale N.262': 'ENG129',   // Turbomeca Astazou
    'Aerospatiale SA 330 Puma': 'ENG120',  // Turbomeca Makila
    'Aerospatiale SA 341 Gazelle': 'ENG129',  // Turbomeca Astazou
    'Aerospatiale AS 332 Super Puma': 'ENG120',  // Turbomeca Makila
    'Aerospatiale AS365': 'ENG119',   // Turbomeca Arriel - Dauphin
    'Aerospatiale AS 365': 'ENG119',  // Turbomeca Arriel
    'AS365': 'ENG119',
    'Aerospatiale AS355': 'ENG144',   // Turbomeca Artouste - Ecureuil 2
    'Aerospatiale AS 355': 'ENG144',  // Turbomeca Artouste
    'AS355': 'ENG144',
    'Aerospatiale SN601': 'ENG066',   // TFE731 (Corvette business jet)
    'SN601': 'ENG066',
    'SN 601': 'ENG066',
    'Corvette': 'ENG066',
    'Puma': 'ENG120',
    'Gazelle': 'ENG129',
    'Super Puma': 'ENG120',
    'Dauphin': 'ENG119',
    
    // Partenavia (Italian light aircraft)
    'Partenavia P.68': 'ENG130',      // Lycoming O-540
    'P.68': 'ENG130',
    'Partenavia AP.68': 'ENG130',     // Lycoming O-540
    
    // Sikorsky S-61 (adicional)
    'Sikorsky S-61': 'ENG125',        // GE T58
    'Sikorsky SH-3 Sea King': 'ENG125',  // GE T58
    'S-61': 'ENG125',
    'SH-3': 'ENG125',
    
    // Sukhoi (Russian fighters and commercial)
    'Sukhoi Su-27': 'ENG075',         // Saturn AL-31F
    'Su-27': 'ENG075',
    'Sukhoi Su-30': 'ENG143',         // AL-31FP
    'Su-30': 'ENG143',
    'Sukhoi Su-35': 'ENG143',         // AL-31FP variant
    'Su-35': 'ENG143',
    'Sukhoi Su-24': 'ENG131',         // AL-21F
    'Su-24': 'ENG131',
    'Sukhoi Superjet 100': 'ENG017',  // SaM146 (ya existía)
    'SSJ100': 'ENG017',
    
    // Tupolev Tu-134 (adicional)
    'Tupolev Tu-134': 'ENG048',       // Soloviev D-30
    'Tu-134': 'ENG048',
    
    // Airbus A300 familia completa
    'Airbus A300': 'ENG135',          // CF6-80C2
    'A300': 'ENG135',
    'Airbus A300-600': 'ENG135',      // CF6-80C2
    'A300-600': 'ENG135',
    'Airbus A300-600ST': 'ENG135',    // Beluga
    'A300-600ST': 'ENG135',
    'Beluga': 'ENG135',
    'Airbus A300-600F': 'ENG135',     // Freighter
    'A300-600F': 'ENG135',
    'Airbus A300B4': 'ENG135',
    'A300B4': 'ENG135',
    'Airbus A310': 'ENG135',          // CF6-80C2 o JT9D
    'A310': 'ENG135',
    
    // BAe 11 (BAC 1-11)
    'BAC 1-11': 'ENG137',             // Rolls-Royce Spey
    'BAC One-Eleven': 'ENG137',       // Rolls-Royce Spey
    'BAe 11': 'ENG137',
    
    // Britten-Norman
    'Britten-Norman Islander': 'ENG130',   // Lycoming O-540
    'Britten-Norman BN-2': 'ENG130',       // Lycoming O-540
    'Britten Norman BN-2': 'ENG130',       // Lycoming O-540 (sin guión)
    'BN-2': 'ENG130',
    'BN-2 Islander': 'ENG130',
    'Britten-Norman BN-2 Mk3': 'ENG148',   // PT6A-45R Trislander turboprop
    'Britten Norman BN-2 Mk3': 'ENG148',   // PT6A-45R (sin guión)
    'BN-2 Mk3': 'ENG148',
    'Britten-Norman Trislander': 'ENG130', // Lycoming O-540
    'BN-2A Trislander': 'ENG130',
    'Britten-Norman Defender': 'ENG130',   // Lycoming O-540
    
    // Canadair Challenger 850 (regional jet variant)
    'Canadair Challenger 850': 'ENG096',   // CF34-3A1
    'Bombardier CRJ 850': 'ENG096',        // CF34-3A1
    
    // Bell Helicopters adicionales
    'Bell 206': 'ENG106',             // Allison 250
    'Bell 212': 'ENG116',             // PT6T
    'Bell 412': 'ENG116',             // PT6T
    'Bell 407': 'ENG137',             // Rolls-Royce
    'Bell 429': 'ENG119',             // Arriel variant
    'Bell 505': 'ENG119',             // Arrius
    
    // Robinson Helicopters
    'Robinson R22': 'ENG130',         // Lycoming O-360
    'Robinson R44': 'ENG130',         // Lycoming IO-540
    'Robinson R66': 'ENG137',         // Rolls-Royce RR300
    
    // Airbus Military
    'Airbus A330 MRTT': 'ENG005',     // Trent 700 / CF6
    'A330 MRTT': 'ENG005',
    
    // ============== MAPEOS ADICIONALES PARA COMPLETAR 43 AERONAVES ==============
    
    // Airbus A330ceo (CEO = Current Engine Option)
    'A330ceo': 'ENG005',              // Trent 700
    'Airbus A330ceo': 'ENG005',
    
    // Boeing BBJ (Boeing Business Jet) - basados en 737
    'Boeing 737-BBJ': 'ENG011',       // CFM56-7B
    '737-BBJ': 'ENG011',
    'Boeing 737-BBJ1': 'ENG011',
    '737-BBJ1': 'ENG011',
    'Boeing 737-BBJ2': 'ENG011',
    '737-BBJ2': 'ENG011',
    'Boeing 737-BBJ3': 'ENG011',
    '737-BBJ3': 'ENG011',
    
    // Antonov An-28 - turboprop ligero
    'Antonov An-28': 'ENG072',        // AI-24 (motor soviético histórico)
    'An-28': 'ENG072',
    
    // AgustaWestland A109 - helicóptero ejecutivo
    'AgustaWestland A109': 'ENG119',  // Arriel 1K1
    'Agusta A109': 'ENG119',
    'A109': 'ENG119',
    
    // Aerospatiale AS332 Super Puma (ya existe como Eurocopter AS332)
    'Aerospatiale AS332': 'ENG120',   // Turbomeca Makila
    'AS332': 'ENG120',
    'AS332 Super Puma': 'ENG120',
    
    // IAI 1125 Astra SPX (business jet israelí)
    'IAI 1125': 'ENG031',             // TFE731-40
    'Gulfstream G100': 'ENG031',      // Versión renombrada del Astra
    
    // Boeing 720B - variante del 707
    'Boeing 720B': 'ENG028',          // JT3D-3 (turbojet clásico)
    '720B': 'ENG028',
    
    // GAF Nomad - turboprop australiano
    'GAF Nomad': 'ENG152',            // Garrett TPE331-6
    'Nomad': 'ENG152',
    'N22 Nomad': 'ENG152',
    'N24 Nomad': 'ENG152',
    
    // Canadair CRJ100/200 (primera generación CRJ)
    'Canadair CRJ100': 'ENG054',      // CF34-3A
    'CRJ100': 'ENG054',
    'Bombardier CRJ100': 'ENG054',
    'Canadair CRJ200': 'ENG054',      // CF34-3B
    'CRJ200': 'ENG054',
    'Bombardier CRJ200': 'ENG054',
    
    // Canadair Challenger 870 (CL-600)
    'Canadair Challenger 870': 'ENG026',  // Lycoming ALF502
    'Challenger 870': 'ENG026',
    
    // Canadair Challenger 890 (CL-600-1A11)
    'Canadair Challenger 890': 'ENG026',  // Lycoming ALF502
    'Challenger 890': 'ENG026',
    
    // Canadair CRJ705 (variante del CRJ900)
    'Canadair CRJ705': 'ENG055',      // CF34-8C5
    'CRJ705': 'ENG055',
    'Bombardier CRJ705': 'ENG055',
    
    // Convair CV-580 (conversión turboprop del CV-340/440)
    'Convair CV-580': 'ENG056',       // Allison 501-D13H
    'CV-580': 'ENG056',
    'Convair 580': 'ENG056',
    
    // Dornier 228 - turboprop alemán
    'Dornier 228': 'ENG152',          // Garrett TPE331-5
    'Do 228': 'ENG152',
    'Dornier Do 228': 'ENG152',
    
    // Dornier 328 - turboprop regional
    'Dornier 328': 'ENG152',          // PW119C (similar al TPE331)
    'Do 328': 'ENG152',
    'Dornier Do 328': 'ENG152',
    
    // DHC-5 Buffalo - transporte militar canadiense
    'DHC-5': 'ENG156',                // PW127G
    'DHC-5 Buffalo': 'ENG156',
    'de Havilland Canada DHC-5': 'ENG156',
    'Buffalo': 'ENG156',
    
    // AgustaWestland EH101 / AW101 Merlin
    'EH101': 'ENG138',                // Rolls-Royce Turbomeca RTM322
    'AW101': 'ENG138',
    'AgustaWestland EH101': 'ENG138',
    'AgustaWestland AW101': 'ENG138',
    'Merlin': 'ENG138',
    
    // Embraer Legacy 600 (basado en ERJ-135)
    'Embraer Legacy 600': 'ENG054',   // Rolls-Royce AE 3007
    'Legacy 600': 'ENG054',
    
    // Embraer Legacy 650 (versión extendida)
    'Embraer Legacy 650': 'ENG054',   // Rolls-Royce AE 3007
    'Legacy 650': 'ENG054',
    
    // Gippsland GA-8 Airvan - avión utilitario australiano
    'Gippsland GA-8': 'ENG130',       // Lycoming IO-540
    'GA-8': 'ENG130',
    'GA-8 Airvan': 'ENG130',
    
    // Grumman G-73 Mallard - anfibio clásico
    'Grumman G-73': 'ENG128',         // Pratt & Whitney R-1340 (piston)
    'G-73': 'ENG128',
    'G-73 Mallard': 'ENG128',
    'Mallard': 'ENG128',
    
    // Hawker 1000 (business jet británico)
    'Hawker 1000': 'ENG031',          // PW305
    'BAe 1000': 'ENG031',
    
    // Hawker 4000 (Hawker Horizon)
    'Hawker 4000': 'ENG031',          // PW308A
    'Hawker Horizon': 'ENG031',
    
    // Hawker 750 (variante del Hawker 800)
    'Hawker 750': 'ENG031',           // TFE731-5BR
    'BAe 750': 'ENG031',
    
    // Hawker 800 / BAe 125-800
    'Hawker 800': 'ENG031',           // TFE731-5BR
    'BAe 800': 'ENG031',
    'BAe 125-800': 'ENG031',
    
    // Hawker 850 (versión mejorada del 800)
    'Hawker 850': 'ENG031',           // TFE731-5BR
    'BAe 850': 'ENG031',
    
    // Hawker 900 / BAe 125-1000
    'Hawker 900': 'ENG031',           // TFE731-50R
    'BAe 900': 'ENG031',
    
    // HondaJet HA-420
    'HondaJet': 'ENG021',             // GE Honda HF120
    'Honda HA-420': 'ENG021',
    'HA-420': 'ENG021',
    
    // Hawker Siddeley HS 748
    'Hawker Siddeley HS 748': 'ENG137', // Rolls-Royce Dart
    'HS 748': 'ENG137',
    'HS748': 'ENG137',
    'Avro 748': 'ENG137',
    
    // Ilyushin Il-76 - transporte pesado soviético
    'Ilyushin Il-76': 'ENG048',       // Soloviev D-30KP
    'Il-76': 'ENG048',
    'Il-76MD': 'ENG048',
    
    // BAe Jetstream 32
    'BAe Jetstream 32': 'ENG152',     // Garrett TPE331-12
    'Jetstream 32': 'ENG152',
    'J32': 'ENG152',
    
    // Lockheed Jetstar - business jet clásico
    'Lockheed Jetstar': 'ENG153',     // Pratt & Whitney JT12A
    'Jetstar': 'ENG153',
    'Lockheed 1329': 'ENG153',
    
    // Lockheed C-130 Hercules
    'Lockheed C-130': 'ENG056',       // Allison T56-A-15
    'C-130': 'ENG056',
    'C-130 Hercules': 'ENG056',
    'C130': 'ENG056',
    'Lockheed C130': 'ENG056',
    
    // McDonnell Douglas MD-90
    'McDonnell Douglas MD-90': 'ENG157',  // JT8D-17 o IAE V2500
    'MD-90': 'ENG157',
    'MD90': 'ENG157',
    
    // MBB Bo-105 - helicóptero alemán
    'MBB Bo-105': 'ENG154',           // Allison 250-C47
    'Bo-105': 'ENG154',
    'Bolkow Bo-105': 'ENG154',
    
    // MD Helicopters MD900 Explorer
    'MD 900': 'ENG154',               // PW206E / Allison 250-C47
    'MD900': 'ENG154',
    'MD Helicopters MD900': 'ENG154',
    'MD900 Explorer': 'ENG154',
    
    // Nord N.262 - turboprop francés
    'Nord N.262': 'ENG152',           // Turbomeca Bastan
    'N.262': 'ENG152',
    'Nord 262': 'ENG152',
    
    // Aerospatiale AS350 Ecureuil / AStar
    'Aerospatiale AS350': 'ENG119',   // Arriel 1D1
    'AS350': 'ENG119',
    'AS350 Ecureuil': 'ENG119',
    'Eurocopter AS350': 'ENG119',
    'Airbus AS350': 'ENG119',
    
    // Partenavia P68 - avión ligero italiano
    'Partenavia P68': 'ENG130',       // Lycoming IO-360
    'P68': 'ENG130',
    'P.68': 'ENG130',
    
    // Beechcraft Premier 1 / Hawker 390
    'Beechcraft Premier 1': 'ENG021', // Williams FJ44-2A
    'Premier 1': 'ENG021',
    'Hawker 390': 'ENG021',
    
    // Shorts SC-5 Belfast - transporte pesado británico
    'Shorts SC-5': 'ENG151',          // Rolls-Royce Tyne
    'SC-5': 'ENG151',
    'SC-5 Belfast': 'ENG151',
    'Belfast': 'ENG151',
    
    // Shorts SC-7 Skyvan
    'Shorts SC-7': 'ENG152',          // Garrett TPE331-2
    'SC-7': 'ENG152',
    'SC-7 Skyvan': 'ENG152',
    'Skyvan': 'ENG152'
};

// Función para determinar el Engine_ID basándose en el modelo
function getEngineId(aircraftModel) {
    for (const [key, engineId] of Object.entries(engineMapping)) {
        if (aircraftModel.includes(key)) {
            return engineId;
        }
    }
    return null; // Si no se encuentra mapeo
}

// Agregar Engine_ID a cada aeronave
let updatedCount = 0;
aircraft.forEach(plane => {
    if (!plane.Engine_ID) {
        const engineId = getEngineId(plane.Model);
        if (engineId) {
            plane.Engine_ID = engineId;
            updatedCount++;
        }
    }
});

// Guardar el archivo actualizado
fs.writeFileSync(aircraftPath, JSON.stringify(aircraft, null, 2), 'utf8');

console.log(`✅ Proceso completado!`);
console.log(`📊 Total de aeronaves: ${aircraft.length}`);
console.log(`🔧 Aeronaves actualizadas con Engine_ID: ${updatedCount}`);
console.log(`⚠️  Aeronaves sin Engine_ID: ${aircraft.filter(p => !p.Engine_ID).length}`);
