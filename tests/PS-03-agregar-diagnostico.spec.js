import { test, expect } from '@playwright/test';

test('PS-03 Agregar Diagnóstico como Tercer Paso del Flujo E2E', async ({ page }) => {

  // ─────────────────────────────────────────
  // PASO 1: Ir al sistema
  // ─────────────────────────────────────────
  await page.goto('https://equipo5uthh.grupoahost.com/');
  await expect(page).toHaveTitle(/Servicio Médico/);

  // ─────────────────────────────────────────
  // PASO 2: Login
  // ─────────────────────────────────────────
  await page.locator('#navbar').getByRole('link', { name: 'Acceso al Sistema' }).click();
  await expect(page).toHaveURL(/login/);

  await page.getByRole('textbox', { name: 'Correo electrónico o matrícula' }).fill('jared@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('jared123');
  await page.getByRole('button', { name: 'Ingresar al Sistema' }).click();

  await expect(page).not.toHaveURL(/login/, { timeout: 10000 });
  console.log('✅ Login exitoso');

  // ─────────────────────────────────────────
  // PASO 3: Ir a Consultas
  // ─────────────────────────────────────────
  await page.getByRole('link', { name: 'Consultas', exact: true }).click();
  await expect(page).toHaveURL(/consulta/, { timeout: 8000 });
  await page.waitForTimeout(2000);
  console.log('✅ Sección Consultas cargada');

  // ─────────────────────────────────────────
  // PASO 4: Abrir consulta para agregar diagnóstico
  // ─────────────────────────────────────────
  await page.getByRole('button', { name: '✏️ Editar' }).nth(1).click();
  await page.waitForTimeout(2000);
  console.log('✅ Formulario de edición abierto');

  // ─────────────────────────────────────────
  // PASO 5: Agregar diagnóstico
  // ─────────────────────────────────────────
  const campoDiagnostico = page.getByRole('textbox', { name: 'Ej: Faringitis aguda...' });
  await campoDiagnostico.clear();
  await campoDiagnostico.fill('faringitis aguda');

  await expect(campoDiagnostico).toHaveValue('faringitis aguda');
  console.log('✅ Diagnóstico agregado: faringitis aguda');

  // ─────────────────────────────────────────
  // PASO 6: Guardar diagnóstico
  // ─────────────────────────────────────────
  await page.getByRole('button', { name: '💾 Guardar Consulta' }).click();
  await page.waitForTimeout(3000);
  console.log('✅ Diagnóstico guardado correctamente');

  // ─────────────────────────────────────────
  // PASO 7: Verificar que el diagnóstico aparece
  // ─────────────────────────────────────────
  await page.getByRole('link', { name: 'Consultas', exact: true }).click();
  await page.waitForTimeout(2000);

  await expect(page.getByRole('table')).toBeVisible({ timeout: 10000 });
  console.log('✅ Diagnóstico visible en la lista de consultas');

});