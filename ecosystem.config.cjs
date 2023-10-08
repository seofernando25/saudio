
const env = {
  PB_PORT: 2509,
}

module.exports = {
  name: "rgs",
  apps: [
    {
      name: "web",
      script: "pnpm install && pnpm dev",
      env: env,
    },
    {
      name: "pb",
      cwd: "pb",
      script: `./pocketbase serve --http='0.0.0.0:${env.PB_PORT}'`,
      env: env,
    },
  ],
};
