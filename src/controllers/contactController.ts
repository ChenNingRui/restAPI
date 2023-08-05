import { Response } from "express";
import asyncHandler from "express-async-handler";
import { contactModel } from "../models";
import { IUserRequest } from "../types";

const findContactById = async (req: IUserRequest, res: Response) => {
  const contact = await contactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (String(contact.user_id) !== String(req.user.id)) {
    res.status(403);
    throw new Error(
      "User doesn't have permission to update other user contacts"
    );
  }
  return contact;
};

//@desc Get Contacts
//@route GET /contacts
//@access private
export const getContacts = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const contacts = await contactModel.find({ user_id: req.user.id });
    res.status(201).json(contacts);
  }
);

//@desc Create Contacts
//@route POST /contacts
//@access private
export const createContact = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    console.log("The request body is", req.body);

    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    const contact = await contactModel.create({
      name,
      email,
      phone,
      user_id: req.user.id,
    });
    res.status(201).json(contact);
  }
);

//@desc Get Contact
//@route GET /contacts/:id
//@access private
export const getContactById = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    const contact = findContactById(req, res);
    res.status(201).json(contact);
  }
);

//@desc Update Contact
//@route PUT /contacts/:id
//@access private
export const updateContactById = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    findContactById(req, res);

    const updateContact = await contactModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(201).json(updateContact);
  }
);

//@desc Delete Contact
//@route DELETE /contacts/:id
//@access private
export const deleteContactById = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    findContactById(req, res);
    await contactModel.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  }
);
