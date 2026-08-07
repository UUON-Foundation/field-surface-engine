# Field Surface Engine (FSE)

**UUON Foundation Inc. — clouud Layer 11 — Skin / Perimeter Layer**

> Taylor series complex field driving Euclidean morphisms on a perspectively receding infinity tunnel. Per-wall bevel, shadow, pivot blind, and checkerboard physics. UUONBridge port layer for audio, MIDI, WebSocket, and Roblox connectivity.

[![License: USAL-1.0](https://img.shields.io/badge/license-USAL--1.0-red)](./LICENSE)
[![Layer: 11](https://img.shields.io/badge/clouud-Layer%2011%20%E2%80%94%20Skin-white)](https://uuon.world)
[![npm: @uuon-foundation/field-surface-engine](https://img.shields.io/badge/npm-%40uuon--foundation%2Ffield--surface--engine-blue)](https://npmjs.com/package/@uuon-foundation/field-surface-engine)

![image]([http://url/to/img.png](https://github.com/UUON-Foundation/field-surface-engine/blob/cd735f38bf3719c5637593577c4e3e862f457b60/field-surface-eninge-demo.png))
---

## What it is

The FSE renders the boundary surface of the clouud mathematical organism. It is the first system in the stack where interior computation becomes perceptible. A viewer looks into an infinitely receding tunnel whose walls are continuously deformed by a Taylor series field evaluated at each surface point, morphed through one of five Euclidean transformation classes.

Each of the four walls — TOP, RIGHT, BOTTOM, LEFT — is independently controllable. Shift, bevel, shadow, pivot blind angle and speed, blind width, and checkerboard phase shift are all per-wall parameters. The engine runs in any browser with no dependencies.

**Boot state:** MORPH 1.0, FLOW SPEED 20.0, MESH WEIGHT 1.0, ORDER 3, ROTATION mode, animation 4.8×. Open the file and it runs.

---

## UU Coordinates

| | |
|---|---|
| **uuho** | Phillip Aguilar Ruiz III / UUON Foundation Inc. |
| **uuhat** | field-surface-engine@1.0.0 — F=(P,E,M,R,C) |
| **uuhere** | Layer 11 · github.com/UUON-Foundation/field-surface-engine |
| **uuhen** | v1.0.0: 2026-08-07 UTC |
| **uuhy** | Skin / Perimeter Layer — boundary surface rendering interior mathematical state |

---

## Quick Start

**Browser — just open it:**
```bash
open index.html
```

**Serve locally:**
```bash
npx serve . -l 8080
# open http://localhost:8080
```

**Node.js — seed API:**
```js
const { FSESeed } = require('@uuon-foundation/field-surface-engine/api/seed');

// Encode a state to a portable seed string
const seed = FSESeed.encode({ morph: 0.8, modeIdx: 3 });

// Decode back to full state
const state = FSESeed.decode(seed);

// Describe a seed in human-readable form
console.log(FSESeed.describe(seed));
// { mode: 'INVERSION', order: 3, morph: 0.8, ... }
```

---

## UUONBridge — Port Map

Connect external systems via `window.UUONBridge`:

```js
// Set any engine parameter by path
UUONBridge.set('core.morph', 0.8)
UUONBridge.set('wall.1.shift', 0.5)   // wall 0=TOP 1=RIGHT 2=BOTTOM 3=LEFT
UUONBridge.set('anim.speed', 2.0)
UUONBridge.set('theme', 'bw')

// Audio feed — Float32Array [morph, speed, meshW]
UUONBridge.audioIn([0.6, 0.4, 0.9])

// MIDI CC
UUONBridge.midiIn(1, 64)    // mod wheel → morph
UUONBridge.midiIn(7, 100)   // volume → mesh weight

// WebSocket (uuon-clouud backend)
UUONBridge.connectWS('wss://clouud-api-production.up.railway.app/ws/engines/field-surface')

// Roblox / game engine frame pump
UUONBridge.startRobloxPump(fn, 12, 0.25)   // 12fps, 25% scale
UUONBridge.getFramePNG(0.5)                  // base64 PNG snapshot

// postMessage (cross-origin / iframe)
window.postMessage({ namespace:'UUON', type:'set', path:'core.morph', value:0.9 }, '*')

// Full state snapshot
const state = UUONBridge.getState()

// Load a preset by name
UUONBridge.loadPreset('INVERSION VORTEX')
```

### MIDI CC Map

| CC | Parameter |
|----|-----------|
| 1  | core.morph (mod wheel) |
| 7  | core.meshW (volume) |
| 74 | core.spd (filter cutoff) |
| 20–23 | wall[0–3].shift |
| 24–27 | wall[0–3].bevel |

---

## Five Euclidean Modes

| Mode | Transform | Effect |
|------|-----------|--------|
| ROTATION | R(θ) — angle scales with distance from center | Grid rotates, outer rings faster |
| REFLECTION | Fold across rotating axis | Surface mirrors through a moving plane |
| SHEAR | [[1,s],[s₂,1]] | Parallelogram deformation |
| INVERSION | z → 1/z (Möbius / Smith Chart) | Inside↔outside, conformally mapped |
| SPIRAL | Rotation + scaling similarity | Corkscrews toward vanishing point |

---

## Named Presets

| Preset | Key Parameters |
|--------|---------------|
| OPEN CHAOS | ORD:3, MORPH:1.0, SPD:20.0, MESHW:1.0, ROTATION — boot state |
| DEFAULT | ORD:3, MORPH:0.4, SPD:4.0, MESHW:0.85, ROTATION |
| BEVEL STAGGER | ORD:5, SHEAR, per-wall shift+bevel |
| BLIND STORM | ORD:4, all walls 40–60° blind angle |
| CHECKER PULSE | ORD:3, REFLECTION, checker 6–10 per wall |
| INVERSION VORTEX | ORD:7, INVERSION, per-wall shift ±0.5, bevel 2.0 |
| SPIRAL WEAVE | ORD:6, SPIRAL, mixed blind+checker |
| SHEAR GRID | ORD:2, SHEAR, checker:12 all walls |
| DEEP FOLD | ORD:9, bevel 3.0, blind 60–70°, shift ±0.7 |
| REFLECTION GHOST | ORD:4, REFLECTION, meshW:0.3 |
| CORRIDOR SHIFT | ORD:7, RIGHT wall full configuration — documented 2026-04-18 |
| FULL CHAOS | ORD:8, SPIRAL, all walls max parameters |

---

## Biological Position

```
clouud Biological Architecture
─────────────────────────────────────────
Layer 01  Spine / CNS         uuon-clouud routing
Layer 03  Skeleton            Wave Field 3D Engine
Layer 04  Proprioception      Propagation Engine
Layer 05  Visual Cortex       Recursive Fractal Engine
Layer 06  Decision Layer      Boundary State Engine
Layer 07  Deep Geometry       Kleinian-Hybrid IFS Engine
Layer 08  Vascular            Pythagorean Graph Engine
Layer 09  Prefrontal Cortex   pscience Perception Engine
Layer 10  Reproductive        Phyllotaxis Seed Engine
Layer 11  SKIN / PERIMETER    Field Surface Engine  ← HERE
─────────────────────────────────────────
```

Inputs from: BSE entropy → morph · Propagation activation → wall shift · PSE seeds → state
Outputs to: WebSocket frame stream · gate-uuay API · Roblox pump · AWS Marketplace

---

## Repository Structure

```
field-surface-engine/
├── index.html           Engine v9 — runs standalone in any browser
├── api/
│   ├── seed.js          Node.js seed encoder/decoder
│   └── presets.json     Preset registry
├── ACADEMIC-RECORD.md   Origin record + UU coordinates + named preset IP
├── NOTICE               Attribution notice
├── LICENSE              USAL-1.0
├── README.md
└── package.json         @uuon-foundation/field-surface-engine
```

---

## License

USAL-1.0 — Not for commercial use. Reverse engineering prohibited. See [LICENSE](./LICENSE).

**© 2026 UUON Foundation Inc. — Phillip Aguilar Ruiz III**
*phi1@uuonfoundation.com · Kassel, Germany*
