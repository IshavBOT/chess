import { useNavigate } from "react-router-dom"

export const Landing = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col min-h-screen bg-gray-900">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="flex-1 flex justify-center items-center px-4 py-16 relative">
                <div className="max-w-screen-lg w-full">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
                        <div className="flex justify-center">
                            <img 
                                src={"/chessboard.jpeg"} 
                                className="max-w-86 rounded-lg shadow-2xl border-4 border-green-800/30"
                                alt="Chess Board"
                            />
                        </div>
                        <div className="pt-8 md:pt-0">
                            <div className="flex justify-center text-center">
                                <h1 className="text-4xl md:text-5xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                                    Play Chess Online using WebSocket
                                </h1>
                            </div>
                            <div className="mt-8 flex flex-col items-center">
                                <button 
                                    onClick={() => {
                                        navigate('/game')
                                    }} 
                                    className="bg-gradient-to-r from-green-600 to-green-800 text-white font-bold py-4 px-8 text-xl 
                                    hover:from-green-500 hover:to-green-700 hover:cursor-pointer rounded-lg transform hover:scale-105 
                                    transition-all duration-300 shadow-lg hover:shadow-green-500/50"
                                >
                                    Play Online
                                </button>
                                <p className="mt-6 text-gray-400 text-center max-w-md">
                                    Challenge players from around the world in real-time chess matches powered by WebSocket technology
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-gray-800/50 backdrop-blur-sm">
                <div className="text-center p-4">
                    <div className="text-3xl font-bold text-green-500">1000+</div>
                    <div className="text-gray-400">Active Players</div>
                </div>
                <div className="text-center p-4">
                    <div className="text-3xl font-bold text-green-500">24/7</div>
                    <div className="text-gray-400">Available</div>
                </div>
                <div className="text-center p-4">
                    <div className="text-3xl font-bold text-green-500">100ms</div>
                    <div className="text-gray-400">Low Latency</div>
                </div>
                <div className="text-center p-4">
                    <div className="text-3xl font-bold text-green-500">Free</div>
                    <div className="text-gray-400">To Play</div>
                </div>
            </div>

            <footer className="text-center py-4 text-gray-500 bg-gray-800/30">
                <p>Created by Ishav</p>
            </footer>
        </div>
    )
}