import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

router.get("/:subjectId", async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: {
      subjectId: Number(req.params.subjectId),
    },
  });

  res.json(tasks);
});

router.post("/", async (req, res) => {
  const { title, deadline, subjectId } = req.body;

  const task = await prisma.task.create({
    data: {
      title,
      deadline,
      subjectId,
    },
  });

  res.json(task);
});

router.put("/:id", async (req, res) => {
  const task = await prisma.task.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  const updatedTask = await prisma.task.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      done: !task.done,
    },
  });

  res.json(updatedTask);
});

router.delete("/:id", async (req, res) => {
  await prisma.task.delete({
    where: {
      id: Number(req.params.id),
    },
  });

  res.json({ message: "Deleted" });
});

export default router;