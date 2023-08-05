import { validateTokenHandler } from "../middleware";
import { currentUser, loginUser, registerUser } from "../controllers";
import { Router } from "express";

const path = "/users";

export default (router: Router) => {
  router.post(`${path}/register`, registerUser);
  router.post(`${path}/login`, loginUser);

  router.get(`${path}/current`, validateTokenHandler, currentUser);
};
