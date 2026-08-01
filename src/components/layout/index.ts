import * as React from 'react'
import { AppShell } from './AppShell'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { Breadcrumb } from './Breadcrumb'
import { ThemeSwitcher } from './ThemeSwitcher'
import { NavLinkItem } from './NavLinkItem'

export { AppShell, Sidebar, Navbar, Footer, Breadcrumb, ThemeSwitcher, NavLinkItem }

export interface LayoutComponents {
  AppShell: typeof AppShell
  Sidebar: typeof Sidebar
  Navbar: typeof Navbar
  Footer: typeof Footer
  Breadcrumb: typeof Breadcrumb
  ThemeSwitcher: typeof ThemeSwitcher
  NavLinkItem: typeof NavLinkItem
}

export const Layout: LayoutComponents = {
  AppShell,
  Sidebar,
  Navbar,
  Footer,
  Breadcrumb,
  ThemeSwitcher,
  NavLinkItem,
}
