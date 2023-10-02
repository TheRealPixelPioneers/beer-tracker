import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_CONNECTION_STRING,
});

// NOTE: Templating copied from @vercel/postgres package!
function sqlTemplate(
  strings,
  ...values
) {
  if (!isTemplateStringsArray(strings) || !Array.isArray(values)) {
    throw new Error(
      'incorrect_tagged_template_call',
      "It looks like you tried to call `sql` as a function. Make sure to use it as a tagged template.\n\tExample: sql`SELECT * FROM users`, not sql('SELECT * FROM users')",
    );
  }

  let result = strings[0] ?? '';

  for (let i = 1; i < strings.length; i++) {
    result += `$${i}${strings[i] ?? ''}`;
  }

  return [result, values];
}

function isTemplateStringsArray(
  strings,
) {
  return (
    Array.isArray(strings) && 'raw' in strings && Array.isArray(strings.raw)
  );
}

export function sql(strings, ...values) {
  const [query, params] = sqlTemplate(strings, ...values)
  console.log(query, params);
  return pool.query(query, params);
}