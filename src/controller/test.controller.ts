import { Request, Response } from "express";
import TestModel from "../model/test.model";

class TestController {
  static create = (req: Request, res: Response) => {
    const role = req.body.role;
    const questions = req.body.questions;
    const createdByName = req.body.meta__createdByName;
    const createdById = req.body.meta__createdById;

    TestModel.count({
      role: role,
    })
      .then((count) => {
        const version = count + 1;
        TestModel.create({
          role: role,
          questions: questions,
          createdByName: createdByName,
          createdBy: createdById,
          createdAt: new Date(),
          version: version,
        })
          .then((result) => {
            return res.status(201).send(result);
          })
          .catch((error) => {
            console.error(
              `[error]: Error on creating test with role ${role}: ${error.toString()}`
            );
            return res.status(500).send(error);
          });
      })
      .catch((error) => {
        console.error(
          `[error]: Error on counting test with role ${role}: ${error.toString()}`
        );
        return res.status(500).send(error);
      });
  };

  static fetch = (req: Request, res: Response) => {
    const keyword = req.body.keyword;
    const page = req.body.page;
    const limit = 20;

    TestModel.find({
      isDelete: false,
      name: { $regex: keyword, $options: "i" },
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .then((result) => {
        return res.status(200).send(result);
      })
      .catch((error) => {
        console.error(`[error]: Error on fetching test: ${error.toString()}`);
        return res.status(500).send(error);
      });
  };

  static delete = (req: Request, res: Response) => {
    const id = req.params.id;
    const deletedByName = req.body.meta__createdByName;
    const deletedById = req.body.meta__createdById;

    TestModel.findByIdAndUpdate(id, {
      isDelete: true,
      deletedByName: deletedByName,
      deletedBy: deletedById,
      deletedAt: new Date(),
    })
      .then((result) => {
        return res.status(201).send(result);
      })
      .catch((error) => {
        console.error(
          `[error]: Error on deleting test with id ${id}: ${error.toString()}`
        );
        return res.status(500).send(error);
      });
  };
}

export default TestController;
