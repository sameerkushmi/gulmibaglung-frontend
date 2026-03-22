'use client';
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_GOLD_API_KEY;

async function getGoldSilver() {
  const res = await axios.get("https://www.goldapi.io/api/XAU/USD", {
    headers: { "x-access-token": API_KEY }
  });
  console.log(res.data);
}

export default getGoldSilver;
