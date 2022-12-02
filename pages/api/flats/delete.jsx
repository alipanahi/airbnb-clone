import flatController from "../../../controllers/flatController";

export default async function handler(req, res) {
  const { id } = req.body;
  const flat = await flatController.delete(id);

  res.status(200).redirect(`/flats`);
}
