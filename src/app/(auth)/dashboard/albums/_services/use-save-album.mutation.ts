import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleAxiosError } from "@/lib/api/utils";
import { axiosSpotifyApi } from "@/lib/api/api-spotify";

interface IBodySaveAlbum {
  albumId: string;
}

interface IProps {
  config?: {
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
  };
}

export const saveAlbum = async (data: IBodySaveAlbum): Promise<void> => {
  try {
    await axiosSpotifyApi.put("/me/albums", null, {
      params: {
        ids: data.albumId,
      },
    });
  } catch (error) {
    return Promise.reject(handleAxiosError(error));
  }
};

export function useSaveAlbumMutation(props?: IProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveAlbum,
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
