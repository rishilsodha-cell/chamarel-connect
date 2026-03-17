import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const referralSchema = z.object({
  name: z.string().min(1, "Required"),
  organisation: z.string().min(1, "Required"),
  jobTitle: z.string().min(1, "Required"),
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
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight">Make a Referral</h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-foreground/80">
              We're here to help. Submit your referral below and our team will be in touch within 24 hours.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-secondary pt-0">
        <div className="container-narrow max-w-2xl">
          <FadeIn delay={0.1}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input {...register("name")} placeholder="Full Name" className={inputClass} />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <input {...register("organisation")} placeholder="Organisation" className={inputClass} />
                  {errors.organisation && <p className="text-destructive text-xs mt-1">{errors.organisation.message}</p>}
                </div>
              </div>
              <div>
                <input {...register("jobTitle")} placeholder="Job Title" className={inputClass} />
                {errors.jobTitle && <p className="text-destructive text-xs mt-1">{errors.jobTitle.message}</p>}
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
                  <option value="learning-disabilities">Learning Disabilities</option>
                  <option value="autism">Autism</option>
                  <option value="mental-health">Mental Health</option>
                  <option value="complex-enhanced">Complex & Enhanced Care</option>
                  <option value="brain-injury">Brain Injury Rehabilitation</option>
                  <option value="other">Other</option>
                </select>
                {errors.type && <p className="text-destructive text-xs mt-1">{errors.type.message}</p>}
              </div>
              <div>
                <textarea {...register("message")} placeholder="Additional Information" rows={5} className={inputClass + " resize-none"} />
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
