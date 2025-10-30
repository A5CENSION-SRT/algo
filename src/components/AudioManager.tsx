'use client';

import { useRef, useEffect, useState } from 'react';

interface AudioManagerProps {
  isPlaying: boolean;
  onDeath: boolean;
  onReset: () => void;
}

export function AudioManager({ isPlaying, onDeath, onReset }: AudioManagerProps) {
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const deathSoundRef = useRef<HTMLAudioElement | null>(null);
  const [hasPlayedDeath, setHasPlayedDeath] = useState(false);

  useEffect(() => {
    // Initialize audio elements
    if (typeof window !== 'undefined') {
      bgMusicRef.current = new Audio('/Sounds/Animation Musicals Network.mp3');
      deathSoundRef.current = new Audio('/Sounds/ReZero Return By Death Sound Effect - Indigo Montoya.mp3');
      
      if (bgMusicRef.current) {
        bgMusicRef.current.loop = true;
        bgMusicRef.current.volume = 0.3;
      }
      
      if (deathSoundRef.current) {
        deathSoundRef.current.volume = 0.7;
      }
    }

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
      if (deathSoundRef.current) {
        deathSoundRef.current.pause();
        deathSoundRef.current = null;
      }
    };
  }, []);

  // Handle background music
  useEffect(() => {
    if (bgMusicRef.current) {
      if (isPlaying && !onDeath) {
        bgMusicRef.current.play().catch(err => {
          console.log('Audio play failed:', err);
        });
      } else {
        bgMusicRef.current.pause();
      }
    }
  }, [isPlaying, onDeath]);

  // Handle death sound
  useEffect(() => {
    if (onDeath && !hasPlayedDeath && deathSoundRef.current) {
      // Pause background music
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
      }
      
      // Play death sound
      deathSoundRef.current.currentTime = 0;
      deathSoundRef.current.play().catch(err => {
        console.log('Death sound play failed:', err);
      });
      
      setHasPlayedDeath(true);

      // After death sound finishes, reset
      deathSoundRef.current.onended = () => {
        setHasPlayedDeath(false);
        onReset();
      };
    }
  }, [onDeath, hasPlayedDeath, onReset]);

  return null; // This component doesn't render anything
}
