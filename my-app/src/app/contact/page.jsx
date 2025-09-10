"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  CheckCircle,
  XCircle,
  Copy,
  Check,
  Mail,
  Phone,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

// Constants
const CONTACT_INFO = {
  email: "info@emcenergy.net",
  phone: "+2 02 229 06773",
};

const FORM_LIMITS = {
  name: 100,
  message: 1000,
};

const COPY_TIMEOUT = 2000;

// Animation variants
const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  },
  card: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  },
  message: {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  },
  button: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  },
};

// Custom hooks
const useFormValidation = () => {
  const validateForm = useCallback((formData) => {
    if (!formData.name.trim()) return "Name is required";
    if (formData.name.length > FORM_LIMITS.name)
      return `Name must be ${FORM_LIMITS.name} characters or less`;
    if (!formData.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return "Invalid email format";
    if (!formData.message.trim()) return "Message is required";
    if (formData.message.length > FORM_LIMITS.message)
      return `Message must be ${FORM_LIMITS.message} characters or less`;
    if (formData.website) return "Bot detected";
    return "";
  }, []);

  return { validateForm };
};

const useClipboard = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = useCallback(async (text, type) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        if (type === "email") {
          setCopiedEmail(true);
          setTimeout(() => setCopiedEmail(false), COPY_TIMEOUT);
        } else {
          setCopiedPhone(true);
          setTimeout(() => setCopiedPhone(false), COPY_TIMEOUT);
        }
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  }, []);

  return { copiedEmail, copiedPhone, copyToClipboard };
};

// Components
const LoadingSpinner = () => (
  <motion.div
    className="min-h-screen flex items-center justify-center"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
  >
    <Loader2 className="h-12 w-12 text-primary animate-spin" />
  </motion.div>
);

