import { useCyclesContext } from '../contexts/CyclesContext'

import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { activeCycle } = useCyclesContext()
  const { register } = useFormContext()

  return (
    <div className="w-full flex items-center justify-center gap-2 text-brand-gray-100 text-lg font-bold flex-wrap">
      <label htmlFor="task">Vou trabalhar em</label>
      <input
        id="task"
        type="text"
        list="tasks-suggestion"
        disabled={!!activeCycle}
        placeholder="Dê um nome para o seu projeto"
        className="bg-transparent h-10 border-b-2 border-brand-gray-500 px-2 text-brand-gray-100 flex-1 placeholder:text-gray-500 focus:shadow-none focus:border-brand-green-500"
        {...register('task')}
      />

      <datalist id="tasks-suggestion">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Projeto 4" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <input
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        className="bg-transparent h-10 border-b-2 border-brand-gray-500 px-2 text-brand-gray-100 w-16 placeholder:text-gray-500 focus:shadow-none focus:border-brand-green-500"
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </div>
  )
}
