import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import SpotifyCallbackPage from './page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('Spotify Callback Page', () => {
  it('renders the callback page', () => {
    render(<SpotifyCallbackPage />)

    // The component should render either processing or error state
    const content = screen.getByRole('heading', { level: 2 })

    expect(content).toBeInTheDocument()
  })
})
