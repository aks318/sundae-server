import {
    render,
    screen,
    waitForElementToBeRemoved,
  } from '@testing-library/react';
  import SummaryForm from '../pages/summary/SummaryForm';
  import userEvent from '@testing-library/user-event';

  
  test('Initial conditions', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });
    expect(checkbox).not.toBeChecked();
  
    const confirmButton = screen.getByRole('button', { name: /confirm order/i });
    expect(confirmButton).toBeDisabled();
  });
  
  test('Checkbox enables button on first click and disables on second click', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });
    const confirmButton = screen.getByRole('button', { name: /confirm order/i });
  
    userEvent.click(checkbox);
    expect(confirmButton).toBeEnabled();
  
    userEvent.click(checkbox);
    expect(confirmButton).toBeDisabled();
  });

  test('popover respond to hover' , async()=>{
      render(<SummaryForm />)
    //   popover starts hidden
    const nullPopOver = screen.queryByText(/no ice cream will actually be delivered/i)
    expect(nullPopOver).not.toBeInTheDocument()

    // popover appper on mouse over of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i)
    userEvent.hover(termsAndConditions)

    const popover = screen.getByText(/no ice cream will actually be delivered/i)
    expect(popover).toBeInTheDocument()
    // popover disappped on mouse out
    userEvent.unhover(termsAndConditions)
    await waitForElementToBeRemoved(() =>screen.queryByText(/no ice cream will actually be delivered/i)) 
  })
