import assert from 'assert';

export function validateEnvironment({
  MONGO_URL = '',
  PRIVATE_KEY = '',
  HCAPTCHA_SECRET = '',
}) {
  assert.notStrictEqual(MONGO_URL, '', 'MONGO_URL is not set.');
  assert.notStrictEqual(PRIVATE_KEY, '', 'PRIVATE_KEY is not set.');
  assert.notStrictEqual(HCAPTCHA_SECRET, '', 'HCAPTCHA_SECRET is not set.');
}
