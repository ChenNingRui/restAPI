import { Router } from "express";
import contact from "./contact";
import user from "./user";

const router = Router();

export default (): Router => {
  contact(router);
  user(router);

  return router;
};
