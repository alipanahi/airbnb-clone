import db from "../database";
const { Op } = require("sequelize");

const flatController = {
  all: async (id) => {
    let flats = null;
    if (id) {
      flats = await db.Flat.findAll({ where: { UserId: id } });
    } else {
      flats = await db.Flat.findAll();
    }
    const parsedFlat = JSON.parse(JSON.stringify(flats));
    return parsedFlat;
  },
  create: async (data) => {
    console.log(data);
    const flat = await db.Flat.create({
      name: data.name,
      address: data.address,
      price: data.price,
      booked: data.booked,
      category: data.category,
      rooms: data.rooms,
      UserId: data.userId,
    });
    const image = await db.Image.create({ path: data.imageUrl });

    flat.addImages(image);

    return JSON.parse(JSON.stringify(flat));
  },
  show: async (id) => {
    const flat = await db.Flat.findByPk(id);

    return JSON.parse(JSON.stringify(flat));
  },
  getFlatImages: async (id) => {
    const flat = await db.Flat.findByPk(id);
    const images = await flat.getImages();

    return JSON.parse(JSON.stringify(images));
  },
  update: async (data) => {
    console.log(data);
    const flat = await db.Flat.update(data, { where: { id: data.id } });
    return JSON.parse(JSON.stringify(flat));
  },
  delete: async (id) => {
    const flat = await db.Flat.findByPk(id);
    flat.destroy({ where: { id: id } });
    return JSON.parse(JSON.stringify(flat));
  },
  booking: async (data) => {
    const flat = await db.Booking.create({
      FlatId: data.id,
      UserId: data.user_id,
      date_from: data.from_date,
      date_to: data.to_date,
      
    });
    await db.Flat.update({booked:true}, { where: { id: data.id } });
    return JSON.parse(JSON.stringify(flat));
  },
  sellerBookings: async (id) => {
    
    const flats = await db.Flat.findAll({ 
      include:{
        model:db.Booking,
        where:{
          date_to:{
            [Op.gt]:new Date()
          }
        }
      },
      where:{
        UserId:id
      }
    });
    
    const parsedFlat = JSON.parse(JSON.stringify(flats));
    return parsedFlat;
  },
  buyerBookings: async (id) => {
    
    const flats = await db.Flat.findAll({ 
      include:{
        model:db.Booking,
        where:{
          UserId:id
        }
      }
    })
    
    
    const parsedFlat = JSON.parse(JSON.stringify(flats));
    return parsedFlat;
  },
  search: async (query) => {
    let flats = null
    if(query){
      flats = await db.Flat.findAll({ 
        where:{
          name:{
            [Op.like]: `%${query}%`
          }
        }
      })
    }else{
      flats = await db.Flat.findAll()
    }
    
    
    const parsedFlat = JSON.parse(JSON.stringify(flats));
    return parsedFlat;
  },
};

export default flatController;
