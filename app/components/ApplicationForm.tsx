"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";

type FormValues = {
  firstName: string;
  mobile: string;
  email: string;
  ageRange: string;
  gender: string;
  nationality: string;
  area: string;
  kuwaitDuration: string;
  language: string;
  circleInterest: string;
  availability: string[];
  groupPreference: string;
  interestGoal: string;
  matchNotes: string;
  paymentReadiness: string;
  consentAge: boolean;
  consentPolicy: boolean;
};

const initialValues: FormValues = {
  firstName: "",
  mobile: "",
  email: "",
  ageRange: "",
  gender: "",
  nationality: "",
  area: "",
  kuwaitDuration: "",
  language: "",
  circleInterest: "",
  availability: [],
  groupPreference: "",
  interestGoal: "",
  matchNotes: "",
  paymentReadiness: "",
  consentAge: false,
  consentPolicy: false,
};

const ageRanges = ["21–27", "28–34", "35–44", "45+"];
const genders = ["Male", "Female", "Prefer not to say"];
const nationalities = ["Kuwaiti", "Indian", "Egyptian", "Filipino", "Pakistani", "Bangladeshi", "Sri Lankan", "Lebanese", "Jordanian", "Syrian", "Nepalese", "British", "American", "Canadian", "Other", "Prefer not to say"];
const kuwaitDurations = ["Less than 3 months", "3–12 months", "1–3 years", "More than 3 years", "Born or raised in Kuwait"];
const languages = ["English", "Arabic", "English & Arabic", "Another language"];
const availabilityOptions = ["Friday", "Saturday", "Weekday evenings"];
const interestGoals = ["New friends in Kuwait", "People with similar interests", "Weekend social plans", "Professional friendships", "Activity partners", "A welcoming circle as a newcomer"];
const stepLabels = ["About you", "Your circle", "Confirm"];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9()\s-]{7,20}$/;

// The applicant's own WhatsApp message to Meet & Belong's number — they review
// and send it themselves, so nothing here confirms delivery on our side.
const whatsappNumber = "96541103254";

function describedBy(...ids: (string | false | undefined)[]): string | undefined {
  const list = ids.filter(Boolean) as string[];
  return list.length ? list.join(" ") : undefined;
}

function buildWhatsappMessage(values: FormValues): string {
  return [
    "Hello Meet & Belong, I’d like to apply for a circle.", "",
    `First name: ${values.firstName}`,
    `Mobile: ${values.mobile}`,
    values.email && `Email: ${values.email}`,
    `Age range: ${values.ageRange}`,
    `Gender: ${values.gender}`,
    `Nationality: ${values.nationality}`,
    `Area: ${values.area}`,
    `Time in Kuwait: ${values.kuwaitDuration}`,
    `Preferred language: ${values.language}`,
    `Circle preference: ${values.circleInterest}`,
    `Available: ${values.availability.join(", ")}`,
    `Group preference: ${values.groupPreference}`,
    `Hoping to find: ${values.interestGoal}`,
    values.matchNotes && `Notes: ${values.matchNotes}`,
    `Comfortable paying KD 8–10: ${values.paymentReadiness}`,
  ].filter(Boolean).join("\n");
}

type Props = { circleOptions: string[] };

