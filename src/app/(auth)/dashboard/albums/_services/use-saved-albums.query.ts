import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
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

interface IFetchSavedAlbums {
  items: {
    added_at: string;
    album: SpotifyAlbum;
  }[];
  total: number;
  limit: number;
  offset: number;
}

interface IBodySavedAlbums {
  limit: number;
  offset: number;
}

interface IProps {
  config?: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  };
  params: IBodySavedAlbums;
}

export const fetchSavedAlbumsQueryKeys = {
  all: ["albums", "saved"] as const,
  list: ({ limit, offset }: IBodySavedAlbums) =>
    [...fetchSavedAlbumsQueryKeys.all, { limit, offset }] as const,
};

export const fetchSavedAlbums = async ({
  queryKey,
}: QueryFunctionContext<ReturnType<typeof fetchSavedAlbumsQueryKeys.list>>) => {
  try {
    const response = await axiosSpotifyApi.get<IFetchSavedAlbums>(
      "/me/albums",
      {
        params: {
          limit: queryKey[2].limit,
          offset: queryKey[2].offset,
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(handleAxiosError(error));
  }
};

export function useSavedAlbumsQuery(props: IProps) {
  return useQuery({
    queryKey: fetchSavedAlbumsQueryKeys.list(props.params),
    queryFn: fetchSavedAlbums,
    staleTime: props.config?.staleTime,
    gcTime: props.config?.gcTime,
    enabled: props.config?.enabled,
  });
}
