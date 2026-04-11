export interface WaterSource {
  id: number;
  name: string;
  localityType: string;
  shortDescription: string;
  shortDescriptionEn: string | null;
  latitude: number;
  longitude: number;
  photos: string[];
  youtubeVideoUrl: string | null;
}
