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
      date_from: new Date(data.from_date),
      date_to: new Date(data.to_date),
      
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
  checkDate: async (data) => {
    const startBooking = new Date(data.from_date);
    const endBooking = new Date(data.to_date);
    const flats = await db.Booking.findOne({ 
      where: {
        [Op.and]: [
          { 
            FlatId: data.id
          },
          { 
            [Op.or]: [
              { 
                [Op.and]: [
                  { 
                    date_from:{
                      [Op.lte]: startBooking
                    } 
                  },
                  { 
                    date_to:{
                      [Op.gte]: startBooking
                    } 
                  }
                ] 
              },
              { 
                [Op.and]: [
                  { 
                    date_from:{
                      [Op.lte]: endBooking
                    } 
                  },
                  { 
                    date_to:{
                      [Op.gte]: endBooking
                    } 
                  }
                ] 
              },
              { 
                [Op.and]: [
                  { 
                    date_from:{
                      [Op.gte]: startBooking
                    } 
                  },
                  { 
                    date_to:{
                      [Op.lte]: endBooking
                    } 
                  }
                ] 
              }
            ]
          }
        ] 
        
      }
    })
    
    //const parsedFlat = JSON.parse(JSON.stringify(flats));
    return flats;
  },
};

export default flatController;
