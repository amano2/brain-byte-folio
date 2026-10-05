// Web Audio API synthesized retro sound effects
// Authentic sound synthesis with zero external audio assets required

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Synthesizes the iconic Windows 98 startup chord progression
 * using layered FM-style oscillators and soft reverb envelope
 */
export function playStartupSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Windows 98 startup chord frequencies (F# major / Eb minor airy chord progression)
  // Chord notes: Eb3, Bb3, Eb4, G4, Bb4, Db5, Eb5, F5
  const notes = [
    { freq: 155.56, time: 0.0, dur: 2.4, gain: 0.15 }, // Eb3
    { freq: 233.08, time: 0.1, dur: 2.3, gain: 0.18 }, // Bb3
    { freq: 311.13, time: 0.2, dur: 2.6, gain: 0.20 }, // Eb4
    { freq: 392.00, time: 0.35, dur: 2.8, gain: 0.22 }, // G4
    { freq: 466.16, time: 0.5, dur: 3.0, gain: 0.22 }, // Bb4
    { freq: 554.37, time: 0.7, dur: 3.2, gain: 0.18 }, // Db5
    { freq: 622.25, time: 0.9, dur: 3.4, gain: 0.22 }, // Eb5
    { freq: 698.46, time: 1.1, dur: 3.6, gain: 0.20 }, // F5
    { freq: 932.33, time: 1.3, dur: 3.8, gain: 0.14 }, // Bb5
  ];

  notes.forEach(({ freq, time, dur, gain: maxGain }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + time);

    gain.gain.setValueAtTime(0.0001, now + time);
    gain.gain.exponentialRampToValueAtTime(maxGain, now + time + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + time);
    osc.stop(now + time + dur + 0.1);
  });
}

/**
 * Standard Windows 98 navigation click
 */
export function playClickSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
}

/**
 * Classic Asterisk / Information chime
 */
export function playAsteriskSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + idx * 0.06);

    gain.gain.setValueAtTime(0.001, now + idx * 0.06);
    gain.gain.exponentialRampToValueAtTime(0.12, now + idx * 0.06 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.06);
    osc.stop(now + idx * 0.06 + 0.45);
  });
}

/**
 * Windows 98 Error / Critical Stop "Chord" sound
 */
export function playChordSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const notes = [220, 277.18, 329.63, 440]; // A major chord
  notes.forEach((freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.65);
  });
}
