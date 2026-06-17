'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import type { VideoReview } from '@/lib/types';
import Toast from './Toast';
import VideoModal from './VideoModal';

interface UIContextValue {
  showToast: (message: string) => void;
  openVideo: (video: VideoReview) => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI phải được dùng bên trong <UIProvider>');
  return ctx;
}

export default function UIProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<string | null>(null);
  const [video, setVideo] = useState<VideoReview | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    if (timer.current) clearTimeout(timer.current);
    setToast(message);
    timer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const openVideo = useCallback((v: VideoReview) => setVideo(v), []);
  const closeVideo = useCallback(() => setVideo(null), []);

  return (
    <UIContext.Provider value={{ showToast, openVideo }}>
      {children}
      <VideoModal video={video} onClose={closeVideo} />
      <Toast message={toast} />
    </UIContext.Provider>
  );
}
