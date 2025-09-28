import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { handleAxiosError } from "@/lib/api/utils";
import { axiosSpotifyApi } from "@/lib/api/api-spotify";

interface IBodyCheckSavedAlbums {
  albumIds: string[];
}

interface IProps {
  config?: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  };
  params: IBodyCheckSavedAlbums;
}

export const fetchCheckSavedAlbumsQueryKeys = {
  all: ["albums", "saved", "check"] as const,
  list: (albumIds: string[]) =>
    [...fetchCheckSavedAlbumsQueryKeys.all, albumIds] as const,
};

export const fetchCheckSavedAlbums = async ({
  queryKey,
}: QueryFunctionContext<
  ReturnType<typeof fetchCheckSavedAlbumsQueryKeys.list>
>) => {
  try {
    const response = await axiosSpotifyApi.get<boolean[]>(
      "/me/albums/contains",
      {
        params: {
          ids: queryKey[3].join(","),
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(handleAxiosError(error));
  }
};

export function useCheckSavedAlbumsQuery(props: IProps) {
  return useQuery({
    queryKey: fetchCheckSavedAlbumsQueryKeys.list(props.params.albumIds),
    queryFn: fetchCheckSavedAlbums,
    staleTime: props.config?.staleTime ?? 1 * 60 * 1000,
    gcTime: props.config?.gcTime,
    enabled: props.config?.enabled && props.params.albumIds.length > 0,
  });
}
