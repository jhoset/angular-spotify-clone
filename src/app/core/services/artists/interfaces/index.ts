export interface Artist {
  external_urls: {
    spotify: string;
  };
  followers: {
    href?: any;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

interface Image {
  height: number;
  url: string;
  width: number;
}

export interface ArtistsResponse {
  artists: Artist[];
}
