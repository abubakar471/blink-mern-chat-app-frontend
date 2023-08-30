import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
    return (
        <div className="flex items-center 
        justify-center h-[650px] md:h-screen lg:h-screen">
            <div className="flex flex-col items-center justify-center 
        bg-white/5 w-48 h-48 mx-auto rounded-lg">

                <img className="w-20 h-20 mb-2" src="/assets/logo3.png" alt="logo" />
                <div className="transition text-violet-500 font-semibold mb-2">
                    blink
                </div>
                <CircularProgress color="secondary" disableShrink />

            </div>
        </div>

    )
}

export default Loader