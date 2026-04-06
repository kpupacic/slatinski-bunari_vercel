export interface WaterSource {
  id: number;
  name: string;
  localityType: string;
  depth: number | null;
  clarity: string | null;
  shortDescription: string;
  shortDescriptionEn: string | null;
  latitude: number;
  longitude: number;
  photos: string[];
  youtubeVideoUrl: string | null;
}
