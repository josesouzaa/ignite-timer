import { ReactNode } from 'react'

import classNames from 'classnames'

import { useCyclesContext } from '../contexts/CyclesContext'

interface StatusProps {
  statusColor: 'yellow' | 'red' | 'green'
  children: ReactNode
}

function Status({ statusColor, children }: StatusProps) {
  return (
    <span
      className={classNames(
        'flex items-center gap-2 before:content-[""] before:w-2 before:h-2 before:rounded-full ',
        {
          'before:bg-brand-green-500': statusColor === 'green',
          'before:bg-brand-red-500': statusColor === 'red',
          'before:bg-brand-yellow-500': statusColor === 'yellow'
        }
      )}
    >
      {children}
    </span>
  )
}

export function History() {
  const { cycles } = useCyclesContext()

  return (
    <main className="flex-1 p-14 flex flex-col">
      <h1 className="text-2xl text-brand-gray-100">Meu histórico</h1>

      <div className="history-table">
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Iníco</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="yellow">Em andamento</Status>
              </td>
            </tr>

            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>

            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="red">Interrompido</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  )
}
