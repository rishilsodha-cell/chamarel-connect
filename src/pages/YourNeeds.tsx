import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";

const needs = [
  {
    title: "Autism",
    path: "/your-needs/autism",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    bg: "bg-accent/20",
    desc: "Structured, sensory-aware support that helps autistic individuals build independence and thrive in their environment.",
  },
  {
    title: "Learning Disabilities",
    path: "/your-needs/learning-disabilities",
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=400",
    bg: "bg-amber-100",
    desc: "Values-led, co-produced support empowering adults with learning disabilities to live with confidence and purpose.",
  },
  {
    title: "Mental Health",
    path: "/your-needs/mental-health",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
    bg: "bg-purple-100",
    desc: "Compassionate, trauma-informed mental health support focused on recovery, resilience, and community belonging.",
  },
];

const YourNeeds = () => (
  <Layout>
    <section className="section-padding">
      <div className="container-narrow max-w-3xl">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight">Your Needs</h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-8 text-lg leading-relaxed text-foreground/80">
            At Chamarel Healthcare, we offer care and support to people with a range of needs. Whether you have a learning disability, autism, or mental health challenges, our expert teams tailor their support to meet your individual goals, preferences and values.
          </p>
        </FadeIn>
      </div>
    </section>

    <section className="section-padding bg-secondary pt-0">
      <div className="container-narrow">
        <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {needs.map((need, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <Link to={need.path} className="flex flex-col items-center text-center gap-5 group">
                <div className={`${need.bg} w-40 h-40 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105`}>
                  <img src={need.image} alt={need.title} className="w-full h-full object-cover" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">{need.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{need.desc}</p>
              </Link>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.4}>
          <div className="text-center mt-12">
            <Link
              to="/referrals"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg"
            >
              Make a Referral
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  </Layout>
);

export default YourNeeds;
