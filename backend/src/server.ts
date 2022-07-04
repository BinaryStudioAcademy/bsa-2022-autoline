import cors from 'cors';
import express from 'express';

// Express server configuration
const app = express();
app
  .use(cors({ origin: '*' })) // TODO Replace with the frontend url
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

app.get('/health', async (_, res) => res.json({ ok: true }));

app.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running at 3001');
});
