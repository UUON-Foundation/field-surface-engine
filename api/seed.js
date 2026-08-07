/**
 * UUON Foundation Inc. — Field Surface Engine
 * api/seed.js — Node.js module for clouud integration
 *
 * Generates, encodes, and decodes FSE state seeds.
 * Seeds are compact JSON strings that fully reproduce any engine state.
 *
 * Usage:
 *   const { FSESeed } = require('@uuon-foundation/field-surface-engine/api/seed');
 *   const seed = FSESeed.encode(state);
 *   const state = FSESeed.decode(seed);
 *
 * © 2026 UUON Foundation Inc. — USAL-1.0
 */

'use strict';

const DEFAULT_STATE = {
  tayN: 3, gridN: 14, rings: 32,
  morph: 1.0, spd: 20.0, meshW: 1.0,
  modeIdx: 0, spdMult: 4.8,
  walls: [
    { shift:0, bevel:0, shadow:0, blindAng:0, blindSpd:0, blindW:8, checker:0 },
    { shift:0, bevel:0, shadow:0, blindAng:0, blindSpd:0, blindW:8, checker:0 },
    { shift:0, bevel:0, shadow:0, blindAng:0, blindSpd:0, blindW:8, checker:0 },
    { shift:0, bevel:0, shadow:0, blindAng:0, blindSpd:0, blindW:8, checker:0 }
  ]
};

const MODES = ['ROTATION','REFLECTION','SHEAR','INVERSION','SPIRAL'];

const FSESeed = {
  /**
   * Encode a full state object into a compact seed string.
   * Format: base64-encoded JSON with delta compression against defaults.
   */
  encode(state) {
    const delta = {};
    const s = { ...DEFAULT_STATE, ...state };
    if (s.tayN   !== DEFAULT_STATE.tayN)   delta.o = s.tayN;
    if (s.gridN  !== DEFAULT_STATE.gridN)  delta.g = s.gridN;
    if (s.rings  !== DEFAULT_STATE.rings)  delta.r = s.rings;
    if (s.morph  !== DEFAULT_STATE.morph)  delta.m = +s.morph.toFixed(2);
    if (s.spd    !== DEFAULT_STATE.spd)    delta.s = +s.spd.toFixed(1);
    if (s.meshW  !== DEFAULT_STATE.meshW)  delta.w = +s.meshW.toFixed(2);
    if (s.modeIdx!== DEFAULT_STATE.modeIdx)delta.i = s.modeIdx;
    if (s.spdMult!== DEFAULT_STATE.spdMult)delta.x = +s.spdMult.toFixed(1);
    const walls = s.walls || DEFAULT_STATE.walls;
    const wDelta = walls.map((wl, wi) => {
      const dw = DEFAULT_STATE.walls[wi];
      const d = {};
      if (wl.shift   !== dw.shift)   d.sh = +wl.shift.toFixed(2);
      if (wl.bevel   !== dw.bevel)   d.bv = +wl.bevel.toFixed(2);
      if (wl.shadow  !== dw.shadow)  d.sd = +wl.shadow.toFixed(2);
      if (wl.blindAng!== dw.blindAng)d.ba = +wl.blindAng.toFixed(1);
      if (wl.blindSpd!== dw.blindSpd)d.bs = wl.blindSpd;
      if (wl.blindW  !== dw.blindW)  d.bw = wl.blindW;
      if (wl.checker !== dw.checker) d.ck = wl.checker;
      return d;
    });
    if (wDelta.some(d => Object.keys(d).length > 0)) delta.wl = wDelta;
    const json = JSON.stringify(delta);
    return Buffer.from(json).toString('base64');
  },

  /**
   * Decode a seed string back to a full state object.
   */
  decode(seed) {
    try {
      const json = Buffer.from(seed, 'base64').toString('utf8');
      const delta = JSON.parse(json);
      const state = JSON.parse(JSON.stringify(DEFAULT_STATE)); // deep clone
      if (delta.o !== undefined) state.tayN    = delta.o;
      if (delta.g !== undefined) state.gridN   = delta.g;
      if (delta.r !== undefined) state.rings   = delta.r;
      if (delta.m !== undefined) state.morph   = delta.m;
      if (delta.s !== undefined) state.spd     = delta.s;
      if (delta.w !== undefined) state.meshW   = delta.w;
      if (delta.i !== undefined) state.modeIdx = delta.i;
      if (delta.x !== undefined) state.spdMult = delta.x;
      if (delta.wl) {
        delta.wl.forEach((dw, wi) => {
          if (dw.sh !== undefined) state.walls[wi].shift    = dw.sh;
          if (dw.bv !== undefined) state.walls[wi].bevel    = dw.bv;
          if (dw.sd !== undefined) state.walls[wi].shadow   = dw.sd;
          if (dw.ba !== undefined) state.walls[wi].blindAng = dw.ba;
          if (dw.bs !== undefined) state.walls[wi].blindSpd = dw.bs;
          if (dw.bw !== undefined) state.walls[wi].blindW   = dw.bw;
          if (dw.ck !== undefined) state.walls[wi].checker  = dw.ck;
        });
      }
      return state;
    } catch (e) {
      throw new Error(`[FSESeed] Invalid seed: ${e.message}`);
    }
  },

  /**
   * Generate the seed for a named preset.
   */
  fromPreset(name) {
    const presets = require('./presets.json');
    const p = presets.find(p => p.name === name);
    if (!p) throw new Error(`[FSESeed] Unknown preset: ${name}`);
    return this.encode(p);
  },

  /**
   * Validate a seed without decoding.
   */
  validate(seed) {
    try { this.decode(seed); return true; }
    catch { return false; }
  },

  /**
   * Human-readable summary of a seed.
   */
  describe(seed) {
    const s = this.decode(seed);
    return {
      mode: MODES[s.modeIdx],
      order: s.tayN,
      morph: s.morph,
      speed: s.spd,
      meshWeight: s.meshW,
      walls: s.walls.map((w, i) => ({
        wall: ['TOP','RIGHT','BOTTOM','LEFT'][i],
        active: Object.values(w).some(v => v !== 0 && v !== 8)
      }))
    };
  }
};

// ── Preset seeds (OPEN CHAOS boot state) ──
FSESeed.OPEN_CHAOS = FSESeed.encode({
  tayN:3, gridN:14, rings:32, morph:1.0, spd:20.0, meshW:1.0, modeIdx:0, spdMult:4.8
});

FSESeed.DEFAULT = FSESeed.encode(DEFAULT_STATE);

module.exports = { FSESeed, DEFAULT_STATE, MODES };
