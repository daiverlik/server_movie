import db from '../../db.mjs'

class GenreController {
  async createGenre(req, res) {
    const {name, id_film} = req.body;
    const newGenre = await db.query('INSERT INTO Genre (name, id_film) values ($1, $2) RETURNING *', [name, id_film]);
    res.send(newGenre.rows[0]);
  }

  static async _getOneGenre(req, res) {
    const id_genre = req.query.id;
    const genre = await db.query('SELECT * FROM Genre WHERE id_genre = $1', [id_genre]);

    res.send(genre.rows);
  }

  static async _getGenresByFilm(req, res) {
    const id_film = req.query.id_film;
    const genres = await db.query('SELECT * FROM Genre WHERE id_film = $1', [id_film]);

    res.send(genres.rows);
  }

  static async _getAllGenres(req, res) {
    const genres = await db.query('SELECT * FROM Genre');

    res.send(genres.rows);
  }

  async getGenres(req, res) {
    let arrayKey = Object.keys(req.query);
    let lastKey = arrayKey[arrayKey.length-1];

    switch (lastKey) {
      case 'id':
        await GenreController._getOneGenre(req, res);
        break;

      case 'id_film':
        await GenreController._getGenresByFilm(req, res);
        break;
    
      default:
        await GenreController._getAllGenres(req, res);
        break;
    }
  }

  async updateGenre(req, res) {
    const {id, name, id_film} = req.body;
    const genre = await db.query('UPDATE Genre set name = $1, id_film = $2 where id_genre = $3 RETURNING *', [name, id_film, id]);
    res.send(genre.rows[0]);
  }

  async deleteGenre(req, res) {
    const id_genre = req.query.id;
    const genre = await db.query('DELETE FROM Genre WHERE id_genre = $1', [id_genre]);
    res.send(genre.rows[0]);
  }
}

export default new GenreController();