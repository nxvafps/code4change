import app from "./app";
import { startCronJobs } from "./services/cron-jobs";

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);

  startCronJobs();
  console.log("GitHub data synchronization jobs scheduled");
});

export default server;
