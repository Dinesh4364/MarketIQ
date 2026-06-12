import { useMutation, useQuery, useQueryClient }
    from "@tanstack/react-query";

import DashboardLayout
    from "../layouts/DashboardLayout";

import { fetchWatchlist, removeFromWatchlist } from "../services/watchlistService";


function WatchlistPage() {
    const { data, isLoading, error } =
        useQuery({
            queryKey: ["watchlist"],
            queryFn: fetchWatchlist
        });

    const queryClient = useQueryClient();
    const mutation =
        useMutation({
            mutationFn:
                removeFromWatchlist,
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["watchlist"]
                });
            }
        });

    if (isLoading) {
        return (
            <DashboardLayout>
                Loading...
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout>
                Error
            </DashboardLayout>
        );
    }

    return (

        <DashboardLayout>

            <h1
                className="text-3xl mb-8">

                Watchlist

            </h1>


            <div
                className="grid grid-cols-1 md:grid-cols-4 gap-5">

                {

                    data?.map(asset => (
                        <div
                            key={asset.symbol}
                            className="bg-gray-800 p-5 rounded-xl"
                        >
                            <div className="flex justify-between">
                                <h2 className="text-xl">
                                    {asset.symbol}
                                </h2>
                                <button
                                    onClick={() =>
                                        mutation.mutate(
                                            asset.symbol
                                        )
                                    }
                                    className="text-red-500"
                                >
                                    ❌
                                </button>
                            </div>

                            <p className="mt-3">
                                Price:
                                $
                                {
                                    asset.price?.toLocaleString()
                                }
                            </p>
                            <p
                                className={
                                    asset.change >= 0
                                        ?
                                        "text-green-400"
                                        :
                                        "text-red-400"
                                }
                            >
                                {
                                    asset.change
                                }
                                %
                            </p>
                            <p>
                                Volume:
                                {
                                    asset.volume?.toLocaleString()
                                }
                            </p>
                        </div>
                    ))

                }

            </div>

        </DashboardLayout>

    );

}

export default WatchlistPage;