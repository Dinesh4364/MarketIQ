import AssetCard from "./AssetCard";

function OverviewCards({ data }) {

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

            {
                data?.map(asset => (

                    <AssetCard
                        key={asset.symbol}
                        {...asset}
                    />

                ))
            }

        </div>

    );

}

export default OverviewCards;