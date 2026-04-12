import { test, expect } from '@playwright/test';

test('PA-02 Acceso al Sistema con Usuario Recepcionista', async ({ page }) => {
  // Ir al sistema
  await page.goto('https://equipo5uthh.grupoahost.com/');

  // Login con Recepcionista
  await page.getByRole('link', { name: 'Acceder al Sistema' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico o matrícula' }).fill('recep12@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Reyna2019#');
  await page.getByRole('button', { name: 'Ingresar al Sistema' }).click();

  // Navegar a Pacientes
  await page.getByRole('link', { name: 'Pacientes', exact: true }).click();

  // Regresar a Inicio
  await page.getByRole('link', { name: 'Inicio' }).click();

  // Verificar que el menú es visible
  await expect(page.getByText('Inicio Pacientes')).toBeVisible({ timeout: 10000 });
});