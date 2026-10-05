"use client";

import { useActionState, useEffect, useRef } from "react";

// A form bound to a server action that returns { error } or { ok }.
export default function ActionForm({ action, children, successMessage, resetOnSuccess = true, className }) {
  const [state, formAction] = useActionState(action, null);
  const ref = useRef(null);

  useEffect(() => {
    if (state?.ok && resetOnSuccess) ref.current?.reset();
  }, [state, resetOnSuccess]);

  return (
    <form ref={ref} action={formAction} className={className}>
      {children}
      {state?.error && <p className="adm-alert adm-alert-err" role="alert">{state.error}</p>}
      {state?.ok && successMessage && <p className="adm-alert adm-alert-ok" role="status">{successMessage}</p>}
    </form>
  );
}
