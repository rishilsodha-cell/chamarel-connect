import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, MapPin, Phone, PlayCircle, FileText, CheckCircle2 } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import AreasWeServe from "@/components/AreasWeServe";
import { homes, openHomes, upcomingHomes, type Home } from "@/data/homes";
import { tourForm } from "@/data/forms";
import { submitToGoogleForm } from "@/lib/submitToGoogleForm";
import { enquiryEmail, enquiryPhone, enquiryPhoneHref } from "@/data/contact";

const tourSchema = z.object({
  fullName: z.string().min(1, "Required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a contact number"),
  home: z.string().min(1, "Choose a home"),
  wants: z.array(z.string()).min(1, "Tell us what to send"),
  role: z.string().min(1, "Required"),
  message: z.string().optional(),
});

type TourFormValues = z.infer<typeof tourSchema>;

const inputClass =
  "w-full bg-card border-0 ring-1 ring-primary/15 focus:ring-2 focus:ring-primary transition-all p-4 rounded-xl text-sm outline-none";

const HomeCard = ({ home, onRequest }: { home: Home; onRequest: (home: Home) => void }) => {
  const [active, setActive] = useState(0);
  const soon = home.status === "opening-soon";
  const shown = home.gallery[active] ?? home.hero;

  return (
    <div
      className="bg-card rounded-2xl overflow-hidden h-full flex flex-col"
      style={{ boxShadow: "var(--card-shadow)" }}
    >
      <div className="relative aspect-[4/3] bg-primary/10">
        {shown ? (
          <img src={shown} alt={`${home.name}, ${home.area}`} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/90 text-primary-foreground text-center px-6">
            <span className="text-sm font-medium">Photographs coming soon</span>
          </div>
        )}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-primary text-primary-foreground">
            {home.serviceType}
          </span>
          {soon && (
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-accent text-primary-foreground">
              Opening soon
            </span>
          )}
          {home.cqcRated && (
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-primary-foreground text-primary">
              CQC rated Good
            </span>
          )}
        </div>
      </div>

      {home.gallery.length > 1 && (
        <div className="flex gap-2 px-5 pt-4">
          {home.gallery.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1} of ${home.name}`}
              className={`w-16 h-12 rounded-lg overflow-hidden transition-all ${
                i === active ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-medium">{home.name}</h3>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1.5">
          <MapPin size={14} strokeWidth={1.8} />
          {home.address}
        </p>
        <p className="text-sm text-foreground/75 leading-relaxed mt-4">{home.blurb}</p>

        <ul className="mt-4 space-y-1.5">
          {home.facts.map((fact) => (
            <li key={fact} className="flex gap-2 text-sm text-foreground/75">
              <CheckCircle2 size={16} strokeWidth={1.8} className="mt-0.5 shrink-0 text-accent" />
              {fact}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => onRequest(home)}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg"
        >
          <PlayCircle size={16} strokeWidth={1.8} />
          {soon ? "Register your interest" : "Request a video tour"}
        </button>
      </div>
    </div>
  );
};

const OurHomes = () => {
  const formSection = useRef<HTMLDivElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TourFormValues>({
    resolver: zodResolver(tourSchema),
    defaultValues: { wants: ["Video tour"], home: "", role: "" },
  });

  // Deep link: /our-homes?home=perrin-house pre-selects that home.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("home");
    const match = homes.find((h) => h.slug === slug);
    if (match) {
      setValue("home", match.formValue);
      // Bring the home's card into view (e.g. the Your Needs sensory-room link to Perrin House).
      setTimeout(() => document.getElementById(match.slug)?.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
    }
  }, [setValue]);

  const requestTour = (home: Home) => {
    setValue("home", home.formValue, { shouldValidate: true });
    formSection.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSubmit = async (data: TourFormValues) => {
    setSending(true);
    try {
      await submitToGoogleForm(tourForm.action, {
        [tourForm.fields.fullName]: data.fullName,
        [tourForm.fields.email]: data.email,
        [tourForm.fields.phone]: data.phone,
        [tourForm.fields.home]: data.home,
        [tourForm.fields.role]: data.role,
        [tourForm.fields.message]: data.message,
        // Checkbox questions take one repeated key per ticked option.
        [tourForm.fields.wants]: data.wants,
      });
      setSent(true);
      reset();
      toast.success("Thank you — your tour is on its way. We'll be in touch within 24 hours.");
    } catch {
      // Never claim an enquiry was sent when it was not.
      toast.error(`We couldn't send that. Please call ${enquiryPhone} or email ${enquiryEmail}.`, {
        duration: 10000,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-narrow py-16 md:py-24">
          <FadeIn>
            <h1 className="text-3xl md:text-5xl font-medium tracking-tight leading-tight max-w-3xl">
              Our Homes in London and Cambridgeshire
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-5 text-lg text-primary-foreground/85 max-w-2xl leading-relaxed">
              Take a look inside. Choose a home below and we will send you the full video tour and
              brochure — the rooms, the gardens, the communal spaces and how support actually works
              day to day.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                type="button"
                onClick={() => formSection.current?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground text-primary rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg"
              >
                <PlayCircle size={18} strokeWidth={1.8} />
                Get your video tour
              </button>
              <a
                href={enquiryPhoneHref}
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary-foreground rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:bg-primary-foreground/10"
              >
                <Phone size={18} strokeWidth={1.8} />
                Call {enquiryPhone}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Open homes */}
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-medium text-center mb-3">Open now</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              Three homes with vacancies or upcoming vacancies, across north-west London and
              Cambridgeshire.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {openHomes.map((home, i) => (
              <FadeIn key={home.slug} delay={i * 0.1}>
                <div id={home.slug} className="scroll-mt-28 h-full">
                  <HomeCard home={home} onRequest={requestTour} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Opening soon */}
      <section className="section-padding bg-secondary">
        <div className="container-narrow">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-medium text-center mb-3">Opening soon</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              Two further Cambridge homes are being completed. Register now and you will be first to
              see them.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {upcomingHomes.map((home, i) => (
              <FadeIn key={home.slug} delay={i * 0.1}>
                <div id={home.slug} className="scroll-mt-28 h-full">
                  <HomeCard home={home} onRequest={requestTour} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Lead capture */}
      <section ref={formSection} className="section-padding" id="request-a-tour">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <FadeIn>
              <div>
                <h2 className="text-3xl md:text-4xl font-medium">Request your video tour</h2>
                <p className="mt-4 text-foreground/75 leading-relaxed">
                  Tell us where to send it and we will email you the walkthrough video and the full
                  brochure for the home you are interested in, usually the same working day.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    { Icon: PlayCircle, title: "A full walkthrough video", body: "Every room, the communal spaces and the garden — filmed, not stock photography." },
                    { Icon: FileText, title: "The complete brochure", body: "Floor plans, room sizes, staffing model and how referrals work." },
                    { Icon: Phone, title: "A call with the team, if you want one", body: "No pressure and no obligation. Tell us below if you would rather we did not call." },
                  ].map(({ Icon, title, body }) => (
                    <div key={title} className="flex gap-3">
                      <Icon size={20} strokeWidth={1.6} className="mt-0.5 shrink-0 text-accent" />
                      <div>
                        <p className="font-medium text-sm">{title}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="my-6" style={{ width: 60, height: 1, backgroundColor: "#00706B" }} />
                <p className="text-sm text-muted-foreground">
                  We use your details only to send what you have asked for and to follow up on your
                  enquiry. We never sell or share them. See our{" "}
                  <a href="/privacy" className="underline" style={{ color: "#00706B" }}>
                    privacy policy
                  </a>
                  .
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              {sent ? (
                <div
                  className="bg-card rounded-2xl p-8 border-t-4 border-primary"
                  style={{ boxShadow: "var(--card-shadow)" }}
                >
                  <CheckCircle2 size={32} strokeWidth={1.6} className="text-accent" />
                  <h3 className="text-xl font-medium mt-4">Thank you</h3>
                  <p className="text-sm text-foreground/75 leading-relaxed mt-3">
                    Your request has reached us. We will email your tour and brochure within 24 hours,
                    Monday to Friday. If it is urgent, call{" "}
                    <a href={enquiryPhoneHref} className="underline" style={{ color: "#00706B" }}>
                      {enquiryPhone}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-primary transition-colors"
                  >
                    Request another home <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                  <div>
                    <input {...register("fullName")} placeholder="Full name" className={inputClass} />
                    {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName.message}</p>}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input {...register("email")} type="email" placeholder="Email address" className={inputClass} />
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <input {...register("phone")} type="tel" placeholder="Phone number" className={inputClass} />
                      {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <select {...register("home")} className={inputClass}>
                      <option value="">Which home are you interested in?</option>
                      {homes.map((h) => (
                        <option key={h.slug} value={h.formValue}>
                          {h.name} — {h.area}
                          {h.status === "opening-soon" ? " (opening soon)" : ""}
                        </option>
                      ))}
                      <option value={tourForm.homeOptions.unsure}>Not sure yet / more than one</option>
                    </select>
                    {errors.home && <p className="text-destructive text-xs mt-1">{errors.home.message}</p>}
                  </div>

                  <fieldset>
                    <legend className="text-sm font-medium mb-2">What would you like us to send?</legend>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {tourForm.wantOptions.map((opt) => (
                        <label key={opt} className="flex items-center gap-2 text-sm text-foreground/80 cursor-pointer">
                          <input type="checkbox" value={opt} {...register("wants")} className="accent-primary w-4 h-4" />
                          {opt}
                        </label>
                      ))}
                    </div>
                    {errors.wants && <p className="text-destructive text-xs mt-1">{errors.wants.message}</p>}
                  </fieldset>

                  <div>
                    <select {...register("role")} className={inputClass}>
                      <option value="">I am a…</option>
                      {tourForm.roleOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.role && <p className="text-destructive text-xs mt-1">{errors.role.message}</p>}
                  </div>

                  <textarea
                    {...register("message")}
                    rows={3}
                    placeholder="Anything you would like us to know? (optional)"
                    className={inputClass + " resize-none"}
                  />

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {sending ? "Sending…" : "Send me the tour"}
                  </button>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      <AreasWeServe slim />
    </Layout>
  );
};

export default OurHomes;
