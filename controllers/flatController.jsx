import db from "../database";

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
};

export default flatController;
