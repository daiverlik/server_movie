import db from '../../db.mjs';

class FilmController {
  async createFilm(req, res) {
    const {name, year} = req.body;
    const newFilm = await db.query('INSERT INTO Film (name, year) values ($1, $2) RETURNING *', [name, year])
    
    res.send(newFilm.rows[0]);
  }

  async getFilms(req, res) {
    let arrayKey = Object.keys(req.query);
    let lastKey = arrayKey[arrayKey.length-1];

    switch (lastKey) {
      case 'id':
        await FilmController._getOneFilm(req, res);
        break;

      case 'join':
        await FilmController._getAllFilmsWithGenres(req, res);
        break;
    
      default:
        await FilmController._getAllFilms(req, res);
        break;
    }
  }

  static async _getAllFilms(req, res) {
    const films = await db.query('SELECT * FROM Film');

    res.send(films.rows);
  }

  static async _getOneFilm(req, res) {
    const id_film = req.query.id;
    const films = await db.query('SELECT * FROM Film WHERE id_film = $1', [id_film]);

    res.send(films.rows);
  }

  static async _getAllFilmsWithGenres(req, res) {
    const films = await db.query(
      'SELECT F.*, G.name AS name_genre FROM Film AS F LEFT JOIN Genre AS G ON G.id_film = F.id_film');

    res.send(films.rows);
  }

  async updateFilm(req, res) {
    const {id, name, year} = req.body;
    const Film = await db.query('UPDATE Film set name = $1, year = $2 where id_film = $3 RETURNING *', [name, year, id]);

    res.send(Film.rows[0]);
  }

  async deleteFilm(req, res) {
    const id_film = req.query.id;
    const films = await db.query('DELETE FROM Film WHERE id_film = $1', [id_film]);

    res.send(films.rows[0]);
  }
}

export default new FilmController();