const PageHeader = () => (
  <motion.div
    className="py-6 sm:py-8 text-center shadow-sm"
    variants={animations.container}
    initial="hidden"
    animate="visible"
  >
    <div className="mt-12 mb-12 sm:mb-16 text-center">
      <motion.h1
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent text-center bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-primary leading-[1.15] pb-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Contact Us
      </motion.h1>
      <motion.div
        className="mt-4 mx-auto h-1 w-24 bg-primary rounded-full shadow-primary shadow-md"
        initial={{ width: 0 }}
        whileInView={{ width: 128 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>
    <motion.p
      variants={animations.item}
      className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4"
    >
      We're here to help. Reach out via form, email, or phone.
    </motion.p>
  </motion.div>
);

const ContactInfoCard = ({
  copiedEmail,
  copiedPhone,
  copyToClipboard,
  isDisabled,
}) => (
  <motion.div
    className="p-6 sm:p-8 bg-muted rounded-xl shadow-lg transition-all duration-300"
    variants={animations.card}
  >
    <motion.h2
      variants={animations.item}
      className="text-2xl sm:text-3xl font-bold text-primary mb-6"
    >
      Get in Touch
    </motion.h2>
    <motion.p
      variants={animations.item}
      className="text-base sm:text-lg text-muted-foreground mb-8"
    >
      Our team is ready to assist you. Expect a response within 24 hours.
    </motion.p>
    <motion.div className="space-y-8" variants={animations.container}>
      <ContactItem
        icon={<Mail className="h-6 w-6 text-primary flex-shrink-0" />}
        label="Email"
        value={CONTACT_INFO.email}
        copied={copiedEmail}
        onCopy={() => copyToClipboard(CONTACT_INFO.email, "email")}
        disabled={isDisabled}
      />
      <ContactItem
        icon={<Phone className="h-6 w-6 text-primary flex-shrink-0" />}
        label="Phone"
        value={CONTACT_INFO.phone}
        copied={copiedPhone}
        onCopy={() => copyToClipboard(CONTACT_INFO.phone, "phone")}
        disabled={isDisabled}
      />
    </motion.div>
  </motion.div>
);

const ContactItem = ({ icon, label, value, copied, onCopy, disabled }) => (
  <motion.div
    className="flex items-center gap-4 group"
    variants={animations.item}
  >
    {icon}
    <div>
      <span className="text-sm text-muted-foreground block">{label}</span>
      <motion.button
        onClick={onCopy}
        className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors relative group"
        title={`Copy ${label.toLowerCase()}`}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        disabled={disabled}
      >
        {value}
        {copied ? (
          <Check className="h-4 w-4 text-primary" />
        ) : (
          <Copy className="h-4 w-4 text-muted-foreground group-hover:text-primary-dark" />
        )}
        {copied && (
          <motion.span
            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs py-1 px-3 rounded-full"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            Copied!
          </motion.span>
        )}
      </motion.button>
    </div>
  </motion.div>
);

const FormField = ({
  name,
  type = "text",
  value,
  onChange,
  disabled,
  label,
  rows,
  ...props
}) => (
  <motion.div className="relative" variants={animations.item}>
    {type === "textarea" ? (
      <Textarea
        name={name}
        placeholder=" "
        value={value}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
        className="peer w-full text-lg pt-8 pb-3 px-5 rounded-lg border border-muted focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all duration-300 placeholder-transparent disabled:bg-muted disabled:cursor-not-allowed hover:border-primary/50"
        {...props}
      />
    ) : (
      <Input
        name={name}
        type={type}
        placeholder=" "
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="peer w-full h-16 text-lg pt-8 pb-3 px-5 rounded-lg border border-muted focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all duration-300 placeholder-transparent disabled:bg-muted disabled:cursor-not-allowed hover:border-primary/50"
        {...props}
      />
    )}
    <label className="absolute left-5 top-2 text-sm text-muted-foreground peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg peer-placeholder-shown:text-muted-foreground peer-focus:top-2 peer-focus:text-sm peer-focus:text-primary transition-all duration-300">
      {label}
    </label>
  </motion.div>
);

const SubmitButton = ({ status }) => (
  <motion.div variants={animations.button} className="flex justify-center">
    <motion.button
      type="submit"
      disabled={status === "sending"}
      whileHover={{ scale: status === "sending" ? 1 : 1.05 }}
      whileTap={{ scale: status === "sending" ? 1 : 0.97 }}
      className="group w-full relative px-8 py-3 bg-primary border-2 border-white text-primary-foreground rounded-lg flex items-center gap-2 overflow-hidden transition-all duration-300 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
    >
      {status === "sending" ? (
        <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin text-primary" />
      ) : (
        <>
          <span className="relative text-center z-10 group-hover:text-primary transition-colors duration-300">
            Send Message
          </span>
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-200 relative z-10 group-hover:text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <div className="absolute inset-0 bg-primary-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </>
      )}
    </motion.button>
  </motion.div>
);

const StatusMessage = ({ status, errorMessage, onDismiss }) => {
  if (status === "success") {
    return (
      <motion.div
        className="flex items-center gap-2 text-sm p-4 bg-muted rounded-lg"
        variants={animations.message}
        initial="hidden"
        animate="visible"
      >
        <CheckCircle className="h-5 w-5 text-primary" />
        <p className="text-primary flex-1">Message sent successfully!</p>
        <motion.button
          onClick={onDismiss}
          className="text-muted-foreground hover:text-primary"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="h-4 w-4" />
        </motion.button>
      </motion.div>
    );
  }

  if (status === "error") {
    return (
      <motion.div
        className="flex items-center gap-2 text-sm p-4 bg-red-100 rounded-lg"
        variants={animations.message}
        initial="hidden"
        animate="visible"
      >
        <XCircle className="h-5 w-5 text-red-600" />
        <p className="text-red-600 flex-1">{errorMessage}</p>
        <motion.button
          onClick={onDismiss}
          className="text-muted-foreground hover:text-red-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="h-4 w-4" />
        </motion.button>
      </motion.div>
    );
  }

  return null;
};

const ContactForm = ({
  formData,
  onFormChange,
  onSubmit,
  status,
  errorMessage,
  onDismiss,
}) => (
  <motion.div
    className="p-6 sm:p-8 bg-muted rounded-xl shadow-lg"
    variants={animations.card}
  >
    <form onSubmit={onSubmit} className="space-y-8">
      <FormField
        name="name"
        value={formData.name}
        onChange={onFormChange}
        disabled={status === "sending"}
        label="Your Name"
        required
      />
      <FormField
        name="email"
        type="email"
        value={formData.email}
        onChange={onFormChange}
        disabled={status === "sending"}
        label="Your Email"
        required
      />
      <FormField
        name="message"
        type="textarea"
        value={formData.message}
        onChange={onFormChange}
        disabled={status === "sending"}
        label="Your Message"
        rows={10}
        required
      />

      {/* Honeypot field */}
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={onFormChange}
        className="hidden"
        tabIndex="-1"
        autoComplete="off"
      />

      <SubmitButton status={status} />
      <StatusMessage
        status={status}
        errorMessage={errorMessage}
        onDismiss={onDismiss}
      />
    </form>
  </motion.div>
);

const Footer = () => (
  <motion.div
    className="py-6 text-center shadow-sm"
    variants={animations.item}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    <p className="text-sm text-muted-foreground">
      We aim to respond to all inquiries within 24 hours. Thank you for reaching
      out!
    </p>
  </motion.div>
);

// Main component
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const { validateForm } = useFormValidation();
  const { copiedEmail, copiedPhone, copyToClipboard } = useClipboard();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const getErrorMessage = (error) => {
    const errorMessages = {
      "Too many requests":
        "Too many submissions. Please try again in a minute.",
      Forbidden: "Submission not allowed from this origin.",
      "Bot detected": "Bot detection triggered. Please try again.",
    };
    return (
      errorMessages[error] ||
      error ||
      "Failed to send message. Please try again."
    );
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const validationError = validateForm(formData);
      if (validationError) {
        setStatus("error");
        setErrorMessage(validationError);
        return;
      }

      setStatus("sending");
      setErrorMessage("");

      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.success) {
          setStatus("success");
          setFormData({ name: "", email: "", message: "", website: "" });
        } else {
          setStatus("error");
          setErrorMessage(getErrorMessage(result.error));
        }
      } catch (error) {
        setStatus("error");
        setErrorMessage(
          "Network error. Please check your connection and try again."
        );
      }
    },
    [formData, validateForm]
  );

  const dismissMessage = useCallback(() => {
    setStatus("idle");
    setErrorMessage("");
  }, []);

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="w-full max-w-7xl mx-auto space-y-8"
          variants={animations.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
            <ContactInfoCard
              copiedEmail={copiedEmail}
              copiedPhone={copiedPhone}
              copyToClipboard={copyToClipboard}
              isDisabled={status === "sending"}
            />
            <ContactForm
              formData={formData}
              onFormChange={handleFormChange}
              onSubmit={handleSubmit}
              status={status}
              errorMessage={errorMessage}
              onDismiss={dismissMessage}
            />
          </div>
          <motion.div
            className="w-full bg-muted rounded-xl shadow-lg overflow-hidden"
            variants={animations.card}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.2059085066676!2d31.3274294!3d30.088288699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583e216c7ab29d%3A0x94859a50b2f2408a!2sEmc!5e0!3m2!1sen!2seg!4v1757522980194!5m2!1sen!2seg"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}