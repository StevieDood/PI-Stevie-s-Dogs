import axios from "axios";
//exporto las constantes de las acciones
export const FETCH_DOGS = "FETCH_DOGS";
export const SEARCH_NAME = "SEARCH_NAME";
export const FILTER_CREATED = "FILTER_CREATED";
export const FILTER_ALPHABETICAL = "FILTER_ALPHABETICAL";
export const FILTER_WEIGTH = "FILTER_WEIGTH";
export const GET_TEMPS = "GET_TEMPS";
export const POST_DOG = "POST_DOG";
export const GET_DETAIL = "GET_DETAIL";
export const FILTER_BY_TEMP = "FILTER_BY_TEMP";

//aquí se relaciona frontend y backend!

//funcion para traer todos los perros
export function fetchDogs() {
  return async function (dispatch) {
    let fetchedDogs = await axios.get("/api/dogs", {});
    return dispatch({
      type: FETCH_DOGS,
      payload: fetchedDogs.data,
    });
  };
}

//funcion para buscar por nombre
export function searchByName(name) {
  return async function (dispatch) {
    let search = await axios.get("/api/dogs/name/" + name, {});
    return dispatch({
      type: SEARCH_NAME,
      payload: search.data,
    });
  };
}

//filtro para creados en la db o la api
export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

//filtro alfabetico
export function filterAlphabetical(payload) {
  return {
    type: FILTER_ALPHABETICAL,
    payload,
  };
}

//filtro por peso
export function filterWeight(payload) {
  return {
    type: FILTER_WEIGTH,
    payload,
  };
}

//filtro por temperamento
export function filterByTemp(payload) {
  return {
    type: FILTER_BY_TEMP,
    payload,
  };
}

//funcion para traer todos los temperamentos
export function getTemps() {
  return async function (dispatch) {
    let temps = await axios.get("/api/temperaments", {});
    return dispatch({
      type: GET_TEMPS,
      payload: temps.data,
    });
  };
}

//funcion para postear perro nuevo a la db
export function postDog(payload) {
  return async function (dispatch) {
    let post = await axios.post("/api/dogs", payload);
    return post;
  };
}

//funcion para acceder a los detalles
export function getDetail(id) {
  return async function (dispatch) {
    try {
      let detail = await axios.get("/api/dogs/" + id);
      return dispatch({
        type: GET_DETAIL,
        payload: detail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
