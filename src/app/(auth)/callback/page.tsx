"use client";

import { ProcessingState } from "./_components/processing-state";
import { SuccessState } from "./_components/success-state";
import { ErrorState } from "./_components/error-state";
import { useSpotifyCallback } from "./_hook/use-spotify-callback";

export default function SpotifyCallbackPage() {
  const { status, error } = useSpotifyCallback();

  if (status === "processing") {
    return <ProcessingState />;
  }

  if (status === "success") {
    return <SuccessState />;
  }

  return <ErrorState error={error} />;
}
