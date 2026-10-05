import { statusLabel } from "@/lib/config";

export default function StatusPill({ status }) {
  return <span className={`adm-pill adm-pill-${status}`}>{statusLabel(status)}</span>;
}
