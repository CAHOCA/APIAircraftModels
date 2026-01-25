# 🚀 Quick Start - Engine System

## What Changed?

The API now returns **complete engine information** for each aircraft automatically.

## 📥 Query Example

### Query Boeing 787-9:
```bash
curl https://api-aircraft-models.vercel.app/api/789
```

### Response (with engine included):
```json
[
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
      "Variants": [
        "GEnx-1B64",
        "GEnx-1B67",
        "GEnx-1B70",
        "GEnx-1B75"
      ]
    }
  }
]
```

## 🔧 For Developers

### Script to add engines to new aircraft:
```bash
cd src/api/db
node add-engine-ids.js
```

### Main files:
- `src/api/db/Engines.json` - Database with 157 engines
- `src/api/db/AircraftModels.json` - Aircraft with Engine_ID
- `src/api/modelAircraft.js` - Automatic JOIN logic

## 💡 JavaScript Usage

```javascript
// Get aircraft with engine
fetch('https://api-aircraft-models.vercel.app/api/789')
  .then(res => res.json())
  .then(data => {
    const aircraft = data[0];
    console.log(`Aircraft: ${aircraft.Model}`);
    console.log(`Engine: ${aircraft.Engine.Name}`);
    console.log(`Thrust: ${aircraft.Engine.Takeoff_Thrust_lbf} lbf`);
    console.log(`Variants: ${aircraft.Engine.Variants.join(', ')}`);
  });
```

## 📊 Filter Aircraft with Powerful Engines

```bash
curl -X POST https://api-aircraft-models.vercel.app/api/filter/ceiling \
  -H "Content-Type: application/json" \
  -d '{"operator": "gte", "value": 43000}'
```

This returns all aircraft with service ceiling ≥ 43,000 ft, **with complete engine information**.

## ✅ Backward Compatibility

Aircraft without `Engine_ID` are returned normally, without the `Engine` object.

---

**Questions?** Check `ENGINE_SYSTEM.md` for complete documentation.
