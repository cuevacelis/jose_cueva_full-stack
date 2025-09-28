import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { handleAxiosError } from "@/lib/api/utils";
import { axiosSpotifyApi } from "@/lib/api/api-spotify";

export interface SpotifyArtist {
  id: string;
  name: string;
  images: Array<{ url: string; height: number; width: number }>;
  followers: { total: number };
  popularity: number;
  external_urls: { spotify: string };
}

interface IFetchSearchArtists {
  artists: {
    items: SpotifyArtist[];
    total: number;
    limit: number;
    offset: number;
  };
}

interface IBodySearchArtists {
  query: string;
  limit: number;
  offset: number;
}

interface IProps {
  config?: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  };
  params: IBodySearchArtists;
}

export const fetchSearchArtistsQueryKeys = {
  all: ["artists", "search"] as const,
  list: ({ query, limit, offset }: IBodySearchArtists) =>
    [...fetchSearchArtistsQueryKeys.all, query, { limit, offset }] as const,
};

export const fetchSearchArtists = async ({
  queryKey,
}: QueryFunctionContext<ReturnType<typeof fetchSearchArtistsQueryKeys.list>>) => {
  try {
    const response = await axiosSpotifyApi.get<IFetchSearchArtists>("/search", {
      params: {
        q: queryKey[2],
        type: 'artist',
        limit: queryKey[3].limit,
        offset: queryKey[3].offset,
      }
    });
    return response.data;
  } catch (error) {
    return Promise.reject(handleAxiosError(error));
  }
};

export function useSearchArtistsQuery(props: IProps) {
  return useQuery({
    queryKey: fetchSearchArtistsQueryKeys.list(props.params),
    queryFn: fetchSearchArtists,
    staleTime: props.config?.staleTime ?? 5 * 60 * 1000,
    gcTime: props.config?.gcTime,
    enabled: props.config?.enabled && props.params.query.length > 0,
  });
}