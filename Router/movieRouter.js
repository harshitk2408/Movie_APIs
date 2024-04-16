import express from 'express';
import movieController from '../Controllers/movieController.js';
const router = express.Router();
router.route("/movies").get(movieController.listMovies);
router.route("/theatres").get(movieController.listTheatres);
router.route("/movies/shows/:id").get(movieController.listShows);
router.route("/theatres/movies/:id").get(movieController.movieInTheatre);
router.route("/theatres/shows/:theatre_id/:movie_id").get(movieController.theatreShows);
export default router;