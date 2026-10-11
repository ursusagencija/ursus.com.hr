import { Link } from "@/i18n/routing";

type NotFoundViewProps = {
  code?: string;
  title: string;
  description: string;
  backHome: string;
  homeHref?: string;
};

export default function NotFoundView({
  code = "404",
  title,
  description,
  backHome,
  homeHref = "/",
}: NotFoundViewProps) {
  return (
    <div className="relative min-h-[70vh] flex items-center bg-gradient-to-b from-dark-6 to-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,64,97,0.08),transparent_55%)]" />
      <div className="container relative z-1 py-28 lg:py-36">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-serif text-primary-1 text-6xl lg:text-7xl font-semibold leading-none tracking-tight">
            {code}
          </p>
          <h1 className="mt-6 font-serif text-dark-1 text-3xl lg:text-4xl font-semibold leading-[1.2]">
            {title}
          </h1>
          <p className="mt-4 regular-text-v1 !text-base lg:!text-md max-w-lg mx-auto">
            {description}
          </p>
          <div className="mt-10">
            <Link href={homeHref} className="btn_primary__v1">
              <i className="bi bi-chevron-left" />
              {backHome}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
