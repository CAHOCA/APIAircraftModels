# 🔧 Engine System - Aircraft Models API

## 📋 Description

An aircraft-engine relationship system has been implemented that allows obtaining detailed information about the engines used by each aircraft model.

## 🗂️ File Structure

```
src/api/db/
├── AircraftModels.json  # Aircraft database (includes Engine_ID)
├── Engines.json         # Engine database (157 engines)
└── add-engine-ids.js    # Script to assign engines to aircraft
```

## 🔗 Aircraft ↔ Engine Relationship

Each aircraft in `AircraftModels.json` now includes an `Engine_ID` field that references a specific engine in `Engines.json`.

### Aircraft Example (AircraftModels.json):
```json
{
  "IATA_Code": "789",
  "ICAO_Code": "B789",
  "Model": "Boeing 787-9 Dreamliner",
  "Manufacturer": "Boeing",
  "Engine_Type": "Turbofan",
  "Number_of_Engines": 2,
  "Service_Ceiling_ft": 43000,
  "Max_Range_nm": 7635,
  "Engine_ID": "ENG007"
}
```

### Engine Example (Engines.json):
```json
{
  "Engine_ID": "ENG007",
  "Name": "General Electric GEnx-1B",
  "Type": "Turbofan",
  "Manufacturer": "General Electric",
  "Takeoff_Thrust_lbf": 66500,
  "Max_Power_HP": null,
  "Weight_lb": 12250,
  "Length_in": 181,
  "Diameter_in": 111,
  "Max_RPM": 2700,
  "Bypass_Ratio": 9.6,
  "Variants": ["GEnx-1B64", "GEnx-1B67", "GEnx-1B70", "GEnx-1B75"]
}
```

## 🚀 API Response (With Automatic JOIN)

When you query the API, the system **automatically performs a JOIN** between aircraft and engines, returning:

```json
{
  "IATA_Code": "789",
  "ICAO_Code": "B789",
  "Model": "Boeing 787-9 Dreamliner",
  "Manufacturer": "Boeing",
  "Engine_Type": "Turbofan",
  "Number_of_Engines": 2,
  "Service_Ceiling_ft": 43000,
  "Max_Range_nm": 7635,
  "Engine": {
    "ID": "ENG007",
    "Name": "General Electric GEnx-1B",
    "Type": "Turbofan",
    "Manufacturer": "General Electric",
    "Takeoff_Thrust_lbf": 66500,
    "Max_Power_HP": null,
    "Weight_lb": 12250,
    "Dimensions": {
      "Length_in": 181,
      "Diameter_in": 111
    },
    "Max_RPM": 2700,
    "Bypass_Ratio": 9.6,
    "Variants": ["GEnx-1B64", "GEnx-1B67", "GEnx-1B70", "GEnx-1B75"]
  }
}
```

## 📊 Engine Fields

| Field | Type | Description |
|-------|------|-------------|
| `Engine_ID` | String | Unique engine identifier |
| `Name` | String | Full engine name |
| `Type` | String | Engine type (Turbofan, Turboprop, Turboshaft, Turbojet, Piston) |
| `Manufacturer` | String | Engine manufacturer |
| `Takeoff_Thrust_lbf` | Number | Takeoff thrust in pounds-force (lbf) |
| `Max_Power_HP` | Number | Maximum power in horsepower (HP) - for turboprops/turboshaft/piston |
| `Weight_lb` | Number | Engine weight in pounds |
| `Length_in` | Number | Engine length in inches |
| `Diameter_in` | Number | Engine diameter in inches |
| `Max_RPM` | Number | Maximum revolutions per minute |
| `Bypass_Ratio` | Number | Bypass ratio (for turbofans) |
| `Variants` | Array | Engine variants |

## 🎯 API Endpoints

### 1. Get All Aircraft (with engines)
```http
GET /api/
```

### 2. Get Aircraft by IATA Code (with engine)
```http
GET /api/789
```

### 3. Filter by Service Ceiling (with engines)
```http
POST /api/filter/ceiling
Content-Type: application/json

{
  "operator": "gt",
  "value": 40000
}
```

