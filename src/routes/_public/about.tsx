import { createFileRoute } from "@tanstack/react-router";
import {
  Stethoscope,
  Scan,
  MonitorSmartphone,
  Wrench,
  Package,
  HeartPulse,
  Smile,
  FlaskConical,
  Hospital,
  GraduationCap,
  Building2,
  BriefcaseMedical,
} from "lucide-react";

import heroImage from "@/assets/hero.png";
import missionImage from "@/assets/mission.png";
import directorImage from "@/assets/director.png";
import customerImage from "@/assets/customer.png";
import nepalMapImage from "@/assets/nepal-map.png";

export const Route = createFileRoute("/_public/about")({
  head: () => ({
    meta: [
      {
        title: "About Garg Dental Pvt. Ltd.",
      },
      {
        name: "description",
        content:
          "Learn about Garg Dental Pvt. Ltd., its mission, vision, services, products, customers and market coverage across Nepal.",
      },
      {
        property: "og:title",
        content: "About Garg Dental Pvt. Ltd.",
      },
      {
        property: "og:description",
        content:
          "Garg Dental Pvt. Ltd. — Total Solution Provider for dental equipment, instruments and consumables.",
      },
      {
        property: "og:type",
        content: "website",
      },
    ],
  }),

  component: AboutPage,
});

