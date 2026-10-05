-- Site settings editable from the admin panel (e.g. the booking calendar link)
CREATE TABLE settings (
  key        text PRIMARY KEY,
  value      text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES admin_users(id) ON DELETE SET NULL
);
