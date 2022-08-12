import { useEffect } from 'react'

import { differenceInSeconds } from 'date-fns'

import { useCyclesContext } from '../contexts/CyclesContext'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setSecondsPassed
  } = useCyclesContext()

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
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    setSecondsPassed,
    markCurrentCycleAsFinished
  ])

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

  return (
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
  )
}
