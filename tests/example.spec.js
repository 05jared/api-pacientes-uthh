import { test, expect } from '@playwright/test';

// ── Helper: inyecta token falso de reCAPTCHA en el frontend ──
async function bypassRecaptcha(page) {
  await page.evaluate(() => {
    window.grecaptcha = {
      getResponse: () => 'bypass-test-token',
      ready: (cb) => cb && cb(),
      execute: () => Promise.resolve('bypass-test-token'),
      reset: () => {},
    };
    const ta = document.querySelector('textarea[name="g-recaptcha-response"]');
    if (ta) ta.value = 'bypass-test-token';
  });
}

// ── Helper: intercepta peticiones a Google reCAPTCHA ──
async function interceptarRecaptcha(page) {
  await page.route('**\/recaptcha\/**', (route) =>
    route.fulfill({ status: 200, body: JSON.stringify({ success: true }) })
  );
  await page.route('**\/google.com\/recaptcha\/**', (route) =>
    route.fulfill({ status: 200, body: 'OK' })
  );
}

// ─────────────────────────────────────────────────────────────
// TEST 1: Login exitoso
// ─────────────────────────────────────────────────────────────
test('Login sistema UTHH - credenciales válidas', async ({ page }) => {
  await interceptarRecaptcha(page);
  await page.goto('https://equipo5uthh.grupoahost.com/');

  await page.getByRole('link', { name: 'Acceso al Sistema' }).click();

  await bypassRecaptcha(page);

  await page.getByRole('textbox', { name: 'Correo electrónico o matrícula' })
    .fill('jared@gmail.com');

  await page.getByRole('textbox', { name: 'Contraseña' })
    .fill('123456');

  await bypassRecaptcha(page); // segunda inyección por si el DOM se recargó

  await page.getByRole('button', { name: 'Ingresar al Sistema' }).click();

  await expect(page.getByText('Consultas')).toBeVisible({ timeout: 10000 });
});

// ─────────────────────────────────────────────────────────────
// TEST 2: Login con credenciales incorrectas
// ─────────────────────────────────────────────────────────────
test('Login sistema UTHH - credenciales inválidas', async ({ page }) => {
  await interceptarRecaptcha(page);
  await page.goto('https://equipo5uthh.grupoahost.com/login.html');

  await bypassRecaptcha(page);

  await page.getByRole('textbox', { name: 'Correo electrónico o matrícula' })
    .fill('noexiste@gmail.com');

  await page.getByRole('textbox', { name: 'Contraseña' })
    .fill('wrongpassword');

  await bypassRecaptcha(page);

  await page.getByRole('button', { name: 'Ingresar al Sistema' }).click();

  await expect(page.getByText('Credenciales incorrectas')).toBeVisible({ timeout: 10000 });
});

// ─────────────────────────────────────────────────────────────
// TEST 3: Login sin datos
// ─────────────────────────────────────────────────────────────
test('Login sistema UTHH - campos vacíos', async ({ page }) => {
  await interceptarRecaptcha(page);
  await page.goto('https://equipo5uthh.grupoahost.com/login.html');

  await bypassRecaptcha(page);

  await page.getByRole('button', { name: 'Ingresar al Sistema' }).click();

  // Debe seguir en la página de login
  await expect(page).toHaveURL(/login/);
});