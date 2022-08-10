import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { differenceInSeconds } from 'date-fns'

import { HandPalm, Play } from 'phosphor-react'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, formState, reset } =
    useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        task: '',
        minutesAmount: 0
      }
    })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        )

        if (secondsDifference >= totalSeconds) {
          setCycles((prev) =>
            prev.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            })
          )

          setAmountSecondsPassed(totalSeconds)

          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId])

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      ...data,
      startDate: new Date()
    }

    setCycles((prev) => [...prev, newCycle])
    setActiveCycleId(id)

    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle() {
    setCycles((prev) =>
      prev.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      })
    )

    setActiveCycleId(null)
  }

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes} : ${seconds}`
    }
  }, [activeCycle, minutes, seconds])

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <main className="h-full flex-1 flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(handleCreateNewCycle)}
        className="flex flex-col items-center gap-14"
      >
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

        <div className="font-mono text-[10rem] leading-[8rem] text-brand-gray-100 flex gap-4">
          <span className="bg-brand-gray-700 py-8 px-4 rounded-lg">
            {minutes[0]}
          </span>
          <span className="bg-brand-gray-700 py-8 px-4 rounded-lg">
            {minutes[1]}
          </span>

          <div className="py-8 text-brand-green-500 w-16 overflow-hidden flex justify-center">
            :
          </div>

          <span className="bg-brand-gray-700 py-8 px-4 rounded-lg">
            {seconds[0]}
          </span>
          <span className="bg-brand-gray-700 py-8 px-4 rounded-lg">
            {seconds[1]}
          </span>
        </div>

        {activeCycle ? (
          <button
            type="button"
            onClick={handleInterruptCycle}
            className="w-full p-4 rounded-lg flex items-center justify-center gap-2 font-bold cursor-pointer bg-brand-red-500 text-brand-gray-100 enabled:hover:bg-brand-red-700 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Interromper
            <HandPalm size={24} />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="w-full p-4 rounded-lg flex items-center justify-center gap-2 font-bold cursor-pointer bg-brand-green-500 text-brand-gray-100 enabled:hover:bg-brand-green-700 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Começar
            <Play size={24} />
          </button>
        )}
      </form>
    </main>
  )
}
