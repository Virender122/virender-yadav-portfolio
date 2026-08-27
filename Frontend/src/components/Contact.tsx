import React, { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Send, Loader2, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { portfolioData } from "../data/portfolioData";

export default function Contact() {
  const { email, phone, location, linkedIn, gitHub } = portfolioData;

  // Form states
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Validate form
  const validateForm = () => {
    let isValid = true;
    const tempErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.length < 10) {
      tempErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          _subject: `New portfolio contact from ${formData.name.trim()}`,
          _captcha: "false",
          _template: "table",
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to send message right now.");
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError("Message could not be sent. Please try again or contact me directly.");
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 relative overflow-hidden bg-cyber-bg-secondary"
    >
      {/* Background neon grid */}
      <div className="absolute inset-0 cyber-grid-purple opacity-20 pointer-events-none" />

      {/* Floating background neon orbs */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-cyber-cyan/15 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[10%] left-[-10%] w-[320px] h-[320px] rounded-full bg-cyber-purple/10 blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: "2s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-cyber-purple/10 border border-cyber-purple/30 mb-3"
          >
            <span className="font-mono text-xs text-cyber-purple tracking-widest font-semibold uppercase">
              07 // Reach Out
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white"
          >
            Let’s Build{" "}
            <span className="bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink bg-clip-text text-transparent text-neon-cyan">
              Something Great Together
            </span>
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink mx-auto mt-4 rounded-full shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
        </div>

        {/* Contact Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-stretch">
          
          {/* Left Column: Direct Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl h-full flex flex-col justify-between text-left relative overflow-hidden">
              {/* Highlight ribbon */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-cyber-cyan to-cyber-purple" />

              <div>
                <h3 className="font-display font-bold text-2xl text-white mb-3">
                  Contact Information
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-8">
                  Have a mission, role, or proposal in mind? Reach out via any of these channels or leave a message directly on the grid. I look forward to working together.
                </p>

                {/* Info links list */}
                <div className="space-y-6">
                  {/* Email */}
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyber-cyan/50 hover:shadow-neon-cyan transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-lg bg-cyber-cyan/10 group-hover:bg-cyber-cyan/20 transition-colors duration-200">
                      <Mail className="w-5 h-5 text-cyber-cyan" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-text-secondary/70 uppercase tracking-widest">Email Address</div>
                      <div className="font-display text-sm sm:text-base font-semibold text-white mt-0.5">{email}</div>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyber-purple/50 hover:shadow-neon-purple transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-lg bg-cyber-purple/10 group-hover:bg-cyber-purple/20 transition-colors duration-200">
                      <Phone className="w-5 h-5 text-cyber-purple" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-text-secondary/70 uppercase tracking-widest">Phone Call</div>
                      <div className="font-display text-sm sm:text-base font-semibold text-white mt-0.5">+91 {phone}</div>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 group">
                    <div className="p-3 rounded-lg bg-cyber-lime/10">
                      <MapPin className="w-5 h-5 text-cyber-lime" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-text-secondary/70 uppercase tracking-widest">Location</div>
                      <div className="font-display text-sm sm:text-base font-semibold text-white mt-0.5">{location}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="mt-10 pt-6 border-t border-white/5 flex items-center gap-4">
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyber-bg-primary border border-white/5 hover:border-cyber-cyan/60 text-text-secondary hover:text-cyber-cyan hover:shadow-neon-cyan transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                <a
                  href={gitHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyber-bg-primary border border-white/5 hover:border-cyber-purple/60 text-text-secondary hover:text-cyber-purple hover:shadow-neon-purple transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl relative h-full flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                  >
                    {/* Name input */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="name" className="font-mono text-xs text-text-secondary/80 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Virender Yadav"
                        className={`w-full px-4 py-3.5 bg-cyber-bg-primary/50 border rounded-xl text-white font-sans text-sm outline-none transition-all duration-300 ${
                          errors.name
                            ? "border-cyber-pink focus:border-cyber-pink shadow-[0_0_8px_rgba(255,0,127,0.3)]"
                            : "border-white/10 focus:border-cyber-cyan focus:shadow-neon-cyan"
                        }`}
                      />
                      {errors.name && (
                        <p className="font-mono text-[10px] text-cyber-pink">{errors.name}</p>
                      )}
                    </div>

                    {/* Email input */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="email" className="font-mono text-xs text-text-secondary/80 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="virendaryadav831@gmail.com"
                        className={`w-full px-4 py-3.5 bg-cyber-bg-primary/50 border rounded-xl text-white font-sans text-sm outline-none transition-all duration-300 ${
                          errors.email
                            ? "border-cyber-pink focus:border-cyber-pink shadow-[0_0_8px_rgba(255,0,127,0.3)]"
                            : "border-white/10 focus:border-cyber-purple focus:shadow-neon-purple"
                        }`}
                      />
                      {errors.email && (
                        <p className="font-mono text-[10px] text-cyber-pink">{errors.email}</p>
                      )}
                    </div>

                    {/* Message input */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="message" className="font-mono text-xs text-text-secondary/80 uppercase tracking-wider">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Write details of your opportunity, project, or role..."
                        className={`w-full px-4 py-3.5 bg-cyber-bg-primary/50 border rounded-xl text-white font-sans text-sm outline-none transition-all duration-300 resize-none ${
                          errors.message
                            ? "border-cyber-pink focus:border-cyber-pink shadow-[0_0_8px_rgba(255,0,127,0.3)]"
                            : "border-white/10 focus:border-cyber-cyan focus:shadow-neon-cyan"
                        }`}
                      />
                      {errors.message && (
                        <p className="font-mono text-[10px] text-cyber-pink">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white font-display font-bold tracking-wide rounded-xl shadow-neon-cyan hover:shadow-neon-purple cursor-pointer transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2.5 disabled:opacity-80"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Transmission Pending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Grid Message
                        </>
                      )}
                    </button>

                    {submitError && (
                      <p className="font-mono text-[10px] text-cyber-pink text-center">{submitError}</p>
                    )}
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-10 text-center space-y-4"
                  >
                    <div className="p-4 rounded-full bg-cyber-lime/10 border border-cyber-lime/30 shadow-neon-lime flex items-center justify-center animate-bounce">
                      <CheckCircle className="w-10 h-10 text-cyber-lime" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display font-extrabold text-2xl text-white">
                        Transmission Successful!
                      </h3>
                      <p className="text-text-secondary text-sm max-w-sm mx-auto leading-relaxed">
                        Thank you for reaching out. Your encrypted message has successfully bypassed firewalls and reached Virender's inbox.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsSuccess(false)}
                      className="mt-6 px-6 py-2.5 bg-white/[0.04] border border-white/10 hover:border-cyber-cyan/50 text-white font-mono text-xs rounded-xl cursor-pointer hover:bg-white/[0.08] transition-all duration-300"
                    >
                      » Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
