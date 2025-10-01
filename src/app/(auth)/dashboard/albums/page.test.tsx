import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import MyAlbumsPage from './page'

// Mock the query hooks
jest.mock('./_services/use-saved-albums.query', () => ({
  useSavedAlbumsQuery: () => ({
    data: { items: [] },
    isLoading: false,
    error: null,
  }),
}))

jest.mock('./_services/use-remove-album.mutation', () => ({
  useRemoveAlbumMutation: () => ({
    mutateAsync: jest.fn(),
    isPending: false,
  }),
}))

describe('My Albums Page', () => {
  it('renders the main heading', () => {
    render(<MyAlbumsPage />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Mis albumes guardados')
  })

  it('renders empty state message when no albums', () => {
    render(<MyAlbumsPage />)

    const emptyMessage = screen.getByText(/No tienes álbumes guardados aún/i)

    expect(emptyMessage).toBeInTheDocument()
  })
})
