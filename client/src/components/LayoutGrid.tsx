import { ReactNode } from "react";


type infoLayoutGrid = {
    children: ReactNode[]
}

const LayoutGrid = ({children}:infoLayoutGrid) => {
  return (
      <div className="m-10">
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {children}
            </dl>
        </div>
  )
}

export default LayoutGrid