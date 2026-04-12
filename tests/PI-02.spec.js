import { test, expect } from '@playwright/test';

test('PI-02 Propagación de Cambios de Paciente hacia Módulo de Consultas', async ({ page }) => {
  // Ir al sistema
  await page.goto('https://equipo5uthh.grupoahost.com/');

  // Login
  await page.locator('#navbar').getByRole('link', { name: 'Acceso al Sistema' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico o matrícula' }).fill('jared@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('jared123');
  await page.getByRole('button', { name: 'Ingresar al Sistema' }).click();

  // Esperar a que aparezca el link antes de hacer clic
  await page.waitForSelector('a[href*="pacientes"]', { timeout: 15000 });

  // Ir a Pacientes y editar el quinto
  await page.getByRole('link', { name: 'Ver Pacientes' }).click();
  await page.getByRole('button', { name: '✏️ Editar' }).nth(4).click();

  // Modificar datos del paciente
  await page.getByRole('textbox', { name: 'Nombre(s)' }).fill('juan');
  await page.locator('#input-apellido-paterno').fill('perez');
  await page.locator('#input-apellido-materno').fill('garcia');
  await page.getByRole('button', { name: '💾 Guardar Paciente' }).click();

  // Ir a Consultas
  await page.getByRole('link', { name: 'Consultas' }).click();
});