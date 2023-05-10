import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SendDrugsTable from '@/components/SendDrugsTable';

describe('Send Drugs Page', () => {
	it('renders a table with a Bavaria drug with 5 doses', () => {
		const treatments = [
			{ _id: '0187c503-7083-3163-6dcd-95fac154706d', isGeneric: false, numberOfDoses: 5 },
		];

		render(<SendDrugsTable treatments={treatments} onChange={() => null} />);

		const uuid = screen.getByText('0187c503-7083-3163-6dcd-95fac154706d');
        const type = screen.getByText("Bavaria");
        const doseCount = screen.getByDisplayValue("5")

		expect(uuid).toBeInTheDocument();
        expect(type).toBeInTheDocument();
        expect(doseCount).toBeInTheDocument();
	});

    it('renders a table with a Generic drug with 1 dose', () => {
		const treatments = [
			{ _id: '0187c503-7083-3163-6dcd-95fac154706d', isGeneric: true, numberOfDoses: 1 },
		];

		render(<SendDrugsTable treatments={treatments} onChange={() => null} />);

		const uuid = screen.getByText('0187c503-7083-3163-6dcd-95fac154706d');
        const type = screen.getByText("Generic");
        const doseCount = screen.getByDisplayValue("1")

		expect(uuid).toBeInTheDocument();
        expect(type).toBeInTheDocument();
        expect(doseCount).toBeInTheDocument();
	});
});
