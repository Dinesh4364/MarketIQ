function TrendingAssets({ data }) {

    const trendingAssets =
        [...data]
            .sort((a, b) => b.volume - a.volume)
            .slice(0, 4);

    return (

        <div className="bg-gray-800 p-5 rounded-xl">

            <h2 className="text-xl mb-4">
                Trending Assets
            </h2>

            {

                trendingAssets.map(asset => (

                    <div
                        key={asset.symbol}
                        className="flex justify-between py-2"
                    >

                        <span>{asset.symbol}</span>

                        <span className="text-blue-400">
                            Trending
                        </span>
                    </div>
                ))
            }
        </div>
    );
}

export default TrendingAssets;