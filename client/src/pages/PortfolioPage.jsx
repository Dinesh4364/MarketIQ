import { useQuery } from "@tanstack/react-query";

import DashboardLayout from "../layouts/DashboardLayout";
import PortfolioSummary from "../components/PortfolioSummary";

import { fetchPortfolio } from "../services/portfolioService";

function PortfolioPage() {

    const {

        data = [],

        isLoading,

        error

    } = useQuery({

        queryKey: ["portfolio"],

        queryFn: fetchPortfolio

    });

    if (isLoading) {

        return (

            <DashboardLayout>

                <h1>Loading Portfolio...</h1>

            </DashboardLayout>

        );

    }

    if (error) {

        return (

            <DashboardLayout>

                <h1>Error loading portfolio</h1>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <h1 className="text-3xl mb-8">

                Portfolio

            </h1>
            <PortfolioSummary data={data}/>
            <div className="bg-gray-800 rounded-xl p-5">

                <table className="w-full">

                    <thead>

                        <tr>

                            <th>Asset</th>

                            <th>Quantity</th>

                            <th>Buy Price</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            data.map((holding) => (

                                <tr key={holding._id}>

                                    <td>{holding.asset}</td>

                                    <td>{holding.quantity}</td>

                                    <td>

                                        $

                                        {

                                            holding.buyPrice

                                                .toLocaleString()

                                        }

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </DashboardLayout>

    );

}

export default PortfolioPage;