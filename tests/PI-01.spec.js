import { test, expect } from '@playwright/test';

test('PI-01- Vinculación de Paciente Registrado con Módulo de Usuarios', async ({ page }) => {
  // Ir al sistema
  await page.goto('https://equipo5uthh.grupoahost.com/');

  // Login
  await page.locator('#navbar').getByRole('link', { name: 'Acceso al Sistema' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico o matrícula' }).fill('uriel1@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('12345');
  await page.getByRole('button', { name: 'Ingresar al Sistema' }).click();

  // Navegar a Pacientes > Registrar
  await page.getByRole('link', { name: 'Pacientes', exact: true }).click();
  await page.getByRole('link', { name: '+ Registrar Nuevo Paciente' }).click();

  // Llenar formulario
  await page.getByRole('textbox', { name: 'Nombre(s)' }).fill('Carlos');
  await page.locator('#input-apellido-paterno').fill('Ruiz');
  await page.locator('#input-apellido-materno').fill('Hernandez');
  await page.locator('#input-fecha-nacimiento').fill('2001-01-02');
  await page.locator('#input-sexo').selectOption('Masculino');
  await page.getByRole('textbox', { name: 'correo@ejemplo.com' }).fill('jared23@gmail.com');
  await page.getByRole('textbox', { name: 'dígitos' }).fill('5535805565');
  await page.getByRole('textbox', { name: 'Calle, colonia, municipio' }).fill('morelos 12');
  await page.locator('#input-tipo').selectOption('9');
  await page.getByRole('textbox', { name: 'Ej:' }).fill('20241010');

  // Guardar
  await page.getByRole('button', { name: '💾 Guardar Paciente' }).click();
});