import flatController from "../../../controllers/flatController";

export default async function handler(req, res) {
  const { from_date,to_date,id,user_id } = req.body;
  const flat = await flatController.booking({
    from_date,
    to_date,
    id,
    user_id
  });

  res.status(200).redirect(`/flats/bookings/buyer`);
}
