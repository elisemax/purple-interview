
type infoButton = { text: string, onClick: (e:any) => void }

const Button = ({text, onClick}:infoButton) => {
  return (
    <div className='m-3'>
      <button
          onClick={onClick}
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {text}
      </button>
      </div>
  )
}

export default Button