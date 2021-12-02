const { Router } = require("express");
const { Temperament } = require("../db.js");
const axios = require("axios");
const router = Router();

//para guardar todos los temps de la api en la db
router.get("/", async (req, res, next) => {
  try {
    //guardo todos los perros en esta variable
    let allDogs = await axios.get("https://api.thedogapi.com/v1/breeds");
    //mapeo y guardo los temperamentos de cada uno en esta variable, los separo por comas y los junto en un array de strings separados
    let Temps = allDogs.data
      .map((dog) => dog.temperament)
      .join()
      .split(", ");
    //vuelvo a filtrar, ya que vienen strings repetidos con doble coma
    let Temps2 = Temps.join()
      .split(",")
      .filter((t) => t);
    //teniendo ya el array separado de cada temperamento, busco existentes o creo nuevos temperamentos en la db
    Temps2.forEach((item) => {
      Temperament.findOrCreate({
        where: { name: item },
      });
    });
    //los ordeno alfabeticamente y los envío
    const allTemps = await Temperament.findAll({ order: [["name", "ASC"]] });

    res.send(allTemps);
  } catch (error) {
    next(error);
  }
});

//en caso de querer hacer un nuevo temperament
// router.post("/", async (req, res, next) => {
//   try {
//     const { name } = req.body;
//     const newTemperament = await Temperament.create({ name });
//     res.send(newTemperament);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
