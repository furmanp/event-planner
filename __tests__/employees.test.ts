import {describe, expect, test} from "vitest";
import supertest  from "supertest";
import request from 'supertest'
import {createServer} from './../src/utils/server.js'
import { createJWT } from "../src/modules/auth.js";
import { Express } from "express";

const app: Express = createServer()

const userPayload = {
  id : 1,
  username: 'rolkarz',
  password: 'test'
}

describe('GET employees route', ():void => {
  describe('given the user is not logged in', ():void => {
    test('should return 403', async () : Promise<void> => {
      const res :request.Response= await supertest(app).get(`/api/data/employees`);
      expect(res.statusCode).toBe(401);
      expect(res.body).toStrictEqual({success: false, message: 'Not authorized'})
    });
  })

  describe('given the user is logged but query params are missing', () :void => {
    test('should return 400', async () : Promise<void> => {
      const jwt: string = createJWT(userPayload, '5m')
      const res: request.Response = await supertest(app).get('/api/data/employees')
        .set("Authorization", `Bearer ${jwt}`)
      expect(res.statusCode).toBe(400)
      expect(res.body).toStrictEqual({success: false, error: "Both page and pageSize parameters are required."})
    });
  })

  describe('given the user is logged in and query params are corect', () :void => {
    test('should return 200', async () : Promise<void> => {
     const jwt: string = createJWT(userPayload, '5m')
      const res: request.Response = await supertest(app).get('/api/data/employees?page=1&pageSize=20')
        .set("Authorization", `Bearer ${jwt}`)
      expect(res.statusCode).toBe(200)
    });
  })

});
