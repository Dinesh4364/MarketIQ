function TopLosers({ data = [] }) {
    const topLosers = [...data]
        .filter(asset => asset && asset.change !== undefined)
        .sort((a, b) => Number(a.change) - Number(b.change))
        .slice(0, 3);

    return (
        <div className="bg-gray-800 rounded-xl p-5 shadow">
            <h2 className="text-xl font-bold mb-4">
                Top Losers
            </h2>

            {topLosers.length > 0 ? (
                topLosers.map((asset) => (
                    <div
                        key={asset.symbol}
                        className="flex justify-between py-2"
                    >
                        <span>{asset.symbol}</span>

                        <span className="text-red-400">
                            {Number(asset.change).toFixed(2)}%
                        </span>
                    </div>
                ))
            ) : (
                <p className="text-gray-400">
                    No data available
                </p>
            )}
        </div>
    );
}

export default TopLosers;