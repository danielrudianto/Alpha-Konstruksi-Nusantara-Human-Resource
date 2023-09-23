import { Request, Response } from "express";
import VacancyModel from "../models/vacancy.model";

class VacancyController {
  static create = (req: Request, res: Response) => {
    const title = req.body.title;
    const description = req.body.description;
    const createdBy = req.body.meta__createdBy;
    const createdByName = req.body.meta__createdByName;

    VacancyModel.create({
      title,
      description,
      createdBy,
      createdByName,
    })
      .then((result) => {
        return res.status(201).send(result);
      })
      .catch((error) => {
        return res.status(500).send(error);
      });
  };

  static fetch = (req: Request, res: Response) => {
    // Fetching from known sources (officer, admin, etc.)
  };

  static update = (req: Request, res: Response) => {};

  static delete = (req: Request, res: Response) => {};

  static fetchClient = (req: Request, res: Response) => {
    // Fetching from unknown sources (new candidates, etc.)
  };
}

export default VacancyController;
