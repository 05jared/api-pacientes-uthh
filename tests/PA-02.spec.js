import { test, expect } from '@playwright/test';

test('PA-02 Validación de Usabilidad del Formulario de Registro de Paciente', async ({ page }) => {
  // Ir al sistema
  await page.goto('https://equipo5uthh.grupoahost.com/');

  // Login con Recepcionista
  await page.locator('#navbar').getByRole('link', { name: 'Acceso al Sistema' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico o matrícula' }).fill('recep12@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Reyna2019#');
  await page.getByRole('button', { name: 'Ingresar al Sistema' }).click();

  // Ir a Pacientes y registrar nuevo
  await page.getByRole('link', { name: 'Pacientes', exact: true }).click();
  await page.getByRole('link', { name: '+ Registrar Nuevo Paciente' }).click();

  // Llenar formulario
  await page.getByRole('textbox', { name: 'Nombre(s)' }).fill('Jared');
  await page.locator('#input-apellido-paterno').fill('Martinez');
  await page.locator('#input-apellido-materno').fill('Juarez');
  await page.locator('#input-fecha-nacimiento').fill('2000-02-26');
  await page.locator('#input-sexo').selectOption('Masculino');
  await page.getByRole('textbox', { name: 'correo@ejemplo.com' }).fill('juarez1@gmail.com');
  await page.getByRole('textbox', { name: 'dígitos' }).fill('5565805544');
  await page.getByRole('textbox', { name: 'Calle, colonia, municipio' }).fill('juarez1');
  await page.locator('#input-tipo').selectOption('1');
  await page.getByRole('textbox', { name: 'Ej:' }).fill('20202020');
  await page.locator('#input-carrera').selectOption('Tic\'s');
  await page.locator('#input-cuatrimestre').selectOption('2');
  await page.locator('#input-grupo').selectOption('A');

  // Guardar
  await page.getByRole('button', { name: '💾 Guardar Paciente' }).click();

  // Esperar a que cargue la tabla
  await page.waitForTimeout(4000);
  await page.getByRole('link', { name: 'Pacientes', exact: true }).click();
  await page.waitForTimeout(3000);

  // Verificar que el paciente aparece en la tabla
  await expect(page.getByRole('cell', { name: 'Jared Martinez Juarez' })).toBeVisible({ timeout: 15000 });
});

