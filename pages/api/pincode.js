export default function handler(req, res) {
  let pincodes = {
    721302: ["Kharagpur", "West Bengal"],
    110003: ["Delhi", "Delhi"],
    560017: ["Bangalore", "Karnataka"],
    335704: ["Sri Vijaynagar", "Rajasthan"],
  };
  res.status(200).json(pincodes);
}
