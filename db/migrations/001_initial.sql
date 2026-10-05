-- Admin accounts (passwords are scrypt hashes, never plain text)
CREATE TABLE admin_users (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email         text NOT NULL UNIQUE CHECK (email = lower(email)),
  name          text NOT NULL DEFAULT '',
  role          text NOT NULL DEFAULT 'admin' CHECK (role IN ('owner', 'admin')),
  password_hash text NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now(),
  last_login_at timestamptz
);

-- Login sessions (the cookie holds a random token; only its SHA-256 hash is stored)
CREATE TABLE admin_sessions (
  token_hash   text PRIMARY KEY,
  user_id      uuid NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  created_at   timestamptz NOT NULL DEFAULT now(),
  expires_at   timestamptz NOT NULL,
  ip           text NOT NULL DEFAULT '',
  user_agent   text NOT NULL DEFAULT ''
);
CREATE INDEX admin_sessions_user_idx ON admin_sessions (user_id);

-- Failed login attempts, used to slow down password guessing
CREATE TABLE login_attempts (
  id         bigserial PRIMARY KEY,
  email      text NOT NULL,
  ip         text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX login_attempts_lookup_idx ON login_attempts (ip, created_at);

-- Website form submissions
CREATE TABLE submissions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  status       text NOT NULL DEFAULT 'new'
               CHECK (status IN ('new', 'contacted', 'qualified', 'won', 'lost', 'spam')),
  name         text NOT NULL,
  email        text NOT NULL,
  company      text NOT NULL,
  phone        text NOT NULL DEFAULT '',
  website      text NOT NULL DEFAULT '',
  partner_type text NOT NULL DEFAULT '',
  ad_spend     text NOT NULL DEFAULT '',
  services     text[] NOT NULL DEFAULT '{}',
  message      text NOT NULL DEFAULT '',
  form_source  text NOT NULL DEFAULT '',
  page_url     text NOT NULL DEFAULT '',
  referrer     text NOT NULL DEFAULT '',
  utm_source   text NOT NULL DEFAULT '',
  utm_medium   text NOT NULL DEFAULT '',
  utm_campaign text NOT NULL DEFAULT '',
  gclid        text NOT NULL DEFAULT '',
  fbclid       text NOT NULL DEFAULT '',
  ip           text NOT NULL DEFAULT '',
  user_agent   text NOT NULL DEFAULT '',
  -- Soft delete: rows in the trash keep all their data until permanently deleted
  deleted_at   timestamptz,
  deleted_by   uuid REFERENCES admin_users(id) ON DELETE SET NULL
);
CREATE INDEX submissions_created_idx ON submissions (created_at DESC);
CREATE INDEX submissions_status_idx ON submissions (status) WHERE deleted_at IS NULL;
CREATE INDEX submissions_ip_idx ON submissions (ip, created_at);

-- Internal notes on a submission
CREATE TABLE submission_notes (
  id            bigserial PRIMARY KEY,
  submission_id uuid NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  author_id     uuid REFERENCES admin_users(id) ON DELETE SET NULL,
  author_name   text NOT NULL DEFAULT '',
  body          text NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX submission_notes_submission_idx ON submission_notes (submission_id, created_at);

-- Audit trail of every change (kept even if a submission is permanently deleted)
CREATE TABLE activity_log (
  id            bigserial PRIMARY KEY,
  submission_id uuid REFERENCES submissions(id) ON DELETE SET NULL,
  actor_id      uuid REFERENCES admin_users(id) ON DELETE SET NULL,
  actor_name    text NOT NULL DEFAULT '',
  action        text NOT NULL,
  detail        jsonb NOT NULL DEFAULT '{}',
  created_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX activity_log_submission_idx ON activity_log (submission_id, created_at);
CREATE INDEX activity_log_created_idx ON activity_log (created_at DESC);
