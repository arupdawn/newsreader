import axios from "axios";

const baseUrl= `https://get.scrapehero.com/`;

const basicHeader = axios.create({
  baseURL: baseUrl,
});

export default basicHeader;