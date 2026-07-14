import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Github, Linkedin, Send, Download, CheckCircle, MessageCircle, Calendar } from "lucide-react";
import { brand } from "@/data/brand";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("https://formspree.io/f/mqaejbyr", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message
        })
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }
      
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      console.error("Form submit error, using mailto fallback:", err);
      // Fallback: mailto redirect
      const mailtoUrl = `mailto:rahmanadnan412@gmail.com?subject=${encodeURIComponent(
        `[Portfolio Inquiry] ${data.subject}`
      )}&body=${encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
      )}`;
      window.location.href = mailtoUrl;
      
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 6000);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-background" aria-label="Contact section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            // client inquiry &amp; connection
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold mb-4" data-testid="heading-contact">
            Let's discuss your project
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Partner with me to engineer custom SaaS products, optimize slow database queries, or integrate 
            intelligent machine learning solutions.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Info Side (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="font-bold text-lg mb-4">Direct Channels</h3>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "rahmanadnan412@gmail.com", href: "mailto:rahmanadnan412@gmail.com" },
                  { icon: MessageCircle, label: "WhatsApp Chat", value: "+91 78580 62571", href: "https://wa.me/917858062571" },
                  { icon: MapPin, label: "Location", value: "Phagwara, Punjab, India (UTC+5:30)", href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-3" data-testid={`contact-info-${label.toLowerCase().replace(/\s+/g, "-")}`}>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{label}</div>
                      {href ? (
                        <a href={href} className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer">{value}</a>
                      ) : (
                        <div className="text-sm font-semibold">{value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-widest mb-3">Professional Socials</h3>
              <div className="flex gap-3">
                {[
                  { icon: Github, href: "https://github.com/FaizulRahman786", label: "GitHub" },
                  { icon: Linkedin, href: "https://linkedin.com/in/faizul-rahman-87974b397", label: "LinkedIn" },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/45 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05, y: -1 }}
                    aria-label={label}
                    data-testid={`link-contact-${label.toLowerCase()}`}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Instant Scheduler CTA */}
            <motion.a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all group cursor-pointer"
              whileHover={{ y: -2 }}
              data-testid="button-contact-scheduler"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold">Book a Discovery Call</div>
                <div className="text-xs text-muted-foreground">Skip email — book a 15-minute slot</div>
              </div>
            </motion.a>

            <motion.a
              href="/resume.pdf"
              download
              className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-card hover:border-primary/30 hover:bg-muted/10 transition-all group cursor-pointer"
              whileHover={{ y: -2 }}
              data-testid="button-download-resume-contact"
            >
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                <Download className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <div className="text-sm font-semibold">Download Resume</div>
                <div className="text-xs text-muted-foreground">PDF Format · Updated Q3 2026</div>
              </div>
            </motion.a>

            {/* AI Mission Status */}
            <div className="p-4 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-amber-500 animate-pulse" />
                <span className="text-xs font-bold text-emerald-500 dark:text-amber-500 uppercase tracking-wider">AI Mission</span>
              </div>
              <p className="text-xs text-muted-foreground leading-normal">
                {brand.availability.label}. General email response latency is under 12 hours.
              </p>
            </div>
          </motion.div>

          {/* Form Side (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[380px] rounded-2xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col items-center justify-center gap-4 p-8 text-center"
                data-testid="form-success-message"
              >
                <CheckCircle className="w-12 h-12 text-emerald-500" />
                <h3 className="text-xl font-bold">Inquiry Dispatched Successfully</h3>
                <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                  Thank you for your interest. I have received your message and will review it and reply within 12 hours.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 p-6 rounded-2xl border border-border bg-card"
                data-testid="form-contact"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="name"
                      {...register("name")}
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors"
                      data-testid="input-contact-name"
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive mt-1" role="alert">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors"
                      data-testid="input-contact-email"
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1" role="alert">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Subject <span className="text-primary">*</span>
                  </label>
                  <input
                    id="subject"
                    {...register("subject")}
                    placeholder="SaaS Development, Consultation, etc."
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors"
                    data-testid="input-contact-subject"
                  />
                  {errors.subject && (
                    <p className="text-xs text-destructive mt-1" role="alert">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Project Requirements <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message")}
                    placeholder="Describe your project goals, technical stack details, timeline constraints..."
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    data-testid="input-contact-message"
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive mt-1" role="alert">{errors.message.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed hover:bg-primary/95 transition-all shadow-md shadow-primary/10 cursor-pointer"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  data-testid="button-submit-contact"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                      Dispatching message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Project Request
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
