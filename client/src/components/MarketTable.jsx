function MarketTable({ data = [] }) {
    return (
        <div className="bg-gray-800 p-5 rounded-xl mt-8 shadow">
            <h2 className="text-xl font-bold mb-4">
                Market Table
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="py-2">Symbol</th>
                            <th className="py-2">Price</th>
                            <th className="py-2">24h Change</th>
                            <th className="py-2">Volume</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 ? (
                            data.map((asset) => {
                                const price = Number(asset.price || 0);
                                const change = Number(asset.change || 0);
                                const volume = Number(asset.volume || 0);

                                return (
                                    <tr
                                        key={asset.symbol}
                                        className="border-b border-gray-700 hover:bg-gray-700"
                                    >
                                        <td className="py-3">
                                            {asset.symbol}
                                        </td>

                                        <td className="py-3">
                                            ${price.toLocaleString()}
                                        </td>

                                        <td
                                            className={`py-3 ${change >= 0
                                                    ? "text-green-400"
                                                    : "text-red-400"
                                                }`}
                                        >
                                            {change.toFixed(2)}%
                                        </td>

                                        <td className="py-3">
                                            {(volume / 1000000).toFixed(2) + "M"}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center py-4 text-gray-400"
                                >
                                    No market data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MarketTable;