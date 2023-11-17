import { app } from '../src/index.js';
import supertest  from "supertest";
import request from 'supertest'
import { createJWT } from "../src/modules/auth.js";

export const userPayload = {
  id : 1,
  username: 'rolkarz',
  password: 'test'
}

describe('GET employees route', ():void => {
  describe('given the user is not logged in', ():void => {
    it('should return 403', async () : Promise<void> => {
      const res :request.Response= await supertest(app).get(`/api/data/employees`);
      expect(res.statusCode).toBe(401);
      expect(res.body).toStrictEqual({success: false, message: 'Not authorized'})
    });
  })

  describe('given the user is logged but query params are missing', () :void => {
    it('should return 400', async () : Promise<void> => {
      const jwt: string = createJWT(userPayload)
      const res: request.Response = await supertest(app).get('/api/data/employees')
        .set("Authorization", `Bearer ${jwt}`)
      expect(res.statusCode).toBe(400)
      expect(res.body).toStrictEqual({success: false, error: "Both page and pageSize parameters are required."})
    });
  })

  describe('given the user is logged in and query params are corect', () :void => {
    it('should return 200', async () : Promise<void> => {
     const jwt: string = createJWT(userPayload)
      const res: request.Response = await supertest(app).get('/api/data/employees?page=1&pageSize=20')
        .set("Authorization", `Bearer ${jwt}`)
      expect(res.statusCode).toBe(200)
    });
  })
  describe('given the user ID exists', ():void => {})
  describe('given the user ID doesnt exist', ():void => {})

});
