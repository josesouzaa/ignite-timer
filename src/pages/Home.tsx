import { Play } from 'phosphor-react'

export function Home() {
  return (
    <main className="h-full flex-1 flex flex-col items-center justify-center">
      <form action="" className="flex flex-col items-center gap-14">
        <div className="w-full flex items-center justify-center gap-2 text-brand-gray-100 text-lg font-bold flex-wrap">
          <label htmlFor="task">Vou trabalhar em</label>
          <input
            id="task"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            className="bg-transparent h-10 border-b-2 border-brand-gray-500 px-2 text-brand-gray-100 flex-1 placeholder:text-gray-500 focus:shadow-none focus:border-brand-green-500"
          />

          <label htmlFor="minutesAmount">durante</label>
          <input
            type="number"
            id="minutesAmount"
            placeholder="00"
            className="bg-transparent h-10 border-b-2 border-brand-gray-500 px-2 text-brand-gray-100 w-16 placeholder:text-gray-500 focus:shadow-none focus:border-brand-green-500"
          />

          <span>minutos.</span>
        </div>

        <div className="font-mono text-[10rem] leading-[8rem] text-brand-gray-100 flex gap-4">
          <span className="bg-brand-gray-700 py-8 px-4 rounded-lg">0</span>
          <span className="bg-brand-gray-700 py-8 px-4 rounded-lg">0</span>

          <div className="py-8 text-brand-green-500 w-16 overflow-hidden flex justify-center">
            :
          </div>

          <span className="bg-brand-gray-700 py-8 px-4 rounded-lg">0</span>
          <span className="bg-brand-gray-700 py-8 px-4 rounded-lg">0</span>
        </div>

        <button
          type="submit"
          className="w-full p-4 rounded-lg flex items-center justify-center gap-2 font-bold cursor-pointer bg-brand-green-500 text-brand-gray-100 enabled:hover:bg-brand-green-700 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Começar
          <Play size={24} />
        </button>
      </form>
    </main>
  )
}