function AboutPage() {
  const businessSegments = [
    {
      name: "Clinical Equipment",
      icon: Stethoscope,
    },
    {
      name: "Radiology",
      icon: Scan,
    },
    {
      name: "Digital Dentistry",
      icon: MonitorSmartphone,
    },
    {
      name: "Instruments",
      icon: Wrench,
    },
    {
      name: "Dental Consumables",
      icon: Package,
    },
    {
      name: "Maxillofacial Surgery",
      icon: HeartPulse,
    },
    {
      name: "Orthodontics",
      icon: Smile,
    },
    {
      name: "Laboratory Tools",
      icon: FlaskConical,
    },
  ];

  const services = [
    "Product Consultation",
    "Equipment Supply",
    "Installation",
    "Product Demonstration",
    "Clinical Training",
    "Preventive Maintenance",
    "Repair & Technical Support",
    "Warranty Services",
    "After-Sales Service",
  ];

  const products = [
    "Dental Equipment",
    "Imaging Systems",
    "Sterilization Equipment",
    "Dental Lasers",
    "Endodontic Equipment",
    "Scaling & Prophylaxis",
    "Handpieces",
    "Air Systems",
    "Dental Instruments",
    "Dental Consumables",
  ];

  const industries = [
    {
      name: "Dental Clinics",
      icon: Stethoscope,
    },
    {
      name: "Hospitals",
      icon: Hospital,
    },
    {
      name: "Dental Colleges",
      icon: GraduationCap,
    },
    {
      name: "Medical Institutions",
      icon: HeartPulse,
    },
    {
      name: "Government Health Facilities",
      icon: Building2,
    },
    {
      name: "Private Healthcare Organizations",
      icon: BriefcaseMedical,
    },
  ];

  const whyChooseUs = [
    "Genuine and Certified Products",
    "Competitive Pricing",
    "Professional Technical Support",
    "Fast Delivery Across Nepal",
    "Experienced Team",
    "Reliable After-Sales Service",
    "Customer-Focused Approach",
    "Long-Term Business Partnership",
  ];

  return (
    <main className="overflow-hidden bg-background text-foreground">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-[620px] overflow-hidden bg-[#031B43]">
        <img
          src={heroImage}
          alt="Garg Dental Pvt. Ltd."
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-[1.02]"
        />

        {/* Premium image treatment */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,27,67,0.96)_0%,rgba(3,27,67,0.82)_38%,rgba(3,27,67,0.35)_72%,rgba(3,27,67,0.15)_100%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,27,67,0.72)_0%,transparent_45%)]" />

        {/* Decorative glow */}
        <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-[#A8DADC]/10 blur-3xl" />

        <div className="absolute bottom-0 right-20 h-56 w-56 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="container-page relative z-10">
          <div className="flex min-h-[620px] items-center py-24">

            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">

                <span className="h-2 w-2 rounded-full bg-[#A8DADC] shadow-[0_0_12px_rgba(168,218,220,0.9)]" />

                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/90">
                  About Us
                </p>

              </div>

              <h1 className="mt-7 max-w-3xl text-5xl font-bold leading-[1.05] tracking-[-0.035em] text-white md:text-6xl lg:text-7xl">
                Garg Dental
                <span className="block text-[#A8DADC]">
                  Pvt. Ltd.
                </span>
              </h1>

              <p className="mt-7 text-xl font-medium leading-8 text-white/95 md:text-2xl">
                Total Solution Provider
              </p>

              <p className="mt-4 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
                Authorized Importer & Distributor of All Kinds Dental
                Equipments, Instruments & Consumables.
              </p>

              <div className="mt-9 flex items-center gap-4">
                <div className="h-px w-16 bg-[#A8DADC]" />
                <div className="h-1.5 w-1.5 rounded-full bg-[#A8DADC]" />
                <div className="h-px w-8 bg-white/30" />
              </div>

            </div>
          </div>
        </div>

        {/* Bottom transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>


      {/* =====================================================
          ABOUT GARG DENTAL + DIRECTOR IMAGE
      ====================================================== */}
      <section className="relative py-20 md:py-28">

        <div className="container-page">

          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">

            {/* Text */}
            <div>

              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-primary" />

                <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  About Garg Dental
                </p>
              </div>

              <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-[-0.03em] md:text-5xl lg:text-[3.4rem]">
                Building Better
                <span className="block text-primary">
                  Dental Healthcare
                </span>
              </h2>

              <div className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-muted-foreground md:text-lg">

                <p>
                  Established in <strong>2000 A.D</strong>, Garg Dental Pvt.
                  Ltd. is a trusted supplier of high-quality dental equipment,
                  instruments, and consumables in Nepal.
                </p>

                <p>
                  We provide advanced dental solutions from leading global
                  brands, supported by reliable technical assistance and
                  excellent after-sales service.
                </p>

                <p>
                  Our commitment to quality, innovation, and customer
                  satisfaction has made us a trusted partner for dental
                  clinics, hospitals, and educational institutions across
                  Nepal.
                </p>

                <p>
                  We are privileged to be the first company to distribute
                  dental products in Nepal with more than{" "}
                  <strong>100 reputed companies</strong> in our portfolio.
                </p>

              </div>

              <div className="mt-9 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3">

                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <p className="text-3xl font-bold text-primary">
                    2000
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Established
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <p className="text-3xl font-bold text-primary">
                    100+
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Companies
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <p className="text-3xl font-bold text-primary">
                    Nepal
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Nationwide
                  </p>
                </div>

              </div>
            </div>


            {/* Director image */}
            <div className="group">

              <div className="overflow-hidden rounded-[1.75rem] border border-border bg-muted shadow-2xl">

                <img
                  src={directorImage}
                  alt="Managing Director of Garg Dental Pvt. Ltd."
                  loading="lazy"
                  className="h-[450px] w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02] md:h-[560px]"
                />

              </div>

              {/* Director information */}
              <div className="mt-5 flex items-center justify-between border-b border-border pb-4">

                <div>
                  <p className="text-lg font-bold text-foreground">
                    Umesh Agarwal
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Managing Director
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          MISSION / VISION / VALUES
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#F3F7FC] py-20 md:py-28">

        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-[#A8DADC]/10 blur-3xl" />

        <div className="container-page relative">

          <div className="grid items-center gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">

            {/* Mission image */}
            <div className="group relative">

              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white shadow-2xl">

                <img
                  src={missionImage}
                  alt="Garg Dental mission and vision"
                  loading="lazy"
                  className="h-[440px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.035] md:h-[540px]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#031B43]/30 via-transparent to-transparent" />

              </div>

              <div className="absolute -bottom-5 -right-5 hidden rounded-2xl border border-border bg-white px-6 py-5 shadow-xl sm:block">

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Our Foundation
                </p>

                <p className="mt-1 text-sm font-medium text-foreground">
                  Excellence · Innovation · Responsibility
                </p>

              </div>

            </div>


            {/* Mission / Vision / Values */}
            <div>

              <div className="mb-6 flex items-center gap-3">

                <span className="h-px w-10 bg-primary" />

                <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  Mission · Vision · Values
                </p>

              </div>

              <h2 className="text-4xl font-bold leading-tight tracking-[-0.03em] md:text-5xl">
                Our Mission, Vision
                <span className="block text-primary">
                  & Values
                </span>
              </h2>

              <div className="mt-10 space-y-5">

                {/* Mission */}
                <div className="group rounded-2xl border border-border/70 bg-white/75 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">

                  <div className="flex gap-5">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                      01
                    </div>

                    <div>

                      <h3 className="text-xl font-bold">
                        Our Mission
                      </h3>

                      <p className="mt-3 leading-8 text-muted-foreground">
                        Striving for excellence in dental healthcare by
                        introducing innovative dental products and technology
                        in Nepal for better oral health standards.
                      </p>

                    </div>

                  </div>

                </div>


                {/* Vision */}
                <div className="group rounded-2xl border border-border/70 bg-white/75 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">

                  <div className="flex gap-5">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                      02
                    </div>

                    <div>

                      <h3 className="text-xl font-bold">
                        Our Vision
                      </h3>

                      <p className="mt-3 leading-8 text-muted-foreground">
                        To transform the oral healthcare experience through
                        innovative technology and products and to be valued by
                        all stakeholders as a trusted partner and an integral
                        part of the dental fraternity.
                      </p>

                    </div>

                  </div>

                </div>


                {/* Values */}
                <div className="group rounded-2xl border border-border/70 bg-white/75 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">

                  <div className="flex gap-5">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                      03
                    </div>

                    <div>

                      <h3 className="text-xl font-bold">
                        Our Values
                      </h3>

                      <p className="mt-3 leading-8 text-muted-foreground">
                        Working with the highest standards, ethics and
                        responsibility towards healthcare professionals and
                        patients.
                      </p>

                    </div>

                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          BUSINESS SEGMENTS / COMPREHENSIVE DENTAL SOLUTIONS
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#06265B] py-20 text-white md:py-28">

        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#A8DADC]/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="container-page relative">

          <div className="max-w-3xl">

            <div className="mb-6 flex items-center gap-3">

              <span className="h-px w-10 bg-[#A8DADC]" />

              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#A8DADC]">
                Our Business
              </p>

            </div>

            <h2 className="text-4xl font-bold leading-tight tracking-[-0.03em] md:text-5xl">
              Comprehensive
              <span className="block text-[#A8DADC]">
                Dental Solutions
              </span>
            </h2>

            <p className="mt-5 max-w-2xl leading-8 text-white/70 md:text-lg">
              Comprehensive range of dental products and solutions designed
              to support every aspect of modern dentistry.
            </p>

          </div>


          {/* Business Segment Cards */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {businessSegments.map((segment, index) => {
              const Icon = segment.icon;

              return (
                <div
                  key={segment.name}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#A8DADC]/30 hover:bg-white/[0.12] hover:shadow-2xl"
                >

                  {/* Decorative glow */}
                  <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-[#A8DADC]/5 blur-2xl transition-all duration-300 group-hover:bg-[#A8DADC]/15" />


                  {/* Icon */}
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A8DADC]/10 text-[#A8DADC] transition-all duration-300 group-hover:bg-[#A8DADC] group-hover:text-[#06265B]">

                    <Icon
                      size={28}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />

                  </div>


                  {/* Number */}
                  <span className="relative mt-6 block text-xs font-bold tracking-[0.15em] text-[#A8DADC]">
                    {String(index + 1).padStart(2, "0")}
                  </span>


                  {/* Title */}
                  <h3 className="relative mt-3 text-base font-semibold leading-6">
                    {segment.name}
                  </h3>


                  {/* Bottom line */}
                  <div className="mt-6 h-px w-8 bg-white/20 transition-all duration-300 group-hover:w-14 group-hover:bg-[#A8DADC]" />

                </div>
              );
            })}

          </div>

        </div>
      </section>


      {/* =====================================================
          INDUSTRIES WE SERVE
      ====================================================== */}
      <section className="py-20 md:py-28">

        <div className="container-page">

          <div className="max-w-3xl">

            <div className="mb-6 flex items-center gap-3">

              <span className="h-px w-10 bg-primary" />

              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                Industries We Serve
              </p>

            </div>

            <h2 className="text-4xl font-bold leading-tight tracking-[-0.03em] md:text-5xl">
              Serving Healthcare
              <span className="block text-primary">
                Institutions Across Nepal
              </span>
            </h2>

            <p className="mt-5 max-w-2xl leading-8 text-muted-foreground md:text-lg">
              Supporting healthcare professionals and organizations with
              reliable dental equipment, technology and technical services.
            </p>

          </div>


          {/* Industry Cards */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {industries.map((industry, index) => {
              const Icon = industry.icon;

              return (
                <div
                  key={industry.name}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/20 hover:shadow-xl"
                >

                  {/* Decorative glow */}
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all duration-300 group-hover:bg-primary/10" />


                  {/* Icon */}
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">

                    <Icon
                      size={28}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />

                  </div>


                  {/* Number */}
                  <span className="relative mt-6 block text-xs font-bold tracking-[0.15em] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>


                  {/* Title */}
                  <h3 className="relative mt-3 text-lg font-semibold leading-7">
                    {industry.name}
                  </h3>


                  {/* Bottom line */}
                  <div className="relative mt-7 h-px w-8 bg-border transition-all duration-300 group-hover:w-14 group-hover:bg-primary" />

                </div>
              );
            })}

          </div>

        </div>
      </section>


      {/* =====================================================
          CUSTOMERS
      ====================================================== */}
      <section className="bg-[#F3F7FC] py-20 md:py-28">

        <div className="container-page">

          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">

            <div className="max-w-3xl">

              <div className="mb-6 flex items-center gap-3">

                <span className="h-px w-10 bg-primary" />

                <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  Our Key Customers
                </p>

              </div>

              <h2 className="text-4xl font-bold leading-tight tracking-[-0.03em] md:text-5xl">
                Trusted by Healthcare
                <span className="block text-primary">
                  Institutions
                </span>
              </h2>

              <p className="mt-5 max-w-2xl leading-8 text-muted-foreground md:text-lg">
                Garg Dental serves leading dental colleges, hospitals,
                medical colleges, teaching hospitals and healthcare
                institutions across Nepal.
              </p>

            </div>


            <div className="hidden rounded-2xl border border-border bg-white px-5 py-4 shadow-sm lg:block">

              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Partnership
              </p>

              <p className="mt-1 text-sm font-semibold">
                Built on Trust
              </p>

            </div>

          </div>


          {/* Customer logos/image */}
          <div className="group relative mt-12 overflow-hidden rounded-[1.75rem] border border-border bg-white p-5 shadow-xl md:p-8">

            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.025] via-transparent to-[#A8DADC]/[0.06]" />

            <div className="relative rounded-xl border border-border/60 bg-white p-4 md:p-7">

              <img
                src={customerImage}
                alt="Garg Dental key customers"
                loading="lazy"
                className="h-auto w-full object-contain transition-transform duration-700 group-hover:scale-[1.01]"
              />

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          MARKET COVERAGE
      ====================================================== */}
      <section className="relative overflow-hidden py-20 md:py-28">

        <div className="absolute -left-48 top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="container-page relative">

          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">

            {/* Nepal map */}
            <div className="group relative">

              <div className="absolute -inset-3 rounded-[2rem] bg-primary/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-white p-5 shadow-2xl md:p-7">

                <div className="mb-4 flex items-center justify-between">

                  <div>

                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Nationwide Reach
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Market coverage across Nepal
                    </p>

                  </div>

                  <div className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_rgba(11,42,85,0.35)]" />

                </div>

                <div className="rounded-xl bg-[#F8FAFD] p-4">

                  <img
                    src={nepalMapImage}
                    alt="Garg Dental market coverage across Nepal"
                    loading="lazy"
                    className="h-[380px] w-full object-contain transition-transform duration-700 group-hover:scale-[1.025] md:h-[440px]"
                  />

                </div>

              </div>

            </div>


            {/* Information */}
            <div>

              <div className="mb-6 flex items-center gap-3">

                <span className="h-px w-10 bg-primary" />

                <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  Market Coverage
                </p>

              </div>

              <h2 className="text-4xl font-bold leading-tight tracking-[-0.03em] md:text-5xl">
                Delivering Healthcare
                <span className="block text-primary">
                  Solutions Across Nepal
                </span>
              </h2>

              <p className="mt-6 leading-8 text-muted-foreground md:text-lg">
                Garg Dental has established a strong presence across Nepal,
                serving healthcare institutions in different regions of the
                country.
              </p>


              {/* Statistics */}
              <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">

                <div className="group rounded-2xl border border-border bg-card p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6">

                  <p className="text-3xl font-bold tracking-tight text-[#0B2A55] sm:text-4xl">
                    7
                  </p>

                  <p className="mt-2 text-xs font-medium text-muted-foreground sm:text-sm">
                    Provinces
                  </p>

                </div>


                <div className="group rounded-2xl border border-border bg-card p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6">

                  <p className="text-3xl font-bold tracking-tight text-[#0B2A55] sm:text-4xl">
                    77
                  </p>

                  <p className="mt-2 text-xs font-medium text-muted-foreground sm:text-sm">
                    Districts
                  </p>

                </div>


                <div className="group rounded-2xl border border-border bg-card p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6">

                  <p className="text-3xl font-bold tracking-tight text-[#0B2A55] sm:text-4xl">
                    300+
                  </p>

                  <p className="mt-2 text-xs font-medium text-muted-foreground sm:text-sm">
                    Facilities
                  </p>

                </div>

              </div>


              {/* Coverage note */}
              <div className="mt-8 rounded-2xl border border-primary/10 bg-primary/[0.035] p-6">

                <div className="flex items-start gap-4">

                  <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />

                  <p className="text-sm leading-7 text-muted-foreground">
                    Delivering dependable dental products, technical
                    assistance and after-sales support to healthcare
                    institutions throughout Nepal.
                  </p>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

    </main>
  );
}