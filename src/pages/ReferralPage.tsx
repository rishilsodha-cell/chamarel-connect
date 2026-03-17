import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, ShieldCheck, Zap, Brain, Handshake, ClipboardList } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";

const schema = z.object({
  fullName: z.string().trim().min(1, "Required").max(100),
  organisation: z.string().trim().min(1, "Required").max(200),
  jobTitle: z.string().trim().max(100).optional(),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(1, "Required").max(30),
  supportType: z.string().min(1, "Please select an option"),
  urgency: z.string().min(1, "Please select an option"),
  situation: z.string().trim().max(5000).optional(),
  heardAbout: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const supportOptions = [
  "Please select",
  "Autism Support",
  "Learning Disabilities",
  "Mental Health Support",
  "Community Care Services",
  "Respite Care",
  "Multiple / Complex Needs",
  "Other",
];

const urgencyOptions = [
  "Please select",
  "Routine (within 2 weeks)",
  "Urgent (within 48 hours)",
  "Emergency (same day contact needed)",
];

const heardOptions = [
  "Internet search",
  "NHS / ICB referral",
  "Word of mouth",
  "Social media",
  "Previous referral",
  "Other",
];

const reasons = [
  { Icon: ShieldCheck, title: "CQC Inspected & Rated Good", text: "Our services are regulated and rated Good by the Care Quality Commission, giving you confidence in the quality of care provided." },
  { Icon: Zap, title: "Fast Response", text: "We acknowledge all referrals within 24 hours and aim to arrange an initial conversation within 48 hours of receipt." },
  { Icon: Brain, title: "PBS & Trauma-Informed Practice", text: "All our support is underpinned by Positive Behaviour Support and trauma-informed approaches, delivered by trained specialist staff." },
  { Icon: Handshake, title: "Person-Centred from Day One", text: "We work closely with you, the individual, and their family to ensure the right support is in place from the very first day." },
  { Icon: ClipboardList, title: "Flexible Packages", text: "We offer a range of support options from a few hours per week to full-time residential care, tailored to individual assessed needs." },
];

const inputClass = "w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition-all bg-background";
const labelClass = "block text-sm font-medium text-foreground mb-1.5";
const errorClass = "text-destructive text-xs mt-1";

const ReferralPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    toast.success("Referral submitted! Our team will be in touch within 24 hours.");
    reset();
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="flex items-center justify-center text-center px-4" style={{ backgroundColor: "#00706B", minHeight: 200 }}>
        <FadeIn>
          <div>
            <h1 className="text-4xl md:text-[48px] font-bold text-white leading-tight">Make a Referral</h1>
            <p className="mt-3 text-white/85 text-lg max-w-2xl mx-auto">
              We respond to all referrals within 24 hours. Our senior team reviews every submission personally.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Main content */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-10 items-start">
            {/* Form */}
            <FadeIn>
              <div className="bg-card rounded-2xl p-8" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <h2 className="text-2xl font-bold mb-6" style={{ color: "#00706B" }}>Submit a Referral</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input {...register("fullName")} className={inputClass} />
                    {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Organisation / Authority *</label>
                    <input {...register("organisation")} className={inputClass} />
                    {errors.organisation && <p className={errorClass}>{errors.organisation.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Job Title</label>
                    <input {...register("jobTitle")} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Contact Email *</label>
                    <input {...register("email")} type="email" className={inputClass} />
                    {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Contact Phone Number *</label>
                    <input {...register("phone")} type="tel" className={inputClass} />
                    {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Type of Support Needed *</label>
                    <select {...register("supportType")} className={inputClass} defaultValue="">
                      <option value="" disabled>Please select</option>
                      {supportOptions.slice(1).map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    {errors.supportType && <p className={errorClass}>{errors.supportType.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Urgency Level *</label>
                    <select {...register("urgency")} className={inputClass} defaultValue="">
                      <option value="" disabled>Please select</option>
                      {urgencyOptions.slice(1).map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    {errors.urgency && <p className={errorClass}>{errors.urgency.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Individual's Current Situation</label>
                    <textarea
                      {...register("situation")}
                      rows={5}
                      className={inputClass + " resize-none"}
                      placeholder="Please provide a brief overview of the person's current situation, support needs, and any relevant background information. All information is treated in strict confidence."
                    />
                  </div>
                  <div>
                    <label className={labelClass}>How did you hear about us?</label>
                    <select {...register("heardAbout")} className={inputClass} defaultValue="">
                      <option value="">— Optional —</option>
                      {heardOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full font-bold text-base text-white rounded-xl flex items-center justify-center gap-2 transition-colors"
                    style={{ backgroundColor: "#00706B", height: 52 }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#005A58")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#00706B")}
                  >
                    Submit Referral <ArrowRight size={18} />
                  </button>
                  <p className="text-center text-muted-foreground" style={{ fontSize: 12 }}>
                    All referrals are handled confidentially by our senior team in accordance with GDPR and our{" "}
                    <Link to="/privacy" className="underline">Privacy Policy</Link>.
                  </p>
                </form>
              </div>
            </FadeIn>

            {/* Right column */}
            <FadeIn delay={0.15}>
              <div className="rounded-2xl p-8" style={{ backgroundColor: "#F9F7F4" }}>
                <h3 className="text-[22px] font-bold mb-6" style={{ color: "#00706B" }}>
                  Why Refer to Chamarel Healthcare?
                </h3>
                <div className="space-y-6">
                  {reasons.map((r, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: "#00706B" }}>
                        <r.Icon size={18} className="text-white" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">{r.title}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed mt-0.5">{r.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact box */}
                <div className="mt-8 rounded-xl p-6 text-white" style={{ backgroundColor: "#00706B" }}>
                  <p className="text-sm font-medium mb-2">Prefer to speak to someone directly?</p>
                  <a href="mailto:enquiry@chamarelhealthcare.com" className="text-xl font-bold text-white block mb-1">
                    📞 enquiry@chamarelhealthcare.com
                  </a>
                  <p className="text-white/80" style={{ fontSize: 13 }}>
                    Our referral team is available Monday to Friday, 9am – 5pm
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Bottom banner */}
      <section className="text-white text-center" style={{ backgroundColor: "#004F4D", padding: "120px 24px" }}>
        <FadeIn>
          <h2 className="text-3xl md:text-[32px] font-bold mb-3">Not ready to refer yet?</h2>
          <p className="text-lg text-white/85 max-w-2xl mx-auto mb-8">
            Download our service brochure or contact us to arrange a visit to one of our services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/#get-in-touch" className="px-8 py-4 bg-white rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg" style={{ color: "#00706B" }}>
              Contact Us
            </a>
            <Link to="/your-needs" className="px-8 py-4 rounded-full font-semibold border-2 border-white text-white hover:-translate-y-0.5 transition-all duration-250 hover:bg-white/10">
              View Our Services
            </Link>
          </div>
        </FadeIn>
      </section>
    </Layout>
  );
};

export default ReferralPage;
