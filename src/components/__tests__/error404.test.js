//Brian
import React from 'react'
import { render, screen } from '@testing-library/react'
import Unotharized from '../../pages/404'


describe('Error 404', () => {
  it('renders a Error 404', () => {
    render(<Unotharized />)

    const text = screen.getByText(/Unotharized/i)

   
    expect(text).toBeInTheDocument()
  })
})
