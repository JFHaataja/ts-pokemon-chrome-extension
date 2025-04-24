import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from '../App.tsx'

describe('Home', () => {

    it('should have a Search text', () => {
        render(<App/>) // ARRANGE
    
        const searchBtn = screen.getByText('Search') // ACT
    
        expect(searchBtn).toBeInTheDocument() // ASSERT
    })

    it('should have an h1 heading', () => {
        render(<App/>)
    
        const h1 = screen.getByRole('heading', {
            level: 1,
            name: 'Pokémon Weakness Finder'
        })
    
        expect(h1).toBeInTheDocument()
    })

})