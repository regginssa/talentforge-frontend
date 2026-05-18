const GEO = {
  get: async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const json = await res.json();
      return json;
    } catch (e) {
      return null;
    }
  },
};

export default GEO;
