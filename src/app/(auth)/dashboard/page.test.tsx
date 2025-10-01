import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import DashboardPage from './page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn((key: string) => {
      if (key === 'q') return 'Nirvana'
      if (key === 'page') return '1'
      return null
    }),
  }),
}))

// Mock the query hook
jest.mock('./_services/use-search-artists.query', () => ({
  useSearchArtistsQuery: () => ({
    data: null,
    isLoading: false,
    error: null,
  }),
}))

// Mock query string hook
jest.mock('@/hooks/use-query-string', () => ({
  useQueryString: () => ({
    updateQueryString: jest.fn(),
  }),
}))

describe('Dashboard Page', () => {
  it('renders the main heading', () => {
    render(<DashboardPage />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Busca tus artistas')
  })

  it('renders the description text', () => {
    render(<DashboardPage />)

    const description = screen.getByText(/Encuentra tus artistas favoritos/i)

    expect(description).toBeInTheDocument()
  })
})
