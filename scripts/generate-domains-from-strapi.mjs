import { mkdir, readFile, writeFile } from 'node:fs/promises';
import console from 'node:console';
import path from 'node:path';
import process from 'node:process';
import { URL } from 'node:url';

const ROOT = process.cwd();
const ENV_FILE = path.join(ROOT, '.env', 'strapi.env');
const OUTPUT_FILE = path.join(ROOT, 'src', 'layouts', 'components', 'data', 'domains.generated.json');

function parseEnvFile(content) {
  const values = {};
  const lines = content.split(/\r?\n/);
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const idx = line.indexOf('=');
    if (idx <= 0) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }
  return values;
}

async function loadEnvFromFileIfPresent() {
  try {
    const content = await readFile(ENV_FILE, 'utf8');
    const parsed = parseEnvFile(content);
    for (const [key, value] of Object.entries(parsed)) {
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // Optional local env file.
  }
}

function resolveStatus() {
  if (process.env.STRAPI_STATUS) {
    return process.env.STRAPI_STATUS;
  }
  const netlifyContext = process.env.CONTEXT || process.env.NETLIFY_CONTEXT;
  if (netlifyContext === 'production') {
    return 'published';
  }
  return 'draft';
}

function getFieldValue(item, field) {
  if (Object.prototype.hasOwnProperty.call(item, field)) {
    return item[field];
  }
  if (item.attributes && Object.prototype.hasOwnProperty.call(item.attributes, field)) {
    return item.attributes[field];
  }
  return undefined;
}

function normalizeDomain(item) {
  const key = getFieldValue(item, 'key');
  const name = getFieldValue(item, 'name');
  const description = getFieldValue(item, 'description');
  const icon = getFieldValue(item, 'icon');
  const enabled = getFieldValue(item, 'enabled');

  return {
    key,
    name,
    description,
    icon,
    enabled: Boolean(enabled)
  };
}

function validateDomains(domains) {
  if (!Array.isArray(domains) || domains.length === 0) {
    throw new Error('Keine Domain-Daten aus Strapi erhalten.');
  }

  for (const domain of domains) {
    const required = ['key', 'name', 'description', 'icon'];
    for (const field of required) {
      if (typeof domain[field] !== 'string' || !domain[field].trim()) {
        throw new Error(`Ungültiges Feld ${field} in Domain ${JSON.stringify(domain)}`);
      }
    }
    if (typeof domain.enabled !== 'boolean') {
      throw new Error(`Ungültiges Feld enabled in Domain ${JSON.stringify(domain)}`);
    }
  }
}

async function main() {
  await loadEnvFromFileIfPresent();

  const baseUrl = process.env.STRAPI_URL;
  const token = process.env.STRAPI_READONLY_TOKEN;
  const strictMode = process.env.STRAPI_DOMAINS_STRICT === 'true';
  const status = resolveStatus();

  if (!baseUrl || !token) {
    const msg = 'STRAPI_URL oder STRAPI_READONLY_TOKEN fehlt. Nutze bestehende domains.generated.json.';
    if (strictMode) {
      throw new Error(msg);
    }
    console.warn(`[domains] ${msg}`);
    return;
  }

  const endpoint = new URL('/api/domains', baseUrl);
  endpoint.searchParams.set('status', status);
  endpoint.searchParams.set('pagination[pageSize]', '200');

  let response;
  try {
    response = await globalThis.fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    if (strictMode) {
      throw error;
    }
    console.warn(`[domains] Strapi nicht erreichbar. Nutze bestehende domains.generated.json. ${String(error)}`);
    return;
  }

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    const msg = `Strapi-Request fehlgeschlagen (${response.status} ${response.statusText}). ${body}`;
    if (strictMode) {
      throw new Error(msg);
    }
    console.warn(`[domains] ${msg}`);
    return;
  }

  const payload = await response.json();
  const data = Array.isArray(payload?.data) ? payload.data : [];
  const domains = data.map(normalizeDomain);

  validateDomains(domains);

  domains.sort((a, b) => a.key.localeCompare(b.key));

  await mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await writeFile(OUTPUT_FILE, `${JSON.stringify(domains, null, 2)}\n`, 'utf8');
  console.log(`[domains] ${domains.length} Domains geschrieben (${status}) -> ${path.relative(ROOT, OUTPUT_FILE)}`);
}

main().catch(error => {
  console.error('[domains] Generierung fehlgeschlagen:', error);
  process.exit(1);
});
