import { ArrowRight } from "lucide-react";
import IconArrowLogin from "./_components/ui/icon-arrow-login";
import LoginButton from "./_components/login-button";

export default function Home() {
  return (
    <section className="w-full mt-[62px] md:mt-[148px] flex flex-col md:flex-row items-center justify-center gap-7 md:gap-[150px]">
      <IconArrowLogin className="size-[222px] md:size-[464px]" />

      <div>
        <h1 className="w-full md:w-[597px] flex flex-col gap-3 text-4xl sm:text-6xl font-bold">
          Disfruta de la <span className="text-lime-300">mejor música</span>
        </h1>
        <p className="w-80 text-base font-normal mt-9">
          Accede a tu cuenta para guardar tus albumes favoritos.
        </p>
        <LoginButton>
          <div className="justify-start text-base font-semibold">
            Log in con Spotify
          </div>
          <ArrowRight className="size-6" />
        </LoginButton>
      </div>
    </section>
  );
}
