// Create an audio context lazily to comply with browser autoplay policies
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

// Generate an chime sound using the Web Audio API
export const playEndChime = () => {
  const context = getAudioContext();
  const duration = 0.6; // Shorter duration for a crisper sound
  
  // Create oscillators for a marimba-like sound
  const oscillators = [
    { freq: 1318.51, // E6
      start: 0,
      gain: 0.2 },
    { freq: 1567.98, // G6
      start: 0.08,
      gain: 0.2 },
    { freq: 2093.00, // C7
      start: 0.16,
      gain: 0.15 }
  ].map(tone => {
    const osc = context.createOscillator();
    const gain = context.createGain();
    
    // Use sine waves for a softer tone
    osc.type = 'sine';
    osc.frequency.setValueAtTime(tone.freq, context.currentTime);
    
    // Create a short attack and longer decay for a marimba-like sound
    gain.gain.setValueAtTime(0, context.currentTime + tone.start);
    gain.gain.linearRampToValueAtTime(tone.gain, context.currentTime + tone.start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + tone.start + duration);
    
    osc.connect(gain);
    gain.connect(context.destination);
    
    return { osc, gain, start: tone.start };
  });
  
  // Play the sounds in sequence
  oscillators.forEach(({ osc, start }) => {
    osc.start(context.currentTime + start);
    osc.stop(context.currentTime + start + duration);
  });
}; 