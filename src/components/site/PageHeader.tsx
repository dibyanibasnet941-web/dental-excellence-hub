import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  children,
  backgroundImage,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
  backgroundImage?: string;
}) {
  const hasBackgroundImage = Boolean(backgroundImage);

  return (
    <section
      className={`relative overflow-hidden border-b ${
        hasBackgroundImage
          ? "min-h-[400px] border-slate-200 bg-slate-900 md:min-h-[450px]"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ====================================================== */}
      {backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Soft overlay */}
          <div className="absolute inset-0 bg-slate-950/45" />

          {/* Gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/35 to-transparent" />

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/30 to-transparent" />
        </>
      )}

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <div
        className={
          hasBackgroundImage
            ? "container-page relative flex min-h-[400px] items-center py-12 md:min-h-[450px] md:py-16"
            : "container-page relative py-8 md:py-10"
        }
      >
        <div className="w-full max-w-4xl">

          {/* =================================================
              BREADCRUMBS
          ================================================== */}
          {crumbs && (
            <div
              className={
                hasBackgroundImage
                  ? "[&_a]:text-white/75 [&_a:hover]:text-white [&_span]:text-white/70"
                  : "[&_a]:text-slate-500 [&_a:hover]:text-slate-900 [&_span]:text-slate-500"
              }
            >
              <Breadcrumbs items={crumbs} />
            </div>
          )}

          {/* =================================================
              EYEBROW
          ================================================== */}
          {eyebrow && (
            <div className="mt-7 flex items-center gap-3">
              <span
                className={
                  hasBackgroundImage
                    ? "h-px w-8 bg-white/50"
                    : "h-px w-8 bg-[#0B2A55]/40"
                }
              />

              <p
                className={
                  hasBackgroundImage
                    ? "text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80"
                    : "text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0B2A55]/70"
                }
              >
                {eyebrow}
              </p>
            </div>
          )}

          {/* =================================================
              TITLE
          ================================================== */}
          <h1
            className={
              hasBackgroundImage
                ? "mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
                : "mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-[#0B2A55] sm:text-4xl md:text-5xl"
            }
          >
            {title}
          </h1>

          {/* =================================================
              DESCRIPTION
          ================================================== */}
          {description && (
            <p
              className={
                hasBackgroundImage
                  ? "mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base md:text-lg"
                  : "mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base md:text-lg"
              }
            >
              {description}
            </p>
          )}

          {/* =================================================
              OPTIONAL CHILDREN
          ================================================== */}
          {children && (
            <div className="mt-6">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}