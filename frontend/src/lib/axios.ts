import Axios from "axios";
import { server } from "@/contants";

const axios = Axios.create({
  baseURL: server,
});

export { axios };
