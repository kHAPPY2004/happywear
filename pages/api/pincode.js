import pincodes from "../../pincodes.json";
export default function handler(req, res) {
  // let pincodes =
  res.status(200).json(pincodes);
}
