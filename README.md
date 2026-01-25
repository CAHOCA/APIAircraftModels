<p align="center">
  <img src="https://cahoca.github.io/assets/img/projects/pers/proj_2.webp" width="400" alt="Aircraft API Logo">
</p>

# ✈️ Aircraft Models API  

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://api-aircraft-models.vercel.app/)

Simple REST API built with Express & Node.js that provides detailed aircraft information including **IATA/ICAO codes**, **manufacturer data**, **technical specifications** (service ceiling, maximum range), and **complete engine database** with 157 engines covering all aviation categories.

## 🌟 Features

- 🛫 **350+ Aircraft Models** with IATA/ICAO codes
- 🔧 **157 Aircraft Engines** with detailed specifications
- ⚡ **Automatic JOIN** between aircraft and engines
- 🎯 **Advanced Filtering** by service ceiling (operator-based and range-based)
- 📊 **5 Engine Categories**: Turbofans, Turboprops, Turboshaft, Turbojets, Piston
- 🚀 **Auto-deployed** on Vercel with continuous integration
- 📖 **Comprehensive Documentation** with examples in multiple languages

---

## � Documentation

| Document | Description |
|----------|-------------|
| 🚀 **[QUICKSTART.md](QUICKSTART.md)** | Quick start guide with basic examples |
| 🔧 **[ENGINE_SYSTEM.md](ENGINE_SYSTEM.md)** | Complete engine system documentation with API details |
| 📋 **[ENGINE_CATALOG.md](ENGINE_CATALOG.md)** | Full catalog of all 157 engines with specifications |
| 🎉 **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** | Summary of changes and implementation details |

---

## 🚀 API Endpoints

### 1️⃣ Get All Aircraft Models
```http
GET https://api-aircraft-models.vercel.app/api/
```
Returns all aircraft with automatically joined engine information.

### 2️⃣ Get Aircraft by IATA Code
```http
GET https://api-aircraft-models.vercel.app/api/789
```
Returns specific aircraft (e.g., Boeing 787-9) with complete engine data.

### 3️⃣ Filter by Service Ceiling
```http
POST https://api-aircraft-models.vercel.app/api/filter/ceiling
Content-Type: application/json

{
  "operator": "gt",
  "value": 40000
}
```
Filter aircraft by service ceiling using operators: `gt`, `lt`, `gte`, `lte`, `eq` or range with `min`/`max`.

---

## 📊 Example Response

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

---

## � Engine Database

Our API includes **157 aircraft engines** covering all categories:

### Engine Categories
- ✈️ **Turbofans** (67 engines): Commercial jets like Boeing 737, A320, 787, 777
- 🚁 **Turboprops** (49 engines): Regional aircraft like ATR, Dash 8, C-130
- 🚁 **Turboshaft** (15 engines): Helicopters like Bell, AgustaWestland, Eurocopter
- ⚡ **Turbojets** (5 engines): Legacy aircraft and military jets
- ⚙️ **Piston** (14 engines): General aviation like Cessna, Piper, Cirrus

**Featured Engines:**
- GE9X (Boeing 777X) - 110,000 lbf - World's most powerful turbofan
- GE90-115B (Boeing 777) - 115,300 lbf
- Trent XWB (Airbus A350) - 97,000 lbf
- PW150A (Q400) - 5,071 HP - Powerful turboprop
- Rolls-Royce Tyne (Belfast) - 5,730 HP
- Allison T56 (C-130) - Military transport

📖 **[View Complete Engine Catalog →](ENGINE_CATALOG.md)**

---

## 💻 Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CAHOCA/APIAircraftModels.git
   cd APIAircraftModels
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   node src/index.js
   ```
   
4. **Access the API**
   - API Documentation: [http://localhost:3000/](http://localhost:3000/)
   - API Endpoint: [http://localhost:3000/api/](http://localhost:3000/api/)

---

## 🛠️ Maintenance Scripts

### Update Engine IDs for Aircraft
```bash
cd src/api/db
node add-engine-ids.js
```
Automatically assigns engine IDs to aircraft based on model matching.

### Check Missing Engines
```bash
cd src/api/db
node check-missing-engines.js
```
Identifies aircraft without assigned engines.

---

## 📖 Usage Examples

### JavaScript (Fetch API)
```javascript
// Get all aircraft with engines
fetch('https://api-aircraft-models.vercel.app/api/')
  .then(response => response.json())
  .then(data => console.log(data));

