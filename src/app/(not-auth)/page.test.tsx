import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from './page'

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Page />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Disfruta de la mejor música')
  })

  it('renders the login button', () => {
    render(<Page />)

    const loginButton = screen.getByText('Log in con Spotify')

    expect(loginButton).toBeInTheDocument()
  })
})
