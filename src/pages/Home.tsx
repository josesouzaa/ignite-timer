import { useEffect, useState } from 'react'

import { HandPalm, Play } from 'phosphor-react'
import { NewCycleForm } from '../components/NewCycleForm'
import { Countdown } from '../components/Countdown'

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

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

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
        <NewCycleForm />

        <Countdown activeCycle={activeCycle} />

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
