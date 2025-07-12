import { test, expect, request } from '@playwright/test';
import { isAsyncFunction } from 'node:util/types';
let baseURL: string = 'http://localhost:3000/users';

test.describe('User management API with loop', () => {
  test.beforeEach(async ({ request }) => {
    // get all users
    const response = await request.get(`${baseURL}`);
    const responseBody = await response.json();
    // get the number of objects in the array returned
    const numberOfObjects = responseBody.length;

    // create an empty array to store all user ID
    let userIDs = [];

    // loop through all users and store their ID in an array
    for (let i = 0; i < numberOfObjects; i++) {
      // get user ID from the response
      let userID = responseBody[i].id;
      // push is used to add elements to the end of an array
      userIDs.push(userID);
    }

    // delete all users in a loop using previously created array
    for (let i = 0; i < numberOfObjects; i++) {
      // delete user by id
      let response = await request.delete(`${baseURL}/${userIDs[i]}`);
      // validate the response status code
      expect.soft(response.status()).toBe(200);
    }

    // verify that all users are deleted
    const responseAfterDelete = await request.get(`${baseURL}`);
    expect(responseAfterDelete.status()).toBe(200);
    const responseBodyEmpty = await responseAfterDelete.text();
    // validate that the response is an empty array
    expect(responseBodyEmpty).toBe('[]');
  });

  test('Create few users and verify total number', async ({ request }) => {
    for (let i = 0; i < 3; i++) {
      const response = await request.post(`${baseURL}`);
    }

    const response = await request.get(`${baseURL}`);
    const responseBody = await response.json();
    expect(responseBody.length).toBe(3);
  });

  test('Delete one user and verify other users', async ({ request }) => {
    await createUsers(5);
    const response = await request.get(`${baseURL}`);
    const responseBody = await response.json();
    console.log(responseBody);
    const numberOfObjects = responseBody.length;

    let userIDs = [];

    for (let i = 0; i < numberOfObjects; i++) {
      let userID = responseBody[i].id;
      userIDs.push(userID);
    }
    let responseDelete = await request.delete(`${baseURL}/${userIDs[0]}`);
    const responseAfterDelete = await request.get(`${baseURL}`);
    const responseBodyAfterDelete = await responseAfterDelete.json();
    console.log(responseBodyAfterDelete);
    expect(responseBodyAfterDelete.length).toBe(4);
  });

  test('GET / - should return empty when no users', async ({ request }) => {
    const response = await request.get(`${baseURL}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.text();
    expect(responseBody).toBe('[]');
  });

  test('Should create N users and return exactly N users when retrieving all users', async ({ request }) => {
    await request.post(`${baseURL}`);
    await request.post(`${baseURL}`);
    const responseAllUsers = await request.get(`${baseURL}`);
    const responseBodyAllUsers = await responseAllUsers.json();
    console.log(responseBodyAllUsers);
    const userCount = responseBodyAllUsers.length;
    console.log(`Number of users: ${userCount}`);
    expect(userCount).toBe(2);
    const firstUser = responseBodyAllUsers[0];
    console.log('First user:', firstUser);
    const secondUser = responseBodyAllUsers[1];
    console.log('Second user:', secondUser);
  });

  test('Delete all users and verify empty response', async ({ request }) => {});

  async function createUsers(numberOfUsers: number) {
    const requestContext = await request.newContext();
    for (let i = 0; i < numberOfUsers; i++) {
      const response = await requestContext.post(`${baseURL}`);
    }
  }
});