export default function ApplicationForm({ circleOptions }: Props) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const fieldRefs = useRef<Record<string, HTMLElement | null>>({});

  const setField = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  };

  const toggleAvailability = (day: string) => {
    setValues((prev) => {
      const has = prev.availability.includes(day);
      return { ...prev, availability: has ? prev.availability.filter((d) => d !== day) : [...prev.availability, day] };
    });
    setErrors((prev) => {
      if (!prev.availability) return prev;
      const next = { ...prev };
      delete next.availability;
      return next;
    });
  };

  function validateStep(index: number): Record<string, string> {
    const next: Record<string, string> = {};
    if (index === 0) {
      if (!values.firstName.trim()) next.firstName = "Enter your first name.";
      if (!values.mobile.trim()) next.mobile = "Enter a mobile number.";
      else if (!phonePattern.test(values.mobile.trim())) next.mobile = "Enter a valid mobile number.";
      if (values.email.trim() && !emailPattern.test(values.email.trim())) next.email = "Enter a valid email address.";
      if (!values.ageRange) next.ageRange = "Choose an age range.";
      if (!values.gender) next.gender = "Choose an option.";
      if (!values.nationality.trim()) next.nationality = "Enter your nationality.";
      if (!values.area.trim()) next.area = "Enter your area in Kuwait.";
      if (!values.kuwaitDuration) next.kuwaitDuration = "Choose an option.";
    } else if (index === 1) {
      if (!values.language) next.language = "Choose your preferred language.";
      if (!values.circleInterest) next.circleInterest = "Choose a circle preference.";
      if (values.availability.length === 0) next.availability = "Choose at least one option.";
      if (!values.groupPreference) next.groupPreference = "Choose a group preference.";
      if (!values.interestGoal) next.interestGoal = "Choose what you’re hoping to find.";
    } else if (index === 2) {
      if (!values.paymentReadiness) next.paymentReadiness = "Choose an option.";
      if (!values.consentAge) next.consentAge = "This confirmation is required.";
      if (!values.consentPolicy) next.consentPolicy = "You must agree to continue.";
    }
    return next;
  }

  const fieldOrder = [
    "firstName", "mobile", "email", "ageRange", "gender", "nationality", "area", "kuwaitDuration",
    "language", "circleInterest", "availability", "groupPreference", "interestGoal",
    "paymentReadiness", "consentAge", "consentPolicy",
  ];

  const focusFirstError = (errs: Record<string, string>) => {
    const first = fieldOrder.find((key) => errs[key]);
    if (!first) return;
    fieldRefs.current[first]?.focus();
  };

  const handleContinue = () => {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      focusFirstError(stepErrors);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, stepLabels.length - 1));
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const stepErrors = validateStep(2);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      focusFirstError(stepErrors);
      return;
    }
    setErrors({});
    const message = buildWhatsappMessage(values);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setStatus("success");
  };

  const groupOptions =
    values.gender === "Male"
      ? ["Mixed group", "Men-only", "Either is comfortable"]
      : values.gender === "Female"
      ? ["Mixed group", "Women-only", "Either is comfortable"]
      : ["Mixed group", "Either is comfortable"];

  if (status === "success") {
    return (
      <div className="form-status-success" role="status" aria-live="polite">
        <h3>Almost done — review and send.</h3>
        <p>We opened WhatsApp with your answers filled in. Review the message and hit send to complete your application.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <ol className="form-progress" aria-label="Application steps">
        {stepLabels.map((label, index) => (
          <li key={label} className={index === step ? "current" : index < step ? "done" : ""} aria-current={index === step ? "step" : undefined}>
            <span>{index + 1}</span> {label}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div className="form-step">
          <div className="form-grid">
            <label>
              First name
              <input ref={(el) => { fieldRefs.current.firstName = el; }} name="firstName" value={values.firstName} onChange={(e) => setField("firstName", e.target.value)} aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? "err-firstName" : undefined} required />
              {errors.firstName && <span className="field-error" id="err-firstName">{errors.firstName}</span>}
            </label>

            <label>
              Mobile number
              <input ref={(el) => { fieldRefs.current.mobile = el; }} type="tel" name="mobile" value={values.mobile} onChange={(e) => setField("mobile", e.target.value)} placeholder="+965 5xxx xxxx" aria-invalid={!!errors.mobile} aria-describedby={describedBy("hint-mobile", errors.mobile && "err-mobile")} required />
              <small id="hint-mobile">Used only to contact you about a suitable circle.</small>
              {errors.mobile && <span className="field-error" id="err-mobile">{errors.mobile}</span>}
            </label>

            <label>
              Email address <small>(optional)</small>
              <input ref={(el) => { fieldRefs.current.email = el; }} type="email" name="email" value={values.email} onChange={(e) => setField("email", e.target.value)} placeholder="you@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />
              {errors.email && <span className="field-error" id="err-email">{errors.email}</span>}
            </label>

            <label>
              Age range
              <select ref={(el) => { fieldRefs.current.ageRange = el; }} name="ageRange" value={values.ageRange} onChange={(e) => setField("ageRange", e.target.value)} aria-invalid={!!errors.ageRange} aria-describedby={errors.ageRange ? "err-ageRange" : undefined} required>
                <option value="" disabled>Choose one</option>
                {ageRanges.map((range) => <option key={range}>{range}</option>)}
              </select>
              {errors.ageRange && <span className="field-error" id="err-ageRange">{errors.ageRange}</span>}
            </label>

            <label>
              Gender
              <select ref={(el) => { fieldRefs.current.gender = el; }} name="gender" value={values.gender} onChange={(e) => setField("gender", e.target.value)} aria-invalid={!!errors.gender} aria-describedby={describedBy("hint-gender", errors.gender && "err-gender")} required>
                <option value="" disabled>Choose one</option>
                {genders.map((g) => <option key={g}>{g}</option>)}
              </select>
              <small id="hint-gender">Used only to create comfortable, balanced groups.</small>
              {errors.gender && <span className="field-error" id="err-gender">{errors.gender}</span>}
            </label>

            <label>
              Nationality
              <input ref={(el) => { fieldRefs.current.nationality = el; }} name="nationality" list="nationality-options" value={values.nationality} onChange={(e) => setField("nationality", e.target.value)} aria-invalid={!!errors.nationality} aria-describedby={errors.nationality ? "err-nationality" : undefined} required />
              <datalist id="nationality-options">
                {nationalities.map((n) => <option key={n} value={n} />)}
              </datalist>
              {errors.nationality && <span className="field-error" id="err-nationality">{errors.nationality}</span>}
            </label>

            <label>
              Area in Kuwait
              <input ref={(el) => { fieldRefs.current.area = el; }} name="area" value={values.area} onChange={(e) => setField("area", e.target.value)} placeholder="e.g. Salmiya" aria-invalid={!!errors.area} aria-describedby={errors.area ? "err-area" : undefined} required />
              {errors.area && <span className="field-error" id="err-area">{errors.area}</span>}
            </label>

            <label>
              How long have you lived in Kuwait?
              <select ref={(el) => { fieldRefs.current.kuwaitDuration = el; }} name="kuwaitDuration" value={values.kuwaitDuration} onChange={(e) => setField("kuwaitDuration", e.target.value)} aria-invalid={!!errors.kuwaitDuration} aria-describedby={errors.kuwaitDuration ? "err-kuwaitDuration" : undefined} required>
                <option value="" disabled>Choose one</option>
                {kuwaitDurations.map((d) => <option key={d}>{d}</option>)}
              </select>
              {errors.kuwaitDuration && <span className="field-error" id="err-kuwaitDuration">{errors.kuwaitDuration}</span>}
            </label>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="form-step">
          <div className="form-grid">
            <label>
              Preferred language
              <select ref={(el) => { fieldRefs.current.language = el; }} name="language" value={values.language} onChange={(e) => setField("language", e.target.value)} aria-invalid={!!errors.language} aria-describedby={errors.language ? "err-language" : undefined} required>
                <option value="" disabled>Choose one</option>
                {languages.map((l) => <option key={l}>{l}</option>)}
              </select>
              {errors.language && <span className="field-error" id="err-language">{errors.language}</span>}
            </label>

            <label>
              Circle preference
              <select ref={(el) => { fieldRefs.current.circleInterest = el; }} name="circleInterest" value={values.circleInterest} onChange={(e) => setField("circleInterest", e.target.value)} aria-invalid={!!errors.circleInterest} aria-describedby={errors.circleInterest ? "err-circleInterest" : undefined} required>
                <option value="" disabled>Choose one</option>
                {circleOptions.map((c) => <option key={c}>{c}</option>)}
              </select>
              {errors.circleInterest && <span className="field-error" id="err-circleInterest">{errors.circleInterest}</span>}
            </label>

            <label>
              Group preference
              <select ref={(el) => { fieldRefs.current.groupPreference = el; }} name="groupPreference" value={values.groupPreference} onChange={(e) => setField("groupPreference", e.target.value)} aria-invalid={!!errors.groupPreference} aria-describedby={errors.groupPreference ? "err-groupPreference" : undefined} required>
                <option value="" disabled>Choose one</option>
                {groupOptions.map((g) => <option key={g}>{g}</option>)}
              </select>
              {errors.groupPreference && <span className="field-error" id="err-groupPreference">{errors.groupPreference}</span>}
            </label>

            <label>
              What are you hoping to find?
              <select ref={(el) => { fieldRefs.current.interestGoal = el; }} name="interestGoal" value={values.interestGoal} onChange={(e) => setField("interestGoal", e.target.value)} aria-invalid={!!errors.interestGoal} aria-describedby={errors.interestGoal ? "err-interestGoal" : undefined} required>
                <option value="" disabled>Choose one</option>
                {interestGoals.map((g) => <option key={g}>{g}</option>)}
              </select>
              {errors.interestGoal && <span className="field-error" id="err-interestGoal">{errors.interestGoal}</span>}
            </label>
          </div>

          <fieldset ref={(el) => { fieldRefs.current.availability = el ? el.querySelector("input") : null; }}>
            <legend>When are you usually available?</legend>
            {availabilityOptions.map((day) => (
              <label className="check" key={day}>
                <input type="checkbox" checked={values.availability.includes(day)} onChange={() => toggleAvailability(day)} />
                <span>{day}</span>
              </label>
            ))}
            {errors.availability && <span className="field-error" id="err-availability">{errors.availability}</span>}
          </fieldset>

          <label className="textarea-field">
            Anything that would help us match you well? <small>(optional)</small>
            <textarea
              name="matchNotes"
              value={values.matchNotes}
              maxLength={300}
              onChange={(e) => setField("matchNotes", e.target.value)}
              placeholder="Interests, preferred atmosphere or anything that helps us create a comfortable circle."
              aria-describedby="matchNotes-counter"
            />
            <span className="char-counter" id="matchNotes-counter">{values.matchNotes.length}/300</span>
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="form-step">
          <fieldset ref={(el) => { fieldRefs.current.paymentReadiness = el ? el.querySelector("input") : null; }}>
            <legend>If we match you with a suitable circle, are you comfortable paying KD 8–10 per person for the gathering?</legend>
            <label className="radio">
              <input type="radio" name="paymentReadiness" value="Yes, I’m comfortable paying KD 8–10" checked={values.paymentReadiness === "Yes, I’m comfortable paying KD 8–10"} onChange={(e) => setField("paymentReadiness", e.target.value)} required />
              <span>Yes, I’m comfortable paying KD 8–10</span>
            </label>
            <label className="radio">
              <input type="radio" name="paymentReadiness" value="No — I’m only interested in free gatherings" checked={values.paymentReadiness === "No — I’m only interested in free gatherings"} onChange={(e) => setField("paymentReadiness", e.target.value)} required />
              <span>No — I’m only interested in free gatherings</span>
            </label>
            {errors.paymentReadiness && <span className="field-error">{errors.paymentReadiness}</span>}
          </fieldset>

          <p className="payment-note">Applying is free. Payment is requested only after you review and confirm a specific circle.</p>

          <label className="consent">
            <input ref={(el) => { fieldRefs.current.consentAge = el; }} type="checkbox" checked={values.consentAge} onChange={(e) => setField("consentAge", e.target.checked)} aria-describedby={errors.consentAge ? "err-consentAge" : undefined} required />
            <span>I confirm that I’m 21 or older and interested in friendship-only gatherings.</span>
          </label>
          {errors.consentAge && <span className="field-error" id="err-consentAge">{errors.consentAge}</span>}

          <label className="consent">
            <input ref={(el) => { fieldRefs.current.consentPolicy = el; }} type="checkbox" checked={values.consentPolicy} onChange={(e) => setField("consentPolicy", e.target.checked)} aria-describedby={errors.consentPolicy ? "err-consentPolicy" : undefined} required />
            <span>I agree to the <Link href="/privacy">Privacy Notice</Link> and <Link href="/code-of-conduct">Code of Conduct</Link>.</span>
          </label>
          {errors.consentPolicy && <span className="field-error" id="err-consentPolicy">{errors.consentPolicy}</span>}
        </div>
      )}

      <div className="form-nav">
        {step > 0 && (
          <button type="button" className="button button-outline" onClick={handleBack}>Back</button>
        )}
        {step < stepLabels.length - 1 ? (
          <button type="button" className="button" onClick={handleContinue}>Continue</button>
        ) : (
          <button className="button" type="submit">Submit application <span>↗</span></button>
        )}
      </div>
    </form>
  );
}
