import flatController from "../../../controllers/flatController";

export default async function handler(req, res) {
  const { name, address, price, booked, category, rooms, imageUrl } = req.body;
  console.log("imageUrl fron api", req.body);
  const flat = await flatController.create({
    name,
    address,
    price,
    booked,
    category,
    rooms,
  });
  // const image = await flatController.imageCreate(imageUrl);
  // flat.setImages(image);

  res.status(200).redirect(`/flats/${flat.id}`);
}
