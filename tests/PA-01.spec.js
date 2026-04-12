import { test, expect } from '@playwright/test';

test('PA-01 Registro de Múltiples Usuarios en el Sistema', async ({ page }) => {
  // Ir al sistema
  await page.goto('https://equipo5uthh.grupoahost.com/');

  // Login
  await page.locator('#navbar').getByRole('link', { name: 'Acceso al Sistema' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico o matrícula' }).fill('jared@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('jared123');
  await page.getByRole('button', { name: 'Ingresar al Sistema' }).click();

  // Registrar usuario Recepcionista
  await page.getByRole('link', { name: 'Usuarios', exact: true }).click();
  await page.getByRole('link', { name: '+ Registrar Nuevo Usuario' }).click();
  await page.getByRole('textbox', { name: 'ej. María Elena' }).fill('recepcion');
  await page.getByRole('textbox', { name: 'ej. García' }).fill('hernandez');
  await page.getByRole('textbox', { name: 'ej. López' }).fill('hernandez');
  await page.getByRole('textbox', { name: 'tu@correo.com' }).fill('recep12@gmail.com');
  await page.getByRole('textbox', { name: '••••••••' }).fill('Reyna2019#');
  await page.locator('#rol').selectOption('Recepcionista');
  await page.getByRole('button', { name: '✔ Registrar usuario' }).click();

  // Esperar a que procese y regresar a Usuarios manualmente
  await page.waitForTimeout(3000);
  await page.getByRole('link', { name: 'Usuarios', exact: true }).click();

  // Registrar usuario Doctora
  await page.getByRole('link', { name: '+ Registrar Nuevo Usuario' }).click();
  await page.getByRole('textbox', { name: 'ej. María Elena' }).fill('doc');
  await page.getByRole('textbox', { name: 'ej. García' }).fill('doctora');
  await page.getByRole('textbox', { name: 'ej. López' }).fill('doctoraa');
  await page.getByRole('textbox', { name: 'tu@correo.com' }).fill('doctora@gmail.com');
  await page.getByRole('textbox', { name: '••••••••' }).fill('rEYNA2019#');
  await page.locator('#rol').selectOption('Doctora');
  await page.getByRole('button', { name: '✔ Registrar usuario' }).click();

  await page.waitForTimeout(3000);
});