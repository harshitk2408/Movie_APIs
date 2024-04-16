import db from '../Database/index.js'
import pg from 'pg'
const { Query } = pg
const movieController = {
    listMovies: async function (req,res) {
        try {
            const result = await db.query('SELECT * FROM movies');
            res.json(result.rows);
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },
    listTheatres: async function (req,res) {
        try {
            const result = await db.query('SELECT * FROM theatre');
            res.json(result.rows);
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },
    listShows: async function (req,res) {
        try {
            const id=req.params.id;
            const result = await db.query(`SELECT distinct name,theatre_id FROM theatre`);
            let theatre_shows = {};
            for (let ind = 0; ind < result.rowCount; ind++){
                const [theatre_name, theatre_id] = [result.rows[ind]['name'], result.rows[ind]['theatre_id']];
                const query = `SELECT distinct show_time,show_date from shows where movie_id=${id} and theatre_id=${theatre_id};`;
                const theatre_shows_data = await db.query(query);
                theatre_shows[theatre_name] = theatre_shows_data.rows;
            }
            console.log(theatre_shows);
            res.send(theatre_shows);
            
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },
    movieInTheatre: async function (req, res) {
        try {
            const theatre_id = req.params.id;
            const result = await db.query(`SELECT distinct m.movie_name, m.movie_id FROM movies as m,shows as s where m.movie_id=s.movie_id and s.theatre_id=${theatre_id};`);
            res.json(result.rows);
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },
    theatreShows: async function (req, res) {
        try {
            const theatre_id = req.params.theatre_id;
            const movie_id = req.params.movie_id;
            const query = `SELECT distinct show_time,show_date from shows where movie_id=${movie_id} and theatre_id=${theatre_id};`;
            const result = await db.query(query);
            res.json(result.rows);
        }
        catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
}
export default movieController;