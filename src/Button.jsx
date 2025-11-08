

const Button=({onClick,children})=>{
    return(
        <div>
            <button onClick={onClick} className="px-4 py-2 bg-black-600 text-black rounded-lg border m-2 hover:bg-white-700 active:scale-95 transition duration-200 ease-in-out shadow-sm">
                {children}
            </button>
        </div>
    )
}

export default Button;