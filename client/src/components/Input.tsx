
type infoInput = { currency: string, label: string, handlechange: (e: {value: string}) => void }

const Input = ({currency, label, handlechange} : infoInput) => {
    return (
        <div className="m-3">
            <label htmlFor="input" className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                    type="number"
                    name="input"
                    min="0"
                    id="input"
                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="0.00"
                    aria-describedby="price-currency"
                    onChange={(e) => {
                        handlechange({value: e.target.value})
                    }}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm" id="price-currency">
                        {currency}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Input
