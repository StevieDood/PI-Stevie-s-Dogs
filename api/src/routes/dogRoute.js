const { Router } = require("express");
const { Dog, Temperament } = require("../db.js");
const { Op } = require("sequelize");
const axios = require("axios");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    let name = req.query.name;
    let allApiDogs;
    let allDbDogs;

    //si hay una raza en el query
    if (name) {
      //voy a la ruta para busqueda por query y traigo las coincidencias
      let allApiDogs = await axios.get(
        "https://api.thedogapi.com/v1/breeds/search?q=" + name
      );
      //busco todas las coincidencias por nombre en la db
      let allDbDogs = await Dog.findAll({
        //incluyo el modelo temperament
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        where: {
          name: {
            [Op.iLike]: "%" + name + "%",
          },
        },
        order: [["name", "ASC"]],
      });

      //normalizo los datos de la db y los guardo en este array
      let filteredDbDogs = [];
      for (let i = 0; i < allDbDogs.length; i++) {
        filteredDbDogs.push({
          id: allDbDogs[i].dataValues.id,
          name: allDbDogs[i].dataValues.name,
          min_height: allDbDogs[i].dataValues.min_height,
          max_height: allDbDogs[i].dataValues.max_height,
          min_weight: allDbDogs[i].dataValues.min_weight,
          max_weight: allDbDogs[i].dataValues.max_weight,
          lifespan: allDbDogs[i].dataValues.lifespan,
          image: allDbDogs[i].dataValues.image,
          temperament: allDbDogs[i].dataValues.temperaments.map((t) => t.name),
        });
      }

      //normalizo los datos de la api y los guardo en este array
      let filteredApiDogs = allApiDogs.data.map((dog) => {
        return {
          id: dog.id,
          image:
            "https://cdn2.thedogapi.com/images/" +
            dog.reference_image_id +
            ".jpg",
          name: dog.name,
          temperament: dog.temperament,
          min_weight: parseInt(dog.weight.metric.slice(0, 2)),
          max_weight: parseInt(dog.weight.metric.slice(4)),
        };
      });

      //concateno datos de api y bd y envío los datos
      let allDogs = [...filteredDbDogs, ...filteredApiDogs];

      res.send(allDogs);
    } else {
      //traigo todo los perros de la api
      let allApiDogs = await axios.get("https://api.thedogapi.com/v1/breeds");
      // traigo todos los perros de la db, con su temperamento
      let allDbDogs = await Dog.findAll({
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      //normalizo los datos de la db y los guardo en este array
      let filteredDbDogs = [];
      for (let i = 0; i < allDbDogs.length; i++) {
        filteredDbDogs.push({
          id: allDbDogs[i].dataValues.id,
          name: allDbDogs[i].dataValues.name,
          min_height: allDbDogs[i].dataValues.min_height,
          max_height: allDbDogs[i].dataValues.max_height,
          min_weight: allDbDogs[i].dataValues.min_weight,
          max_weight: allDbDogs[i].dataValues.max_weight,
          lifespan: allDbDogs[i].dataValues.lifespan,
          image: allDbDogs[i].dataValues.image,
          temperament: allDbDogs[i].dataValues.temperaments.map((t) => t.name),
        });
      }

      //normalizo los datos de la api y los guardo en este array
      let filteredApiDogs = await allApiDogs.data.map((dog) => {
        return {
          id: dog.id,
          image: dog.image.url,
          name: dog.name,
          temperament: dog.temperament,
          min_weight: parseInt(dog.weight.metric.slice(0, 2)),
          max_weight: parseInt(dog.weight.metric.slice(4)),
        };
      });

      //concateno y envío los datos de la db y la api
      let allDogs = [...filteredDbDogs, ...filteredApiDogs];

      res.send(allDogs);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/name/:name", async (req, res, next) => {
  let { name } = req.params;
  let allApiDogs;
  let allDbDogs;

  //si hay una raza en el query
  if (name) {
    //voy a la ruta para busqueda por query y traigo las coincidencias
    let allApiDogs = await axios.get(
      "https://api.thedogapi.com/v1/breeds/search?q=" + name
    );
    //busco todas las coincidencias por nombre en la db
    let allDbDogs = await Dog.findAll({
      //incluyo el modelo temperament
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },
      order: [["name", "ASC"]],
    });

    //normalizo los datos de la db y los guardo en este array
    let filteredDbDogs = [];
    for (let i = 0; i < allDbDogs.length; i++) {
      filteredDbDogs.push({
        id: allDbDogs[i].dataValues.id,
        name: allDbDogs[i].dataValues.name,
        min_height: allDbDogs[i].dataValues.min_height,
        max_height: allDbDogs[i].dataValues.max_height,
        min_weight: allDbDogs[i].dataValues.min_weight,
        max_weight: allDbDogs[i].dataValues.max_weight,
        lifespan: allDbDogs[i].dataValues.lifespan,
        image: allDbDogs[i].dataValues.image,
        temperament: allDbDogs[i].dataValues.temperaments.map((t) => t.name),
      });
    }

    //normalizo los datos de la api y los guardo en este array
    let filteredApiDogs = allApiDogs.data.map((dog) => {
      return {
        id: dog.id,
        image:
          "https://cdn2.thedogapi.com/images/" +
          dog.reference_image_id +
          ".jpg",
        name: dog.name,
        temperament: dog.temperament,
        min_weight: parseInt(dog.weight.metric.slice(0, 2)),
        max_weight: parseInt(dog.weight.metric.slice(4)),
      };
    });

    //concateno datos de api y bd y envío los datos
    let allDogs = [...filteredDbDogs, ...filteredApiDogs];

    res.send(allDogs);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    //extraigo el id de la url recibido por params
    const { id } = req.params;
    //traigo todos los perros de la api
    let allApiDogs = await axios.get("https://api.thedogapi.com/v1/breeds");
    //si la longitud del id es menor a 10, considero que es un dato de la api porque hay menos de 300 perros en la api con id comenzando por 1
    if (id.length < 10) {
      //normalizo los datos de cada perro
      let filteredApiDogs = allApiDogs.data.map((dog) => {
        return {
          id: dog.id,
          image: dog.image.url,
          name: dog.name,
          temperament: dog.temperament,
          min_weight: parseInt(dog.weight.metric.slice(0, 2)),
          max_weight: parseInt(dog.weight.metric.slice(4)),
          min_height: parseInt(dog.height.metric.slice(0, 2)),
          max_height: parseInt(dog.height.metric.slice(4)),
          lifespan: dog.life_span.slice(0, 7),
        };
      });

      //Busco el perro por id, lo guardo en este array y lo envío
      let foundApiDog = [];
      foundApiDog.push(filteredApiDogs.find((dog) => parseInt(id) === dog.id));

      res.send(foundApiDog);
    } else {
      //busco el perro por la primary key, que es su id, e incluyo su temperamento asignado
      let allDbDogs = await Dog.findByPk(id, {
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      //normalizo los datos, los guardo en un array y los envío
      let filteredDbDogs = [];

      filteredDbDogs.push({
        id: allDbDogs.dataValues.id,
        name: allDbDogs.dataValues.name,
        min_height: allDbDogs.dataValues.min_height,
        max_height: allDbDogs.dataValues.max_height,
        min_weight: allDbDogs.dataValues.min_weight,
        max_weight: allDbDogs.dataValues.max_weight,
        lifespan: allDbDogs.dataValues.lifespan,
        image: allDbDogs.dataValues.image,
        temperament: allDbDogs.dataValues.temperaments.map((t) => t.name),
      });

      res.send(filteredDbDogs);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    //defino las caracteristicas a recibir por body
    const {
      name,
      min_height,
      max_height,
      min_weight,
      max_weight,
      lifespan,
      image,
      temperament,
    } = req.body;
    //creo un nuevo perro en la db con los datos recibidos
    const newDog = await Dog.create({
      name,
      min_height,
      max_height,
      min_weight,
      max_weight,
      lifespan,
      image,
    });

    //Busco y guardo los temperamentos de la db que coinciden con el temperamento pasado por body
    let tempDb = await Temperament.findAll({
      where: { name: temperament },
    });
    //asigno la variable anterior con los temperamentos a el nuevo perro
    newDog.addTemperament(tempDb);

    res.send(newDog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
