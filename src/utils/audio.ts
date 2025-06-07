// Create an audio context lazily to comply with browser autoplay policies
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

// Generate a two-tone chime sound using the Web Audio API
export const playEndChime = () => {
  const context = getAudioContext();
  const duration = 1.2; // Total duration in seconds
  
  // Create oscillators for the two tones
  const oscillator1 = context.createOscillator();
  const oscillator2 = context.createOscillator();
  
  // First tone: A4 (440Hz)
  oscillator1.type = 'sine';
  oscillator1.frequency.setValueAtTime(440, context.currentTime);
  
  // Second tone: E5 (659.25Hz - perfect fifth above A4)
  oscillator2.type = 'sine';
  oscillator2.frequency.setValueAtTime(659.25, context.currentTime + 0.1);
  
  // Create gain nodes for volume control
  const gainNode1 = context.createGain();
  const gainNode2 = context.createGain();
  
  // First tone envelope
  gainNode1.gain.setValueAtTime(0, context.currentTime);
  gainNode1.gain.linearRampToValueAtTime(0.2, context.currentTime + 0.05);
  gainNode1.gain.setValueAtTime(0.2, context.currentTime + 0.6);
  gainNode1.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
  
  // Second tone envelope (slightly delayed start, longer sustain)
  gainNode2.gain.setValueAtTime(0, context.currentTime);
  gainNode2.gain.linearRampToValueAtTime(0.15, context.currentTime + 0.15);
  gainNode2.gain.setValueAtTime(0.15, context.currentTime + 0.7);
  gainNode2.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
  
  // Connect nodes
  oscillator1.connect(gainNode1);
  oscillator2.connect(gainNode2);
  gainNode1.connect(context.destination);
  gainNode2.connect(context.destination);
  
  // Play the sounds
  oscillator1.start(context.currentTime);
  oscillator2.start(context.currentTime + 0.1);
  oscillator1.stop(context.currentTime + duration);
  oscillator2.stop(context.currentTime + duration);
}; 