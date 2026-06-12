function PortfolioSummary({ data = [] }) {

    const totalInvestment =
        data.reduce(

            (sum, asset) =>

                sum + asset.investment,

            0

        );

    const totalCurrentValue =
        data.reduce(

            (sum, asset) =>

                sum + asset.currentValue,

            0

        );

    const totalProfit =
        totalCurrentValue - totalInvestment;

    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

            {/* Investment */}

            <div className="bg-gray-800 p-5 rounded-xl">

                <h2 className="text-lg">

                    Total Investment

                </h2>

                <p className="text-2xl mt-2">

                    $

                    {

                        totalInvestment.toLocaleString()

                    }

                </p>

            </div>


            {/* Current Value */}

            <div className="bg-gray-800 p-5 rounded-xl">

                <h2 className="text-lg">

                    Current Value

                </h2>

                <p className="text-2xl mt-2">

                    $

                    {

                        totalCurrentValue.toLocaleString()

                    }

                </p>

            </div>


            {/* Profit/Loss */}

            <div className="bg-gray-800 p-5 rounded-xl">

                <h2 className="text-lg">

                    Net Profit/Loss

                </h2>

                <p

                    className={

                        totalProfit >= 0

                            ? "text-green-400 text-2xl mt-2"

                            : "text-red-400 text-2xl mt-2"

                    }

                >

                    $

                    {

                        totalProfit.toLocaleString()

                    }

                </p>

            </div>

        </div>

    );

}

export default PortfolioSummary;