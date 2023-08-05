import { Router } from "express";
import {
  createContact,
  deleteContactById,
  getContacts,
  getContactById,
  updateContactById,
} from "../controllers";
import { validateTokenHandler } from "../middleware";

const path = "/contacts";
export default (router: Router) => {
  //apply to all router
  router.use(validateTokenHandler);

  router.get(`${path}`, getContacts);

  router.post(`${path}`, createContact);

  router.get(`${path}/:id`, getContactById);

  router.put(`${path}/:id`, updateContactById);

  router.delete(`${path}/:id`, deleteContactById);
};