## 🔧 Available Engines

The database includes **157 engines** across different categories:

### ✈️ **Turbofans (67 engines)**
Commercial jets and business aircraft:
- **Pratt & Whitney**: PW1500G, PW1100G-JM, PW2000, PW4000, JT8D, JT9D
- **CFM International**: LEAP-1A, LEAP-1B, CFM56-5B, CFM56-7B
- **General Electric**: GE90-115B, GEnx-1B, GE9X, CF6-80C2, CF34 family
- **Rolls-Royce**: Trent 7000, Trent 900, Trent 1000, Trent XWB, Trent 700, RB211, Spey
- **IAE**: V2500
- **ACAE**: CJ1000A (Comac C919)
- **Honeywell**: ALF 502R-5
- **Williams**: FJ44-4A, HF120

### 🚁 **Turboprops (49 engines)**
Regional and military transport aircraft:
- **Pratt & Whitney Canada**: PT6A family, PW100, PW150A, PW127
- **General Electric**: CT7-9B
- **Rolls-Royce**: AE 2100, Dart
- **Europrop International**: TP400-D6 (A400M)
- **Honeywell**: TPE331
- **Allison**: T56 (C-130), 501

### 🚁 **Turboshaft (15 engines)**
Helicopters and rotorcraft:
- **Turbomeca**: Arriel, Makila, Arrius
- **Allison/Rolls-Royce**: 250-C series
- **Pratt & Whitney Canada**: PT6T, PW206, PW207
- **Rolls-Royce Turbomeca**: RTM322

### ⚡ **Turbojets (5 engines)**
Legacy and military aircraft:
- **Pratt & Whitney**: JT3D, JT12A
- **Soloviev**: D-30

### ⚙️ **Piston (14 engines)**
General aviation and training aircraft:
- **Continental Motors**: IO-550, IO-470, O-200
- **Lycoming Engines**: IO-540, IO-360, O-320, O-540
- **BRP-Rotax**: 912, 914
- **Pratt & Whitney**: R-1340, R-1830 Twin Wasp (radial)
- **Wright Aeronautical**: R-1820 Cyclone (radial)

## 🛠️ Maintenance Script

To update or add Engine_ID to new aircraft:

```bash
cd src/api/db
node add-engine-ids.js
```

This script automatically maps engines based on aircraft model.

## 💡 Usage Examples

### JavaScript (Fetch)
```javascript
// Get Boeing 787-9 with engine information
fetch('https://api-aircraft-models.vercel.app/api/789')
  .then(response => response.json())
  .then(data => {
    console.log(data[0].Engine.Name); // "General Electric GEnx-1B"
    console.log(data[0].Engine.Takeoff_Thrust_lbf); // 66500
  });
```

### Python
```python
import requests

# Get all aircraft with Service Ceiling > 43000 ft
response = requests.post(
    'https://api-aircraft-models.vercel.app/api/filter/ceiling',
    json={'operator': 'gt', 'value': 43000}
)

for aircraft in response.json():
    print(f"{aircraft['Model']} - {aircraft['Engine']['Name']}")
```

### C#
```csharp
using System.Net.Http;
using System.Text;
using System.Text.Json;

var client = new HttpClient();
var payload = new { @operator = "gte", value = 40000 };
var json = JsonSerializer.Serialize(payload);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.PostAsync(
    "https://api-aircraft-models.vercel.app/api/filter/ceiling", 
    content
);
var data = await response.Content.ReadAsStringAsync();
Console.WriteLine(data);
```

## 📝 Notes

- The `Engine_ID` field is optional. If an aircraft doesn't have `Engine_ID`, it's returned without engine information.
- Turbofan engines have `Takeoff_Thrust_lbf` and `Bypass_Ratio`.
- Turboprop, turboshaft, and piston engines have `Max_Power_HP` instead of thrust.
- All dimensions use the imperial system (inches, pounds).

---

**🚀 Developed by @CAHOCA**
