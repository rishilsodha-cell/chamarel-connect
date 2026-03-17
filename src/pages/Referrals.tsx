import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const referralSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  organisation: z.string().optional(),
  type: z.string().min(1, "Required"),
  message: z.string().min(1, "Required"),
});

type ReferralForm = z.infer<typeof referralSchema>;

const Referrals = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ReferralForm>({
    resolver: zodResolver(referralSchema),
  });

  const onSubmit = (data: ReferralForm) => {
    console.log(data);
    toast.success("Thank you! Your referral has been submitted.");
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input {...register("name")} placeholder="Your Name" className={inputClass} />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <input {...register("email")} placeholder="Email Address" className={inputClass} />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>
              <input {...register("organisation")} placeholder="Organisation (optional)" className={inputClass} />
              <select {...register("type")} className={inputClass + " appearance-none"}>
                <option value="">Select type</option>
                <option value="referral">Referral</option>
                <option value="feedback">Feedback</option>
                <option value="complaint">Complaint</option>
                <option value="general">General Enquiry</option>
              </select>
              {errors.type && <p className="text-destructive text-xs mt-1">{errors.type.message}</p>}
              <textarea {...register("message")} placeholder="Your message" rows={5} className={inputClass + " resize-none"} />
              {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
              <button type="submit" className="w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg">
                Submit
              </button>
            </form>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Referrals;
