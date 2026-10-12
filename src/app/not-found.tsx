import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-[1600px] flex-col justify-center px-5 pt-24 md:px-10">
      <p className="eyebrow text-sindoor">404</p>
      <h1 className="mt-4 font-serif text-[clamp(3rem,9vw,8rem)] leading-[0.9]">
        Lost, <em>behna?</em>
      </h1>
      <p className="mt-6 max-w-md text-ink/70">This page doesn&rsquo;t exist — but eight prints do.</p>
      <div className="mt-10">
        <ButtonLink href="/shop">Shop the Collection</ButtonLink>
      </div>
    </div>
  );
}
