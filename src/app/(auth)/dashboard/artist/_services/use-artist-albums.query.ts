import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { handleAxiosError } from "@/lib/api/utils";
import { axiosSpotifyApi } from "@/lib/api/api-spotify";

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: Array<{ url: string; height: number; width: number }>;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  artists: Array<{ id: string; name: string }>;
  external_urls: { spotify: string };
}

interface IFetchArtistAlbums {
  items: SpotifyAlbum[];
  total: number;
  limit: number;
  offset: number;
}

interface IBodyArtistAlbums {
  artistId: string;
  limit: number;
  offset: number;
}

interface IProps {
  config?: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  };
  params: IBodyArtistAlbums;
}

export const fetchArtistAlbumsQueryKeys = {
  all: ["artists", "albums"] as const,
  list: ({ artistId, limit, offset }: IBodyArtistAlbums) =>
    [...fetchArtistAlbumsQueryKeys.all, artistId, { limit, offset }] as const,
};

export const fetchArtistAlbums = async ({
  queryKey,
}: QueryFunctionContext<ReturnType<typeof fetchArtistAlbumsQueryKeys.list>>) => {
  try {
    const response = await axiosSpotifyApi.get<IFetchArtistAlbums>(
      `/artists/${queryKey[2]}/albums`,
      {
        params: {
          include_groups: 'album,single',
          market: 'US',
          limit: queryKey[3].limit,
          offset: queryKey[3].offset,
        }
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(handleAxiosError(error));
  }
};

export function useArtistAlbumsQuery(props: IProps) {
  return useQuery({
    queryKey: fetchArtistAlbumsQueryKeys.list(props.params),
    queryFn: fetchArtistAlbums,
    staleTime: props.config?.staleTime ?? 10 * 60 * 1000,
    gcTime: props.config?.gcTime,
    enabled: props.config?.enabled && !!props.params.artistId,
  });
}