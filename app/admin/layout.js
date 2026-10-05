import "./admin.css";

export const metadata = {
  title: { default: "Admin", template: "%s · Admin · Mind and Matrix Co." },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return <div className="adm">{children}</div>;
}
