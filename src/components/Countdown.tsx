import { useEffect, useState } from 'react'

import { differenceInSeconds } from 'date-fns'

export function Countdown() {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

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
