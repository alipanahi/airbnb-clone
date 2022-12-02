import flatController from "../../../controllers/flatController";

export default async function handler(req, res) {
  const { userId, name, address, price, booked, category, rooms, imageUrl } =
    req.body;
  console.log("user id form api", userId);
  console.log("imageUrl fron api", imageUrl);
  const flat = await flatController.create({
    name,
    address,
    price,
    booked,
    category,
    rooms,
    imageUrl,
    userId,
  });

  res.status(200).redirect(`/flats/${flat.id}`);
}
