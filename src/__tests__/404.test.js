import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Unauthorized from '@/pages/404';

describe('Error 404', () => {
	it('renders a Error 404', () => {
		render(<Unauthorized />);

		const text = screen.getByText(/Unauthorized/i);

		expect(text).toBeInTheDocument();
	});
});
