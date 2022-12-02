import db from "../database";

const flatController = {
  all: async id => {
    let flats = null
    if(id){
      flats = await db.Flat.findAll({where:{UserId:id}});
    }else{
      flats = await db.Flat.findAll();
    }
    const parsedFlat = JSON.parse(JSON.stringify(flats));
    return parsedFlat;
  },
  create: async (data) => {
    console.log(data);
    const flat = await db.Flat.create(data);
    return JSON.parse(JSON.stringify(flat));
  },
  imageCreate: async (data) => {
    console.log("image path fron control: ", data);
    // const flat = await db.Image.create({ path: data });
    // return JSON.parse(JSON.stringify(flat));
  },
  show: async (id) => {
    console.log(id);
    const flat = await db.Flat.findByPk(id);
    return JSON.parse(JSON.stringify(flat));
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
