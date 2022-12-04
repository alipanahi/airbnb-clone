import flatController from "../../../controllers/flatController";

export default async function handler(req, res) {
  const { userId, name, address,lon,lat, price, booked, category, rooms, imageUrl } =
    req.body;
  const flat = await flatController.create({
    name,
    address,lon,lat,
    price,
    booked,
    category,
    rooms,
    imageUrl,
    userId,
  });

  res.status(200).redirect(`/flats/${flat.id}`);
}
