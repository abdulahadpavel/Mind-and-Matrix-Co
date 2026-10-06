-- Case studies shown at /case-studies, edited in the admin panel
CREATE TABLE case_studies (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+([_-][a-z0-9]+)*$'),
  title           text NOT NULL,
  client          text NOT NULL DEFAULT '',
  industry        text NOT NULL DEFAULT '',
  tags            text[] NOT NULL DEFAULT '{}',
  summary         text NOT NULL DEFAULT '',
  -- Headline numbers: [{ "value": "21.2x", "label": "ROAS" }, ...]
  metrics         jsonb NOT NULL DEFAULT '[]',
  cover_url       text NOT NULL DEFAULT '',
  cover_alt       text NOT NULL DEFAULT '',
  body            text NOT NULL DEFAULT '',
  seo_title       text NOT NULL DEFAULT '',
  seo_description text NOT NULL DEFAULT '',
  status          text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  featured        boolean NOT NULL DEFAULT false,
  sort_order      integer NOT NULL DEFAULT 0,
  published_at    timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  created_by      uuid REFERENCES admin_users(id) ON DELETE SET NULL,
  updated_by      uuid REFERENCES admin_users(id) ON DELETE SET NULL
);
CREATE INDEX case_studies_public_idx ON case_studies (status, sort_order, published_at DESC);

-- Files uploaded from the admin panel (images, PDFs…), served at /files/<id>/<name>
CREATE TABLE uploads (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  mime        text NOT NULL,
  size        integer NOT NULL,
  data        bytea NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  uploaded_by uuid REFERENCES admin_users(id) ON DELETE SET NULL
);
CREATE INDEX uploads_created_idx ON uploads (created_at DESC);
