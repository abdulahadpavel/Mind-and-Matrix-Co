"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, pendingText, className = "adm-btn", confirm: confirmText, ...rest }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={className}
      disabled={pending}
      onClick={(e) => {
        if (confirmText && !window.confirm(confirmText)) e.preventDefault();
      }}
      {...rest}
    >
      {pending ? pendingText || "Saving…" : children}
    </button>
  );
}
