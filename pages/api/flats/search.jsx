import flatController from "../../../controllers/flatController";

export default async function handler(req, res) {
  console.log(req.body)
  const flats = await flatController.search(req.body);

  res.status(200).send({"data":flats});
}
