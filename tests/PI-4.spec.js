import { test, expect } from '@playwright/test';

test('PI-04 Vinculación de Consulta con Paciente del Módulo de Pacientes', async ({ page }) => {
  // Ir al sistema
  await page.goto('https://equipo5uthh.grupoahost.com/');

  // Login
  await page.locator('#navbar').getByRole('link', { name: 'Acceso al Sistema' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico o matrícula' }).fill('jared@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('jared123');
  await page.getByRole('button', { name: 'Ingresar al Sistema' }).click();

  // Ir a Consultas y crear nueva
  await page.getByRole('link', { name: 'Consultas', exact: true }).click();
  await page.getByRole('link', { name: '+ Nueva Consulta' }).click();

  // Llenar formulario
  await page.locator('#select-paciente').selectOption('4');
  await page.locator('#input-hora-entrada').fill('11:00');
  await page.locator('#input-hora-salida').fill('12:00');
  await page.getByRole('textbox', { name: 'Describe el motivo...' }).fill('dolor de cabeza');
  await page.getByRole('textbox', { name: 'Ej: Faringitis aguda...' }).fill('migraña');
  await page.getByRole('textbox', { name: 'Observaciones adicionales...' }).fill('dolor de cabeza');
  await page.getByRole('textbox', { name: 'Ej: Amoxicilina 500mg' }).fill('paracetamol');
  await page.getByRole('textbox', { name: 'Ej: 1 cápsula' }).fill('2 capsulas');
  await page.getByRole('textbox', { name: 'Ej: Cada 8 horas' }).fill('8 horas');
  await page.getByRole('textbox', { name: 'Ej: 7 días' }).fill('permanente');
  await page.getByRole('textbox', { name: 'Ej: Tomar con alimentos...' }).fill('tomar despues de ayuno');

  // Guardar
  await page.getByRole('button', { name: '💾 Guardar Consulta' }).click();

  // Verificar en UI que aparece en la tabla (caja negra)
  await expect(page.getByRole('cell', { name: 'dolor de cabeza', exact: true }).first()).toBeVisible({ timeout: 10000 });

  // Verificar en API que se guardó en BD (caja gris)
  const response = await page.request.get('https://api-pacientes-uthh.vercel.app/api/consultas');
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  const consulta = data.find(c => c.motivo_consulta === 'dolor de cabeza');
  expect(consulta).toBeDefined();
});