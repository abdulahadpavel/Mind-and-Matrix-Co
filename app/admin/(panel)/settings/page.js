import { requireOwner } from "@/lib/auth";
import { getSetting } from "@/lib/settings";
import { saveBookingAction } from "../../actions";
import BookingSettingsForm from "./BookingSettingsForm";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  await requireOwner();
  const [link, url] = await Promise.all([getSetting("booking_link"), getSetting("booking_url")]);

  return (
    <>
      <header className="adm-page-head">
        <div>
          <h1>Settings</h1>
          <p>Website settings that apply as soon as you save — no redeploy needed.</p>
        </div>
      </header>

      <section className="adm-card adm-card-pad adm-settings">
        <h2>Meeting booking calendar</h2>
        <p className="adm-muted">
          After someone sends a form, a pop-up shows this Google Calendar booking page so they can pick a time for a
          call. Google sends both of you the invite and Meet link. Leave the field empty to turn the pop-up off.
        </p>
        <BookingSettingsForm action={saveBookingAction} link={link} />
        <p className="adm-muted adm-small">
          Find the link in Google Calendar → your appointment schedule → <b>Share</b> → copy the booking page link.
        </p>

        {url && (
          <div className="adm-preview">
            <div className="adm-card-head">
              <h3>Preview — what visitors see</h3>
              <a className="adm-link" href={url} target="_blank" rel="noopener">Open in new tab ↗</a>
            </div>
            <iframe src={url} title="Booking calendar preview" loading="lazy" />
          </div>
        )}
      </section>
    </>
  );
}
