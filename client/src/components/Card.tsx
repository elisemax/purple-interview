
type infoCard = { stats : { name: string, stat: string } }

const Card = ({stats}:infoCard) => {
    return (
                <div key={stats.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">{stats.name}</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-indigo-600">{stats.stat}</dd>
                </div>
                )
}

export default Card;