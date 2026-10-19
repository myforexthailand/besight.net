/* Import the official SPDR GLD archive now (same pipeline as the daily cron):
   npx tsx scripts/spdr-sync.ts */
import "dotenv/config";
import { syncSpdr } from "../lib/server/spdr/sync";

syncSpdr("manual")
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
    process.exit(result.status === "failed" ? 1 : 0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
