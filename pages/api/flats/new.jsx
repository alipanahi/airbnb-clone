import flatController from "../../../controllers/flatController";

export default async function handler(req, res) {
  const { name, address } = req.body;
  const flat = await flatController.create({ name, address });

  res.status(200).redirect(`/flats/${flat.id}`);
}
