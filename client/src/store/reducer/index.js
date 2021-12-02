import {
  FETCH_DOGS,
  FILTER_CREATED,
  FILTER_ALPHABETICAL,
  FILTER_WEIGTH,
  SEARCH_NAME,
  GET_TEMPS,
  POST_DOG,
  GET_DETAIL,
  FILTER_BY_TEMP,
} from "../actions"; //importo todas las constantes de accion

const initialState = {
  dogs: [],
  allDogs: [], //copia del estado general para filtros
  temperaments: [], //estado de tempermentos
  detail: [], //estado de detalle
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload, //copia de almacenamiento para uso de filtros
      };
    case SEARCH_NAME:
      return {
        ...state,
        dogs: action.payload,
      };
    case FILTER_CREATED:
      const allDogsCreated = state.allDogs; //uso de auxiliar para filtros
      const filteredCreatedDogs =
        action.payload === "Created"
          ? allDogsCreated.filter((dog) => typeof dog.id === "string") //busca id como string, ya que es el formato de los UUID
          : allDogsCreated.filter((dog) => typeof dog.id === "number");

      return {
        ...state,
        dogs: filteredCreatedDogs, //se envia al estado principal el filtrado del auxiliar y es el que se renderiza!
      };
    case FILTER_ALPHABETICAL:
      const allDogsAlpha = state.allDogs;
      const filteredAlphaDogs =
        action.payload === "Asc" //asc= de la a la z
          ? allDogsAlpha.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : allDogsAlpha.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            });
      return {
        ...state,
        dogs: filteredAlphaDogs,
      };
    case FILTER_WEIGTH:
      const allDogsWeight = state.allDogs.filter(
        (dog) => dog.min_weight !== null && dog.max_weight !== null
      );
      const filteredWeightDogs =
        action.payload === "Asc"
          ? allDogsWeight.sort(function (a, b) {
              return b.min_weight - a.min_weight || b.max_weight - a.max_weight;
            })
          : allDogsWeight.sort(function (a, b) {
              return a.min_weight - b.min_weight || a.max_weight - b.max_weight;
            });
      return {
        ...state,
        dogs: filteredWeightDogs,
      };
    case FILTER_BY_TEMP:
      const allDogsTemps = state.allDogs; //siempre se ocupa el estado auxiliar para filtros
      const filteredTempDogs = allDogsTemps.filter((dog) =>
        dog.temperament?.includes(action.payload)
      );
      return {
        ...state,
        dogs: filteredTempDogs,
      };

    case GET_TEMPS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case POST_DOG:
      return { ...state };

    case GET_DETAIL:
      return { ...state, detail: action.payload };

    default:
      return state;
  }
}
