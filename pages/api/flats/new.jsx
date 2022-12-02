import flatController from "../../../controllers/flatController";

export default async function handler(req, res) {
  const { name, address, price, booked, category, rooms } = req.body;
  const flat = await flatController.create({
    name,
    address,
    price,
    booked,
    category,
    rooms,
  });

  res.status(200).redirect(`/flats/${flat.id}`);
}
