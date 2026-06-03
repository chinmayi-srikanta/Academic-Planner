import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const subjects = await prisma.subject.findMany();

  res.json(subjects);
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  const subject = await prisma.subject.create({
    data: {
      name,
    },
  });

  res.json(subject);
});

export default router;