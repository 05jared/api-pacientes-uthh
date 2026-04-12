import { test, expect } from '@playwright/test';

test('PI-03 Intentar que Dr. Ramírez acceda a todos los modulos.', async ({ page }) => {
  // Ir al sistema
  await page.goto('https://equipo5uthh.grupoahost.com/');

  // Login con usuario Doctora creado previamente
  await page.locator('#navbar').getByRole('link', { name: 'Acceso al Sistema' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico o matrícula' }).fill('Dr.Ramirez@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Doc1234#');
  await page.getByRole('button', { name: 'Ingresar al Sistema' }).click();

  // Navegar por los módulos disponibles
  await page.getByRole('link', { name: 'Consultas', exact: true }).click();
  await page.getByRole('link', { name: 'Pacientes' }).click();
  await page.getByRole('link', { name: 'Usuarios' }).click();
  await page.getByRole('link', { name: 'Noticias' }).click();
  await page.getByRole('link', { name: 'Registro sistema' }).click();
});