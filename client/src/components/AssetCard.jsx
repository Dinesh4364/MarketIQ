function AssetCard({ symbol, price = 0, change = 0 }) {
    const numericPrice = Number(price);
    const numericChange = Number(change);

    return (
        <div className="bg-gray-800 rounded-xl p-5 shadow">
            <h2 className="text-xl font-bold">
                {symbol || "N/A"}
            </h2>

            <p className="text-2xl mt-2">
                ${numericPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
            </p>

            <p
                className={
                    numericChange >= 0
                        ? "text-green-400"
                        : "text-red-400"
                }
            >
                {numericChange.toFixed(2)}%
            </p>
        </div>
    );
}

export default AssetCard;