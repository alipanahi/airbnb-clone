import flatController from "../../../controllers/flatController";

export default async function handler(req, res) {
  const { id, name, address,lon,lat, price, booked, category, rooms } = req.body;
  const flat = await flatController.update({
    id,
    name,
    address,
    lon,
    lat,
    price,
    booked,
    category,
    rooms,
  });

  res.status(200).redirect(`/flats/${id}`);
}
