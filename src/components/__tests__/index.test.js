//Brian
import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../../pages/index'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('title', {
      name: /PharmaStudy/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
