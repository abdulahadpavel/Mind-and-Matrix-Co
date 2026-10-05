"use client";

// A <select> that submits its form as soon as the value changes.
export default function AutoSubmitSelect({ children, ...props }) {
  return (
    <select {...props} onChange={(e) => e.currentTarget.form.requestSubmit()}>
      {children}
    </select>
  );
}
