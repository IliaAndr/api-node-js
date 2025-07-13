// tests/api.spec.ts
import { test, expect } from '@playwright/test';
import { StatusCodes } from 'http-status-codes';

let baseURL: string = 'http://localhost:3000/users';

test.describe('User management API', () => {

  test('GET /:id - should return a user by ID', async ({ request }) => {
    const responseCreate = await request.post(`${baseURL}`);
    const responseBody = await responseCreate.json();
    expect(responseCreate.status()).toBe(StatusCodes.CREATED);

    const userId = responseBody.id;
    console.log(`Created user with ID: ${userId}`);

    const responseGet = await request.get(`${baseURL}/${userId}`);
    expect(responseGet.status()).toBe(StatusCodes.OK);

    const user = await responseGet.json();
    console.log('User data by ID: ', user);
  });

  test('GET /:id - should return 404 if user not found', async ({ request }) => {
    const responseGet = await request.get(`${baseURL}/1005`);
    expect(responseGet.status()).toBe(StatusCodes.NOT_FOUND);
  });

  test('POST / - should add a new user', async ({ request }) => {
    const responseCreate = await request.post(`${baseURL}`);
    const responseBody = await responseCreate.json();
    expect.soft(responseCreate.status()).toBe(StatusCodes.CREATED);
    expect(responseBody.id).toBeDefined();
    expect(typeof responseBody.id).toBe('number');
  });

  test('DELETE /:id - should delete a user by ID', async ({ request }) => {
    const responseCreate = await request.post(`${baseURL}`);
    const responseBody = await responseCreate.json();
    expect(responseCreate.status()).toBe(StatusCodes.CREATED);
    const responseDelete = await request.delete(`${baseURL}/${responseBody.id}`);
    expect(responseDelete.status()).toBe(StatusCodes.OK);
  });

  test('DELETE /:id - should return 404 if user not found', async ({ request }) => {
    const responseDelete = await request.delete(`${baseURL}/10009`);
    expect(responseDelete.status()).toBe(StatusCodes.NOT_FOUND);
  });

  test('Returns all fields', async ({ request }) => {
    const responseCreate = await request.post(`${baseURL}`);
    const responseBody = await responseCreate.json();

    expect.soft(responseBody.id).toBeDefined();
    expect.soft(responseBody.name).toBeDefined();
    expect.soft(responseBody.email).toBeDefined();
    expect.soft(responseBody.phone).toBeDefined();
  });
});
