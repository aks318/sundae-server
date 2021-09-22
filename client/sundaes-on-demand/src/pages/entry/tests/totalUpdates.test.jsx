import { render , screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";
import OrderEntry from '../OrderEntry';

test('updates scoop subtotal when scoop change', async () => {
    render(<Options optionType = "scoops" /> , {wrapper : OrderDetailsProvider})

    // make sure total starts out $0.0
    const scoopsSubtotal = screen.getByText('Scoops total: $' , {exact: false})
    expect(scoopsSubtotal).toHaveTextContent('0.00')

    // update vanilla scoops to 1 and check subtotal
    const vanillaInput = await screen.findByRole('spinbutton' , {name : 'Vanilla'})

    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput , '1')
    expect(scoopsSubtotal).toHaveTextContent('2.00')

    // update chocolate scoops to 2 and check subtotal

    const chocolateInput = await screen.findByRole('spinbutton' , {name : 'Chocolate'})
    userEvent.clear(chocolateInput)
    userEvent.type(chocolateInput , '2')
    expect(scoopsSubtotal).toHaveTextContent('6.00')

})

test('update toppings subtotal when toppings change', async () => {
    // render parent component
    render(<Options optionType="toppings" /> , {wrapper : OrderDetailsProvider});
  
    // make sure total starts out at $0.00
    const toppingsTotal = screen.getByText('Toppings total: $', { exact: false });
    expect(toppingsTotal).toHaveTextContent('0.00');
  
    // add cherries and check subtotal
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);
    expect(toppingsTotal).toHaveTextContent('1.50');
  
    // add hot fudge and check subtotal
    const hotFudgeCheckbox = screen.getByRole('checkbox', { name: 'Hot fudge' });
    userEvent.click(hotFudgeCheckbox);
    expect(toppingsTotal).toHaveTextContent('3.00');
  
    // remove hot fudge and check subtotal
    userEvent.click(hotFudgeCheckbox);
    expect(toppingsTotal).toHaveTextContent('1.50');
  });

  describe('grand total', () => {
    test('grand total updates properly if scoop is added first', async () => {
      render(<OrderEntry /> , {wrapper : OrderDetailsProvider});
      const grandTotal = screen.getByRole('heading', {
        name: /grand total: \$/i,
      });
  
      // check that the grand total starts out at 0
      expect(grandTotal).toHaveTextContent('0.00');
  
      // update vanilla scoops to 2 and check grand total
      const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla',
      });
      userEvent.clear(vanillaInput);
      userEvent.type(vanillaInput, '2');
      expect(grandTotal).toHaveTextContent('4.00');
  
      // add cherries and check grand total
      const cherriesCheckbox = await screen.findByRole('checkbox', {
        name: 'Cherries',
      });
      userEvent.click(cherriesCheckbox);
      expect(grandTotal).toHaveTextContent('5.50');
    });
  
    test('grand total updates properly if topping is added first', async () => {
      render(<OrderEntry /> , {wrapper : OrderDetailsProvider}) ;
  
      // add cherries and check grand total
      const cherriesCheckbox = await screen.findByRole('checkbox', {
        name: 'Cherries',
      });
      userEvent.click(cherriesCheckbox);
      const grandTotal = screen.getByRole('heading', {
        name: /grand total: \$/i,
      });
      expect(grandTotal).toHaveTextContent('1.50');
  
      // update vanilla scoops to 2 and check grand total
      const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla',
      });
      userEvent.clear(vanillaInput);
      userEvent.type(vanillaInput, '2');
      expect(grandTotal).toHaveTextContent('5.50');
    });
  
    test('grand total updates properly if item is removed', async () => {
      render(<OrderEntry /> , {wrapper : OrderDetailsProvider});
  
      // add cherries
      const cherriesCheckbox = await screen.findByRole('checkbox', {
        name: 'Cherries',
      });
      userEvent.click(cherriesCheckbox);
      // grand total $1.50
  
      // update vanilla scoops to 2; grand total should be $5.50
      const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla',
      });
      userEvent.clear(vanillaInput);
      userEvent.type(vanillaInput, '2');
  
      // remove 1 scoop of vanilla and check grand total
      userEvent.clear(vanillaInput);
      userEvent.type(vanillaInput, '1');
  
      // check grand total
      const grandTotal = screen.getByRole('heading', {
        name: /grand total: \$/i,
      });
      expect(grandTotal).toHaveTextContent('3.50');
  
      // remove cherries and check grand total
      userEvent.click(cherriesCheckbox);
      expect(grandTotal).toHaveTextContent('2.00');
    });
  });
  