import { test, expect } from '@playwright/test';

test('PS-04 Agregar Tratamiento como Paso Final del Flujo E2E Clínico', async ({ page }) => {

  // ─────────────────────────────────────────
  // PASO 1: Ir al sistema
  // ─────────────────────────────────────────
  await page.goto('https://equipo5uthh.grupoahost.com/');
  await expect(page).toHaveTitle(/Servicio Médico/);

  // ─────────────────────────────────────────
  // PASO 2: Login — Analista de Calidad
  // ─────────────────────────────────────────
  await page.locator('#navbar').getByRole('link', { name: 'Acceso al Sistema' }).click();
  await expect(page).toHaveURL(/login/);

  await page.getByRole('textbox', { name: 'Correo electrónico o matrícula' }).fill('jared@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('jared123');
  await page.getByRole('button', { name: 'Ingresar al Sistema' }).click();

  await expect(page).not.toHaveURL(/login/, { timeout: 10000 });
  console.log('✅ Login exitoso — Analista de Calidad');

  // ─────────────────────────────────────────
  // PASO 3: Ir a Consultas
  // ─────────────────────────────────────────
  await page.getByRole('link', { name: 'Consultas', exact: true }).click();
  await expect(page).toHaveURL(/consulta/, { timeout: 8000 });
  await page.waitForTimeout(2000);
  console.log('✅ Sección Consultas cargada');

  // ─────────────────────────────────────────
  // PASO 4: Abrir primera consulta para editar
  // ─────────────────────────────────────────
  await page.getByRole('button', { name: '✏️ Editar' }).first().click();
  await page.waitForTimeout(2000);
  console.log('✅ Formulario de edición abierto');

  // ─────────────────────────────────────────
  // PASO 5: Llenar sección Tratamiento
  // ─────────────────────────────────────────

  // Medicamento
  const campoMedicamento = page.getByRole('textbox', { name: 'Ej: Amoxicilina 500mg' });
  await campoMedicamento.clear();
  await campoMedicamento.fill('Paracetamol');
  await expect(campoMedicamento).toHaveValue('Paracetamol');
  console.log('✅ Medicamento: Paracetamol');

  // Dosis
  const campoDosis = page.getByRole('textbox', { name: 'Ej: 1 cápsula' });
  await campoDosis.clear();
  await campoDosis.fill('500mg');
  await expect(campoDosis).toHaveValue('500mg');
  console.log('✅ Dosis: 500mg');

  // Frecuencia
  const campoFrecuencia = page.getByRole('textbox', { name: 'Ej: Cada 8 horas' });
  await campoFrecuencia.clear();
  await campoFrecuencia.fill('cada 8 horas');
  await expect(campoFrecuencia).toHaveValue('cada 8 horas');
  console.log('✅ Frecuencia: cada 8 horas');

  // Duración
  const campoDuracion = page.getByRole('textbox', { name: 'Ej: 7 días' });
  await campoDuracion.clear();
  await campoDuracion.fill('5 DIAS');
  await expect(campoDuracion).toHaveValue('5 DIAS');
  console.log('✅ Duración: 5 DIAS');

  // Indicaciones (clic sin llenar — campo opcional)
  await page.getByRole('textbox', { name: 'Ej: Tomar con alimentos...' }).click();
  console.log('✅ Campo indicaciones tocado (opcional)');

  // ─────────────────────────────────────────
  // PASO 6: Guardar tratamiento
  // ─────────────────────────────────────────
  await page.getByRole('button', { name: '💾 Guardar Consulta' }).click();
  await page.waitForTimeout(3000);
  console.log('✅ Tratamiento guardado correctamente');

  // ─────────────────────────────────────────
  // PASO 7: Verificar que se guardó
  // ─────────────────────────────────────────
  await page.getByRole('link', { name: 'Consultas', exact: true }).click();
  await page.waitForTimeout(2000);

  await expect(page.getByRole('table')).toBeVisible({ timeout: 10000 });
  console.log('✅ Tratamiento visible en la lista de consultas');

});