import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import VideoClient from '@/components/video/VideoClient';
import { getVideos } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Xem MKT hoạt động thực tế — Thư viện video',
  description: 'Đánh giá, hướng dẫn, phỏng vấn và case study — bấm để xem.',
};

export const revalidate = 300;

export default async function VideoPage() {
  const videos = await getVideos();

  return (
    <>
      <PageHero
        eyebrow="Thư viện video"
        title="Xem MKT hoạt động thực tế"
        subtitle="Đánh giá, hướng dẫn, phỏng vấn và case study — bấm để xem."
      />
      <VideoClient videos={videos} />
    </>
  );
}
