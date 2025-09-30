"use server";

import { deleteSpotifyTokens } from "@/lib/dal";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await deleteSpotifyTokens();
  redirect("/");
}
