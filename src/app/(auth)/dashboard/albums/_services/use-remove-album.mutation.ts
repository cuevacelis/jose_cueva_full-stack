import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { handleAxiosError } from "@/lib/api/utils";
import { axiosSpotifyApi } from "@/lib/api/api-spotify";
import { fetchSavedAlbumsQueryKeys } from "./use-saved-albums.query";

interface IBodyRemoveAlbum {
  albumId: string;
}

interface IProps {
  config?: {
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
  };
}

export const removeAlbum = async (data: IBodyRemoveAlbum): Promise<void> => {
  try {
    await axiosSpotifyApi.delete("/me/albums", {
      data: { ids: [data.albumId] },
    });
  } catch (error) {
    return Promise.reject(handleAxiosError(error));
  }
};

export function useRemoveAlbumMutation(props?: IProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fetchSavedAlbumsQueryKeys.all });
      props?.config?.onSuccess?.();
    },
    onError: (error) => {
      props?.config?.onError?.(error);
    },
  });
}