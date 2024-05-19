import React, { useEffect, useState } from 'react';

const Seni = () => {
    const [songs, setSongs] = useState([]);
    const [films, setFilms] = useState([]);

    useEffect(() => {
        fetchSongs();
        fetchFilms();
    }, []);

    const fetchSongs = async () => {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa('84e38ff0fe8540b498323c57d76f60d4:f60a88fedfe34ad3b91126a22be7e377')
            },
            body: 'grant_type=client_credentials'
        });
        const tokenData = await response.json();
        const accessToken = tokenData.access_token;

        const songsResponse = await fetch('https://api.spotify.com/v1/search?q=papua+indonesia&type=track&market=ID', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await songsResponse.json();
        const filteredSongs = data.tracks.items.filter(song => {
            const title = song.name.toLowerCase();
            return !title.includes('indonesia') && !title.includes('merdeka');
        });
        
        setSongs(filteredSongs);
    };

    const fetchFilms = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=3eb1d95488ec7be2ff7b7a0c0a92f0f1&query=papua`);
        const data = await response.json();
        const filteredFilms = data.results.filter(film =>
            !film.title.toLowerCase().includes('new guinea') &&
            !film.overview.toLowerCase().includes('new guinea')
        );
        setFilms(filteredFilms);
    };

    return (
        <div className="min-h-screen">

            <section className="bg-center mt-4">
                <div className="h-full flex flex-col items-center justify-center relative">
                    <div className="flex items-center w-full">
                        <a href="/news" className="absolute left-0 text-gray text-xl font-bold hover:text-white transition-colors duration-300 p-4">Back</a>
                        <h2 className="text-4xl text-white font-bold p-4 flex-1 text-center">Papua Music & Film</h2>
                    </div>
                    <nav className="py-8">
                        <a href="#songs" className="px-4 text-gray-500 font-bold hover:text-white transition-colors duration-300">Songs</a>
                        <a href="#films" className="px-4 text-gray-500 font-bold hover:text-white transition-colors duration-300">Films</a>
                    </nav>
                </div>
            </section>

            <section id="songs">
                <h2 className="text-3xl font-bold mb-4 text-center">Papua Songs</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {songs.map(song => (
                        <div key={song.id} className="bg-costumBlack p-4 rounded shadow">
                            <img src={song.album.images[0].url} alt={song.name} className="h-40 w-full object-cover rounded mb-4" />
                            <h3 className="text-xl font-bold">{song.name}</h3>
                            <p className="text-gray-700">{song.artists[0].name}</p>
                            <audio controls className="w-full mt-4">
                                <source src={song.preview_url} type="audio/mpeg" />
                            </audio>
                        </div>
                    ))}
                </div>
            </section>

            <section id="films" className="mx-auto py-8">
                <h2 className="text-3xl font-bold mb-4 text-center text-white">Top Rated Films</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {films.map(film => (
                        <div key={film.id} className="bg-costumBlack rounded-lg overflow-hidden shadow-lg">
                            <img src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt={film.title} className="object-cover object-center" />
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{film.title}</h3>
                                <p className="text-white-700">{film.overview}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Seni;