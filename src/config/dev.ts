const port: any = process.env.PORT || 3000;
const mongoUrl: string =  process.env.MONGO_ATLAS_URL;
const config = {
  // config for master database
  database: {
    url: mongoUrl,
    properties: { useNewUrlParser: true },
  },
  port: port
};

export default config;