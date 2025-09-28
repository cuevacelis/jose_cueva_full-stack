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


interface IBodyArtist {
  artistId: string;
}

interface IProps {
  config?: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  };
  params: IBodyArtist;
}

export const fetchArtistQueryKeys = {
  all: ["artists"] as const,
  detail: (artistId: string) =>
    [...fetchArtistQueryKeys.all, artistId] as const,
};

export const fetchArtist = async ({
  queryKey,
}: QueryFunctionContext<ReturnType<typeof fetchArtistQueryKeys.detail>>) => {
  try {
    const response = await axiosSpotifyApi.get<SpotifyArtist>(`/artists/${queryKey[1]}`);
    return response.data;
  } catch (error) {
    return Promise.reject(handleAxiosError(error));
  }
};

export function useArtistQuery(props: IProps) {
  return useQuery({
    queryKey: fetchArtistQueryKeys.detail(props.params.artistId),
    queryFn: fetchArtist,
    staleTime: props.config?.staleTime ?? 10 * 60 * 1000,
    gcTime: props.config?.gcTime,
    enabled: props.config?.enabled && !!props.params.artistId,
  });
}