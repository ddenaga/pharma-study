import React from 'react'
import { render, screen } from '@testing-library/react'
import CreatePatient from '../../pages/patient/create'

describe('CreatePatient', () => {
  it('renders a Sidebar', () => {
    render(<CreatePatient />)

    const text = screen.getByText(/Create a Patient/i)

    expect(text).toBeInTheDocument()
  })
})


