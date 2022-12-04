import flatController from "../../../controllers/flatController";

export default async function handler(req, res) {
  const { from_date,to_date,id,user_id } = req.body;
  const checkDate = await flatController.checkDate({
    from_date,
    to_date,
    id
  });
  
  if(checkDate || new Date(from_date) > new Date(to_date) || new Date(from_date) < new Date() || new Date(to_date) < new Date()){
    res.status(400).redirect(`/flats/${id}/book`);
  }else{
    const flat = await flatController.booking({
      from_date,
      to_date,
      id,
      user_id
    });
  
    res.status(200).redirect(`/flats/bookings/buyer`);
  }
}
