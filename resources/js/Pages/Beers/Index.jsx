export default function Index({ auth, beers }) {
    console.log(beers);
    return (
        <div>
            <h1>Beers</h1>
            <ul>
                {beers &&
                    beers.data.map((beer) => (
                        <li key={beer.id}>{beer.name}</li>
                    ))}
            </ul>
        </div>
    );
}
