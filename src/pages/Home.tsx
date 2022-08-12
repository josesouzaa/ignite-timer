import { useCyclesContext } from '../contexts/CyclesContext'

import { NewCycleForm } from '../components/NewCycleForm'
import { Countdown } from '../components/Countdown'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { HandPalm, Play } from 'phosphor-react'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, interruptCurrentCycle, createNewCycle } =
    useCyclesContext()

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <main className="h-full flex-1 flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(createNewCycle)}
        className="flex flex-col items-center gap-14"
      >
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              interruptCurrentCycle()
            }}
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
