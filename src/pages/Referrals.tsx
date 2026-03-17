import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const referralSchema = z.object({
  name: z.string().min(1, "Required"),
  organisation: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Required"),
  type: z.string().min(1, "Please select a referral type"),
  message: z.string().min(1, "Required"),
});

type ReferralForm = z.infer<typeof referralSchema>;

const Referrals = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ReferralForm>({
    resolver: zodResolver(referralSchema),
  });

  const onSubmit = (data: ReferralForm) => {
    console.log(data);
    toast.success("Thank you! Your referral has been submitted. We'll be in touch within 24 hours.");
    reset();
  };

  const inputClass = "w-full bg-card border-0 ring-1 ring-primary/10 focus:ring-2 focus:ring-primary transition-all p-4 rounded-xl text-sm outline-none";

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow max-w-3xl">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight">Referrals & Feedback</h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-foreground/80">
              We welcome referrals from social workers, commissioners, families, and individuals. We also value your feedback to continually improve our services.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-narrow max-w-2xl">
          <FadeIn>
            <h2 className="text-3xl font-medium text-center mb-2">Make a Referral</h2>
            <p className="text-center text-foreground/70 mb-10">
              We're here to help. Submit your referral below and our team will be in touch within 24 hours.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input {...register("name")} placeholder="Name" className={inputClass} />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <input {...register("organisation")} placeholder="Organisation" className={inputClass} />
                  {errors.organisation && <p className="text-destructive text-xs mt-1">{errors.organisation.message}</p>}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input {...register("email")} placeholder="Contact Email" className={inputClass} />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <input {...register("phone")} placeholder="Phone Number" type="tel" className={inputClass} />
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>
              <div>
                <select {...register("type")} className={inputClass + " appearance-none"}>
                  <option value="">Type of Referral</option>
                  <option value="mental-health">Mental Health</option>
                  <option value="learning-disabilities">Learning Disabilities</option>
                  <option value="domiciliary-care">Domiciliary Care</option>
                  <option value="other">Other</option>
                </select>
                {errors.type && <p className="text-destructive text-xs mt-1">{errors.type.message}</p>}
              </div>
              <div>
                <textarea {...register("message")} placeholder="Your message" rows={5} className={inputClass + " resize-none"} />
                {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
              </div>
              <button type="submit" className="w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg">
                Submit Referral
              </button>
            </form>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Referrals;
