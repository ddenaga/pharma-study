import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Sidebar from '../Sidebar';
import MyPatients from '../../../src/pages/jhopkins/doctor/my-patients'
import { UserProvider } from '@auth0/nextjs-auth0/client';

describe('MyPatients', () => {
  test('renders without errors', () => {
    render(
      <UserProvider>
        <MyPatients />
      </UserProvider>
    );
  });
/*
  test('clicking the add patient button adds a new patient', async () => {
    const { getByText, getByPlaceholderText } = render(
      <UserProvider>
        <MyPatients />
      </UserProvider>
    );
    const addPatientButton = getByText('+ New Patient');
    fireEvent.click(addPatientButton);
    const nameInput = getByPlaceholderText('Name');
    await waitFor(() => expect(nameInput.value).toBe('Anthony'));
  });
*/
/*
  test('typing in the search input filters the patient list', async () => {
    const { getByPlaceholderText, queryByText } = render(
      <UserProvider>
        <MyPatients />
      </UserProvider>
    );
    const searchInput = getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'Anthony' } });
    await waitFor(() => expect(queryByText('Anthony')).not.toBeNull());
    fireEvent.change(searchInput, { target: { value: 'Invalid' } });
    await waitFor(() => expect(queryByText('Anthony')).toBeNull());
  });
  */
});
