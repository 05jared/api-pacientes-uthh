import { test, expect } from '@playwright/test';

test('PI-05 Carga Automática de Datos de Consulta en Formulario de Diagnóstico', async ({ page }) => {
  // Ir al sistema
  await page.goto('https://equipo5uthh.grupoahost.com/');

  // Login
  await page.locator('#navbar').getByRole('link', { name: 'Acceso al Sistema' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico o matrícula' }).fill('jared@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('jared123');
  await page.getByRole('button', { name: 'Ingresar al Sistema' }).click();

  // Ir a Consultas y abrir la primera
  await page.getByRole('link', { name: 'Consultas', exact: true }).click();
  await page.getByRole('button', { name: '✏️ Editar' }).first().click();

  // Verificar que los campos se autocompletan automáticamente
  await expect(page.locator('#input-hora-entrada')).not.toBeEmpty({ timeout: 10000 });
  await expect(page.locator('#input-hora-salida')).not.toBeEmpty({ timeout: 10000 });
  await expect(page.locator('div').filter({ hasText: 'Paciente * Selecciona un' }).nth(1)).toBeVisible({ timeout: 10000 });
});