// Get specific aircraft
fetch('https://api-aircraft-models.vercel.app/api/789')
  .then(response => response.json())
  .then(data => {
    const aircraft = data[0];
    console.log(`Aircraft: ${aircraft.Model}`);
    console.log(`Engine: ${aircraft.Engine.Name}`);
    console.log(`Thrust: ${aircraft.Engine.Takeoff_Thrust_lbf} lbf`);
  });
```

### Python
```python
import requests

# Filter aircraft by service ceiling
response = requests.post(
    'https://api-aircraft-models.vercel.app/api/filter/ceiling',
    json={'operator': 'gte', 'value': 43000}
)

for aircraft in response.json():
    print(f"{aircraft['Model']} - {aircraft['Engine']['Name']}")
```

### cURL
```bash
# Get all aircraft
curl https://api-aircraft-models.vercel.app/api/

# Filter by ceiling range
curl -X POST https://api-aircraft-models.vercel.app/api/filter/ceiling \
  -H "Content-Type: application/json" \
  -d '{"min": 35000, "max": 45000}'
```

### C#
```csharp
using System.Net.Http;
using System.Text;
using System.Text.Json;

var client = new HttpClient();

// Get aircraft by IATA code
var response = await client.GetAsync(
    "https://api-aircraft-models.vercel.app/api/789"
);
var data = await response.Content.ReadAsStringAsync();
Console.WriteLine(data);
```

---

## 🚀 Deployment

This API is automatically deployed on **Vercel**:

- **Production URL**: https://api-aircraft-models.vercel.app/
- **Deployment**: Automatic on push to `main` branch
- **CI/CD**: GitHub → Vercel integration

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CAHOCA/APIAircraftModels)

---

## 🗂️ Project Structure

```
APIAircraftModel/
├── src/
│   ├── index.js                      # Main server file
│   ├── api/
│   │   ├── modelAircraft.js          # API routes with JOIN logic
│   │   └── db/
│   │       ├── AircraftModels.json   # 350+ aircraft with Engine_ID
│   │       ├── Engines.json          # 157 engines database
│   │       ├── add-engine-ids.js     # Script to assign engines
│   │       └── check-missing-engines.js  # Validation script
│   └── public/
│       └── index.html                # API documentation page
├── vercel.json                       # Vercel deployment config
├── package.json
├── README.md                         # This file
├── QUICKSTART.md                     # Quick start guide
├── ENGINE_SYSTEM.md                  # Engine system documentation
├── ENGINE_CATALOG.md                 # Complete engine catalog
└── IMPLEMENTATION_SUMMARY.md         # Implementation details
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request** to the `main` branch

### Contribution Ideas
- 🔧 Add more engines to the database
- ✈️ Add missing aircraft models
- 📊 Create new filtering endpoints
- 🌍 Add internationalization support
- 📸 Add engine/aircraft images
- 📈 Create comparison tools

---

## 📊 API Statistics

- **Total Aircraft**: 350+ models
- **Total Engines**: 157 engines
- **Engine Categories**: 5 (Turbofan, Turboprop, Turboshaft, Turbojet, Piston)
- **Manufacturers**: 50+ aircraft manufacturers, 30+ engine manufacturers
- **Data Points per Engine**: 12+ specifications
- **Response Format**: JSON with automatic JOIN
- **Uptime**: 99.9% (Vercel infrastructure)

---

## 📜 License

This project is licensed under the **GPL-3.0 License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Carlos Hortúa Calderón (@CAHOCA)**

- 🌐 Website: [cahoca.github.io](https://cahoca.github.io/)
- 💼 LinkedIn: [linkedin.com/in/cahoca](https://linkedin.com/in/cahoca)
- 🐙 GitHub: [@CAHOCA](https://github.com/CAHOCA)

---

## 🙏 Acknowledgments

- Engine data sourced from manufacturer specifications
- Aircraft data compiled from IATA/ICAO databases
- Built with Express.js and Node.js
- Deployed on Vercel

---

<p align="center">
  <strong>⭐ If you find this project useful, please consider giving it a star on GitHub! ⭐</strong>
</p>

<p align="center">
  Made with 💙 by <a href="https://github.com/CAHOCA">@CAHOCA</a>
</p>  
