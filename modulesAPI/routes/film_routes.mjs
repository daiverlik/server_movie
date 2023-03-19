import Router from '../Router.mjs';
import filmController from '../controllers/film_controllers.mjs';

const router = new Router();
const addr = '/api';

router.post(`${addr}/film`, filmController.createFilm);
router.get(`${addr}/film`, filmController.getFilms);
router.put(`${addr}/film`, filmController.updateFilm);
router.delete(`${addr}/film`, filmController.deleteFilm);

export default router;
