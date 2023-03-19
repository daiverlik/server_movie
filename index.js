import Application from './modulesAPI/Application.mjs';
import filmRouter from './modulesAPI/routes/film_routes.mjs';
import genreRouter from './modulesAPI/routes/genre_routes.mjs';
import parseJSON from './modulesAPI/parseJson.mjs';
import parseUrl from './modulesAPI/parseUrl.mjs';

const PORT = process.env.PORT || 3000;
const app = new Application();

if (process.env.PORT) PORTS.unshift(process.env.PORT);

app.use(parseJSON);
app.addRouter(filmRouter);
app.addRouter(genreRouter);

app.listen(PORT, () => console.log(`Сервер запущен на порту: ${PORT}`));
app.use(parseUrl(`http://localhost:${PORT}`));