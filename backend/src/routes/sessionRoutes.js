import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const sessions = await prisma.session.findMany();
  res.json(sessions);
});

router.post("/", async (req, res) => {
  const { subject, duration, date } = req.body;

  const session = await prisma.session.create({
    data: {
      subject,
      duration,
      date,
    },
  });

  res.json(session);
});

export default router;