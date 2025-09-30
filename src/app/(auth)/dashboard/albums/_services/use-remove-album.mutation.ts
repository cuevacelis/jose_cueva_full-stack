import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleAxiosError } from "@/lib/api/utils";
import { axiosSpotifyApi } from "@/lib/api/api-spotify";

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
      params: {
        ids: data.albumId,
      },
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
      queryClient.invalidateQueries({
        queryKey: ["albums"],
      });
      props?.config?.onSuccess?.();
    },
    onError: (error) => {
      props?.config?.onError?.(error);
    },
  });
}
