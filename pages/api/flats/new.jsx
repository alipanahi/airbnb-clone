import flatController from "../../../controllers/flatController";

export default async function handler(req, res) {
  const { name, address, price, booked, category, rooms, imageUrl } = req.body;
  console.log("imageUrl fron api", imageUrl);
  const flat = await flatController.create({
    name,
    address,
    price,
    booked,
    category,
    rooms,
    imageUrl,
  });

  res.status(200).redirect(`/flats/${flat.id}`);
}
