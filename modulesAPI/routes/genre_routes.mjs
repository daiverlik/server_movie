import Router from '../Router.mjs';
import genreController from '../controllers/genre_controllers.mjs';

const router = new Router();
const addr = '/api';

router.post(`${addr}/genre`, genreController.createGenre);
router.get(`${addr}/genre`, genreController.getGenres);
router.put(`${addr}/genre`, genreController.updateGenre);
router.delete(`${addr}/genre`, genreController.deleteGenre);

export default router;
