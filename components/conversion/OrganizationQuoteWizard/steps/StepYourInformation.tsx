import type { StepProps } from "../types";
import styles from "../OrganizationQuoteWizard.module.css";

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA",
  "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR",
  "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

export function StepYourInformation({ state, updateField, errors }: StepProps) {
  return (
    <div className={styles.stepPanel}>
      <h2 className={styles.stepHeading}>Tell us where we&apos;re helping.</h2>
      <p className={styles.stepIntro}>Start with your contact information and the address where the organization project will take place.</p>

      <div className={styles.fieldGroup}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="oq-first-name" className={styles.label}>
              First Name
            </label>
            <input
              id="oq-first-name"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              value={state.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              className={styles.input}
              aria-invalid={errors.firstName ? true : undefined}
              aria-describedby={errors.firstName ? "oq-first-name-error" : undefined}
            />
            {errors.firstName ? (
              <p id="oq-first-name-error" className={styles.fieldError} role="alert">
                {errors.firstName}
              </p>
            ) : null}
          </div>
          <div className={styles.field}>
            <label htmlFor="oq-last-name" className={styles.label}>
              Last Name
            </label>
            <input
              id="oq-last-name"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              value={state.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              className={styles.input}
              aria-invalid={errors.lastName ? true : undefined}
              aria-describedby={errors.lastName ? "oq-last-name-error" : undefined}
            />
            {errors.lastName ? (
              <p id="oq-last-name-error" className={styles.fieldError} role="alert">
                {errors.lastName}
              </p>
            ) : null}
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="oq-street" className={styles.label}>
            Service Address — Street
          </label>
          <input
            id="oq-street"
            name="streetAddress"
            type="text"
            autoComplete="address-line1"
            required
            value={state.streetAddress}
            onChange={(e) => updateField("streetAddress", e.target.value)}
            className={styles.input}
            aria-invalid={errors.streetAddress ? true : undefined}
            aria-describedby={errors.streetAddress ? "oq-street-error" : undefined}
          />
          {errors.streetAddress ? (
            <p id="oq-street-error" className={styles.fieldError} role="alert">
              {errors.streetAddress}
            </p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label htmlFor="oq-street2" className={styles.label}>
            Address Line 2 <span className={styles.optionalTag}>(optional)</span>
          </label>
          <input
            id="oq-street2"
            name="addressLine2"
            type="text"
            autoComplete="address-line2"
            value={state.addressLine2}
            onChange={(e) => updateField("addressLine2", e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="oq-city" className={styles.label}>
            City
          </label>
          <input
            id="oq-city"
            name="city"
            type="text"
            autoComplete="address-level2"
            required
            value={state.city}
            onChange={(e) => updateField("city", e.target.value)}
            className={styles.input}
            aria-invalid={errors.city ? true : undefined}
            aria-describedby={errors.city ? "oq-city-error" : undefined}
          />
          {errors.city ? (
            <p id="oq-city-error" className={styles.fieldError} role="alert">
              {errors.city}
            </p>
          ) : null}
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="oq-state" className={styles.label}>
              State
            </label>
            <select
              id="oq-state"
              name="state"
              autoComplete="address-level1"
              required
              value={state.state}
              onChange={(e) => updateField("state", e.target.value)}
              className={styles.select}
              aria-invalid={errors.state ? true : undefined}
              aria-describedby={errors.state ? "oq-state-error" : undefined}
            >
              <option value="" disabled>
                Select state
              </option>
              {US_STATES.map((abbr) => (
                <option key={abbr} value={abbr}>
                  {abbr}
                </option>
              ))}
            </select>
            {errors.state ? (
              <p id="oq-state-error" className={styles.fieldError} role="alert">
                {errors.state}
              </p>
            ) : null}
          </div>
          <div className={styles.field}>
            <label htmlFor="oq-zip" className={styles.label}>
              ZIP Code
            </label>
            <input
              id="oq-zip"
              name="zip"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              required
              value={state.zip}
              onChange={(e) => updateField("zip", e.target.value)}
              className={styles.input}
              aria-invalid={errors.zip ? true : undefined}
              aria-describedby={errors.zip ? "oq-zip-error" : undefined}
            />
            {errors.zip ? (
              <p id="oq-zip-error" className={styles.fieldError} role="alert">
                {errors.zip}
              </p>
            ) : null}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="oq-phone" className={styles.label}>
              Phone Number
            </label>
            <input
              id="oq-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              value={state.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className={styles.input}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? "oq-phone-error" : undefined}
            />
            {errors.phone ? (
              <p id="oq-phone-error" className={styles.fieldError} role="alert">
                {errors.phone}
              </p>
            ) : null}
          </div>
          <div className={styles.field}>
            <label htmlFor="oq-email" className={styles.label}>
              Email Address
            </label>
            <input
              id="oq-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={state.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={styles.input}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "oq-email-error" : undefined}
            />
            {errors.email ? (
              <p id="oq-email-error" className={styles.fieldError} role="alert">
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
