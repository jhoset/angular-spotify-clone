export interface SpotifyImage {
  height: number | null;
  url: string;
  width: number | null;
}

export interface SpotifyUserProfile {
  display_name: string | null;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: SpotifyImage[]; // Reusing the SpotifyImage interface
  type: string;
  uri: string;
}
