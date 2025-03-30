
const API_KEY = "4cf260aa-1aa7-4999-b440-93895cab1d06";
const BIRD_API_URL =
  "https://nuthatch.lastelm.software/v2/birds";
const headers = {
    accept: "application/json",
    "API-Key": API_KEY,
  };
//get Bird details
export async function fetchBird(page = 1, pageSize = 20) {
  try {
    const response = await axios.get(BIRD_API_URL, {
      params: { page, pageSize, operator: "AND" },
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bird:", error);
  }
}

export async function fetchBirdByID(birdId) {
    try {
      const response = await axios.get(`https://nuthatch.lastelm.software/birds/${birdId}`, {
        headers: headers,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching bird:", error);
    }
  }


