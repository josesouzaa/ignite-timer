import { NavLink } from 'react-router-dom'

import logoIgnite from '../assets/logo-ignite.svg'

import { Scroll, Timer } from 'phosphor-react'

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <img src={logoIgnite} />

      <nav className="flex gap-2">
        <NavLink to="/" title="Timer" className="navLink">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico" className="navLink">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </header>
  )
}
