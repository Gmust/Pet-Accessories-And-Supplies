import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_URL;


const $unAuthHost = axios.create({
  baseURL: url,
});


const $authHost = axios.create({
  baseURL: url,
  withCredentials: true,
});

export {
  $authHost,
  $unAuthHost,
};