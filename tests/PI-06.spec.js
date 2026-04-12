import { test, expect } from '@playwright/test';

test('PI-05 Registro de Tratamiento en Consulta', async ({ page }) => {
  // Ir al sistema
  await page.goto('https://equipo5uthh.grupoahost.com/');

  // Login
  await page.getByRole('link', { name: 'Acceder al Sistema' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico o matrócula' }).fill('jared@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('jared123');
  await page.getByRole('button', { name: 'Ingresar al Sistema' }).click();

  // Ir a Consultas y editar la primera
  await page.getByRole('link', { name: 'Ver Consultas' }).click();
  await page.getByRole('button', { name: '✏️ Editar' }).first().click();

  // Llenar tratamiento
  await page.getByRole('textbox', { name: 'Ej: Amoxicilina 500mg' }).fill('Amoxicilina 250mg');
  await page.getByRole('textbox', { name: 'Ej: 1 cápsula' }).fill('250mg');

  // Guardar consulta
  await page.getByRole('button', { name: '💾 Guardar Consulta' }).click();

  // Verificar que el tratamiento se guardó abriendo de nuevo
  await page.getByRole('button', { name: '✏️ Editar' }).first().click();
  await expect(page.getByRole('textbox', { name: 'Ej: Amoxicilina 500mg' })).toHaveValue('Amoxicilina 250mg', { timeout: 10000 });
});