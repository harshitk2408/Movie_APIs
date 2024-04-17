import connectToMongoDB from '../Database/index.js';

const movieController = {
  listMovies: async (req, res) => {
    try {
      const client = await connectToMongoDB();
      const movies = await client.db('movies').collection('movies').find().toArray();
      res.json(movies);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
  listTheatres: async (req, res) => {
    try {
      const client = await connectToMongoDB();
      const theatres = await client.db('movies').collection('theatre').find().toArray();
      res.json(theatres);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
  listShows: async (req, res) => {
    try {
      const client = await connectToMongoDB();
      const id = parseInt(req.params.id, 10);
      const theatreData = await client.db('movies').collection('theatre').find({}, { projection: { name: 1, theatre_id: 1 } }).toArray();
      const theatre_shows = {};
      for (const theatre of theatreData) {
        const { _id, name, theatre_id } = theatre;
        const shows = await client.db('movies').collection('shows').find({ movie_id: id, theatre_id: theatre_id }).toArray();
        theatre_shows[name] = shows;
      }

      res.json(theatre_shows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
  movieInTheatre: async (req, res) => {
    try {
      const client = await connectToMongoDB();
      const theatre_id = parseInt(req.params.id,10);
      const movies = await client.db('movies').collection('movies').aggregate([
        {
          $lookup: {
            from: 'shows',
            localField: 'movie_id',
            foreignField: 'movie_id',
            as:'shows'
          },
        },
        {
          $match: {
            'shows.theatre_id': parseInt(theatre_id),
          },
        },
        {
          $project: {
            movie_name: 1,
            movie_id: 1,
          },
        },
      ]).toArray();
      res.json(movies);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
  theatreShows: async (req, res) => {
    try {
      const client = await connectToMongoDB();
      const { theatre_id, movie_id } = req.params;
      const shows = await client.db('movies').collection('shows').find({ theatre_id: parseInt(theatre_id), movie_id: parseInt(movie_id) }).toArray();
      res.json(shows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
};

export default movieController;
