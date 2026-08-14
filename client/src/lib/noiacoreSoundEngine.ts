/**
 * NOIACORE LAB — SISTEMA MÁXIMO DE NOTIFICACIONES Y SONIDOS
 * Advanced Task Completion Notification Engine & Web Audio API Procedural Synthesizer
 */
export enum NotificationSeverity {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
  ULTRA = 'ultra'
}

export enum SoundPreset {
  NEUTRAL = 'neutral',
  SUCCESS = 'success',
  COMPLETION = 'completion',
  ACHIEVEMENT = 'achievement',
  WARNING = 'warning',
  CRITICAL = 'critical',
  CYBER = 'cyber',
  NOIA = 'noia',
  SILENT = 'silent'
}

export class NoiacoreSoundEngine {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private volume: number = 0.5;
  private isInitialized: boolean = false;

  constructor() {
    // Lazy init on user interaction
  }

  public async init(): Promise<void> {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.audioContext = new AudioCtx();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = this.volume;
      this.masterGain.connect(this.audioContext.destination);
      this.isInitialized = true;
    } catch (e) {
      console.warn('AudioContext init failed:', e);
    }
  }

  public async play(preset: SoundPreset = SoundPreset.NOIA): Promise<void> {
    try {
      if (!this.audioContext) {
        await this.init();
      }
      if (!this.audioContext || !this.masterGain) return;
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      const now = this.audioContext.currentTime;
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = preset === SoundPreset.CYBER ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.6);
    } catch (e) {
      // Ignore audio autoplay restrictions
    }
  }
}

export const soundEngine = new NoiacoreSoundEngine();
