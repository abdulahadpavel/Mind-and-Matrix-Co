"use client";

import { useActionState } from "react";
import SubmitButton from "../../_components/SubmitButton";

export default function BookingSettingsForm({ action, link }) {
  const [state, formAction] = useActionState(action, null);
  return (
    <form action={formAction} className="adm-form">
      <label>
        Google Calendar booking page link
        <input
          name="booking_link"
          defaultValue={link}
          placeholder="https://calendar.app.google/…"
          inputMode="url"
          autoComplete="off"
        />
      </label>
      <SubmitButton className="adm-btn adm-btn-primary" pendingText="Checking link…">Save</SubmitButton>
      {state?.error && <p className="adm-alert adm-alert-err" role="alert">{state.error}</p>}
      {state?.ok && <p className="adm-alert adm-alert-ok" role="status">{state.message}</p>}
    </form>
  );
}
