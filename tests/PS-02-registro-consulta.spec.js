import { test, expect } from '@playwright/test';

test('PS-02 Registro de Consulta como Segundo Paso del Flujo E2E', async ({ page }) => {

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

  // Verificar que entró al sistema
  await expect(page).not.toHaveURL(/login/, { timeout: 10000 });
  console.log('✅ Login exitoso');

  // ─────────────────────────────────────────
  // PASO 3: Ir a Consultas
  // ─────────────────────────────────────────
  await page.getByRole('link', { name: 'Consultas', exact: true }).click();
  await expect(page).toHaveURL(/consulta/, { timeout: 8000 });
  console.log('✅ Sección Consultas cargada');

  // ─────────────────────────────────────────
  // PASO 4: Nueva Consulta
  // ─────────────────────────────────────────
  await page.getByRole('link', { name: '+ Nueva Consulta' }).click();
  await page.waitForTimeout(2000);
  console.log('✅ Formulario de nueva consulta abierto');

  // ─────────────────────────────────────────
  // PASO 5: Llenar formulario
  // ─────────────────────────────────────────

  // Seleccionar paciente
  await page.locator('#select-paciente').selectOption('4');

  // Horas
  await page.locator('#input-hora-entrada').fill('05:00');
  await page.locator('#input-hora-salida').fill('06:00');

  // Motivo y diagnóstico
  await page.getByRole('textbox', { name: 'Describe el motivo...' }).fill('HOLA');
  await page.getByRole('textbox', { name: 'Ej: Faringitis aguda...' }).fill('DOLOR DE CRANEO');
  await page.getByRole('textbox', { name: 'Observaciones adicionales...' }).fill('FRACTURA');

  // Medicamento
  await page.getByRole('textbox', { name: 'Ej: Amoxicilina 500mg' }).fill('PARACETAMOL');
  await page.getByRole('textbox', { name: 'Ej: 1 cápsula' }).fill('1 CAPSULA');
  await page.getByRole('textbox', { name: 'Ej: Cada 8 horas' }).fill('CADA 5 HORAS');
  await page.getByRole('textbox', { name: 'Ej: 7 días' }).fill('7 DIAS');
  await page.getByRole('textbox', { name: 'Ej: Tomar con alimentos...' }).fill('TOMAR ANTES DE DORMIR');

  console.log('✅ Formulario llenado correctamente');

  // ─────────────────────────────────────────
  // PASO 6: Guardar consulta
  // ─────────────────────────────────────────
  await page.getByRole('button', { name: '💾 Guardar Consulta' }).click();
  await page.waitForTimeout(3000);
  console.log('✅ Consulta guardada');

  // ─────────────────────────────────────────
  // PASO 7: Verificar que se guardó
  // ─────────────────────────────────────────
  await page.getByRole('link', { name: 'Consultas', exact: true }).click();
  await page.waitForTimeout(3000);

  // Verificar que aparece en la lista
  await expect(page.getByRole('table')).toBeVisible({ timeout: 10000 });
  console.log('✅ Consulta visible en la tabla');

});